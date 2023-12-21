import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

function App() {
  const [botSettings, setBotSettings] = useState({});
  const [userAccounts, setUserAccounts] = useState([]);

  useEffect(() => {
    // Fetch initial data
    fetchBotSettings();
    fetchUserAccounts();
  }, []);

  const fetchBotSettings = async () => {
    try {
      const response = await axios.get('http://localhost:3000/settings');
      setBotSettings(response.data);
    } catch (error) {
      console.error('Error fetching bot settings:', error.message);
    }
  };

  const fetchUserAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUserAccounts(response.data);
    } catch (error) {
      console.error('Error fetching user accounts:', error.message);
    }
  };

  const handleSaveSettings = async () => {
    try {
      await axios.post('http://localhost:3000/settings', botSettings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      fetchUserAccounts();
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  return (
    <div className='app'>
      <h1 className='heading'>Admin Panel</h1>
      
      <div>
        <h2>Bot Settings</h2>
        <label>
          Telegram Bot Token:
          <input
            type="text"
            value={botSettings.telegramBotToken || ''}
            onChange={(e) => setBotSettings({ ...botSettings, telegramBotToken: e.target.value })}
          />
        </label>
        <br />
        <label>
          OpenWeatherMap API Key:
          <input
            type="text"
            value={botSettings.openWeatherMapApiKey || ''}
            onChange={(e) => setBotSettings({ ...botSettings, openWeatherMapApiKey: e.target.value })}
          />
        </label>
        <br />
        <button onClick={handleSaveSettings}>Save Settings</button>
      </div>

      <hr />

      <div>
        <h2>User Accounts</h2>
        <ul>
          {userAccounts.map((user) => (
            <li key={user.id}>
              {user.username} -{' '}
              <button onClick={() => handleDeleteUser(user.id)} >Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
