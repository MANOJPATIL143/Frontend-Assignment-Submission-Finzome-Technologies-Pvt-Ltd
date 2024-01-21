import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

// EditModal.js

// ...

const EditModal = ({ isOpen, initialData, onClose, onUpdate }) => {
    const [formData, setFormData] = useState(initialData);
  
    useEffect(() => {
      setFormData(initialData);
    }, [initialData]);
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
  
      if (type === 'checkbox') {
        setFormData((prevData) => ({
          ...prevData,
          weekday: {
            ...prevData.weekday,
            [name]: checked,
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
  
    const handleSubmit = () => {
      try {
        // Check if 'name' property exists before accessing
        if (!formData || !formData.name || !formData.email || !formData.contact) {
          throw new Error('Please fill in all required fields.');
        }
  
        onUpdate(formData);
      } catch (error) {
        // Handle validation errors
        console.error(error.message);
      }
    };
  
    return (
      <div className={styles.modal} style={{ display: isOpen ? 'block' : 'none' }}>
        <h2>Edit Row</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <label>
            Name:
            <input type="text" name="name" value={formData?.name || ''} onChange={handleChange} />
          </label>
  
          {/* ... (other form fields) */}
  
          <button type="button" onClick={onClose} className={styles.modalButton}>
            Cancel
          </button>
          <button type="submit" className={styles.modalButton}>
            Update
          </button>
        </form>
      </div>
    );
  };
  
  export default EditModal;
  