import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AxiosDemo() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // New state for details modal
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((resp) => {
        const usersWithAdditionalFields = resp.data.data.map((user) => ({
          ...user,
          address: `Address for ${user.first_name} ${user.last_name}`,
          admin_rights: user.id % 2 === 0,
        }));
        setUsers(usersWithAdditionalFields);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setShowDeleteModal(false);
  };

  const handleDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true); // Open details modal
  };

  const handleImageClick = (e) => {
    if (e.target.style.transform === "scale(2)") {
      e.target.style.transform = "scale(1)";
    } else {
      e.target.style.transform = "scale(2)";
    }
    e.target.style.transition = "transform 0.5s ease";
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(users.length / recordsPerPage);

  return (
    <div className="container mt-4">
      <h2>User List</h2>
      <select
        onChange={(e) => setRecordsPerPage(Number(e.target.value))}
        className="form-select mb-3"
        style={{ width: "7%" }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Address</th>
            <th>Admin Rights</th>
            <th>Avatar</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>
                {user.first_name} {user.last_name}
              </td>
              <td>{user.address}</td>
              <td>{user.admin_rights ? "Yes" : "No"}</td>
              <td>
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  width="50"
                  height="50"
                  onClick={handleImageClick}
                  style={{ cursor: "pointer" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => handleDetails(user)}
                >
                  Details
                </button>
              </td>
              <td>
                <button
                  className="btn btn-success m-1"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {[...Array(totalPages)].map((_, index) => (
            <li key={index} className="page-item">
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className="page-link"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Name: {selectedUser.first_name} {selectedUser.last_name}
                </p>
                <p>Email: {selectedUser.email}</p>
                <p>Address: {selectedUser.address}</p>
                <p>Admin Rights: {selectedUser.admin_rights ? "Yes" : "No"}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete {selectedUser.first_name}?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && (
        <div className="modal" tabIndex="-1" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDetailsModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Address Section */}
                <div className="mb-4">
                  <h6>Address</h6>
                  <p>{selectedUser.address}</p>
                </div>

                {/* Admin Rights Section */}
                <div>
                  <h6>Admin Rights</h6>
                  <p>{selectedUser.admin_rights ? "Yes" : "No"}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AxiosDemo;
