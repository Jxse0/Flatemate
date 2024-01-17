import {
  Container,
  Grid,
} from "@mui/material";
import ChatCard from "../cards/ChatCard";
import RotateCards from "./RotateCards";


const Dashboard = () => {
  return (
    <Container>
      <Grid container spacing={6}>
        {/* Top Half */}
        <ChatCard />
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
