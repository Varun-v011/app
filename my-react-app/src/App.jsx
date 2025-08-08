import React, { useState, useEffect } from 'react';
import './App.css';
import LogoBox from './sidePanel';
import ProfilePanel from './profilePanel';
function QuoteWidget() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuote() {
      try {
        setLoading(true);

        // const api_url = "https://zenquotes.io/api/quotes/";
        const response = await fetch(api_url);
        if (!response.ok) throw new Error("Failed to fetch quote");
        const data = await response.json();
        setQuote(data[0] || null); // ZenQuotes returns an array

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, []);

  if (loading) return <p>Loading quote...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <blockquote style={{ fontStyle: "italic",padding: "1em", borderLeft: "4px solid #ccc", margin: "1em 0" , width: '70%'}}>
      <p>“{quote?.q || 'No quote available.'}”</p>
      <footer>— {quote?.a || 'Unknown'}</footer>
    </blockquote>
  );
}


function TableApp() {
  // State to hold the table data (array of job objects)
  const [items, setItems] = useState([]);

  // Possible status options for each job item
  const statusOptions = ['Ongoing', 'Interviewing', 'Rejected', 'Accepted', 'Offer'];

  // State for input fields to add new job
  const [newItem, setNewItem] = useState({
    company: '',
    position: '',
  });

  // Helper to get current date formatted nicely
  const getFormattedDate = () => new Date().toLocaleDateString();

  // Load stored jobs from the JSON file once, on component mount
  useEffect(() => {
    window.electronAPI.loadData()
      .then(savedItems => {
        if (Array.isArray(savedItems)) {
          setItems(savedItems);
        }
      })
      .catch(err => {
        console.error('Error loading saved data:', err);
      });
  }, []);

  // Save job list to JSON file every time `items` changes
  useEffect(() => {
    window.electronAPI.saveData(items)
      .catch(err => {
        console.error('Error saving data:', err);
      });
  }, [items]);

  // Update form inputs state on change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Add a new item to the job list
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.company.trim() || !newItem.position.trim()) {
      alert('Please fill in Company and Position fields!');
      return;
    }

    setItems([
      ...items,
      {
        id: Date.now(),
        company: newItem.company.trim(),
        position: newItem.position.trim(),
        dateAdded: getFormattedDate(),
        status: 'Ongoing', // Default status
      },
    ]);
    setNewItem({ company: '', position: '' }); // Clear inputs
  };

  // Change status of an existing job item
  const handleStatusChange = (id, newStatus) => {
    setItems(items.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  // Delete a job item
  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="table-app-container">
      {/* Display QuoteWidget here */}
      <LogoBox /> 
      <QuoteWidget />
      <ProfilePanel />

      <h1 className="neon-text">My Data Entry Table</h1>

      <form onSubmit={handleAddItem} className="add-item-form">
        <input
          type="text"
          name="company"
          value={newItem.company}
          onChange={handleInputChange}
          placeholder="Company Name"
          required
        />
        <input
          type="text"
          name="position"
          value={newItem.position}
          onChange={handleInputChange}
          placeholder="Position Applied"
          required
        />
        <button type="submit">Add Item</button>
      </form>

      {items.length === 0 ? (
        <p className="no-items-message">Empty!</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Date</th>
              <th>Position</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.company}</td>
                <td>{item.dateAdded}</td>
                <td>{item.position}</td>
                <td>
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                    className="status-dropdown"
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDeleteItem(item.id)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableApp;
