import sellerData from '../mookData/sellerTreeData.json';
import bullerData from '../mookData/bullerTreeData.json';
import deliverablesData from '../mookData/deliverablesTreeData.json';
import timelineData from '../mookData/timelineTreeData.json';
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
const useTreeData = () => {
    const [log, setLog] = useState([]);

// Implementar useQuery para obtener arbol correcpondiente cuando se tenga el endpoint
    const sellerTree = sellerData;
    const bullerTree = bullerData;
    const deliverablesTree = deliverablesData;
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
        if(!timeline){
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

    return {
        sellerTree,
        bullerTree,
        deliverablesTree,
        timelineTree: timeline,
        updateSellerTree,
        updateBullerTree,
        updateDeliverablesTree,
        log
    };
}
 
export default useTreeData;