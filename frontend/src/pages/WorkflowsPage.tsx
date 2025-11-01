import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
} from '@mui/material';
import { Add as AddIcon, PlayArrow as PlayIcon, Edit as EditIcon } from '@mui/icons-material';

// Mock data - will be replaced with API calls
const mockWorkflows = [
  {
    id: '1',
    name: 'Employee Onboarding',
    description: 'Complete onboarding process for new employees',
    version: 1,
    creator: { name: 'John Doe' },
    createdAt: new Date('2024-01-15'),
    nodes: [],
  },
  {
    id: '2',
    name: 'Purchase Request Approval',
    description: 'Multi-level approval workflow for purchase requests',
    version: 2,
    creator: { name: 'Jane Smith' },
    createdAt: new Date('2024-02-20'),
    nodes: [],
  },
];

export default function WorkflowsPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Workflows</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/workflows/builder')}
        >
          Create Workflow
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Version</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockWorkflows.map((workflow) => (
              <TableRow key={workflow.id} hover>
                <TableCell>
                  <Typography variant="subtitle2">{workflow.name}</Typography>
                </TableCell>
                <TableCell>{workflow.description}</TableCell>
                <TableCell>
                  <Chip label={`v${workflow.version}`} size="small" />
                </TableCell>
                <TableCell>{workflow.creator.name}</TableCell>
                <TableCell>{workflow.createdAt.toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/workflows/builder/${workflow.id}`)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<PlayIcon />}
                    onClick={() => {
                      // TODO: Start workflow
                      console.log('Start workflow:', workflow.id);
                    }}
                  >
                    Start
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {mockWorkflows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                    No workflows yet. Create your first workflow!
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
