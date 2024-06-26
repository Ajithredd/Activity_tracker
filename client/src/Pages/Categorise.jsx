import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Update from '../components/Update/Update';
import List from '../components/List/List';
import '../Stylesheets/Categorise.css';
import axios from '../utils/axios';

const Categorise = () => {
  const [name, setName] = useState('');
  const [activities, setActivities] = useState([]);
  const [productiveSites, setProductiveSites] = useState([]);
  const [distractiveSites, setDistractiveSites] = useState([]);
  const [entertainmentSites, setEntertainmentSites] = useState([]);

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
        setActivities(response.data.activities || []);
        setProductiveSites(response.data.productiveSites || []);
        setDistractiveSites(response.data.distractiveSites || []);
        setEntertainmentSites(response.data.entertainmentSites || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const addToCategory = async (hostname, category) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.post(
        `/users/categorise/${category}`,
        { hostname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updateState = (setter, sites) => setter([...sites, hostname]);

      switch (category) {
        case 'productive':
          updateState(setProductiveSites, productiveSites);
          break;
        case 'distractive':
          updateState(setDistractiveSites, distractiveSites);
          break;
        case 'entertainment':
          updateState(setEntertainmentSites, entertainmentSites);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error adding hostname to ${category}:`, error);
    }
  };

  const removeFromCategory = async (hostname, category) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(
        `/users/categorise/${category}/${hostname}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updateState = (setter, sites) => setter(sites.filter(site => site !== hostname));

      switch (category) {
        case 'productive':
          updateState(setProductiveSites, productiveSites);
          break;
        case 'distractive':
          updateState(setDistractiveSites, distractiveSites);
          break;
        case 'entertainment':
          updateState(setEntertainmentSites, entertainmentSites);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error removing hostname from ${category}:`, error);
    }
  };

  return (
    <div className='mainn'>
      <div className="an-sb">
      <Sidebar name={name} />
      </div>
      
      <div className="mainbdy">
        <div className="list-table">
          <div className="an-table">
            <List 
              title="Productive Sites" 
              items={productiveSites} 
              onDelete={(hostname) => removeFromCategory(hostname, 'productive')} 
            />
          </div>
          <div className="an-table">
            <List 
              title="Distractive Sites" 
              items={distractiveSites} 
              onDelete={(hostname) => removeFromCategory(hostname, 'distractive')} 
            />
          </div>
          <div className="an-table">
            <List 
              title="Entertainment Sites" 
              items={entertainmentSites} 
              onDelete={(hostname) => removeFromCategory(hostname, 'entertainment')} 
            />
          </div>
        </div>

        <div className="an-srch">
          <Update activities={activities} addToCategory={addToCategory} />
        </div>
      </div>
    </div>
  );
};

export default Categorise;
