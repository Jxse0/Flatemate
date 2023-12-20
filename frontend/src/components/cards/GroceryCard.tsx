import React from 'react';
import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';

const GroceryCard = () => {

  // Sample grocery list for demonstration
  const groceries = ['Milk', 'Bread', 'Eggs', 'Butter', 'Cheese'];

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
           Shopping List
        </Typography>
        <CardContent sx={{ height: 200, overflowY: 'auto' }}>
        <List>
          {groceries.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default GroceryCard;
