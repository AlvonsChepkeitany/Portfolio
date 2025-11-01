import { useState, useEffect } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Box,
  ListItemText,
} from '@mui/material';
import { Notifications as NotificationsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationBell() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Mock notifications - will be replaced with API calls
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'TASK_ASSIGNED',
      title: 'New Task Assigned',
      message: 'You have been assigned a new task in Employee Onboarding',
      isRead: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'APPROVAL_REQUEST',
      title: 'Approval Required',
      message: 'Your approval is required for Purchase Request',
      isRead: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ];

  useEffect(() => {
    // TODO: Fetch notifications from API
    setNotifications(mockNotifications);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notification: Notification) => {
    // TODO: Mark as read and navigate based on type
    if (notification.type === 'TASK_ASSIGNED' || notification.type === 'APPROVAL_REQUEST') {
      navigate('/tasks');
    }
    handleClose();
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 350, maxHeight: 400 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <Divider />
        {notifications.length === 0 ? (
          <MenuItem disabled>
            <Typography variant="body2" color="text.secondary">
              No notifications
            </Typography>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              sx={{
                backgroundColor: notification.isRead ? 'inherit' : 'action.hover',
                whiteSpace: 'normal',
              }}
            >
              <ListItemText
                primary={notification.title}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {notification.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(notification.createdAt).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
}
