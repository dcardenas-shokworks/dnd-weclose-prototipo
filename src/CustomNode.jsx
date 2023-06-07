import React from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { TypeIcon } from "./TypeIcon";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export const CustomNode = ({ testIdPrefix = "", ...props }) => {
  const { droppable } = props.node;
  const { id } = props.node;
  const indent = props.depth * 24;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  return (
    <div className="flex h-8 m-2"
      style={{ paddingInlineStart: indent }}
      data-testid={`${testIdPrefix}custom-node-${id}`}
    >
      {/* <div className={`${styles.arrow} ${props.isOpen ? styles.isOpen : ""}`}>
        {props.node.droppable && (
          <div onClick={handleToggle}>
            <ArrowRightIcon />
          </div>
        )}
      </div> */}
      <div className="flex items-center bg-white rounded-sm px-2">
        <div className="text-black font-bold">
          <div className="text-xs">{props.node.text}</div>
        </div>
        <div className="cursor-pointer border-l-2 border-l-gray-400 ml-1"
          ref={props.handleRef}
          data-testid={`drag-handle-${props.node.id}`}
        >
          <DragIndicatorIcon className="text-gray-500"/>
        </div>
      </div>
    </div>
  );
};
