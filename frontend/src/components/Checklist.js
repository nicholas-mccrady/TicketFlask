import axios from 'axios';
import React, { useEffect, useState } from 'react';
import html2pdf from 'html2pdf.js';

function Checklist() {
  const [formData, setFormData] = useState({
    user_name: '',
    technician_name: '',
    date: '',
    device_name: ''
  });

  const [items, setItems] = useState([]);

  // Load checklist and metadata from backend
  useEffect(() => {
    axios.get('http://localhost:5000/checklist')
      .then(res => {
        setFormData(res.data.meta || {});
        setItems(res.data.items || []);
      })
      .catch(err => console.error('Error loading checklist:', err));
  }, []);

  // Handle input field changes
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Toggle checklist item and save everything
  const toggleChecked = (id) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    saveChecklist(formData, updatedItems);
  };

  // Save form + checklist to backend
  const saveChecklist = (meta, items) => {
    axios.post('http://localhost:5000/checklist', { meta, items })
      .catch(err => console.error('Error saving checklist:', err));
  };

  // Export checklist to PDF
  const handleSaveAsPDF = () => {
    const element = document.getElementById('checklist-container');
    html2pdf().from(element).set({ margin: 10 }).save('Laptop_Imaging_Checklist.pdf');
  };

  // Print using browser
  const handlePrint = () => {
    window.print();
  };

  // Load checklist from uploaded JSON file
  const handleOpenFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setFormData(data.meta || {});
        setItems(data.items || []);
      } catch (error) {
        console.error('Error parsing uploaded checklist:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div id="checklist-container">
      <h2>Laptop Imaging Checklist</h2>

      <div
        style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '20px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <label>
          User Name:{' '}
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleFormChange}
          />
        </label>

        <label>
          Technician Name:{' '}
          <input
            type="text"
            name="technician_name"
            value={formData.technician_name}
            onChange={handleFormChange}
          />
        </label>

        <label>
          Date:{' '}
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleFormChange}
          />
        </label>

        <label>
          Device Name:{' '}
          <input
            type="text"
            name="device_name"
            value={formData.device_name}
            onChange={handleFormChange}
          />
        </label>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleSaveAsPDF}>Save as PDF</button>{' '}
        <button onClick={handlePrint}>Print</button>{' '}
        <label style={{ display: 'inline-block' }}>
          Open JSON File:{' '}
          <input
            type="file"
            accept=".json"
            onChange={handleOpenFile}
            style={{ marginLeft: '10px' }}
          />
        </label>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: '8px' }}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleChecked(item.id)}
              />
              {' '}
              {item.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Checklist;