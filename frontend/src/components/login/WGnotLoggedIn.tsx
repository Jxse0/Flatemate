import { useContext, useState } from "react";
import { tokenContext } from "../../InfoProvider";
import axios from "axios";
import "./logincard.css";
import { useNavigate } from "react-router-dom";

const WGnotLoggedIn = () => {
  const [token, setToken] = useContext(tokenContext);
  const [invitationToken, setInvitationToken] = useState("");
  const [wgname, setWgname] = useState("");
  const [wgdescription, setWgdescription] = useState("");
  const [wgrules, setWgrules] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const navigate = useNavigate();

  const handleCreateButtonClick = () => {
    setShowCreateForm((prev) => !prev);
    setShowInviteForm(false);
  };

  const handleInviteButtonClick = () => {
    setShowInviteForm((prev) => !prev);
    setShowCreateForm(false);
  };

  const handleCreateWorkgroup = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/wg`,
        {
          name: wgname,
          description: wgdescription,
          rules: wgrules,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.debug("Workgroup created successfully:", response.data);
      setShowCreateForm(false);
      setToken("");
      navigate("/login");
    } catch (error) {
      console.error("Error creating workgroup:", error);
    }
  };

  const handleInvitation = async () => {
    // Logic to invite members to the workgroup
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/newMember`,
        {
          invite: invitationToken,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setShowInviteForm(false);
        setToken("");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error inviting yourself", error);
    }
  };

  return (
    <div>
      <h1 style={{ letterSpacing: "4px", textAlign: "center" }}>WG Details</h1>

      <div
        style={{
          opacity: showCreateForm || showInviteForm ? 1 : 0,
          transition: "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out",
          overflow: "hidden",
        }}
      >
        {/* We either show the Create Form or the Token Form based on  the buttons */}
        {showCreateForm && (
          <div id="wgdetailscard" key="create">
            <div id="card-content">
              {/* Form for creating a new workgroup */}
              <form method="post" className="form">
                <label style={{ paddingTop: "13px" }}>&nbsp;Name</label>
                <input
                  type="text"
                  value={wgname}
                  onChange={(e) => setWgname(e.target.value)}
                  className="form-content"
                  required
                />
                <div className="form-border"></div>
                <label style={{ paddingTop: "13px" }}>&nbsp;Description</label>
                <input
                  type="text"
                  value={wgdescription}
                  onChange={(e) => setWgdescription(e.target.value)}
                  className="form-content"
                  required
                />
                <div className="form-border"></div>
                <label style={{ paddingTop: "13px" }}>&nbsp;Rules</label>
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
        {showInviteForm && (
          <div id="wgdetailscard" key="invite">
            <div id="card-content">
              {/* Form for creating a new workgroup */}
              <form method="post" className="form">
                <label style={{ paddingTop: "13px" }}>
                  &nbsp;I need your Invitation Token
                </label>
                <input
                  type="text"
                  value={invitationToken}
                  onChange={(e) => setInvitationToken(e.target.value)}
                  className="form-content"
                  required
                />
                <div className="form-border"></div>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* The 2 Buttons */}
      <div>
        <button
          onClick={
            showCreateForm ? handleCreateWorkgroup : handleCreateButtonClick
          }
          id="submit-btn"
          style={{ width: "100%" }}
        >
          Create New Flatmate
        </button>
        <button
          onClick={showInviteForm ? handleInvitation : handleInviteButtonClick}
          id="submit-btn"
          style={{ width: "100%" }}
        >
          Join your Amigos
        </button>
      </div>
    </div>
  );
};

export default WGnotLoggedIn;
