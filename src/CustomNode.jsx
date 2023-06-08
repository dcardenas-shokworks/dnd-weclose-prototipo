import React from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { TypeIcon } from "./TypeIcon";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export const CustomNode = ({ testIdPrefix = "", node, ...props }) => {
  const { droppable } = node;
  const { id } = node;
  const indent = props.depth * 24;

  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(node.id);
  };

  return (
    <div className="flex m-4 min-w-[287px] w-full"
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

      <div className="flex items-center justify-between bg-white px-2 w-full rounded shadow-[0px_0px_8px_rgba(121,121,121,0.15)]">
        <div className="px-[16px] py-[18.5px]">
        {
          node.data.user_assigned ? (
            <div className="">
              <p className="text-[15px] font-bold text-black">{node.data.user_assigned.full_name}</p>
              <p className="text-xs text-gray-700 pt-[4px]">{node.text}</p>
            </div>
          ) : (
              <p className="text-[15px] font-bold">{node.text}</p>
          )
        }
        </div>
        <div className="cursor-pointer border-l-[0.5px] border-l-gray-700 ml-1 h-[49px] flex items-center"
          ref={props.handleRef}
          data-testid={`drag-handle-${node.id}`}
        >
          <DragIndicatorIcon className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};
