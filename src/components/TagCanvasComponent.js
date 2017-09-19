/*global TagCanvas */

import React, {Component} from 'react';

export class TagCanvasComponent extends Component {
  componentDidMount() {
      try {
        TagCanvas.Start('myCanvas','tags', {
          textColour: '#ff0000',
          outlineColour: '#ff00ff',
          reverse: true,
          depth: 0.8,
          maxSpeed: 0.05
        });
      } catch(e) {
        // something went wrong, hide the canvas container
        document.getElementById('myCanvasContainer').style.display = 'none';
    };
  }
  render (){
    return (
      <div className='wrapper'>
        <div id="myCanvasContainer">
          <canvas width="300" height="300" id="myCanvas">
            <p>Anything in here will be replaced on browsers that support the canvas element</p>
            </canvas>
        </div>
        <div id="tags">
        <ul>
          <li><a onClick={()=>{this.props.setMood(4)} } href="happy">Happy</a></li>
          <li><a href="moods">Excited</a></li>
          <li><a href="moods">Calm</a></li>
          <li><a href="moods">Relaxed</a></li>
          <li><a onClick={()=>{this.props.setMood(1)} } href="upset">Upset</a></li>
          <li><a href="else">Bored</a></li>
          <li><a href="else">Tensed</a></li>
          <li><a href="else">Stressed</a></li>
          <li><a href="else">Happy</a></li>
          <li><a href="else">Excited</a></li>
          <li><a href="else">Calm</a></li>
          <li><a href="else">Relaxed</a></li>
          <li><a href="else">Upset</a></li>
          <li><a href="else">Bored</a></li>
          <li><a href="else">Tensed</a></li>
          <li><a href="else">Stressed</a></li>
          <li><a href="else">Tensed</a></li>
          <li><a href="else">Stressed</a></li>
          <li><a href="else">Happy</a></li>
          <li><a href="else">Excited</a></li>
          <li><a href="else">Calm</a></li>
        </ul>
      </div>
    </div>
    );
  }
}
