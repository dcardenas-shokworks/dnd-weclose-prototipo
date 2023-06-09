import { useRef, useEffect, useState } from "react";
import { Tree } from "@minoru/react-dnd-treeview";
import { CustomNodeTimeline } from "./CustomNodeTimeline";
// import { CustomDragPreview } from "./CustomDragPreview";
import styles from "./TimelineView.module.css";


export const TimelineView = (props) => {
  
  const [disableDrag, setDisableDrag] = useState(false);

  let contador = 0;
   props.tree.map(node => {
      if (node.droppable === false) {
        contador++;
      }
    });

  const ref = useRef(null);
  const handleOpenAll = () => { ref.current?.openAll(); }

  return (
    <div className="grid grid-cols-6 mt-10  mx-2 relative p-6  bg-white w-auto h-20 rounded-md">
      {/* <h2 onClick={handleOpenAll} className="text-center mb-10">TIMELINE</h2> */}
      <div className="flex col-span-5">
        {/* {props.tree.map((elem, index) => ( */}
        <div className="flex items-center justify-between border-black border-x-2 border-x-black relative pr-1 w-full">
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
              dropTarget: styles.dropTarget
            }}
            sort={false}
            initialOpen={true}
            render={(node, options) => <CustomNodeTimeline node={node} {...options} tree={props.tree} />}
          />
          <div className="absolute -bottom-4 -right-2 text-xs">{props.tree.length - contador}</div>
        </div>
      </div>
      <button className="justify-self-end bg-primary text-white w-16 h-8  rounded-md text-3xl">+</button>
    </div>
  )
};
