import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Diary.css';

const SERVER_PREFIX = 'http://localhost:2000/'

class DiaryEntry extends Component {
  constructor (props) {
    super(props);
    this.state = {entry: ''};
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.setState({ entry: e.target.value })
    // this.props.onInputChange(this.state.entry);
  }

  onSubmit(){
    this.props.addEntry(this.state.entry);
    this.setState({ entry: '' });
  }

  render() {
    return (
      <div className="diary-entry">
        <h1 className="diaryH1">(user name)'s' Diary</h1>
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

const EntryList = (props) => {
  const entries = props.entries.map((entry) => {
    return (
      <div className="entry" key={entry.id}>
        <div className="date">{entry.date}</div>
        <div className="note">{entry.note}</div>
      </div>
    );
  });

  return (
    <ul className="">
      {entries}
    </ul>
  );
};

export default class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: {},
      entries: []
    };
  }

  onDiaryEntryChange(entry) {
    this.setState({entry});
  }

  addEntry(entry){

    // post data to Ruby.
    axios.post(SERVER_PREFIX + 'diary/', {
      diary_entry: entry
    })
    .then(function (response) { // this promise returns a valid response.

      // once the data has been stored in Ruby - bind it to the view.
      // We could bind to the view before?
      let entriesData = this.state.entries.slice();
      let id = entriesData.length;
      let date = moment().format("MMM Do YY");
      let entryTransformed = { id: id, date: date.toString(), note: entry };
      entriesData.push(entryTransformed);
      this.setState({ entries: entriesData });

      console.log(response);

    })
    .catch(function (error) { // catch api error if not successful
      console.log(error);
    });

    // axios.post(SERVER_PREFIX + '/diaries/new',
    //   .then((results) => {
    //     console.log('Hello', results);
    //   })

  }

  getDiary() {
    axios.get(SERVER_PREFIX + 'diary.json').then((results) => {
      let entryResults = [];
      for (var i = 0; i < results.data.length; i++) {
        results.data[i].id = i; // fix.
        entryResults.push(results.data[i].diary_entry);
      }
      this.setState({
        entries: entryResults
        // current_user_id: results.data[2].id
        // console.log(this.state);
      });
      console.log(this.state);
    });
  }

  componentDidMount(){
    this.getDiary();
  }

  render() {
    return (
      <div className="Diary">
        <DiaryEntry addEntry={(entry) => this.addEntry(entry)} />
        <EntryList entries={this.state.entries} />
        {this.state.entries.map((entry, index) => (
          <p key={index}>{entry}</p> )
        )}
      </div>
    );
  }
};
