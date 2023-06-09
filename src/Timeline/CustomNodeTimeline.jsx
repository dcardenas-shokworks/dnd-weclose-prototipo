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

    <div className="w-8" onClick={handleToggle}>

    {/* Si droppable es true el nodo es un día y no muestra el text, si es false es un entregable (hijo) y lo muestra  */}
    <div className={`relative ${(props.node.droppable) ? "text-xs invisible" :
      "inline-block text-black text-xs border-none -translate-y-6 "} `} >
      {props.node.text}

      {/* Se renderiza un borde para la linea continua del timeline si el nodo es día (droppable true) si es hijo borde se esconde */}
      <div className={`w-full mt-auto mb-auto border-b visible border-black ${props.node.droppable ? 'visible' : 'invisible'}`}></div>

      {/* Linea vertical al momento de mostrar un entregable */}
      <div className="absolute w-[1px] h-2.5 bg-black left-1/2 top-3.5 "></div>

      {/* Muestra el numero de día al hacer over en el momento del drag and drop */}
      <div className={`absolute top-0 right-2 text-black text-xxs ${props.isDropTarget ? 'text-xs visible' : 'hidden'} `}>
        {props.tree.indexOf(props.node) + 1}
      </div>

      {/* Muestra el Número del día donde fue fijado un Hito */}
      <span className="visible">{props.node.data.milestone?.day}</span>

    </div>
  </div>
  );
};
