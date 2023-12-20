import React from 'react';
import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import './cards.css';

const TodoCard = () => {

  // Simple todo list for demonstration
  const todos = ['Vacuum Clean', 'Grocery Shopping', 'Learning Webtechnologien', 'Go to Gym', 'Meet with Friends'];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Todo List
        </Typography>
        <CardContent >        
        <List>
          {todos.map((todo, index) => (
            <ListItem key={index}>
              <ListItemText primary={todo} />
            </ListItem>
          ))}
        </List>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
