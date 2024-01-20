// Import necessary dependencies
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { tokenContext } from "../../InfoProvider";
import "./littleCards.css";

// Main DataFetcherComponent
const WGDetailsCard: React.FC = () => {
  const [token] = useContext(tokenContext);
  // State to store fetched data
  const [data, setData] = useState<any>(null);
  // State to track loading state
  const [loading, setLoading] = useState(true);
  // State to track error state
  const [error, setError] = useState(false);

  // useEffect to make the Axios GET request when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/wg`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Display loading spinner while fetching data
  if (loading) {
    return <CircularProgress />;
  }

  // Display error component if there was an error
  if (error) {
    return (
      <div>
        <h2>
          Oh no. Seems like you didnt join a Flatemate yet. Click up there to
          register for one
        </h2>
        <div className="underline-title"></div>
        {/* Create div with amigocard id for each user in the array */}
      </div>
    );
  }

  // Display normal page
  return (
    <div>
      <h1 style={{ color: "var(--highlight)", margin: "5px" }}>{data.name}</h1>
      <h3 style={{ margin: "5px", color: "var(--textColor)" }}>
        {data.description}
      </h3>
      <div className="wgrules" style={{ color: "var(--textColor)" }}>
        Regeln: {data.rules}
      </div>
      <div className="lineborder"></div>
      {/* Create div with amigocard id for each user in the array */}
      <div className="miniamigocard-container">
        {data.Users.map((userData: any) => (
          <div
            id="miniamigocard"
            key={userData.id}
            style={{ color: "var(--textColor)" }}
          >
            <div className="user-info">
              <h4 className="miniamigoname">Name: {userData.name}</h4>
              <p className="miniamigoname">Paypal: {userData.paypal}</p>
              <p className="miniamigoname">Email: {userData.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WGDetailsCard;
