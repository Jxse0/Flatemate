import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import TodoCard from "../cards/TodoCard";
import GroceryCard from "../cards/GroceryCard";
import ChatCard from "../cards/ChatCard";
import RotateCards from "./RotateCards";
import Chat from "../chat/Chat";

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
    <Container>
      <Grid container spacing={6}>
        {/* Top Half */}
        <Grid item xs={12} sm={6} md={7}>
             <Chat/>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
        <ChatCard />
        </Grid>
  
        {/* Bottom Half */}
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={12}>
              <RotateCards/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );  
};

export default Dashboard;
