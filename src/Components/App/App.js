import './App.css';
import React from 'react';
import { Spotify } from '../../util/Spotify';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { SearchBar } from '../SearchBar/SearchBar';
import { UserPlaylists } from '../UserPlaylists/UserPlaylists';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
      userPlaylists: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
  }

  async selectPlaylist(id) {
    let tracks = await Spotify.getPlaylistItems(id);
    let playlist = this.state.userPlaylists.items.find(e => e.id === id);
    console.log(playlist.name);
    console.log(tracks);
    this.setState({
      playlistName: playlist.name,
      playlistTracks: tracks
    });
  }

  async getPlaylists() {
    let playlists = await Spotify.getUserPlaylists();
    this.setState({ userPlaylists: playlists });
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState({ playlistTracks: this.state.playlistTracks});
  }

  removeTrack(track) {
    if (this.state.playlistTracks.indexOf(track) > -1) {
      this.state.playlistTracks.splice(this.state.playlistTracks.indexOf(track), 1);
      this.setState({ playlistTracks: this.state.playlistTracks });
    }
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(e => e.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: "",
      playlistTracks: []
    });
  }

  async search(term) {
    let result = await Spotify.search(term);
    console.log(result);
    this.setState({ searchResults: result });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}/>
            <Playlist 
              onSave={this.savePlaylist} 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName}/>
            <UserPlaylists 
              onSelection={this.selectPlaylist}
              playlists={this.state.userPlaylists} />
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.getPlaylists();
  }
}

export default App;