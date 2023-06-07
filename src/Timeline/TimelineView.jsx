import { useRef, useEffect, useState } from "react";
import { Tree } from "@minoru/react-dnd-treeview";
import { CustomNodeTimeline } from "./CustomNodeTimeline";
// import { CustomDragPreview } from "./CustomDragPreview";
import styles from "./TimelineView.module.css";


export const TimelineView = (props) => {

  // let conteo = [0, 0]
  // let contador = 0;
  // props.tree.map((tree, i) => {
  //   tree.map(node => {
  //     if (node.droppable === false) {
  //       conteo[i] = contador++;
  //     }
  //   })
  // });


  // console.log(props.tree);
  const handleOpenAll = () => { ref.current?.openAll(); }
  return (
    <div className="grid grid-cols-2 mt-10  mx-2 relative p-6  bg-white w-auto h-20 rounded-md">
      {/* <h2 onClick={handleOpenAll} className="text-center mb-10">TIMELINE</h2> */}
      <div className=" flex col-span-1">
        {props.tree.map((elem, index) => (
          <div key={index} className="flex border-r-2  border-r-black relative  pr-1 ">
            <Tree
              listComponent={"div"}
              listItemComponent={"div"}
              canDrag={() => false}
              tree={elem}
              onDrop={props.onDrop}
              rootId={props.rootId[index]}
              classes={{
                root: styles.treeRoot,
                draggingSource: styles.draggingSource,
                dropTarget: styles.dropTarget
              }}
              sort={false}
              initialOpen={true}
              render={(node, options) => <CustomNodeTimeline node={node} {...options} tree={elem} />}
            />
            <div className="absolute -bottom-4 -right-2 text-xs">{elem.length}</div>
          </div>

        ))}
      </div>
      <button className="justify-self-end bg-primary text-white w-16 h-8  rounded-md text-3xl">+</button>
    </div>
  )
};
