import React, { useState, useEffect } from "react";
import { getDescendants } from "@minoru/react-dnd-treeview";
import { TreeView } from "./TreeView";
import sampleData from "./multiple-tree.json";
import { TimelineView } from "./Timeline/TimelineView";
import { TreeDeliverables } from "./Deliverable/TreeDeliverables";
import { TreeDeliMoney } from "./DeliverableMoney/TreeDeliMoney";



export default function App() {
  const [treeData, setTreeData] = useState(sampleData);
  const [tLData, setTLData] = useState(sampleData);
  const [numObjects, setNumObjects] = useState(0);
  const [baseId, setBaseId] = useState(400);
  const [log, setLog] = useState([]);


  //  Agrega los nodos de Días al json del timeline
  const handleButtonClick = () => {
    const objects = [];
    for (let i = 0; i < numObjects; i++) {
      const object = {
        id: i + (baseId + 1),
        parent: baseId,
        droppable: true,
        text: "-",
        data: []
      };
      objects.push(object);
    }

    // Actualiza el estado uniendo los nuevos nodos al arreglo existente
    setTLData((prevData) => prevData.concat(objects));
  };

  useEffect(() => {
    setBaseId(baseId + 100);
  }, [tLData]);

  const handleDrop = (newTree, { dragSourceId, dropTargetId, dragSource, dropTarget }) => {
    console.log("SOURCE:", dragSourceId, " DROPTARGET:", dropTargetId);


    // Actualiza el log al hacer dnd
    const newLog = ([...log, {
      id: log.length,
      source: dragSource.text,
      destination: dropTarget?.text,
    }]);
    setLog(newLog);

    // Actualiza el arreglo de objetos del arbol del Timeline
    const targetNode = tLData.find((node) => node.id === dropTargetId);
    const updatedTargetNode = { ...targetNode, text: "|" };


    setTLData(
      tLData.map((node, idex) => {
        if (node.id === dragSourceId) {
          console.log("NODO ID: ", node.id, "DRAG SOURCE ID: ", dragSourceId);
          return {
            ...node,
            parent: dropTargetId,
            droppable: false,
          };
        }
        if (node.id === dropTargetId) {
          return updatedTargetNode;
        }

        return node;
      })
    );

  };
  const roots = [500, 600] // prueba
  const tree1 = getDescendants(treeData, 100);
  const tree2 = getDescendants(treeData, 200);
  const tree3 = getDescendants(treeData, 300);
  const tree4 = getDescendants(treeData, 400);
  // 2 Arboles de hitos por el momento
  const tLTree = [getDescendants(tLData, 500), getDescendants(tLData, 600)];
  // const tLTree2 = getDescendants(tLData, 600);

  return (
    <div className="grid grid-rows-2 content-start  bg-gray-200">
      {/* row 1 */}
      <div className="grid grid-cols-4">
        {/* col 1 */}
        <div className="col-span-3">
          <div style={{ overflow: 'hidden', clear: 'both' }}>
            <TimelineView tree={tLTree} onDrop={handleDrop} rootId={roots} />
            {/* <TimelineView tree={tLTree2} onDrop={handleDrop} rootId={500} /> */}
          </div>
          <div className="flex justify-around">
            <div className="p-10 ">
              <TreeView tree={tree1} onDrop={handleDrop} rootId={100} />
            </div>
            <div className="p-10" >
              <TreeView tree={tree2} onDrop={handleDrop} rootId={200} />
            </div>
          </div>
          <div className="" >
            <TreeDeliMoney tree={tree4} onDrop={handleDrop} rootId={400} />
          </div>
        </div>
        {/* Col 2 */}
        <div className="mt-10"/*{styles.column}*/>
          <TreeDeliverables tree={tree3} onDrop={handleDrop} rootId={300} />
        </div>

      </div>
      {/* row 2 */}
      {/* Input de prueba para hitos de timeline */}
      <div className="m-10">
        <input
          className="border border-black w-12 ml-4"
          type="number"
          value={numObjects}
          onChange={(e) => setNumObjects(parseInt(e.target.value))}
        />
        <button onClick={handleButtonClick}
          className="bg-primary rounded-md p-2 mx-8 text-white"> DAYS</button>
        <div className="h-40 m-4 bg-slate-400">
          <span className="font-bold text-black p-4">LOGS:</span>
          {log.map(itemLog => (
            <ul key={itemLog?.id} className="mx-4">
              <span className="font-bold">{itemLog?.id + 1}- Source:</span><span> {itemLog?.source}</span>
              <span className="font-bold"> Destination: </span><span> {itemLog.destination}</span>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
