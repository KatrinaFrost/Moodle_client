/*global TagCanvas */

import React, {Component} from 'react';

export class TagCanvasComponent extends Component {
  componentDidMount() {
      try {
        TagCanvas.Start('myCanvas','tags',{
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
        <li><a href="somevalue">Mood</a></li>
        <li><a href="somevalue">Hood</a></li>
        <li><a href="somevalue">Table</a></li>
        <li><a href="somevalue">Excited</a></li>
        <li><a href="somevalue">Happy</a></li>
        <li><a href="somevalue">Upset</a></li>
        <li><a href="somevalue">Energetic</a></li>
        <li><a href="somevalue">Amazing</a></li>
        <li><a href="somevalue">Awesome</a></li>
        <li><a href="somevalue">Mood</a></li>
        <li><a href="somevalue">Hood</a></li>
        <li><a href="somevalue">Table</a></li>
        <li><a href="somevalue">Excited</a></li>
        <li><a href="somevalue">Happy</a></li>
        <li><a href="somevalue">Upset</a></li>
        <li><a href="somevalue">Energetic</a></li>
        <li><a href="somevalue">Amazing</a></li>
        <li><a href="somevalue">Awesome</a></li>
        <li><a href="somevalue">Mood</a></li>
        <li><a href="somevalue">Hood</a></li>
        <li><a href="somevalue">Table</a></li>
        <li><a href="somevalue">Excited</a></li>
        <li><a href="somevalue">Happy</a></li>
        <li><a href="somevalue">Upset</a></li>
        <li><a href="somevalue">Energetic</a></li>
        <li><a href="somevalue">Amazing</a></li>
        <li><a href="somevalue">Awesome</a></li>
      </ul>
    </div>
  </div>
  );
}}
