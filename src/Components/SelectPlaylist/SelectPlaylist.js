import './SelectPlaylist.css'
import React from 'react';

export class SelectPlaylist extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection() {
    this.props.onSelection(this.props.playlist.id);
  }

  render() {
    return (
      <button className="SelectPlaylist" onClick={this.handleSelection}>{this.props.playlist.name}</button>
    );
  }
}