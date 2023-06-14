import sellerData from '../mookData/sellerTreeData.json';
import bullerData from '../mookData/bullerTreeData.json';
import deliverablesData from '../mookData/deliverablesTreeData.json';
import deliverablesFoundsData  from "../mookData/deliverablesFoundsTreeData.json";
import timelineData from '../mookData/timelineTreeData.json';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';

// Obtiene el ultimo Id del arbol de entregables documentos y fondos
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


const useTreeData = () => {
  const [log, setLog] = useState([]);

  // Implementar useQuery para obtener arbol correcpondiente cuando se tenga el endpoint
  const sellerTree = sellerData;
  const bullerTree = bullerData;
  const deliverablesTree = deliverablesData;
  const deliverablesFoundsTree = deliverablesFoundsData;
  const [deliverables, setDeliverables] = useState(deliverablesTree)
  const [deliverablesFounds, setDeliverablesFounds] = useState(deliverablesFoundsTree)
  const timelineTree = timelineData;
  const [timeline, setTimeLine] = useState()

  const createTimelineBase = () => {
    const projectInitDate = moment("2023/06/09")
    const tree = Array(90).fill("").map((x, index) => {
      const date = projectInitDate.add(1, 'day').format("yyyy/MM/DD")
      const isMiliestone = Boolean(timelineTree.find(item => item.date === date && item.isMiliestone))

      const deliverables = timelineTree.filter(item => item.date === date && item.isDeliverable)
      return {
        "id": index,
        "parent": 600,
        "droppable": true,
        "text": date,
        "data": {
          "isMiliestone": isMiliestone,
          "isDeliverable": deliverables.length > 0,
          deliverables,
          contDay: index + 1
        }
      }
    })

    setTimeLine(tree)
  }

  useEffect(() => {
    if (!timeline) {
      createTimelineBase()
    }
  }, [timeline])

  const updateSellerTree = (newTree, { dragSourceId, dropTargetId, dragSource, dropTarget }) => {
    console.log("SOURCE:", dragSourceId, " DROPTARGET:", dropTargetId, "updateSellerTree");
    // Actualiza el log al hacer dnd
    const newLog = ([...log, {
      id: log.length,
      source: dragSource.text,
      destination: dropTarget?.text,
      tree: "Seller"
    }]);
    setLog(newLog);
  };

  const updateBullerTree = (newTree, { dragSourceId, dropTargetId, dragSource, dropTarget }) => {
    console.log("SOURCE:", dragSourceId, " DROPTARGET:", dropTargetId, "updateBullerTree");
    // Actualiza el log al hacer dnd
    const newLog = ([...log, {
      id: log.length,
      source: dragSource.text,
      destination: dropTarget?.text,
      tree: "Buller"
    }]);
    setLog(newLog);
  };

  const updateDeliverablesTree = (newTree, { dragSourceId, dropTargetId, dragSource, dropTarget }) => {
    console.log("SOURCE:", dragSourceId, " DROPTARGET:", dropTargetId, "updateDeliverablesTree");
    // Actualiza el log al hacer dnd
    const newLog = ([...log, {
      id: log.length,
      source: dragSource.text,
      destination: dropTarget?.text,
      tree: "Deliverables"
    }]);
    setLog(newLog);
  };

  const addNodeDeliverable = (newNode) => {
    if (newNode.parent === 300) {
      const lastId = getLastId(deliverables) + 1;
      console.log("New Node: ", newNode);
      setDeliverables([
        ...deliverables,
        {
          id: lastId,
          ...newNode
        }
      ]);
    } else {
      const lastId = getLastId(deliverablesFounds) + 1;
      console.log("New Node: ", newNode);
      setDeliverablesFounds([
        ...deliverablesFounds,
        {
          id: lastId,
          ...newNode
        }
      ]);
    }

  };
  console.log(deliverables);
  console.log(deliverablesFounds);
  return {
    sellerTree,
    bullerTree,
    deliverablesTree: deliverables,
    deliverablesFoundsTree,
    timelineTree: timeline,
    updateSellerTree,
    updateBullerTree,
    updateDeliverablesTree,
    addNodeDeliverable,
    log
  };
}

export default useTreeData;