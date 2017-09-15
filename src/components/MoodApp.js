import React, {Component} from 'react';

function Nav (props) {
  return (
    <div className='nav'>
      <ul>
        <li>Home</li>
        <li>Overview</li>
        <li>Diary Entry</li>
        <li>Admin/Analytics</li>
      </ul>
    </div>
  );
}

function UserForm (props) {
  return (
    <div className='signin'>
      <input type='email' placeholder='Type your email here' autoFocus/>
      <input type='password' placeholder='Type your password here' />
    </div>
  );
}

function SignIn (props) {
  return (
    <div className='signin'>
      <UserForm />
      <button type='submit'>SignIn</button>
    </div>
  );
}

function SignUp (props) {
  return (
    <div className='signup'>
      <UserForm />
      <input type='password' placeholder='Confirm your password' />
      <button type='submit' method='post'>SignUp</button>
    </div>
  );
}

export class MoodApp extends Component {
  render() {
    return(
      <div className='wrapper'>
        <Nav />
        <h1>Mood App</h1>
        <SignIn />
        <SignUp />

      </div>
    );
  }
}
