import React, {Component} from 'react';
import axios from 'axios';
import {BarChart} from './TestD3'
import {BarChartReady} from './BarChart'
import {WorldMap} from './WorldMap'
import {HeatMap} from './HeatMap'
import {TagCanvasComponent} from './TagCanvasComponent'
import Diary from './Diary';
import DropDown from './DropDown'


const SERVER_PREFIX = 'https://inner-emoji.herokuapp.com/'

class User extends Component {
  render() {
    return (
      <div className='user'>
        {this.props.name ? this.props.name : '' }
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
  }];

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

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { email: 'amanda@ga.co', password: 'chicken' };
    this._handleSubmit = this._handleSubmit.bind(this);

    this._handleChangeEmail = this._handleChangeEmail.bind(this);
    this._handleChangePassword = this._handleChangePassword.bind(this);
  }

  _handleChangePassword(p) {
    this.setState( { password: p.target.value } );
  }

  _handleChangeEmail(e) {
    this.setState( { email: e.target.value } );
  }

  _handleSubmit(si) {
    si.preventDefault(si);
    this.getUser();
  }

  getUser() {
    axios.post(`${SERVER_PREFIX}login`, {
      email: this.state.email,
      password: this.state.password,
    }, {
      withCredentials: true
    }).then(function (result) {
      this.props.setUser(result.data);
    }.bind(this));
  }

  render() {
    return (
      <div className='signin'>
        <form onSubmit={ this._handleSubmit }>
          <h3>Login</h3>
          <input type='email' placeholder='Type your email here' onChange={ this._handleChangeEmail } value={ this.state.email } autoFocus/>
          <br />
          <input type='password' placeholder='Type your password here' onChange={ this._handleChangePassword } value={ this.state.password } />
          <br />
          <button type='submit' method='post'>Sign In</button>
        </form>
      </div>
    );
  }
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { name: 'Anna', email: 'anna@ga.co', password: 'chicken', password_confirmation: 'chicken' };
    this._handleSubmit = this._handleSubmit.bind(this);

    this._handleNameChange = this._handleNameChange.bind(this);
    this._handleChangeEmail = this._handleChangeEmail.bind(this);
    this._handleChangePassword = this._handleChangePassword.bind(this);
    this._handleConfirmChange = this._handleConfirmChange.bind(this);
  }

  _handleNameChange(n) {
    this.setState( { name: n.target.value } );
  }

  _handleConfirmChange(c) {
    this.setState( { password_confirmation: c.target.value } );
  }

  _handleChangePassword(p) {
    this.setState( { password: p.target.value } );
  }

  _handleChangeEmail(e) {
    this.setState( { email: e.target.value } );
  }

  _handleSubmit(f) {
    f.preventDefault(f);
    this.saveUser();
  }

  saveUser() {
    axios.post( `${SERVER_PREFIX}users`, {
      user: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation
      }
    },{
      withCredentials: true
    }).then(function (result) {
      this.props.setUser(result.data);
    }.bind(this))
  }

  render() {
    return (

      <div className='whySignup'>
      <h1 className="whySignupH1">Inner Emoji</h1>
      <h2>The safest place for your thoughts keep a private and free online diary</h2>
      <h3>Keep your diary securely on the Internet – to provide a convenient user experience your personal online diary. Inner emoji offers you a variety of features… and it’s free!</h3>

      <div className='signup'>
        <form onSubmit={ this._handleSubmit }>
          <h3>Please Sign Up Here:</h3>
          <br />
          Name: <input type='text' placeholder='Type your name here' onInput={ this._handleNameChange } value={ this.state.name } autoFocus />
          <br />
          Email Address: <input type='email' placeholder='Type your email here' onInput={ this._handleChangeEmail } value={ this.state.email } />
          <br />
          Password: <input type='password' placeholder='Type your password here' onInput={ this._handleChangePassword } value={ this.state.password } />
          <br />
          Confirm Password: <input type='password' placeholder='Confirm your password' onInput={ this._handleConfirmChange } value={ this.state.password_confirmation } />
          <br />
          <button type='submit' method='post'>Sign Up</button>
        </form>
      </div>
      </div>
    );
  }
}

function AboutUs (props) {
  return (
    <div className='aboutus'>
      <p>
      </p>
      <p></p>
    </div>
  );
}

class GlobalMood extends Component {
  render() {
    return (
      <div className='globalmood'>
        <p>Mood Globe Coming soon... but it did not unfortunately. Although, we have D3 global map.</p>
      </div>
    );
  }
}

