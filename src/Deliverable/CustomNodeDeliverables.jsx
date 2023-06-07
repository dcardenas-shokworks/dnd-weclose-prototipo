import React from "react";

export const CustomNodeDeliverables = (props) => (

  <div className="m-2">
    <div className="flex justify-between bg-gray-200 p-2 rounded-md w-auto">
      <div className="flex flex-col" >
        <span className=" text-xs font-bold">{props.node.text}</span>
        <span className="text-gray-400 text-[0.5rem]">Document</span>
      </div>
      <span className="bg-white text-[0.6rem] text-black h-5 w-14 mt-1 text-center pt-1 rounded-md">In Process</span>
    </div>
  </div>
);

