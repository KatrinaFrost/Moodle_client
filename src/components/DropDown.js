import React, {Component} from 'react';

export default class DropDown extends Component {
  constructor(){
    super();
    this.state = {
      showDropDown: false,
    }
  }

  handleClick = () => {
    if(this.state.showDropDown) {
      this.setState({showDropDown: false});
    } else {
      this.setState({showDropDown: true});
    }
  };

  handleClickBeyond = (e) => {
    if (e.target != this.refs.profilePic) {
      this.setState({showDropDown: false})
    }
  };

  componentWillMount() {
    window.addEventListener("click", this.handleClickBeyond, false);
  }

  componentWillUnMount() {
    window.removeEventListener("click", this.handleClickBeyond, false);
  }

  dropDownTag() {
    return(
      <div className="dropdown" ref="dropdown">
      <ul>
        <li onClick={() => {this.props.changeRoute('aboutus')}}>Overview</li>
        <li onClick={() => {this.props.changeRoute('overview')}}>Global Mood</li>
      </ul>

      </div>
    );
  }
  render() {
    return(
      <div className="dropdown">
        <img src="/emojis/happy.png" onClick={this.handleClick} ref="profilePic"/>
        {
          this.state.showDropDown ? this.dropDownTag() : null
        }
      </div>
    );
  }
}
