import React, { useState } from 'react';
import styles from './styles.module.css';

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    weekday: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
    },
    gender: '',
    dob: '',
  });

  const [error, setError] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!formData.name || !formData.email || !formData.contact) {
        throw new Error('Please fill in all required fields.');
      }

      onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        contact: '',
        weekday: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
        },
        gender: '',
        dob: '',
      });
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>

        <label>
          Contact:
          <input type="number" name="contact" value={formData.contact} onChange={handleChange} />
        </label>
        

        <label>
          Weekday:
          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
            <label key={day} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name={day}
                checked={formData.weekday[day]}
                onChange={handleChange}
              />
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </label>
          ))}
        </label>

        <label>
          Gender:
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
            Female
          </label>
        </label>

        <label>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </label>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Form;
