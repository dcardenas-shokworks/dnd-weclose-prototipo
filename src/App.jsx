import React, { useState, useEffect } from "react";
import { getDescendants } from "@minoru/react-dnd-treeview";
import { TreeView } from "./TreeView";
import sampleData from "./multiple-tree.json";
import { TimelineView } from "./Timeline/TimelineView";
import { TreeDeliverables } from "./Deliverable/TreeDeliverables";
import { TreeDeliMoney } from "./DeliverableMoney/TreeDeliMoney";
import useTreeData from "./hooks/useTreeData";
import { AddDeliverable } from "./AddDeliverable";


export default function App() {
const {
  sellerTree, 
  updateSellerTree, 
  log:logs, 
  bullerTree, 
  updateBullerTree,
  deliverablesTree, 
  updateDeliverablesTree,
  deliverablesFoundsTree,
    addNodeDeliverable,
  timelineTree,
  updatetimelineTree
} = useTreeData();

  const [dayMilestone, setDayMilestone] = useState('');
  const [nameMilestone, setNameMilestone] = useState('')
  const [log, setLog] = useState([]);
  const [dateInitialProject, setDateInitialProject] = useState('')
  const [treeTimeLine, setTreeTimeLine] = useState([]);
  const [open, setOpen] = useState(false); // Estado maneja visualización de modal

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


  // Función que controla el dnd
  const handleDrop = (newTree, { dragSourceId, dropTargetId, dragSource, dropTarget }) => {
    console.log("SOURCE:", dragSourceId, " DROPTARGET:", dropTargetId);


    // Actualiza el log al hacer dnd
    const newLog = ([...log, {
      id: log.length,
      source: dragSource.text,
      destination: dropTarget?.text,
    }]);
    setLog(newLog);
  };

  // Abre modal de agregar entregable
  const handleOpenDialog = () => {
    setOpen(true);
  };

  // Cierra modal
  const handleCloseDialog = () => {
    setOpen(false);
  };



  const sellerTreeData = getDescendants(sellerTree, 'Seller_Team');
  const bullerTreeData = getDescendants(bullerTree, 'Buyer_Team');
  const deliverableTreeData = getDescendants(deliverablesTree, 300);
  const deliverablesFoundsTreeData = getDescendants(deliverablesFoundsTree, 400);
  const tLTree = getDescendants(timelineTree || [], 600);

  console.log({ timelineTree });

  return (
    <div className="grid grid-rows-2 content-start  bg-gray-200">
      {/* row 1 */}
      <div className="grid grid-cols-4">
        {/* col 1 */}
        <div className="col-span-3">
          <div style={{ overflow: 'hidden', clear: 'both' }}>
            <TimelineView tree={tLTree} onDrop={updatetimelineTree} rootId={600} />
          </div>
          <div className="flex justify-around">
            <div className="p-10 ">
              <TreeView tree={sellerTreeData} onDrop={updateSellerTree} rootId={"Seller_Team"} />
            </div>
            <div className="p-10" >
              <TreeView tree={bullerTreeData} onDrop={updateBullerTree} rootId={"Buyer_Team"} />
            </div>
          </div>
          <div className="" >
            <TreeDeliMoney tree={deliverablesFoundsTreeData} onDrop={handleDrop} rootId={400} />
          </div>
        </div>
        {/* Col 2 */}
        <div className="flex flex-col justify-between mt-10 bg-white rounded-md"/*{styles.column}*/>

          <TreeDeliverables tree={deliverableTreeData} onDrop={updateDeliverablesTree} rootId={300} />
          <button onClick={handleOpenDialog} className="text-white bg-primary font-bold p-2 m-2 rounded-md">
            Add Deliverable
          </button>
          {open && (
            <AddDeliverable
              onClose={handleCloseDialog}
              onSubmit={addNodeDeliverable}
            />
          )}

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
          {logs.map(itemLog => (
            <ul key={itemLog?.id} className="mx-4">
              <span className="font-bold">{itemLog?.id + 1}- Source:</span><span> {itemLog?.source}</span>
              <span className="font-bold"> Destination: </span><span> {itemLog.destination}</span>
              <span className="font-bold"> Tree Destination: </span><span> {itemLog.tree}</span>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
