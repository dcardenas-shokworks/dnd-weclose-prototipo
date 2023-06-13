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

    <div className="relative w-full" onClick={handleToggle}>

      {/* Si droppable es true el nodo es un día y no muestra el text, si es false es un entregable (hijo) y lo muestra  */}
      <div className={`relative ${(props.node.droppable) ? "text-xs invisible" :
        "inline-block text-black text-xs border-none -translate-y-6 "} `} >

        {/* Se renderiza un borde para la linea continua del timeline si el nodo es día (droppable true) si es hijo borde se esconde */}
        <div className={`w-full relative mt-auto mb-auto border-b border-b-[2px] border-gray-200 visible visible`}>
          {/* Linea vertical al momento de mostrar un tope de tiempo */}
          {
            props.node.data.isMiliestone && (
              <div className="flex flex-col items-center absolute -top-[9px]">
                <div className="h-[18px] w-[2px] bg-gray-200" />
                <p className="text-xs text-gray-700 pt-3" title={props.node.text}>{props.node.data.contDay}</p>
              </div>
            )
          }
          {/* Linea vertical al momento de mostrar un entregable */}
          {
            props.node.data.isDeliverable && (
              <div className="flex flex-col items-center absolute -bottom-[9px]">
                <p className="text-xs text-gray-700 pt-3" title={props.node.text}>{props.node.data.contDay}</p>
                <div className="h-[18px] w-[2px] bg-gray-700" />

              </div>
            )
          }
        </div>

        {/* Muestra el numero de día al hacer over en el momento del drag and drop */}
        <div className={`absolute top-0 right-2 text-red text-xxs ${props.isDropTarget ? 'text-xs visible' : 'hidden'} `}>
          {props.tree.indexOf(props.node) + 1}
        </div>




      </div>
    </div>
  );
};
