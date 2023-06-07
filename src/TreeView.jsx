import React from "react";
import { Tree } from "@minoru/react-dnd-treeview";
import { CustomNode } from "./CustomNode";
import { CustomDragPreview } from "./CustomDragPreview";
import styles from "./TreeView.module.css";

export const TreeView = (props) => (
    <Tree
      tree={props.tree}
      onDrop={props.onDrop}
      rootId={props.rootId}
      classes={{
        root: styles.treeRoot,
        draggingSource: styles.draggingSource,
        dropTarget: styles.dropTarget
      }}
      sort={false}
      initialOpen={true}
      render={(node, options) => <CustomNode node={node} {...options} />}
      dragPreviewRender={(monitorProps) => (
        <CustomDragPreview monitorProps={monitorProps} />
      )}
    />
  );