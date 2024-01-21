

import React, { useState } from 'react';
import styles from './styles.module.css';

const Table = ({ data, onEdit, onDelete }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedData({ ...data[index] });
  };

  const handleSave = () => {
    // Save the edited data and close the editing mode
    data[editIndex] = { ...editedData };
    setEditIndex(null);
  };

  const handleCancel = () => {
    // Cancel the editing mode and discard changes
    setEditIndex(null);
  };

  const handleInputChange = (name, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>


          <th>S.No</th>
          <th>Name</th>
          <th>Contact</th>
          <th>Email</th>
          <th>Weekday</th>
          <th>Gender</th>
          <th>DOB</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              ) : (
                row.name
              )}
            </td>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                />
              ) : (
                row.contact
              )}
            </td>
            <td>
              {editIndex === index ? (
                <input
                  type="text"
                  value={editedData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              ) : (
                row.email
              )}
            </td>
            <td>{Object.keys(row.weekday).filter((day) => row.weekday[day]).join(', ')}</td>
            <td>{editIndex === index ? <input type="text" value={editedData.gender} onChange={(e) => handleInputChange('gender', e.target.value)} /> : row.gender}</td>
            <td>{editIndex === index ? <input type="text" value={editedData.dob} onChange={(e) => handleInputChange('dob', e.target.value)} /> : row.dob}</td>
            <td>
              {editIndex === index ? (
                <>
                  <button className={styles.actionButton} onClick={handleSave}>
                    Save
                  </button>
                  <button className={styles.actionButton} onClick={handleCancel}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className={styles.actionButton} onClick={() => handleEdit(index)}>
                  Edit
                </button>
              )}
              <button className={styles.actionButton} onClick={() => onDelete(index)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
