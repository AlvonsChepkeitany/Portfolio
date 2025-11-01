import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import { useState } from 'react';
import { CheckCircle as CompleteIcon } from '@mui/icons-material';

// Mock data - will be replaced with API calls
const mockTasks = [
  {
    id: '1',
    workflowInstance: {
      workflowDefinition: { name: 'Employee Onboarding' },
    },
    nodeDefinition: { type: 'TASK', data: { label: 'Complete Documents' } },
    status: 'PENDING',
    dueDate: new Date('2024-11-05'),
    createdAt: new Date('2024-11-01'),
  },
  {
    id: '2',
    workflowInstance: {
      workflowDefinition: { name: 'Purchase Request' },
    },
    nodeDefinition: { type: 'APPROVAL', data: { label: 'Manager Approval' } },
    status: 'IN_PROGRESS',
    dueDate: new Date('2024-11-03'),
    createdAt: new Date('2024-10-30'),
  },
];

const statusColors: Record<string, 'default' | 'primary' | 'success' | 'error' | 'warning'> = {
  PENDING: 'default',
  IN_PROGRESS: 'primary',
  COMPLETED: 'success',
  BLOCKED: 'error',
};

export default function TasksPage() {
  const [tabValue, setTabValue] = useState(0);

  const filteredTasks = mockTasks.filter((task) => {
    if (tabValue === 0) return task.status !== 'COMPLETED';
    if (tabValue === 1) return task.status === 'IN_PROGRESS';
    if (tabValue === 2) return task.status === 'COMPLETED';
    return true;
  });

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label="Active" />
          <Tab label="In Progress" />
          <Tab label="Completed" />
        </Tabs>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Workflow</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id} hover>
                <TableCell>
                  <Typography variant="subtitle2">
                    {task.workflowInstance.workflowDefinition.name}
                  </Typography>
                </TableCell>
                <TableCell>{task.nodeDefinition.data.label}</TableCell>
                <TableCell>
                  <Chip label={task.status} color={statusColors[task.status]} size="small" />
                </TableCell>
                <TableCell>
                  {task.dueDate ? task.dueDate.toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell>{task.createdAt.toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  {task.status !== 'COMPLETED' && (
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<CompleteIcon />}
                      onClick={() => {
                        // TODO: Complete task
                        console.log('Complete task:', task.id);
                      }}
                    >
                      Complete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredTasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                    No tasks found
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
