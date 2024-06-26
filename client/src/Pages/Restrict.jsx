import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import List from '../components/List/List';
import Search from '../components/Search/Search';
import '../Stylesheets/Analysis.css';
import axios from '../utils/axios';

const Restrict = () => {
  const [name, setName] = useState('');
  const [activities, setActivities] = useState([]);
  const [restrictedSites, setRestrictedSites] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setName(response.data.name);
        setActivities(response.data.activities);
        setRestrictedSites(response.data.restrictedSites || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const addToRestrictedSites = async (hostname) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.post(
        '/users/restrict',
        { hostname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update state to reflect the change
      setRestrictedSites(prevSites => [...prevSites, hostname]);
    } catch (error) {
      console.error('Error restricting hostname:', error);
      // Handle error as needed
    }
  };

  const removeFromRestrictedSites = async (hostname) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`/users/restrict/${hostname}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update state to reflect the change
      setRestrictedSites(prevSites => prevSites.filter(site => site !== hostname));
    } catch (error) {
      console.error('Error removing restricted hostname:', error);
      // Handle error as needed
    }
  };

  return (
    <div className='mainn'>
      <div className="an-sb">
      <Sidebar name={name} />
      </div>
      <div className="mainbdy">
        <div className="an-table">
          <List 
            title="Restricted Websites" 
            items={restrictedSites} 
            onDelete={removeFromRestrictedSites} 
          />
        </div>
        <div className="an-srch">
          <Search 
            activities={activities} 
            mode="restrict" 
            addToRestrictedSites={addToRestrictedSites} 
          />
        </div>
      </div>
    </div>
  );
};

export default Restrict;
