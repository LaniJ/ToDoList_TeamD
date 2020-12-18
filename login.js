function login(event) {
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
  
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    const loggedIn = {
      email,
      password
    }
  
    if (localStorage.getItem('appUsers')) {
      let existingUsers = JSON.parse(localStorage.getItem('appUsers'))
      for (i = 0; i < existingUsers.length; i++) {
        let user = existingUsers[i];
        if (user.email == loggedIn.email && user.password == loggedIn.password) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          window.location = 'mainpage.html';
          return;
        }
      }
    }
    alert("Invaild username or password");
    return;
  }

  // remember to change window.location value
  