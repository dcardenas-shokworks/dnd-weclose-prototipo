import React from "react";


export const CustomNodeDeliverables = (props) => (
  <div className="flex flex-col bg-white text-center text-sm w-28 border-x-2">
    <span className="text-black font-bold text-xs border-b-4 py-2">{props.node.data[0].name}</span>
    <span className="text-gray-500 text-xs font-bold h-8 pt-1">{props.node.text}</span>
  </div>

);

