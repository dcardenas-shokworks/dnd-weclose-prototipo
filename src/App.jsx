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
  const [dayMilestone, setDayMilestone] = useState('');
  const [nameMilestone, setNameMilestone] = useState('')
  const [log, setLog] = useState([]);
  const [dateInitialProject, setDateInitialProject] = useState('')
  const [treeTimeLine, setTreeTimeLine] = useState([]);

  // Da formato dd/mm/yyyy a la fecha dada
  const formatearFecha = (fechaSinFormato) => {
    fechaSinFormato.setDate(fechaSinFormato.getDate() + 1); // Agregar 1 día a la fecha
    const dia = fechaSinFormato.getDate();
    const mes = fechaSinFormato.getMonth() + 1;
    const anio = fechaSinFormato.getFullYear();

    const fechaFormateada = `${dia}/${mes}/${anio}`;
    return (fechaFormateada);
  }

  // Crea el objeto Milestone dentro del campo data del Nodo del día que corresponda en el timeline 
  const handleCreateMilestone = () => {

    const fechaSinFormato = new Date(dayMilestone);
    const fechaFormateada = formatearFecha(fechaSinFormato);
    const indexNodeDay = treeTimeLine.findIndex(object => object.text === fechaFormateada)
    const newMilestone = { milestone: { day: indexNodeDay + 1, date: fechaFormateada, name: nameMilestone } };
    const objetoExistente = treeTimeLine[indexNodeDay];
    objetoExistente.data = Object.assign({}, objetoExistente.data, newMilestone);
    treeTimeLine[indexNodeDay] = objetoExistente;
    console.log("MILESTONE: ", treeTimeLine[indexNodeDay]);
    setDayMilestone('');
    setNameMilestone('');
  };

  // Captura la fecha ingresada en el input y valida la no seleccón de una fecha antigua
  const handleDateChange = (event) => {
    const fecha = event.target.value;
    const fechaActual = new Date().toISOString().split('T')[0];

    (fecha >= fechaActual) ? setDateInitialProject(fecha) : setDateInitialProject(fechaActual);
  }

  // Hace el llamado a la función que genera el arreglo del arbol timeline y lo guarda en el estado treeTimeLine
  const handleButtonDate = () => {
    setTreeTimeLine(generarTreeTimeLine(dateInitialProject));
  };

  // Genera los 90 nodos del arbol del timeline
  const generarTreeTimeLine = (fechaInicial) => {
    const fechas = [];
    const fechaSinFormato = new Date(fechaInicial);

    for (let i = 0; i < 10; i++) {

      const fechaFormateada = formatearFecha(fechaSinFormato);
      fechas.push({
        id: 501 + i,
        parent: 500,
        droppable: true,
        text: fechaFormateada,
        data: {}
      });

    }
    return fechas;
  };
  const handleDrop = (newTree, { dragSourceId, dropTargetId, dragSource, dropTarget }) => {
    console.log("SOURCE:", dragSourceId, " DROPTARGET:", dropTargetId);


    // Actualiza el log al hacer dnd
    const newLog = ([...log, {
      id: log.length,
      source: dragSource.text,
      destination: dropTarget?.text,
    }]);
    setLog(newLog);

    // Agrega la información del entregable que se suelta en un nodo día del timeline
    tLData.map((node, index) => {
      if (node.id === dragSourceId) {
        const newDeliverableData = {
          deliverable: {
            id: node.id,
            name: node.text,
          }
        }
        treeTimeLine.map((nodeDay, indexNodeDay) => {
          if (nodeDay.id === dropTargetId) {
            const objetoExistente = nodeDay;
            objetoExistente.data = Object.assign({}, objetoExistente.data, newDeliverableData);
            nodeDay = objetoExistente;
            console.log("Deliverable: ", nodeDay);
          }
        });
      }
    });
  };

  const tree1 = getDescendants(treeData, 'Seller_Team');
  const tree2 = getDescendants(treeData, 'Buyer_Team');
  const tree3 = getDescendants(treeData, 300);
  const tree4 = getDescendants(treeData, 400);
  const tLTree = getDescendants(treeTimeLine, 500);


  // console.log(nameMilestone);
  // console.log(dayMilestone);
  console.log(treeTimeLine);

  return (
    <div className="grid grid-rows-2 content-start  bg-gray-200">
      {/* row 1 */}
      <div className="grid grid-cols-4">
        {/* col 1 */}
        <div className="col-span-3">
          <div style={{ overflow: 'hidden', clear: 'both' }}>
            <TimelineView tree={tLTree} onDrop={handleDrop} rootId={500} />
            {/* <TimelineView tree={tLTree2} onDrop={handleDrop} rootId={500} /> */}
          </div>
          <div className="flex justify-around">
            <div className="p-10 ">
              <TreeView tree={tree1} onDrop={handleDrop} rootId={"Seller_Team"} />
            </div>
            <div className="p-10" >
              <TreeView tree={tree2} onDrop={handleDrop} rootId={"Buyer_Team"} />
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
      <div className="mt-4">
        {/* Input prueba crear arbol timeline del proyecto con 90 nnodos a partir de una fecha de inicio*/}
        <input
          className="border border-black w-30 ml-4"
          type="date"
          value={dateInitialProject}
          onChange={handleDateChange}
        />
        <button onClick={handleButtonDate}
          className="bg-primary rounded-md p-2 mx-8 text-white"> Create Project
        </button>

        {/* Prueba crear Milestone indicando una fecha y nombre */}
        <input
          className="border border-black w-30 ml-4"
          type="date"
          value={dayMilestone}
          onChange={(e) => setDayMilestone(e.target.value)}
        />
        <input
          className="border border-black w-20 ml-4"
          type="text"
          value={nameMilestone}
          onChange={(e) => setNameMilestone(e.target.value)}
        />
        <button onClick={handleCreateMilestone}
          className="bg-primary rounded-md p-2 mx-8 text-white"> Milestone
        </button>

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
