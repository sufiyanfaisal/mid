import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Button,
  Grid,
} from '@mui/material';
import { Delete as DeleteIcon, MarkAsUnread as MarkAsUnreadIcon } from '@mui/icons-material';

const Notification = () => {
  // Sample notifications data
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New booking received for Room 101.', read: false },
    { id: 2, message: 'Payment received for Package #123.', read: true },
    { id: 3, message: 'Room 202 check-out request.', read: false },
  ]);

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Notifications
        </Typography>

        {/* Mark All as Read Button */}
        <Grid container justifyContent="flex-end" sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<MarkAsUnreadIcon />}
            onClick={markAllAsRead}
          >
            Mark All as Read
          </Button>
        </Grid>

        {/* List of Notifications */}
        <List>
          {notifications.map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                backgroundColor: notification.read ? '#f5f5f5' : '#e3f2fd',
                marginBottom: 1,
                borderRadius: 1,
              }}
            >
              <ListItemText
                primary={notification.message}
                secondary={notification.read ? 'Read' : 'Unread'}
              />
              <ListItemSecondaryAction>
                {/* Mark as Read Button */}
                {!notification.read && (
                  <IconButton
                    edge="end"
                    aria-label="mark-as-read"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <MarkAsUnreadIcon />
                  </IconButton>
                )}

                {/* Delete Button */}
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteNotification(notification.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Notification;