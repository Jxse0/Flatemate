// Import necessary dependencies
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CircularProgress, Typography } from '@mui/material';
import WGnotLoggedIn from '../login/WGnotLoggedIn';
import { tokenContext } from '../../AuthProvider';
import './accountDetails.css';


// Main DataFetcherComponent
const MeAndAmigos: React.FC = () => {
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
        const response = await axios.get('http://localhost:3001/wg',
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },}); 
        setData(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    console.log(data);
    
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  // Display loading spinner while fetching data
  if (loading) {
    return <CircularProgress />;
  }

  // Display error component if there was an error
  if (error) {
    return <WGnotLoggedIn />;
  }

  // Display normal page
  return (
    <div id="accountCard">
     <h2>Me and my Amigos</h2>
     <div className="underline-title"></div>
     <h1 style={{color: "var(--highlight)", marginBottom:"10px"}}>{data.name}</h1>
     <h3 style={{margin:"5px"}}>{data.description}</h3>
     <div className='wgrules'>Regeln: {data.rules}</div>
     <div className="form-border"></div>
      {/* Create div with amigocard id for each user in the array */}
      {data.Users.map((user: any) => (
      <div id='amigocard' key={user.id}>
        <h4>Name: {user.name}</h4>
        <p>Email: {user.email}</p>
        {/* Add any additional information you want to display */}
        <div className="user-details">
          {/* Additional user details go here */}
        </div>
      </div>
    ))}
    </div>
  );
};

export default MeAndAmigos;
