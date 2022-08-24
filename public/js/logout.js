async function logoutHandler(event) {
    console.log("clicked");
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
//   var logoutLink = document.querySelector('#logout');
//   console.log(logoutLink);
//   logoutLink.addEventListener('click', logoutHandler);
  