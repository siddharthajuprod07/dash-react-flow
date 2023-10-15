import React, { useCallback } from 'react';
import { Handle, Position } from 'reactflow';


function CustomNode({ data, isConnectable }) {
  const dashComponentList:React.ReactNode[] = data["dashComponents"]
  console.log(dashComponentList)

  function createReactComponent(dashComponent:React.ReactNode,i:number){
    const NewComponent = dashComponent["namespace"]
    return <NewComponent key={i} type={dashComponent["type"]} {...dashComponent["props"]}></NewComponent>
  }
  
  return (
      <div className="custom-node">
        <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
        {dashComponentList.map((dashComponent,i) => createReactComponent(dashComponent,i))} 
        <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
      </div> 
  );
}

export default CustomNode;
