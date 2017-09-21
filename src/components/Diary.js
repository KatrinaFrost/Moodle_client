import React, { Component } from 'react';
import axios from 'axios';
import sentiment from 'sentiment';
import './Diary.css';

// ----------- Adds to the new local host port ------------------ //
const SERVER_PREFIX = 'https://inner-emoji.herokuapp.com/'

// ------------------------------- //

class DiaryEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {entry: ''};
    this.onInputChange = this.onInputChange.bind(this);
  }

// ------------------------------- //

  onInputChange(e) {
    this.setState({ entry: e.target.value })
    // this.props.onInputChange(this.state.entry);
  }

// ------------------------------- //

  onSubmit(){
    this.props.addEntry(this.state.entry);
    this.setState({ entry: '' });
  }

// ------------------------------- //
  render() {
    return (
      <div className="diary-entry">
        <h1 className="diaryH1">Amandas Diary</h1>
        <textArea className="diaryTextArea"
          value={this.state.entry}
          onChange={this.onInputChange} />
          <button className="diaryButton"
            onClick={event => this.onSubmit()}
            onChange={event => this.onInputChange(event.target.value)}
            className="add-entry">
            Add Entry
          </button>
      </div>
    );
  }
}

// ------------------------------- //

const EntryList = (props) => {
  console.log(props);
  const entries = props.entries.map((entry, i) => {
    var [text, date] = entry;
    return (
      <div className="entry" key={i}>
        <h4 className="date"> {date.split('-').reverse().join('-')}</h4>
        <h4 className="text">{text}</h4>
      </div>
    );
  });


// ------------------------------- //
  return (
    <div className="entryContainer">
      {entries}
    </div>
  );
};

// ------------------------------- //

export default class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: {},
      entries: []
    };
  }

// ------------------------------- //

  onDiaryEntryChange(entry) {
    this.setState({entry});
  }

// ------------------------------- //
  addEntry(entry){
    // post data to Ruby.
    axios.post(SERVER_PREFIX + 'diary/', {
      when: new Date(),
      diary_entry: entry
    })

// ------------------------------- //
  .then(function (response) { // this promise returns a valid response
    let entriesData = this.state.entries.slice();
    entriesData.unshift([response.data.diary_entry, response.data.when]);
    this.setState({ entries: entriesData });
  }

// ------------------------------- //
  .bind(this))

// ------------------------------- //
  .catch(function (error) { // catch api error if not successful
    console.log(error);
    });
  }

// ------------------------------- //
  getDiary() {
    axios.get(SERVER_PREFIX + 'diary.json').then((results) => {
      let entryResults = [];
      for (var i = 0; i < results.data.length; i++) {
        results.data[i].id = i; // fix.
        entryResults.push([results.data[i].diary_entry, results.data[i].when]);
      }
      this.setState({
        entries: entryResults
        // current_user_id: results.data[2].id
        // console.log(this.state);
      });
      console.log(this.state);
    });
  }

// ------------------------------- //
  componentDidMount(){
    this.getDiary();
  }

// ------------------------------- //



// ------------------------------- //


  render() {
    return (
      <div className="diary">
        <DiaryEntry addEntry={(entry) => this.addEntry(entry)} />
        <EntryList entries={this.state.entries} />
      </div>
    );
  }
};
