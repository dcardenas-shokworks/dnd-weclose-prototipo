import { useState, useEffect, useRef } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { TypeIcon } from "./TypeIcon";


export const CustomNodeTimeline = (props) => {
  const { draggable } = props;
  const indent = props.depth * 24;
  const [dataTask, setDataTask] = useState([])
  const ref = useRef(null)

  // Despliega los nodos hijos al soltarlos en el timeline
  useEffect(() => {
    if (props.hasChild) {
      handleToggle();
    }
  }, [props.hasChild]);

  const handleToggle = (e) => {
    // e.stopPropagation();
    props.onToggle(props.node.id);
  };


  // console.log(props);
  return (

    <div className="" onClick={handleToggle}>
      <div className={`relative w-0.5 ${props.node.droppable ?
        "hover:bg-red-500 text-xs text-black" :
        "inline-block text-black text-xs  hover:scale-150 -translate-y-8 -translate-x-2"} ${props.node.id < 535 && "text-green-500"}`} >
        {props.node.text}
        <div className={`absolute top-0 right-0 text-black text-xxs ${props.isDropTarget ? 'text-xs' : 'hidden'} `}>
          {props.tree.indexOf(props.node)}
        </div>
      </div>
    </div>
  );
};
