import React, { useState, useEffect } from 'react';
import '../Stylesheets/Dashboard.css';
import Sidebar from '../components/Sidebar/Sidebar';
import Piechart from '../components/Piechart/Piechart';
import BarGraph from '../components/BarGraph/BarGraph';
import Table from '../components/Table/Table';
import axios from '../utils/axios';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [activities, setActivities] = useState([]);
  const [totalDurations, setTotalDurations] = useState({
    productive: 0,
    entertainment: 0,
    distractive: 0
  });
  const [hostnameDurations, setHostnameDurations] = useState({});

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

        // Assuming response data has total durations and activities
        setName(response.data.name);
        setActivities(response.data.activities || []);
        setTotalDurations({
          productive: response.data.totalDurations.productive || 0,
          entertainment: response.data.totalDurations.entertainment || 0,
          distractive: response.data.totalDurations.distractive || 0
        });

        // Calculate total duration for each hostname
        const durations = {};
        response.data.activities.forEach(activity => {
          const { hostname, duration } = activity;
          durations[hostname] = (durations[hostname] || 0) + duration;
        });
        console.log(durations);
        setHostnameDurations(durations);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='main-db'>
      <div className="main-sb">
      <Sidebar name={name} />
      </div>
      <div className="main-bdy">
      <div className="db-body">
        <Piechart
          productiveDuration={totalDurations.productive}
          entertainmentDuration={totalDurations.entertainment}
          distractiveDuration={totalDurations.distractive}
        />
        <div className="db-bg">
          <BarGraph hostnameDurations={hostnameDurations} />
        </div>
      </div>
      <div className="db-table">
        <h3>Time Consumption</h3>
        <Table activities={activities} mode="home" />
      </div>
    </div>
    </div>
    
  );
};

export default Dashboard;
