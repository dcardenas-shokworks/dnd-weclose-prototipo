import React, { useState } from "react";
import { Tree } from "@minoru/react-dnd-treeview";
import { CustomNodeDeliverables } from "./CustomNodeDeliverables";
import { CustomDragPreview } from "../CustomDragPreview";
import styles from "./TreeDeliverables.module.css";
import { AddDialog } from "./AddDialog";
import { AddDeliverable } from "./AddDeliverable";

// Obtiene el ultimo Id del arbol de entregables documentos
const getLastId = (treeData) => {
  const reversedArray = [...treeData].sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    }

    return 0;
  });

  if (reversedArray.length > 0) {
    return reversedArray[0].id;
  }

  return 0;
};


export const TreeDeliverables = (props) => {


  const [open, setOpen] = useState(false); // Estado maneja visualización de modal
  const [treeData, setTreeData] = useState(props.tree); // Data del arbol de entregables

  // Abre modal de agregar entregable
  const handleOpenDialog = () => {
    setOpen(true);
  };

  // Cierra modal
  const handleCloseDialog = () => {
    setOpen(false);
  };

  //Agrega el nuevo entregable (nodo) en el árbol
  const handleSubmit = (newNode) => {
    const lastId = getLastId(treeData) + 1;

    setTreeData([
      ...treeData,
      {
        id: lastId,
        ...newNode
      }
    ]);

    setOpen(false);
  };

  // console.log(treeData);
  return (
    <div className="flex flex-col justify-between bg-white rounded-md h-full mx-2">
      <Tree
        tree={treeData}
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
      <button onClick={handleOpenDialog} className="text-white bg-primary font-bold p-2 m-1 rounded-md">
        Add Deliverable
      </button>
      {open && (
        <AddDeliverable
          tree={props.tree}
          onClose={handleCloseDialog}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};