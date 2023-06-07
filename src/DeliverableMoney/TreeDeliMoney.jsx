import React from "react";
import { Tree } from "@minoru/react-dnd-treeview";
import { CustomNodeDeliverables } from "./CustomNodeDeliverables";
import { CustomDragPreview } from "../CustomDragPreview";
import styles from "./TreeDeliverables.module.css";

export const TreeDeliMoney = (props) => (

  <div className="flex items-center justify-center bg-white p-4 rounded-md mx-2 ">
    <Tree
      tree={props.tree}
      onDrop={props.onDrop}
      rootId={props.rootId}
      listComponent={"div"}
      listItemComponent={"div"}
      classes={{
        root: styles.treeRoot,
        draggingSource: styles.draggingSource,
        dropTarget: styles.dropTarget
      }}
      sort={false}
      initialOpen={true}
      render={(node, options) => <CustomNodeDeliverables node={node} {...options} />}
      dragPreviewRender={(monitorProps) => (
        <CustomDragPreview monitorProps={monitorProps} />
      )}
    />

  </div>
);
