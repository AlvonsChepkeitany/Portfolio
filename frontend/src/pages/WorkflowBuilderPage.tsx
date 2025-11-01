import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactFlow, {
  type Node,
  type Edge,
  addEdge,
  Background,
  Controls,
  MiniMap,
  type Connection,
  useNodesState,
  useEdgesState,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  PlayArrow as StartIcon,
  Assignment as TaskIcon,
  CheckCircle as ApprovalIcon,
  CallSplit as ConditionIcon,
  Stop as EndIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

const nodeTypes = [
  { type: 'START', label: 'Start', icon: <StartIcon />, color: '#4caf50' },
  { type: 'TASK', label: 'Task', icon: <TaskIcon />, color: '#2196f3' },
  { type: 'APPROVAL', label: 'Approval', icon: <ApprovalIcon />, color: '#ff9800' },
  { type: 'CONDITION', label: 'Condition', icon: <ConditionIcon />, color: '#9c27b0' },
  { type: 'END', label: 'End', icon: <EndIcon />, color: '#f44336' },
];

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function WorkflowBuilderPage() {
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeIdCounter, setNodeIdCounter] = useState(1);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState('');
  const [workflowDescription, setWorkflowDescription] = useState('');

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = (type: string) => {
    const newNode: Node = {
      id: `node_${nodeIdCounter}`,
      type: 'default',
      position: { x: 250, y: 100 + nodeIdCounter * 100 },
      data: {
        label: `${type} Node`,
        nodeType: type,
      },
      style: {
        background: nodeTypes.find((nt) => nt.type === type)?.color || '#fff',
        color: '#fff',
        border: '1px solid #222',
        borderRadius: 8,
        padding: 10,
        minWidth: 150,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeIdCounter(nodeIdCounter + 1);
  };

  const onNodeClick = (_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const handleSaveWorkflow = async () => {
    try {
      // TODO: Call API to save workflow
      console.log('Saving workflow:', {
        name: workflowName,
        description: workflowDescription,
        nodes,
        edges,
      });
      setSaveDialogOpen(false);
      navigate('/workflows');
    } catch (error) {
      console.error('Failed to save workflow:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* Node Library Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            top: 64,
            height: 'calc(100% - 64px)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Node Library
          </Typography>
          <List>
            {nodeTypes.map((nodeType) => (
              <ListItem key={nodeType.type} disablePadding>
                <ListItemButton
                  onClick={() => addNode(nodeType.type)}
                  sx={{
                    borderLeft: `4px solid ${nodeType.color}`,
                    mb: 1,
                  }}
                >
                  <Box sx={{ mr: 1, color: nodeType.color }}>{nodeType.icon}</Box>
                  <ListItemText primary={nodeType.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Canvas */}
      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
          <Panel position="top-right">
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => setSaveDialogOpen(true)}
              disabled={nodes.length === 0}
            >
              Save Workflow
            </Button>
          </Panel>
        </ReactFlow>
      </Box>

      {/* Node Properties Panel */}
      {selectedNode && (
        <Paper
          sx={{
            width: 300,
            p: 2,
            position: 'absolute',
            right: 16,
            top: 80,
            maxHeight: 'calc(100vh - 150px)',
            overflow: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Node Properties
          </Typography>
          <TextField
            fullWidth
            label="Node Name"
            value={selectedNode.data.label}
            onChange={(e) => {
              setNodes((nds) =>
                nds.map((node) =>
                  node.id === selectedNode.id
                    ? { ...node, data: { ...node.data, label: e.target.value } }
                    : node
                )
              );
              setSelectedNode((prev) =>
                prev ? { ...prev, data: { ...prev.data, label: e.target.value } } : null
              );
            }}
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            Type: {selectedNode.data.nodeType}
          </Typography>
          {/* TODO: Add more node-specific properties */}
        </Paper>
      )}

      {/* Save Workflow Dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Save Workflow</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Workflow Name"
            fullWidth
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={workflowDescription}
            onChange={(e) => setWorkflowDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveWorkflow} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
