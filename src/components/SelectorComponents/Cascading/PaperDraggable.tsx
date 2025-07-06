import { useRef } from 'react';

import { Paper } from '@mui/material';
import { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';

import {
  PaperDraggableStyle,
  PaperDraggableTimeLapseStyle,
  PaperDraggableContributeStyle,
  PaperDraggableNumberTableStyle,
  PaperDraggablePreviewStyle,
} from '@/styleMUI';

export function PaperDraggable(props: PaperProps) {
  const paperRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={paperRef}
    >
      <Paper {...props} ref={paperRef} style={{ ...PaperDraggableStyle }} />
    </Draggable>
  );
}

export function PaperDraggableTimeLapse(props: PaperProps) {
  const paperRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      handle="#draggable-dialog-title-timelapse"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={paperRef}
    >
      <Paper
        {...props}
        ref={paperRef}
        style={{ ...PaperDraggableTimeLapseStyle }}
      />
    </Draggable>
  );
}

export function PaperDraggableLinkEntityAddComponent(props: PaperProps) {
  const paperRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      handle="#draggable-dialog-add-new"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={paperRef}
    >
      <Paper
        {...props}
        ref={paperRef}
        style={{ ...PaperDraggableContributeStyle }}
      />
    </Draggable>
  );
}

export function PaperDraggableLinkEntityModifyComponent(props: PaperProps) {
  const paperRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      handle="#draggable-dialog-modify"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={paperRef}
    >
      <Paper
        {...props}
        ref={paperRef}
        style={{ ...PaperDraggableContributeStyle }}
      />
    </Draggable>
  );
}

export function PaperDraggableNumbersTable(props: PaperProps) {
  const paperRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      handle="#draggable-dialog-nubmer"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={paperRef}
    >
      <Paper
        {...props}
        ref={paperRef}
        style={{ ...PaperDraggableNumberTableStyle }}
      />
    </Draggable>
  );
}

export function PaperDraggableLinkEntityPreviewChange(props: PaperProps) {
  const paperRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable
      handle="#draggable-dialog-title-preview"
      cancel={'[class*="MuiDialogContent-root"]'}
      nodeRef={paperRef}
    >
      <Paper
        {...props}
        ref={paperRef}
        style={{ ...PaperDraggablePreviewStyle }}
      />
    </Draggable>
  );
}
