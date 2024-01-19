import { Container, Grid } from "@mui/material";
import ChatCard from "../cards/ChatCard";
import RotateCards from "./RotateCards";
import { userContext, tokenContext, membersContext } from "../../InfoProvider";
import { useContext, useEffect } from "react";
import UserApi from "../../api/UserApi";

const Dashboard = () => {
  const [, setMembers] = useContext(membersContext);
  const [, setUser] = useContext(userContext);
  const [token] = useContext(tokenContext);

  useEffect(() => {
    const initUser = async () => {
      const getUser = await UserApi.getUser(token);
      const getAllUser = await UserApi.getAllUser(token);
      setMembers(getAllUser);
      setUser(getUser);
    };

    initUser();

    return () => {};
  }, []);
  return (
    <Container>
      <Grid container spacing={6}>
        {/* Top Half */}
        <ChatCard />
        {/* Bottom Half */}
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={12}>
              <RotateCards />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
