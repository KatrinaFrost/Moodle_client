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

function SignIn (props) {
  return (
    <div className='signin'>
      <input type='email' placeholder='Type your email here' />
      <input type='password' placeholder='Type your password here' />
      <button type='submit'>Submit</button>
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
      </div>
    );
  }
}
