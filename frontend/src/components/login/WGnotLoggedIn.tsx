import React, { useContext, useState } from 'react';
import { tokenContext } from '../../AuthProvider';
import axios from 'axios';
import "./logincard.css";
import { useNavigate } from 'react-router-dom';

const WGnotLoggedIn = () => {
  const [token] = useContext(tokenContext);
  const [wgname, setWgname] = useState('');
  const [wgdescription, setWgdescription] = useState('');
  const [wgrules, setWgrules] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const navigate = useNavigate();
  
  const handleCreateWorkgroup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/wg', {
        name: wgname,
        description: wgdescription,
        rules: wgrules,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },});

      console.debug('Workgroup created successfully:', response.data);
      setShowCreateForm(false);
      navigate('/login');
    } catch (error) {
      // Handle errors
      console.error('Error creating workgroup:', error);
    }
  };

  const handleInviteMembers = () => {
    // Logic to invite members to the workgroup
    console.log('Members invited!');
  };

  return (
    <div>
      <h1 style={{ letterSpacing: '4px', textAlign: 'center' }}>
        WG Details
      </h1>

      <div
        style={{
          opacity: showCreateForm ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          overflow: 'hidden',
        }}
      >
        {showCreateForm && (
          <div id='wgdetailscard'>
            <div id='card-content'>
            {/* Form for creating a new workgroup */}
            <form method='post' className='form'>
            <label  style={{ paddingTop: '13px' }}>
            &nbsp;Name
            </label>
              <input
                type="text"
                value={wgname}
                onChange={(e) => setWgname(e.target.value)}
                className="form-content"
                required
                />
            <div className="form-border"></div>
            <label  style={{ paddingTop: '13px' }}>
            &nbsp;Description
            </label>
              <input
                type="text"
                value={wgdescription}
                onChange={(e) => setWgdescription(e.target.value)}
                className="form-content"
                required
                />
            <div className="form-border"></div>
            <label  style={{ paddingTop: '13px' }}>
            &nbsp;Rules
            </label>
              <input
                type="text"
                value={wgrules}
                onChange={(e) => setWgrules(e.target.value)}
                className="form-content"
                required
                />
            <div className="form-border"></div>
                </form>
            </div>
          </div>
        )}
      </div>
      {/* The 2 Buttons */ }
        <div>
          <button
            onClick={showCreateForm ? handleCreateWorkgroup: () => setShowCreateForm((prev) => !prev)}
            id="submit-btn"
            style={{ width: '100%' }}
          >
            Create New Flatmate
          </button>
          <button onClick={handleInviteMembers} id="submit-btn" style={{ width: '100%' }}>
            Join your Amigos
          </button>
        </div>
 
    </div>
  );
};

export default WGnotLoggedIn;
