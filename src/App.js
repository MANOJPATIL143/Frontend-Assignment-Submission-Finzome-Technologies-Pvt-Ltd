import React, { useState } from 'react';
import Form from './Cmp/Form';
import Table from './Cmp/Table';
import EditModal from './Cmp/EditModal';
import styles from './Cmp/styles.module.css';
const App = () => {
  const [data, setData] = useState([]); // Your data state
  const [editIndex, setEditIndex] = useState(null);

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleUpdate = (updatedData) => {
    // Update the data array with the edited row
    setData((prevData) => {
      const newData = [...prevData];
      newData[editIndex] = updatedData;
      return newData;
    });

    // Close the modal after updating
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    // Delete the row with the given index
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.app}>
      <Form onSubmit={(formData) => setData([...data, formData])} />
      <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />
      {editIndex !== null && (
        <EditModal
          isOpen={true} // Set to true to display the modal
          initialData={data[editIndex]}
          onClose={() => setEditIndex(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default App;