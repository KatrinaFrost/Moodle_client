import React, {Component} from 'react';
import axios from 'axios';
import {BarChart} from './TestD3'
import {WorldMap} from './WorldMap'
import {HeatMap} from './HeatMap'

const SERVER_PREFIX = 'http://localhost:2000/'

const sampleMoodEntries = [{
    when: new Date('2017-09-01'),
    mood: 0
  }, {
    when: new Date('2017-09-02 10:03:00Z'),
    mood: 2
  }, {
    when: new Date('2017-09-03'),
    mood: 4
  }, {
    when: new Date('2017-09-04'),
    mood: 1
  }, {
    when: new Date('2017-09-05'),
    mood: 3
  }, {
    when: new Date('2017-09-06'),
    mood: 0
  }, {
    when: new Date('2017-09-07'),
    mood: 4
  }, {
    when: new Date('2017-09-08'),
    mood: 2
  }, {
    when: new Date('2017-09-09'),
    mood: 1
  }, {
    when: new Date('2017-09-10'),
    mood: 4
  }, {
    when: new Date('2017-09-12'),
    mood: 2
  }, {
    when: new Date('2017-09-13'),
    mood: 3
  }, {
    when: new Date('2017-09-14'),
    mood: 4
  }, {
    when: new Date('2017-09-16'),
    mood: 0
  }
];

class User extends Component {
  render() {
    return (
      <div className='user'>
        {this.props.name}
      </div>
    );
  }
}

function MoodEntryForm(props) {
  return(
    <div className='mood_entry_form'>
      <h2>Hey <User name={props.name}/>! How is your mood today?</h2>
      <img onClick={()=>{props.setMood(4)} } src='https://damonbraces.com/img/bethany-hamilton/emoji/DamonBraces_S016.png' />
      <img onClick={()=>{props.setMood(3)} } src='https://cdn.shopify.com/s/files/1/0185/5092/products/persons-0025_large.png?v=1369543915' />
      <img onClick={()=>{props.setMood(2)} } src='https://cdn.shopify.com/s/files/1/0185/5092/products/persons-0051_large.png?v=1369543585' />
      <img onClick={()=>{props.setMood(1)} } src='https://4.bp.blogspot.com/-xjLbvdPaPBo/WJn4xvGuOmI/AAAAAAAAT9M/v8yMC3d7rnYcQQWIdQiizVMehoZmgY99ACLcB/s1600/tearful-emoji.png' />
      <img onClick={()=>{props.setMood(0)} } src="https://t4.ftcdn.net/jpg/00/44/09/63/160_F_44096352_Owh22958YmSH8pPUXhX4RFlXXAKqESlT.jpg" />
    </div>
  );
}

function Footer (props) {
  return (
    <div className='footer'>
      &#169; Amanda  ☁  Katrina  ⚒  Reeta ⚡
    </div>
  )
}

function Nav (props) {
  return (
    <div className='nav'>
      <ul>
        <li className='mood_logo' onClick={() => {props.changeRoute('home')}}>Inner Emoji</li>
        <li><User name={props.name}/></li>
        <li onClick={() => {props.changeRoute('overview')}}>Overview</li>
        <li onClick={() => {props.changeRoute('globalmood')}}>Global Mood</li>
        <li>Diary Entry</li>
        <li onClick={() => {props.changeRoute('analytics')}}>Admin/Analytics</li>
        <li onClick={() => {props.changeRoute('aboutus')}}>About Us</li>
        <li onClick={() => {props.changeRoute('signin')}}>SignIn</li>
        <li onClick={() => {props.changeRoute('signup')}}>SignUp</li>
        <li onClick={() => {props.changeRoute('home')}}>Home</li>
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
      route: 'home',
      users: [],
      current_user_id: null,
      moodEntries: []
    }


  this.changeRoute = this.changeRoute.bind(this);
  this.setMood = this.setMood.bind(this);
  this.getUsers = this.getUsers.bind(this);
  this.getMoods = this.getMoods.bind(this);
  }

  setMood(mood) {
    // this.setState((prevState, props) => {
    //   return {
    //     moodEntries: prevState.moodEntries.concat({
    //       when: new Date(),
    //       mood: mood
    //     })
    //   }
    // })
    axios.post(SERVER_PREFIX + 'mood_entry.json', { mood_entry: {
      user_id: 1,
      when: new Date(),
      mood: mood
    }}).then(() =>{
      this.getMoods();
    });
  }

  changeRoute(route) {
    this.setState({route});
  }

  getUsers() {
    axios.get(SERVER_PREFIX + 'user.json').then((results) => {
      this.setState({
        users: results.data,
        current_user_id: results.data[0].id
      });
    });
  }
  getMoods() {
    axios.get(SERVER_PREFIX + 'mood_entry.json').then((results) => {
      this.setState({
        moodEntries: results.data,
      })
    })
  }

  componentDidMount(){
    this.getUsers();
    this.getMoods();
  }

  render() {
    let content = <div>ERROR: No such route</div>;
    let routeName = this.state.route;
    let userName = this.state.current_user_id ? this.state.users.filter((user) => { return user.id === this.state.current_user_id; })[0].name : '';

    if (routeName === 'home') {
      content = <div className='wrapper'><MoodEntryForm name={userName} setMood={this.setMood}/><HeatMap moodEntries={this.state.moodEntries}/></div>;
    }

    if (routeName === 'overview') {
      content = <div className='wrapper'><User name={userName}/><BarChart data={[5,6,7,2,4,7]} size={[500,500]}/></div>;
    }

    if (routeName === 'signin') {
      content = <SignIn />;
    }

    if (routeName === 'signup') {
      content = <SignUp />;
    }

    if (routeName === 'aboutus') {
      content = (<AboutUs />);
    }
    if (routeName === 'analytics') {
      content = (<BarChart data={[5,6,7,2,4,7]} size={[500,500]}/>);
    }

    if (routeName === 'globalmood') {
      content = <div className='wrapper'><GlobalMood /><WorldMap /></div>
    }

    return(
      <div className='wrapper'>
        <Nav changeRoute={this.changeRoute} name={userName}/>
        {content}
        <Footer />

      </div>
    );
  }
}
