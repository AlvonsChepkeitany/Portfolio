import { Container, Typography, Paper, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const taskStatusData = [
  { name: 'Pending', value: 12 },
  { name: 'In Progress', value: 8 },
  { name: 'Completed', value: 45 },
  { name: 'Blocked', value: 3 },
];

const workflowCompletionData = [
  { name: 'Week 1', completed: 8, failed: 1 },
  { name: 'Week 2', completed: 12, failed: 2 },
  { name: 'Week 3', completed: 10, failed: 0 },
  { name: 'Week 4', completed: 15, failed: 1 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Summary Cards */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" color="text.secondary">
              Total Workflows
            </Typography>
            <Typography variant="h3">24</Typography>
            <Typography variant="body2" color="success.main">
              +12% from last month
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" color="text.secondary">
              Active Tasks
            </Typography>
            <Typography variant="h3">68</Typography>
            <Typography variant="body2" color="warning.main">
              +5% from last month
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" color="text.secondary">
              Avg. Completion Time
            </Typography>
            <Typography variant="h3">2.4d</Typography>
            <Typography variant="body2" color="success.main">
              -8% from last month
            </Typography>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" color="text.secondary">
              Success Rate
            </Typography>
            <Typography variant="h3">94%</Typography>
            <Typography variant="body2" color="success.main">
              +2% from last month
            </Typography>
          </Paper>
        </Grid>

        {/* Workflow Completion Chart */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Workflow Completion Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={workflowCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#4caf50" name="Completed" />
                <Bar dataKey="failed" fill="#f44336" name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Task Status Distribution */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Task Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskStatusData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Team Performance */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Team Performance
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Top performers, bottleneck analysis, and resource utilization metrics will be displayed here.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
