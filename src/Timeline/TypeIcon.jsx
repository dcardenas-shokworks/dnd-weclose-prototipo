import React from "react";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export const TypeIcon = (props) => {
  if (props.droppable) {
    return <DragIndicatorIcon className="text-gray-600"/>;
  }

  return <DragIndicatorIcon className="text-gray-600"/>;
};