function Nav (props) {
  return (
    <div className='nav_wrapper'>
      <div className='navbar'>
        { !props.user &&
        <ul>
          <li className='mood_logo' onClick={() => {props.changeRoute('overview')}}>Inner Emoji</li>
          <li onClick={() => {props.changeRoute('globalmood')}}>Global Mood</li>
          <li onClick={() => {props.changeRoute('analytics')}}>Admin/Analytics</li>
          <li onClick={() => {props.changeRoute('aboutus')}}>About Us</li>
          <li onClick={() => {props.changeRoute('overview')}}>Overview</li>
          <li onClick={() => {props.changeRoute('signin')}}>SignIn</li>
          <li onClick={() => {props.changeRoute('signup')}}>SignUp</li>
        </ul> }
        { props.user &&
        <ul>
          <li className='mood_logo' onClick={() => {props.changeRoute('overview')}}>Inner Emoji</li>
          <li onClick={() => {props.changeRoute('analytics')}}>Admin/Analytics</li>
          <li onClick={() => {props.changeRoute('aboutus')}}>About Us</li>
          <li onClick={() => {props.changeRoute('diary')}}>Create a Diary</li>
          <li><DropDown changeRoute={props.changeRoute} /></li>
          <li><User name={props.email}/></li>
          <li onClick={props.logout}>LogOut</li>
        </ul> }
      </div>
    </div>
  );
}

export class MoodApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: window.location.hash ? window.location.hash.slice(1) : 'overview',
      user: null,
      users: [],
      moodEntries: [],
      mood: null,
      words: [],
    }

    this.changeRoute = this.changeRoute.bind(this);
    this.setMood = this.setMood.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getWords = this.getWords.bind(this);
    this.getMoods = this.getMoods.bind(this);
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  getUsers() {
    axios.get(SERVER_PREFIX + 'users.json',{
      withCredentials: true
    }).then((results) => {
      this.setState({
        users: results.data
      });
    });
  }

  setUser(user) {
    this.setState({
      user: user,
      route: 'home'
    });
    this.getUsers();
    this.getMoods();
  }

  logout() {
    axios.delete(SERVER_PREFIX + 'login',{
      withCredentials: true
    }).then((results) => {
      this.setState({
        user: null,
        route: 'aboutus'
      });

    });
  }

  getWords() {
    axios.get(SERVER_PREFIX + 'words').then((results) => {
      this.setState({
        words: results.data,
      })
    })
  }

  getMoods() {
    axios.get(SERVER_PREFIX + 'mood_entry.json',{
      withCredentials: true
    }).then((results) => {
      this.setState({
        moodEntries: results.data,
      })
    })
  }

  setMood(mood) {
    this.setState((prevState, props) => {
      return {
        mood: mood
      }
    });

    axios.post(SERVER_PREFIX + 'mood_entry.json', { mood_entry: {
      when: new Date(),
      mood: mood
    }},{
      withCredentials: true
    }).then(() => {
      this.getMoods();
    });
  }

  changeRoute(route) {
    window.location.hash = route;
    this.setState({route});
  }

  componentDidMount() {
    this.getWords();
  }

  render() {
    let content = <div>ERROR: No such route</div>;
    let routeName = this.state.route;

    if (routeName === 'home') {
      content = <div className='user_page'><MoodEntryForm name={this.state.user ? this.state.user.name : 'Guest'} setMood={this.setMood} mood={this.state.mood} />
        <HeatMap moodEntries={this.state.moodEntries}/>
      </div>;
    }

    if (routeName === 'overview') {
      content = <div className='wrapper'><User name={this.state.user}/><TagCanvasComponent words={this.state.words}/>
    </div>;
    }

    if (routeName === 'diary') {
      content = <Diary />;
    }

    if (routeName === 'signin') {
      content = <SignIn setUser={this.setUser} />;
    }

    if (routeName === 'signup') {
      content = <SignUp setUser={this.setUser}/>;
    }

    if (routeName === 'aboutus') {
      content = (<AboutUs />);
    }

    if (routeName === 'analytics') {
      content = (<BarChart data={[0,1,2,3,4]} labels={['a', 'b', 'c', 'd', 'e']} size={[500,500]}/>);
    }

    if (routeName === 'globalmood') {
      content = <div className='wrapper'><GlobalMood /><WorldMap /></div>
    }

    return(
      <div className='container'>
        <Nav changeRoute={this.changeRoute} user={this.state.user} logout={this.logout}/>
        {content}
        <Footer />
      </div>
    );
  }
}
