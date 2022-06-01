import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  const nameRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleSubmit = e => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email };
    //send data to the server
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const addedUser = data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers);
      })

    nameRef.current.value = '';
    emailRef.current.value = '';

    e.preventDefault();
  }


  return (
    <div className="App">
      <h2>Users Founded: {users.length}</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add User" ref={nameRef} />
        <input type="email" placeholder="Add Email" ref={emailRef} />
        <input type="submit" />
      </form>

      <ul>
        {
          users.map(user => <li key={user.id}>{user.id}:{user.name} : {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
