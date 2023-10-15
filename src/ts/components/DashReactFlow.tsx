import React,{ useState, useCallback,CSSProperties,useMemo } from 'react';
import {DashComponentProps} from '../props';
import ReactFlow,{ Controls, Background } from 'reactflow';
import { Node,Edge } from 'reactflow';
import { ReactFlowProvider,
    useNodesState, 
    useEdgesState, 
    addEdge,
    applyEdgeChanges,
    applyNodeChanges  
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '../utils/customNode';

type Props = {
    // Insert props
    nodes: Node[],
    edges: Edge[],
    style: CSSProperties,
} & DashComponentProps;

/**
 * Component description
 */
const nodeTypes = { custom: CustomNode };
const DashReactFlow = (props: Props) => {
    const { id,
        nodes,
        edges,
        style,
        ...other} = props;
    const [getNodes, setNodes] = useState(nodes);
    const [getEdges, setEdges] = useState(edges);
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
      );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
      );
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    
    
    return (
        <ReactFlowProvider>
            <ReactFlow
                nodes={getNodes}
                onNodesChange={onNodesChange}
                edges={getEdges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                style={style}
                nodeTypes={nodeTypes}
                {...other}
            >
                <Background />
                <Controls />
            </ReactFlow> 
        </ReactFlowProvider>
    )
}

DashReactFlow.defaultProps = {};

export default DashReactFlow;
