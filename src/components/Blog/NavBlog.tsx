import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import '@/style/blogs.scss';
import { InitialStateBlogProps } from '@/share/InterfaceTypesBlog';
import { Link, useParams } from 'react-router-dom';
import { BLOGPAGE } from '@/share/CONST_DATA';
import LanguagesDropdown from '../FunctionComponents/LanguagesDropdown';
import SelectBlogDropdown from './SelectBlogDropdown';
import AutoCompletedSearhBlog from './AutoCompletedSearhBlog';

const NavBlog: React.FC = () => {
  const { blogTitle } = useParams();
  const { post, searchTitle } = useSelector(
    (state: RootState) => state.getBlogData as InitialStateBlogProps
  );
  const { title } = post;

  return (
    <>
      <div className="nav-blog-header nav-blog-header-sticky ">
        <div>
          <Link
            to={`/${BLOGPAGE}`}
            style={{ textDecoration: 'none', color: '#ffffff' }}
          >
            <div>{`Echoes: The SlaveVoyages Blog ${
              '-' && title ? title : ''
            }`}</div>
            <div className="navbar-blog-subtitle">
              {searchTitle ? searchTitle.toUpperCase() : ''}
            </div>
          </Link>
        </div>
        <div>
          {!blogTitle && <LanguagesDropdown />}
          <div className="search-autocomplete-blog">
            <SelectBlogDropdown />
            <AutoCompletedSearhBlog />
          </div>
        </div>
      </div>
    </>
  );
};
export default NavBlog;
