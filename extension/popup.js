document.getElementById('saveToken').addEventListener('click', () => {
    const token = document.getElementById('tokenInput').value;
    chrome.storage.local.set({ token }, () => {
      alert('Token saved!');
    });
  });
  
  // Automatically fill the token input if it exists
  chrome.storage.local.get('token', (result) => {
    if (result.token) {
      document.getElementById('tokenInput').value = result.token;
    }
  });
  