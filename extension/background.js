// Function to get email from local storage
function getEmail() {
    return new Promise((resolve) => {
      chrome.storage.local.get('email', (result) => {
        resolve(result.email);
      });
    });
  }
  
  // Function to get userId from the backend using email
  async function getUserId(email) {
    try {
      const response = await fetch('http://localhost:5000/api/users/id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      return data.userId;
    } catch (error) {
      console.error('Error fetching userId:', error);
    }
  }
  
  // Function to send data to the backend
  async function sendDataToBackend(data) {
    const email = await getEmail();
    const userId = await getUserId(email);
    data.userId = userId;
    try {
      const response = await fetch('http://localhost:5000/api/activity/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  }
  
  // Object to store start times for each tab
  const startTimes = {};
  
  // Function to handle tab updates
  function handleTabUpdate(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
      const endTime = new Date().toISOString();
      const data = {
        url: tab.url,
        hostname: new URL(tab.url).hostname,
        path: new URL(tab.url).pathname,
        startTime: startTimes[tabId],
        endTime,
        duration: (new Date(endTime) - new Date(startTimes[tabId])) / 1000 // duration in seconds
      };
      sendDataToBackend(data);
      delete startTimes[tabId];
    }
  }
  
  // Event listener for tab activation
  chrome.tabs.onActivated.addListener((activeInfo) => {
    const tabId = activeInfo.tabId;
    chrome.tabs.get(tabId, (tab) => {
      if (tab.url && tab.url.startsWith('http')) {
        startTimes[tabId] = new Date().toISOString();
      }
    });
  });
  
  // Event listener for tab updates (e.g., navigating to a new URL)
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('http')) {
      handleTabUpdate(tabId, changeInfo, tab);
    }
  });
  