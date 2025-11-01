import { Typography, Container, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAuthStore } from '../store/authStore';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.name}!
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Role: {user?.role}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography variant="h6" gutterBottom>
              My Tasks
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              0
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pending tasks
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Active Workflows
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              0
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Workflows in progress
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Completed
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              0
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This month
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
