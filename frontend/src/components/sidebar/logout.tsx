import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { tokenContext } from '../../AuthProvider';

const Logout: React.FC = () => {
  const [, setToken] = useContext(tokenContext);
  const navigate = useNavigate();

  function doLogout() {
    setToken('');
    navigate('/login');
  }

  return (
    <Button
      sx={{ position: 'absolute', top: 10, right: 10 }}
      onClick={() => doLogout()}
    >
      Logout
    </Button>
  );
};

export default Logout;