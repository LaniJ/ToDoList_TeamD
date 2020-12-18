function clickMe(event) {
  event.preventDefault();
  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  if (!username || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const userDetails = {
    username,
    email,
    password,
  }

  if (localStorage.getItem('appUsers')) {

    let existingUsers = JSON.parse(localStorage.getItem('appUsers'))
    existingUsers.push(userDetails);
    localStorage.setItem('appUsers', JSON.stringify(existingUsers))
  } else {
    let users = [userDetails];
    localStorage.setItem('appUsers', JSON.stringify(users));
  }
  localStorage.setItem('currentUser', JSON.stringify(userDetails));

  // localStorage.setItem('email', email);

  window.location = 'mainpage.html';
}

// remember to change window.location value

// if (localStorage.getItem('task.lists')) {

//   let lists = Json.parse(localStorage.getItem('task.lists'))
//   lists.push(list);
//   localStorage.setItem('task.lists', JSON.stringify(lists))
// } else {
//   let lists = [list];
//   localStorage.setItem('task.lists', JSON.stringify(lists))
// }



