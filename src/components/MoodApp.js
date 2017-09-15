import React, {Component} from 'react';

function Nav (props) {
  return (
    <ul>
      <li>Home</li>
      <li>User Page</li>
      <li>Diary Entry</li>
      <li>Results</li>
      <li>Admin/Analytics</li>
    </ul>
  );
}

export class MoodApp extends Component {
  render() {
    return(
      <div className='wrapper'>
        <h1>Mood App</h1>
        <Nav />
      </div>
    );
  }
}
