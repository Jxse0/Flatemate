// Import necessary dependencies
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CircularProgress, Typography } from '@mui/material';
import WGnotLoggedIn from '../login/WGnotLoggedIn';
import { tokenContext } from '../../AuthProvider';


// Main DataFetcherComponent
const WGDetails: React.FC = () => {
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
    <div>
      <Typography variant="h4">Fetched Data:</Typography>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* Replace the above with your own rendering logic */}
    </div>
  );
};

export default WGDetails;
