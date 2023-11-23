import React, { useEffect, useRef, useState } from 'react';

import { InputBase, Paper, Stack, Tooltip } from '@mui/material';
import Badge from '@mui/material/Badge';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import HeaderLogoSearch from '@/components/NavigationComponents/Header/HeaderSearchLogo';
import MiradorViewer from '@/components/DocumentComponents/MiradorViewer';
// Icons
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SearchIcon from '@mui/icons-material/Search';


// Note to @JohnMulligan: I (@dellamonica) see that the project is using
// lodash.debounce, but it does not seem to integrate nicely with React hooks.
// The following hook is a 5 line implementation that does debouncing just fine
// together with useState.

function useDebounce<T>(value: T, wait: number = 500) {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, wait);
    return () => clearTimeout(timer);
  }, [value, wait]);
  return debounceValue;
}

// Note: while the Documents API is under development, the schemas and fetch
// code are placed here. They can be later wrapped by createApi.

interface DocumentEntitySearchModel {
  typename: string,
  keys: string[]
}

interface DocumentSearchModel {
  label: string,
  entities: DocumentEntitySearchModel[],
  results_page: number,
  page_size: number
}

interface DocumentItemInfo {
  key: string,
  label: string,
  revision_number: number,
  thumb: string | null
}

interface DocumentSearchApiResult {
  matches: number,
  results: DocumentItemInfo[]
}

type DocumentSearchApi = (search: DocumentSearchModel) => Promise<DocumentSearchApiResult>

const docSearch: DocumentSearchApi = async (search) => {
  const res = await fetch('https://daast.azurewebsites.net/api/search', {
    'method': 'POST',
    'body': JSON.stringify(search)
  })
  return (await res.json()) as DocumentSearchApiResult
}

interface DocumentPaginationSource {
  count: number,
  currentPage?: number,
  getPage: (pageNum: number, pageSize: number) => Promise<DocumentItemInfo[]>
}

interface DocumentSearchBoxProps {
  onClick?: () => void,
  onUpdate: (source: DocumentPaginationSource) => void
}

const DocumentSearchBox = ({ onClick, onUpdate }: DocumentSearchBoxProps) => {
  const [searchText, setSearchText] = useState('')
  const debouncedSearch = useDebounce(searchText, 500)
  const search = (pageNum: number, pageSize: number) => {
    const model: DocumentSearchModel = {
      label: searchText,
      results_page: pageNum,
      page_size: pageSize,
      entities: []
    }
    try {
      let modSearch = searchText.replace(/([a-z0-9]+)/ig, '"$1"')
      const structuredSearch = JSON.parse(`{ ${modSearch} }`)
      const { label, voyages } = structuredSearch
      if (label || voyages) {
        model.label = label ?? ''
        if (voyages) {
          model.entities.push({
            typename: 'Voyages',
            keys: Array.isArray(voyages) ? voyages : [voyages]
          })
        }
      }
    } catch {
    }
    return docSearch(model)
  }
  useEffect(() => {
    const update = async () => {
      const { matches: count } = await search(1, 1)
      const paginationSource: DocumentPaginationSource = {
        count,
        getPage: async (pageNum, pageSize) => {
          const { results } = await search(pageNum, pageSize)
          return results
        }
      }
      onUpdate(paginationSource)
    }
    update()
  }, [debouncedSearch])
  return <Paper
    onClick={onClick}
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
    <InputBase
      onFocus={onClick}
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search Documents"
      inputProps={{ 'aria-label': 'search documents' }}
      onChange={e => setSearchText(e.target.value)}
    />
    <SearchIcon />
  </Paper>
}

interface DocumentGalleryProps {
  title: string,
  pageSize: number,
  source: DocumentPaginationSource,
  thumbSize: number,
  onDocumentOpen: (doc: DocumentItemInfo) => void
  onPageChange: (page: number) => void,
}

