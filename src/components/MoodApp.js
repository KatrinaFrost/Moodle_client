import React, {Component} from 'react';
import axios from 'axios';
import {BarChart} from './TestD3'
import {WorldMap} from './WorldMap'
import {HeatMap} from './HeatMap'
import {TagCanvasComponent} from './TagCanvasComponent'
import Diary from './Diary';

const SERVER_PREFIX = 'http://localhost:2000/'

class User extends Component {
  render() {
    return (
      <div className='user'>
        {this.props.name}
      </div>
    );
  }
}

function MoodEntryForm (props) {
  const moods = [{
    id: 0,
    name: 'Sad',
    img: './emojis/sad.png'
  },{
    id: 1,
    name: 'Calm',
    img: './emojis/calm.png'
  },{
    id: 2,
    name: 'Energetic',
    img: './emojis/energetic.png'
  },{
    id: 3,
    name: 'Relaxed',
    img: './emojis/relaxed.png'
  },{
    id: 4,
    name: 'Happy',
    img: './emojis/happy.png'
  },];

  let moodName = props.mood === null ? 'Nothing is selected.' : moods.filter((mood) => {
    return mood.id === props.mood;
  })[0].name;

  return(
    <div className='mood_entry_form'>
      <h2 className='prompt_user'>Hey <User name={props.name}/>! How is your mood today?</h2>
      <div className='explain_user'>
        <p>Record your daily mood by <strong>click</strong>ing on one of the emojis.</p>
        <p>You can change the record as many times as you like <strong>on the same day</strong>.</p>
      </div>
      <div className='moods_wrapper'>
        { moods.map((mood) => {
          return (
            <div key={mood.id} onClick={()=>{props.setMood(mood.id)}} className={props.mood === mood.id ? 'moods selected' : 'moods'}>
              <img alt='moods' src={mood.img} key={mood.id}/>
              <p className='emoji_caption'>{mood.name}</p>
            </div>
          );
        })}
      </div>
      <p className={props.mood === null ? 'message hidden' : 'message'}>Your mood <strong>{moodName}</strong> is recorded in the Moods Calendar.</p>
    </div>
  );
}

function Footer (props) {
  return (
    <div className='footer'>
      <span>&#169;</span> Amanda  ☁  Katrina  ⚒  Reeta ⚡
    </div>
  )
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


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { email: 'anna@ga.co', password: 'chicken', password_confirmation: 'chicken' };
    this._handleSubmit = this._handleSubmit.bind(this);

    this._handleChangeEmail = this._handleChangeEmail.bind(this);
    this._handleChangePassword = this._handleChangePassword.bind(this);
    this._handleConfirmChange = this._handleConfirmChange.bind(this);
  }

  _handleConfirmChange(c) {
    this.setState( { password_confirmation: c.target.value } );
  }

  _handleChangePassword(p) {
    this.setState( { password: p.target.value } );
  }

  _handleChangeEmail(e) {
    this.setState( { email: e.target.value } );
    // console.log( t.target.value );
  }

  _handleSubmit(f) {
    f.preventDefault(f);
    console.log(this.state);
    this.saveUser();
  }

  saveUser() {
    axios.post( `${SERVER_PREFIX}users`, {
      user: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      }
    }).then(function (result) {
      console.log( result );
    })
  }

  render() {
    return (
      <form onSubmit={ this._handleSubmit }>
        Please Sign Up Here:
        <br />

        Email Address: <input type='email' placeholder='Type your email here' onInput={ this._handleChangeEmail } value={ this.state.email } />
        <br />
        Password: <input type='password' placeholder='Type your password here' onInput={ this._handleChangePassword } value={ this.state.password } />
        <br />
        Confirm Password: <input type='password' placeholder='Confirm your password' onInput={ this._handleConfirmChange } value={ this.state.password_confirmation } />
        <br />
        <button type='submit' method='post'>Sign Up</button>
      </form>
    );
  }
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

function Nav (props) {
  return (
    <div className='navbar'>
      <ul>
        <li className='mood_logo' onClick={() => {props.changeRoute('home')}}>Inner Emoji</li>
        <li><User name={props.name}/></li>
        <li onClick={() => {props.changeRoute('overview')}}>Overview</li>
        <li onClick={() => {props.changeRoute('globalmood')}}>Global Mood</li>
        <li onClick={() => {props.changeRoute('diary')}}>Diary</li>
        <li onClick={() => {props.changeRoute('analytics')}}>Admin/Analytics</li>
        <li onClick={() => {props.changeRoute('aboutus')}}>About Us</li>
        <li onClick={() => {props.changeRoute('signin')}}>SignIn</li>
        <li onClick={() => {props.changeRoute('signup')}}>SignUp</li>
        <li onClick={() => {props.changeRoute('home')}}>Home</li>
      </ul>
    </div>
  );
}

export class MoodApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: window.location.hash ? window.location.hash.slice(1) : 'home',
      users: [],
      current_user_id: null,
      moodEntries: [],
      mood: null
    }

  this.changeRoute = this.changeRoute.bind(this);
  this.setMood = this.setMood.bind(this);
  this.getUsers = this.getUsers.bind(this);
  this.getMoods = this.getMoods.bind(this);
  }


  setMood(mood) {

    this.setState((prevState, props) => {
      return {
        mood: mood
      }
    });

    axios.post(SERVER_PREFIX + 'mood_entry.json', { mood_entry: {
      user_id: 1,
      when: new Date(),
      mood: mood
    }}).then(() =>{
      this.getMoods();
    });
  }

  changeRoute(route) {
    window.location.hash = route;
    this.setState({route});
  }

  getUsers() {
    axios.get(SERVER_PREFIX + 'users.json').then((results) => {
      this.setState({
        users: results.data,
        current_user_id: results.data[2].id
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
      content = <div className='user_page'><MoodEntryForm name={userName} setMood={this.setMood} mood={this.state.mood} /><HeatMap moodEntries={this.state.moodEntries}/></div>;
    }
    // <TagCanvasComponent />

    if (routeName === 'overview') {
      content = <div className='wrapper'><User name={userName}/><BarChart data={[5,6,7,2,4,7]} size={[500,500]}/></div>;
    }

    if (routeName === 'diary') {
      content = <Diary />;
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
      content = (<BarChart data={[4,3,3,2,4,1]} size={[500,500]}/>);
    }

    if (routeName === 'globalmood') {
      content = <div className='wrapper'><GlobalMood /><WorldMap /></div>
    }

    return(
      <div className='container'>
        <Nav changeRoute={this.changeRoute} name={userName}/>
        {content}
        <Footer />
      </div>
    );
  }
}
