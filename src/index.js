import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBkjOebOSKGhLy6TO2E6md_LsyOO0DjQdQ';

class App extends Component {
  constructor(props){
    super(props);
    //stateの書き方に注意  (該当：それに伴いYTSearchの...)
    this.state= {
      videos: [],
      selectedVideo: null
     };
    this.videoSearch('surfboards');
  }

  videoSearch(term){
    YTSearch({key:API_KEY, term: term }, (data) => {
      this.setState({
        videos: data,
        selectedVideo: data[0]
      });
    });
  }

  render(){
    //以下を300ミリ秒以内に実行するように定義する
    //onSearchTermChange={term => this.videoSearch(term)}
    const videoSearch = _.debounce(term => {this.videoSearch(term)}, 300)
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
