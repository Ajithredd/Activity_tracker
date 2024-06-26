// content.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form'); // Adjust this selector to target your actual login form
  
    loginForm.addEventListener('submit', async (event) => {
      // Prevent the default form submission
      event.preventDefault();
  
      // Simulate form submission to capture the token
      const formData = new FormData(loginForm);
      const response = await fetch(loginForm.action, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
  
      if (response.ok) {
        const result = await response.json();
        const token = result.token; // Adjust this based on your actual token response structure
  
        // Send the token to the background script
        chrome.runtime.sendMessage({ action: 'saveToken', token });
        
        // Optionally, redirect to another page or perform additional actions
        window.location.href = '/dashboard'; // Adjust this based on your actual post-login redirect
      } else {
        console.error('Login failed');
      }
    });
  });
  