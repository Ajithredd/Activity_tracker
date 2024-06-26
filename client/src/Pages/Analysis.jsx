import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Search from '../components/Search/Search';
import Table from '../components/Table/Table';
import Card from '../components/Card/Card';
import '../Stylesheets/Analysis.css';
import axios from '../utils/axios';

const Analysis = () => {
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
        setFilteredActivities(response.data.activities);
        console.log(response.data.activities);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, []);
  console.log(filteredActivities);
  const totalWebPagesVisited = filteredActivities.length;
  const totalTimeSpent = filteredActivities.reduce((total, activity) => total + activity.duration, 0);
  const startTime = filteredActivities.length ? new Date(filteredActivities[0].startTime).toLocaleString() : 'N/A';

  return (
    <div className='mainn'>
      <div className="an-sb">
      <Sidebar name={name} />
      </div>
     
      <div className="mainbdy">
        <div className="an-table">
          <Card
            timeSpent={`${totalTimeSpent} minutes`}
            startTime={startTime}
            webPagesVisited={totalWebPagesVisited}
          />
          <Table activities={filteredActivities} mode="analysis" />
        </div>
        <div className="an-srch">
          <Search activities={activities}  mode="analysis" setFilteredActivities={setFilteredActivities} />
        </div>
      </div>
    </div>
  );
};

export default Analysis;
