import {
    Container,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    ListItem,
    List,
  } from "@mui/material";
import TodoCard from "./cards/TodoCard";
import GroceryCard from "./cards/GroceryCard";
import ChatCard from "./cards/ChatCard";
  
  type CardData = {
    title: string;
    subline: string;
    imageUrl: string;
  };
    
  function getCard(card: CardData) {
    return (
      <Card sx={{ height: 300 }}>
        <CardMedia
          component="img"
          height="200" // Adjust the height as needed
          image={card.imageUrl}
          alt={card.title}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {card.title}
          </Typography>
          <Typography color="text.secondary">{card.subline}</Typography>
        </CardContent>
      </Card>
    );
  }
  
  const Dashboard = () => {
    return (
      <Container sx={{ display: "flex" }}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={8}>
            <ChatCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          {getCard({
              title: "Kalender",
              subline: "This is a demo",
              imageUrl:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F12%2F56%2F00%2F1256000a71e6e0fbcd09c8505529889f.jpg&f=1&nofb=1&ipt=464ea64a3ac2b299ef9ca85f0fdbb5bb43a8225f1e93f081317f6b5c30b2e9b0&ipo=images",
            })}
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <TodoCard/>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <GroceryCard/>
       </Grid>
        </Grid>
      </Container>
    );
  };
  
  export default Dashboard;
  