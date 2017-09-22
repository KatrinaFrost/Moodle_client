import React, {Component} from 'react';
import axios from 'axios';
import {HeatMap} from './HeatMap'
import {TagCanvasComponent} from './TagCanvasComponent'
import Diary from './Diary';
import DropDown from './DropDown';
import BarChart from 'react-bar-chart';



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

  let moodName = props.mood === null ? 'Nothing is selected.' : props.moods.filter((mood) => {
    return mood.id === props.mood;
  })[0].name;

  return(
    <div className='mood_entry_form'>
      <h2
      className='prompt_user'>Hey <User name={props.name}/>! How are you feeling today?</h2>
      <div className='explain_user'>
        <p> Log your daily mood by <strong>clicking</strong> on one of the emojis.</p>
        <p>You can change the record as many times as you like on the same day.</p>
      </div>
      <div className='moods_wrapper'>
        { props.moods.map((mood) => {
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
    this.state = { email: '', password: '' };
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
          <input type='email' placeholder='Email' onChange={ this._handleChangeEmail } value={ this.state.email } autoFocus/>
          <br />
          <input type='password' placeholder='Password' onChange={ this._handleChangePassword } value={ this.state.password } />
          <br />
          <div className='loginButton'>
          <button type='submit' method='post'>Log In</button>
          </div>
        </form>
      </div>

    );
  }
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', password: '', password_confirmation: '' };
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
      <h2 className="intro secondaryFont">Capture your mood & thoughts.</h2>
      <h3 className="intro">Keep track of your mood by selecting an Emoji, and enter a diary log for the day. Inner emoji offers you a variety of features… and it’s free!</h3>

      <div className='signup'>
        <form onSubmit={ this._handleSubmit }>
          <h3>Please Sign Up Here</h3>
          <br />
          <i class="fa fa-user-circle-o signup-icon" aria-hidden="true"></i><input type='text' placeholder='Name' onInput={ this._handleNameChange } value={ this.state.name } autoFocus />
          <br />
          <input type='email' placeholder='Email' onInput={ this._handleChangeEmail } value={ this.state.email } />
          <br />
          <input type='password' placeholder='Password' onInput={ this._handleChangePassword } value={ this.state.password } />
          <br />
          <input type='password' placeholder='Confirm Password' onInput={ this._handleConfirmChange } value={ this.state.password_confirmation } />
          <br />
          <button type='submit' method='post'>Sign Up</button>
        </form>
      </div>
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

          <li className='mood_logo logoFont' type="button" onClick={() => {props.changeRoute('overview')}}>Inner Emoji ...</li>
          <li type="button" onClick={() => {props.changeRoute('globalmood')}}>
            <span><i className="fa fa-globe" aria-hidden="true"></i> World Mood</span>
          </li>

          <li type="button" onClick={() => {props.changeRoute('signin')}}>
            <span><i className="fa fa-book" aria-hidden="true"></i> Create a Diary</span>
          </li>

          <li type="button" onClick={() => {props.changeRoute('signin')}}>
            <span><i className="fa fa-sign-in" aria-hidden="true"></i> Sign In</span>
          </li>

          <li type="button" onClick={() => {props.changeRoute('signup')}}>
            <span><i className="fa fa-pencil" aria-hidden="true"></i> Sign Up</span>
          </li>

        </ul> }
        { props.user &&
        <ul>

          <li className='mood_logo logoFont' onClick={() => {props.changeRoute('overview')}}>Inner Emoji ...</li>

          <li><DropDown changeRoute={props.changeRoute} user={props.user.email}/></li>

          <li><User name={props.email}/></li>

          <li type="button" onClick={props.logout}>LogOut</li>

          <li type="button" onClick={() => {props.changeRoute('diary')}}>Create a Diary</li>

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
      moods: [{
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
      }],
      moodEntries: [],
      mood: null,
      words: [],
    }

    this.changeRoute = this.changeRoute.bind(this);
    this.setMood = this.setMood.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getWords = this.getWords.bind(this);
    this.getMoodTotals = this.getMoodTotals.bind(this);
    this.getMoodEntries = this.getMoodEntries.bind(this);
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
      route: 'home' || 'diary'
    });

    this.getUsers();
    this.getMoodEntries();
  }

  logout() {
    axios.delete(SERVER_PREFIX + 'login',{
      withCredentials: true
    }).then((results) => {

      this.setState({
        user: null,
        route: 'overview'
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

  getMoodTotals() {
    axios.get(SERVER_PREFIX + 'moods').then((results) => {
      this.setState({
        moodTotals: Object.keys(results.data).map((moodId) => {
          return {
            text: this.state.moods.filter((mood) => {
              return mood.id.toString() === moodId;
            })[0].name,
            value: results.data[moodId]
          }
        })
      })
    })
  }

  getMoodEntries() {
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

      this.getMoodEntries();
    });
  }

  changeRoute(route) {
    window.location.hash = route;
    this.setState({route});
  }

  componentDidMount() {
    this.getWords();
    this.getMoodTotals();
  }

  render() {
    let content = <div>ERROR: No such route</div>;
    let routeName = this.state.route;

    if (routeName === 'home') {
      content = <div className='user_page'><MoodEntryForm name={this.state.user ? this.state.user.name : 'Guest'} setMood={this.setMood} moods={this.state.moods} mood={this.state.mood} />
        <HeatMap moodEntries={this.state.moodEntries}/>
      </div>;
    }

    if (routeName === 'overview') {
      content = <div className='wrapper'>

        <p className="intro secondaryFont">See how the world is feeling. Simply hover over the globe to spin through the moods.</p>

        <TagCanvasComponent words={this.state.words}/>
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

    if (routeName === 'globalmood') {
      content = <div className='wrapper'>
      <BarChart data={this.state.moodTotals || []}
        margin={{top: 20, right: 20, bottom: 30, left: 40}}
        width={800}
        height={500}
        ylabel='Mood'
      />
      </div>
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
