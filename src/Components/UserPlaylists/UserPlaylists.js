import './UserPlaylists.css';
import React from 'react';
import { SelectPlaylist } from '../SelectPlaylist/SelectPlaylist';

export class UserPlaylists extends React.Component {
  constructor(props) {
    super(props);

    this.handlePlaylistSelected = this.handlePlaylistSelected.bind(this);
  }

  handlePlaylistSelected(id) {
    this.props.onSelection(id);
  }

  render() {
    return (
      <div className="UserPlaylists">
        <h2>User's Playlists</h2>
        {this.props.playlists.items&&this.props.playlists.items.map(playlist => (
          <SelectPlaylist onSelection={this.props.onSelection} key={playlist.id} playlist={playlist} />
        ))}
      </div>
    );
  }
}