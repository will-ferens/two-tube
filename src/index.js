import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import SearchBar from './components/searchbar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
const apiKey = 'AIzaSyB7Yb3Ct_AxddOLw3DP8EpOR-g6qIETU6k'



class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            videos: [],
            selectedVideo: null
        }

        this.videoSearch('skateboards')
        
    }

    videoSearch(term) {
        YTSearch({key: apiKey, term: term}, (videos) => {
            this.setState({
               videos: videos,
               selectedVideo: videos[0]
            })
        })
    }
    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
        return (
        <div>
            <SearchBar onSearchTermChange={videoSearch}/>
            <VideoDetail video = {this.state.selectedVideo}/>
            <VideoList 
                onVideoSelect = {selectedVideo => this.setState({selectedVideo})}
                videos = {this.state.videos} />
        </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('.container'))