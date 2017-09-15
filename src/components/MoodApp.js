import React, {Component} from 'react';

function Nav (props) {
  return (
    <div className='nav'>
      <ul>
        <li>Home</li>
        <li>Overview</li>
        <li>Diary Entry</li>
        <li>Admin/Analytics</li>
        <li onClick={() => {props.changeRoute('signin')}}>SignIn</li>
        <li onClick={() => {props.changeRoute('signup')}}>SignUp</li>
      </ul>
    </div>
  );
}

<button onClick={() => { this.props.changeRoute('planes'); }}>Planes</button>

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
  constructor(props) {
    super(props);
    this.state = {
      route: 'signup'
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

    return(
      <div className='wrapper'>
        <Nav changeRoute={this.changeRoute}/>
        <h1>Mood App</h1>
        {content}
      </div>
    );
  }
}
