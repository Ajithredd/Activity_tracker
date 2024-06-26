import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Table from '../components/Table/Table';
import '../Stylesheets/Analysis.css';
import axios from '../utils/axios';
import BarGraph from '../components/BarGraph/BarGraph';
import Piechart from '../components/Piechart/Piechart';

const Reports = () => {
  const [name, setName] = useState('');
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [reportType, setReportType] = useState('daily');
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

        setName(response.data.name);
        setActivities(response.data.activities);

        // Extract site arrays from response data
        const productiveSites = response.data.productiveSites || [];
        const entertainmentSites = response.data.entertainmentSites || [];
        const distractiveSites = response.data.distractiveSites || [];

        // Filter activities based on report type
        const now = new Date();
        const filtered = response.data.activities.filter(activity => {
          const activityDate = new Date(activity.startTime);
          switch (reportType) {
            case 'daily':
              return activityDate.toDateString() === now.toDateString();
            case 'weekly':
              const oneWeekAgo = new Date(now);
              oneWeekAgo.setDate(now.getDate() - 7);
              return activityDate >= oneWeekAgo && activityDate <= now;
            case 'monthly':
              return activityDate.getMonth() === now.getMonth() && activityDate.getFullYear() === now.getFullYear();
            default:
              return true;
          }
        });

        setFilteredActivities(filtered);

        // Initialize durations
        let productiveDuration = 0;
        let entertainmentDuration = 0;
        let distractiveDuration = 0;

        // Calculate durations based on filtered activities
        filtered.forEach(activity => {
          if (productiveSites.includes(activity.hostname)) {
            productiveDuration += activity.duration;
          } else if (entertainmentSites.includes(activity.hostname)) {
            entertainmentDuration += activity.duration;
          } else if (distractiveSites.includes(activity.hostname)) {
            distractiveDuration += activity.duration;
          }
        });

        // Update state with calculated durations
        setTotalDurations({
          productive: productiveDuration,
          entertainment: entertainmentDuration,
          distractive: distractiveDuration
        });

        // Calculate durations by hostname for BarGraph
        const durations = {};
        filtered.forEach(activity => {
          const { hostname, duration } = activity;
          durations[hostname] = (durations[hostname] || 0) + duration;
        });
        setHostnameDurations(durations);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [reportType]); // Include reportType in dependency array

  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const totalWebPagesVisited = filteredActivities.length;
  const totalTimeSpent = filteredActivities.reduce((total, activity) => total + activity.duration, 0);
  const averageTimeSpent = totalWebPagesVisited > 0 ? (totalTimeSpent / totalWebPagesVisited).toFixed(2) : 0;

  // Top 5 visited websites
  const topWebsites = [...filteredActivities]
    .sort((a, b) => b.duration - a.duration)
    .slice(0, 5)
    .map(activity => activity.hostname);

  // Metrics based on filtered activities
  const numSessions = filteredActivities.length;

  return (
    <div className='mainn'>
      <div className="an-sb">
        <Sidebar name={name} />
      </div>
      <div className="mainbdy">
        <div className="an-table">
          <div className="report-type">
            <label htmlFor="reportType">Generate Report: </label>
            <select id="reportType" value={reportType} onChange={handleReportTypeChange}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="key-metrics">
            <div className="metric">
              <h3>Total Time Spent</h3>
              <p>{totalTimeSpent} minutes</p>
            </div>
            <div className="metric">
              <h3>Average Time Spent</h3>
              <p>{averageTimeSpent} minutes per session</p>
            </div>
            <div className="metric">
              <h3>Most Visited Websites</h3>
              <ul>
                {topWebsites.map((site, index) => (
                  <li key={index}>{site}</li>
                ))}
              </ul>
            </div>
            <div className="metric">
              <h3>Productive vs. Non-Productive Time</h3>
              <p>Productive: {totalDurations.productive} minutes</p>
              <p>Distractive: {totalDurations.distractive} minutes</p>
              <p>Entertainment: {totalDurations.entertainment} minutes</p>
            </div>
            <div className="metric">
              <h3>Number of Sessions</h3>
              <p>{numSessions}</p>
            </div>
            <div className="metric">
              <h3>Time Spent per Category</h3>
              <p>Productive: {totalDurations.productive} minutes</p>
              <p>Distractive: {totalDurations.distractive} minutes</p>
              <p>Entertainment: {totalDurations.entertainment} minutes</p>
            </div>
          </div>

          <BarGraph hostnameDurations={hostnameDurations} />
          <Piechart 
            productiveDuration={totalDurations.productive}
            entertainmentDuration={totalDurations.entertainment}
            distractiveDuration={totalDurations.distractive}
          />
          <Table activities={filteredActivities} mode="analysis" />
        </div>
      </div>
    </div>
  );
};

export default Reports;
