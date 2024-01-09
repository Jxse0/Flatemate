import React, { useContext, useState } from 'react';
import { tokenContext } from '../../AuthProvider';
import axios from 'axios';
import "./logincard.css";

const WGDetails = () => {
  const [token] = useContext(tokenContext);
  const [wgname, setWgname] = useState('');
  const [wgdescription, setWgdescription] = useState('');
  const [wgrules, setWgrules] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [workgroupDetails, setWorkgroupDetails] = useState({
    name: 'Sample Workgroup',
    members: ['Member1', 'Member2', 'Member3'],
  });
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateWorkgroup = async () => {
    try {
      const response = await axios.post('http://localhost:3001/wg', {
        name: wgname,
        description: wgdescription,
        rules: wgrules,
      });

      // Handle the response or perform any necessary actions
      console.log('Workgroup created successfully:', response.data);

      // Close the form after creating the workgroup
      setShowCreateForm(false);
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

      {isLoggedIn ? (
        // Display details if the user is logged into the workgroup
        <div>
          <h2>{workgroupDetails.name}</h2>
          <p>Members: {workgroupDetails.members.join(', ')}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        // Show options to create a new workgroup or invite members
        <div>
          <button
            onClick={showCreateForm ? handleCreateWorkgroup: () => setShowCreateForm((prev) => !prev)}
            id="submit-btn"
            style={{ width: '100%' }}
          >
            Create New Flatmate
          </button>
          <button onClick={handleInviteMembers} id="submit-btn" style={{ width: '100%' }}>
            Invite Amigos
          </button>
        </div>
      )}
    </div>
  );
};

export default WGDetails;
