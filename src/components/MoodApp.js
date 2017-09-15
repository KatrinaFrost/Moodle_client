import React, {Component} from 'react';

function Nav (props) {
  return (
    <div className='nav'>
      <ul>
        <li>Home</li>
        <li>Overview</li>
        <li onClick={() => {props.changeRoute('globalmood')}}>Global Mood</li>
        <li>Diary Entry</li>
        <li>Admin/Analytics</li>
        <li onClick={() => {props.changeRoute('aboutus')}}>About Us</li>
        <li onClick={() => {props.changeRoute('signin')}}>SignIn</li>
        <li onClick={() => {props.changeRoute('signup')}}>SignUp</li>
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


function AboutUs (props) {
  return (
    <div className='aboutus'>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  );
}

class GlobalMood extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='globalmood'>
        <p>Mood Globe Coming soon... in googlemaps or in a text globe</p>
      </div>
    );
  }
}


export class MoodApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'aboutus'
    }

  this.changeRoute = this.changeRoute.bind(this);
  }
  changeRoute(route) {
    this.setState({route});
  }

  render() {
    let content = <div>ERROR: No such route</div>;
    let routeName = this.state.route;

    if (routeName == 'signin') {
      content = <SignIn />;
    }

    if (routeName == 'signup') {
      content = <SignUp />;
    }

    if (routeName == 'aboutus') {
      content = <AboutUs />;
    }

    if (routeName == 'globalmood') {
      content = <GlobalMood />
    }

    return(
      <div className='wrapper'>
        <Nav changeRoute={this.changeRoute}/>
        <h1>Mood App</h1>
        {content}
      </div>
    );
  }
}
