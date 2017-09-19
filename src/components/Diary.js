import React, { Component } from 'react';
import moment from 'moment';

// a page component to add into app.js and home.js to route
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
        <h1>Diary</h1>
        <textArea
          value={this.state.entry}
          onChange={this.onInputChange} />
          <button
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


  // this.onDiaryEntryChange('happy');
  //  const r1 = sentiment('Cats are stupid.');
  //  console.dir(r1); // Score: -2, Comparative: -0.666

  

  onDiaryEntryChange(entry) {
    this.setState({entry});
  }

  addEntry(entry){
    let entriesData = this.state.entries.slice();
    let id = entriesData.length;
    let date = moment().format("MMM Do YY");
    let entryTransformed = { id: id, date: date.toString(), note: entry };
    entriesData.push(entryTransformed);
    this.setState({ entries: entriesData });
  }

  render() {
    return (
      <div className="Diary">
        <DiaryEntry addEntry={(entry) => this.addEntry(entry)} />
        <h3>Diary Entry Date </h3>
        <EntryList entries={this.state.entries} />
      </div>
    );
  }
};
