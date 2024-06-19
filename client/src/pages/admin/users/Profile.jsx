
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Placeholder action for deleting user profile
import { deleteUserProfile } from '../../../slices/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  const handleDeleteProfile = () => {
    dispatch(deleteUserProfile())
      .then(() => {
        navigate('/'); // Redirect to home or login page after deletion
      })
      .catch(err => {
        console.error('Failed to delete profile:', err);
      });
  };

  return (
    <div className="container mt-5">
      <Tabs defaultActiveKey="profile" className="mb-3">
        <Tab eventKey="home" title="Home">
          <div className="p-3">
            <h4>Profile Detail</h4>
            <p>Here you can view and edit your profile details.</p>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Change Password">
          <div className="p-3">
            <h4>Change Password</h4>
            <p>You can change your password here.</p>
          </div>
        </Tab>
        <Tab eventKey="contact" title="Social Accounts">
          <div className="p-3">
            <h4>Social Accounts</h4>
            <p>Manage your social account links here.</p>
          </div>
        </Tab>
        <Tab eventKey="reset-password" title="Reset Password">
          <div className="p-3">
            <h4>Reset Password</h4>
            <p>Reset your password if youve forgotten it.</p>
          </div>
        </Tab>
        <Tab eventKey="delete-profile" title="Delete Profile">
          <div className="p-3">
            <h4>Delete Profile</h4>
            <p>
              Deleting your profile is a permanent action and cannot be undone. Please confirm if you want to delete your profile.
            </p>
            <Button variant="danger" onClick={() => setShowModal(true)}>
              Delete Profile
            </Button>
          </div>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your profile? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProfile}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
