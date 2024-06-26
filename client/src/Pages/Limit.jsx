import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Search from '../components/Search/Search';
import Set from '../components/Set/Set';
import '../Stylesheets/Analysis.css';
import axios from '../utils/axios';

const TimeLimit = () => {
  const [name, setName] = useState('');
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);

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
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='mainn'>
      <div className="an-sb">
      <Sidebar name={name} />
      </div>
      <div className="mainbdy">
        <div className="an-table">
          <Set filteredActivities={filteredActivities} />
        </div>
        <div className="an-srch">
          <Search activities={activities} mode="timelimit" setFilteredActivities={setFilteredActivities} />
        </div>
      </div>
    </div>
  );
};

export default TimeLimit;