const DocumentGallery = ({ title, pageSize, source, thumbSize, onDocumentOpen, onPageChange }: DocumentGalleryProps) => {
  const [contents, setContents] = useState<DocumentItemInfo[]>([])
  const numPages = Math.ceil(source.count / pageSize)
  useEffect(() => {
    const refresh = async () => {
      setContents(await source.getPage(Math.min(numPages, source.currentPage ?? 1), pageSize))
    }
    refresh()
  }, [source])
  return <>
    <h2>{title} <small>(Item count: {source.count})</small></h2>
    <Pagination count={numPages} page={source.currentPage ?? 1} onChange={(_, p) => onPageChange(p)} />
    <ImageList sx={{ width: '80vw' }} cols={5} rowHeight={thumbSize}>
      {contents.map((item) => (
        <ImageListItem key={item.key} style={{ width: thumbSize, height: thumbSize }}>
          {item.thumb && <img
            width={thumbSize}
            height={thumbSize}
            src={item.thumb}
            alt={item.label}
            loading="lazy"
          />}
          <ImageListItemBar
            title={item.label}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                color="primary"
                aria-label={`Open ${item.label}`}
                onClick={() => onDocumentOpen(item)}
              >
                <AutoStoriesIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  </>
}

const UserWorkspaceLocalStorageKey = 'my-workspace'

const getWorkspace = () => {
  const stored = localStorage.getItem(UserWorkspaceLocalStorageKey)
  const items: DocumentItemInfo[] = JSON.parse(stored ?? '[]')
  return items
}

const getWorkspaceSource = () => {
  const items = getWorkspace()
  const paginationSource: DocumentPaginationSource = {
    count: items.length,
    getPage: (pageNum, pageSize) =>
      Promise.resolve(
        items.slice(
          (pageNum - 1) * pageSize,
          Math.min(items.length, pageNum * pageSize)))
  }
  return paginationSource
}

type DocumentPageTab = 'Search' | 'Workspace'

type DocumentSources = Partial<Record<DocumentPageTab, DocumentPaginationSource>>

const docIndexInWorkspace = (doc: DocumentItemInfo, items?: DocumentItemInfo[]) => {
  items ??= getWorkspace()
  return items.findIndex(info => info.key === doc.key)
}

const DocumentPage: React.FC = () => {
  // Our state is composed of sources for each DocumentPageTab, which allow
  // switching tabs without loss of state.
  const [sources, setSources] = useState<DocumentSources>({
    Workspace: getWorkspaceSource()
  })
  const [doc, setDoc] = useState<DocumentItemInfo | null>(null)
  const [tab, setTab] = useState<DocumentPageTab>('Search')
  const refreshWorkspace = () => {
    setSources({ ...sources, Workspace: getWorkspaceSource() })
  }
  const handleMiradorClose = () => {
    setDoc(null)
    return true
  }
  const handleWorkspaceAction = (manifestId: string) => {
    if (!doc || doc.key !== manifestId) {
      console.log('Unexpected item added to collection')
      return
    }
    const items = getWorkspace()
    const matchIndex = docIndexInWorkspace(doc, items)
    if (matchIndex >= 0) {
      // Already in the workspace, so we remove it.
      if (!confirm('Remove document from workspace?')) {
        return
      }
      items.splice(matchIndex, 1)
    } else {
      items.push(doc)
    }
    localStorage.setItem(UserWorkspaceLocalStorageKey, JSON.stringify(items))
    refreshWorkspace()
  }
  const tabSource = sources[tab]
  return (
    <Stack direction="row">
      {!doc && <HeaderLogoSearch />}
      <div style={{ marginTop: '5%', marginLeft: '5%', width: '90vw', height: '90vh', display: doc ? 'none' : 'block' }}>
        <div style={{ display: 'flex' }}>
          <div style={ tab === 'Workspace' ? { opacity: 0.33 } : {} }>
            <DocumentSearchBox onClick={() => setTab('Search')} onUpdate={src => setSources({ ...sources, Search: src })} />
          </div>
          {sources.Workspace &&
            <Tooltip title={sources.Workspace.count ? "My Workspace Documents" : "No Documents added to My Workspace yet"}>
              <IconButton aria-label="my-workspace" onClick={() => setTab('Workspace')}>
                <Badge badgeContent={sources.Workspace.count + ''} color="primary">
                  <BookmarksIcon color="action" />
                </Badge>
              </IconButton>
            </Tooltip>}
        </div>
        {tabSource && <DocumentGallery
          title={tab}
          source={tabSource}
          pageSize={15}
          thumbSize={200}
          onDocumentOpen={setDoc}
          onPageChange={pageNum => setSources({ ...sources, [tab]: { ...tabSource, currentPage: pageNum } })} />}
      </div>
      {doc && <MiradorViewer
        manifestUrlBase='https://daast.azurewebsites.net/api/manifest'
        domId='__mirador'
        onClose={handleMiradorClose}
        manifestId={doc.key}
        workspaceAction={docIndexInWorkspace(doc) >= 0 ? 'Remove' : 'Add'}
        onWorkspaceAction={handleWorkspaceAction} />}
    </Stack>
  );
};

export default DocumentPage;
