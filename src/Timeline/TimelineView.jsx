import { useRef, useEffect, useState } from "react";
import { Tree } from "@minoru/react-dnd-treeview";
import { CustomNodeTimeline } from "./CustomNodeTimeline";
// import { CustomDragPreview } from "./CustomDragPreview";
import styles from "./TimelineView.module.css";
import { AddMilestone } from "./AddMilestone";


export const TimelineView = (props) => {
  
  const [open, setOpen] = useState(false); // Estado maneja visualización de modal

  let contador = 0;
   props.tree.map(node => {
      if (node.droppable === false) {
        contador++;
      }
    });

  const ref = useRef(null);
  const handleOpenAll = () => { ref.current?.openAll(); }

  // Abre modal de agregar entregable
  const handleOpenDialog = () => {
    setOpen(true);
  };

  // Cierra modal
  const handleCloseDialog = () => {
    setOpen(false);
  };


  return (
    <div className="grid grid-cols-6 mt-10  mx-2 relative p-6  bg-white w-auto h-20 rounded-md">
      {/* <h2 onClick={handleOpenAll} className="text-center mb-10">TIMELINE</h2> */}
      <div className="flex col-span-5">
        {/* {props.tree.map((elem, index) => ( */}
        <div className="flex items-center justify-between border-x-2 border-gray-200 relative w-full  h-[18px] pt-[9px]">
          <div className="absolute -bottom-4 -left-1 text-xs">0</div>

          <Tree
            listComponent={"div"}
            listItemComponent={"div"}
            ref={ref}
            canDrag={() => false}
            tree={props.tree}
            onDrop={props.onDrop}
            rootId={props.rootId}
            classes={{
              root: styles.treeRoot,
              draggingSource: styles.draggingSource,
              dropTarget: styles.dropTarget,
              container: styles.timelineTree,
              listItem: styles.timelineItemTree
            }}
            sort={false}
            initialOpen={true}
            render={(node, options) => <CustomNodeTimeline node={node} {...options} tree={props.tree} />}
          />
  
          <div className="absolute -bottom-4 -right-2 text-xs">{props.tree.length - contador}</div>
        </div>
      </div>
      <button onClick={handleOpenDialog} className="justify-self-end bg-primary text-white w-16 h-8  rounded-md text-3xl">+</button>
      {open && (
        <AddMilestone
          // tree={props.tree}
          onClose={handleCloseDialog}
          // onSubmit={handleSubmit}
        />
      )}
    </div>
  )
};
