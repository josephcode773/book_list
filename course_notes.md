# udemy Modern React with Redux - Course Notes
Instructor: Stephen Grider

### Section: 1 - An Intro to React

#### Section 1, Lesson 9: React vs ReactDom
ReactDom is used to send a component to the DOM, while React is used to create and manage our componenets

#### Section 1, Lesson 10:
const App is a (factory) function that produces stuff to the DOM.

Must create an instance before it goes to the DOM

#### Section 1, Lesson 11: Render Targets
ReactDom.render(Instance of our Component, Where to render (or place) it on the DOM)

Use FAT arrow functions whenever possible.

#### Section 1, Lesson 12: Component Structure
component is a function or object that returns something to our HTML.

react knows how to render multiple components at one time, by spreading it out to diffrent (or seperate) components.

- search_bar component
- video_list_item component(s)
- video_list compponents
- video_detail compponents

always make 1 component per file

created src/components/"componentName"

#### Section 1, Lesson 13: Youtube Search API Signup
https://console.developers.google.com is where to go to obtain google api keys and credentials, for free. we used it for "youtube search".

npm install --save youtube-api-search
save, means to save it to the package.json file

#### Section 1, Lesson 14: Export Statements
exporting modules = ex: export default SearchBar

import React from 'react';
import ReactDOM from 'react-dom';
// both of the above come form the node_modules directory by default.

import SearchBar from './components/search_bar';
// this one NEEDS the path of where the file is that I created.


console?
state

#### Section 1, Lesson 15: Class Based Components
Two diffrent types of components; Functional Based and Class Based.

````
import React, { Component } from 'react';

// functional component
const SearchBar = () => {
	return <input />;
};

// class component:  when you want it to have some type of record keeping
class SearchBar extends Component {
	render() {
		// this is the syntaxt to use to define a methond on a task.
		// every class must have a render function AND return some jsx.
		return <input />;
	} 
}

export default SearchBar;
````

#### Section 1, Lesson 16: Handling User Events

````
// This will make monitor the input value by using an Event Handler

import React, { Component } from 'react';

class SearchBar extends Component {
	render() {
		// pass the event handler to the element you want to monitor...
		return <input onChange={this.onInputChange} />;
		// on(name of the "event")={this."event handler"}
	} 

	// event handler
	onInputChange(event) { // event: has usefull properties inside
		// whenever input changes, run the code in here...
		console.log(event.target.value);
	}
}

export default SearchBar;

// REFACTOR #1 !!!

import React, { Component } from 'react';

class SearchBar extends Component {
	render() {
		// pass the event handler to the element you want to monitor...
		return <input onChange={ event => console.log(event.target.value) } />;
		// on(name of the "event")={this."event handler"}
	} 

	// event handler
	onInputChange(event) { // event: has usefull properties inside
		// whenever input changes, run the code in here...
	}
}

export default SearchBar;

````
#### Section 1, Lesson 17: Introduction to State

````
// State: is a plain javasciript object that is used to Record and React to user events
// each class based compont has it's own state object. partents and all childen get reinitialzed as well.


import React, { Component } from 'react';

class SearchBar extends Component {
	// constructor function get's called first, everytime
	constructor(props) {
		super(props);
		// Component (from above) is the Parent method. It's lets us use props from it by putting "super" in front of it. now i got two props.

		this.state = { term: '' };
		//  initiize state by createing a new object and assing it to this.state. the object we pass must include property terms.  whenever the User updates (or types inside input) we want it to become the value of "term: ", which is '' right now.
	}

	render() {
		return <input onChange={ event => console.log(event.target.value) } />;
	} 

}

export default SearchBar;

````
#### Section 1, Lesson 18: More on State
````
import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' }
        // only do state, equals, in Constuctor.
    }

	render() {
		return (
            <div>
                <input onChange={event => this.setState({ term: event.target.value })} />;
                // Change state using this.setState
                Value of the input: {this.state.term}
                // This "Value of the input:" shows the this.state.term on the DOM
            </div>
        );
	}
}

export default SearchBar;

````
#### Section 1, Lesson 19: Controlled Components
````
render() {
		return (
			<div>
				<input 
					value={this.state.term}
					onChange={event => this.setState({ term: event.target.value })}
				/>
			</div>
		);
	}
	// input is a Controlled Component (look up defination)
````

#### Section 1, Lesson 20: Breather and Review

Builing an application that allows users to search for youtube videos

core react topics:
-jsx
-components
-state (inside search_bar.js)

es6:
- classes
- arrow functions
- inport and export statements
- signed up for the youtube api

app current structor:
- app starts in index.js
- base component called App
- imports SearchBar and renders it inside of App component
- it is a functional component, because it does not have any concept of state
- SearchBar compoonet is a class based compoent - whenever we have a compoentnt that needs to be aware of state.
- App componenet is a functional component - whenver were just taking in some information and spitting out some jsx. also can contain a class based component.
- Makes use of state by updating the user input whenever the state changes.
- user enters text, updates state, causisng entime component to re-render.

### Section: 2

#### Section 2, Lesson 21: Youtube Search Response
- Downwards Data Flow: Only the most parent component is responsible for fetching data. (from api, flux, redux...)
- index is the most parent in my app.
- //This line above was added to import the youtube api search
- //this is a sample test search for 'surfboards'

````
import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
//This line above was added to import the youtube api search

import SearchBar from './components/search_bar';


const API_KEY = 'AIzaSyCRIVKyQtDyr2YXN3W7LjtMU-p-igDNcFw';

YTSearch({key: API_KEY, term: 'surfboards'}, function (data) {
	console.log(data);
})
//this is a sample test search for 'surfboards'

const App = () => {
	return (
		<div>
			<SearchBar />
		</div>
	);
};


ReactDOM.render(<App />, document.querySelector('.container'));
````
#### Section 2, Lesson 22: Refactoring Functional Components to a Class Component
- Changed from Functional Based Component to Class Based Component
- Exteneded { Component } under import line.

````
import React, { Component } from 'react';
// import Component object, so we can Extend from it
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';

const API_KEY = 'AIzaSyCRIVKyQtDyr2YXN3W7LjtMU-p-igDNcFw';



// will restruct app based component from functional to class based component
class App extends Component {
	constructor(props) {
		super(props);

		this.state = { videos: [] };

		YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
			this.setState({ videos });
			// Refactored: When you have the vaiable and the value being the same, you can just use the variable
			// this.setState({ videos: videos }); - This is the old Way
		});
	}

	render() {
		return (
			<div>
				<SearchBar />
			</div>
		);
	}	
};

ReactDOM.render(<App />, document.querySelector('.container'));
````

#### Section 2, Lesson 23: Props


````

````

#### Section 2, Lesson 24: Building Lists with Map
- created video_list_item.js

````
import React from 'react';

const VideoListItem = (props) => {
	return <li>Video</li>
};

export default VideoListItem;
````

- changed video_list.js
````
import React from 'react';
import VideoListItem from './video_list_item'


const VideoList = (props) => {
	const videoItems = props.videos.map((video) => {
		return <VideoListItem video={video} />
	});
	// added javascript value of 'videoItems' to store the results of the map function

	return (
		<ul className="col-md-4 list-group">
			{videoItems}
		</ul>
	);
};
// made list using Map instead of for loop

export default VideoList;

````
#### Section 2, Lesson 25: List Item Keys
- edited ONLY video_list.js
- // added unique key for each element in list. key={video.etag}. etag is provided by youtube api

````
import React from 'react';
import VideoListItem from './video_list_item'


const VideoList = (props) => {
	const videoItems = props.videos.map((video) => {
		return <VideoListItem key={video.etag} video={video} />
	});
	// added unique key for each element in list. key={video.etag}. etag is provided by youtube api

	return (
		<ul className="col-md-4 list-group">
			{videoItems}
		</ul>
	);
};


export default VideoList;
````

#### Section 2, Lesson 26: Video List Items
- worked ONLY on video_list_item.js
- added const video = props.video and then refactored it to: //The New Refactored Version. Places 'const video = props.video' to VideoListItem = ({video})
- built out list using div and structured it using bootstarap via className tag.

````
import React from 'react';

// const VideoListItem = (props) => {
// 	const video = props.video;
// 	return <li>Video</li>
// };
//Refactored BELOW!!

// const VideoListItem = ({video}) => {
// 	return <li>Video</li>
// };
//The New Refactored Version. Places 'const video = props.video' to VideoListItem = ({video})

const VideoListItem = ({video}) => {
	const imageUrl = video.snippet.thumbnails.default.url;
	return (
		<li className="list-group-item">
			<div className="video-list-media">
				<div className="media-left">
					<img className="media-object" src={imageUrl} />
				</div>
				<div className="media-body">
					<div className="media-heading">{video.snippet.title}</div>
				</div>
			</div>
		</li>
	);
};

export default VideoListItem;
````

#### Section 2, Lesson 27: Detail Component and Template Strings
- before making a new component, ask:  does it need to maintain state?
- created new component called video_detail.js

````
import React from 'react';

const VideoDetail = ({video}) => {
	const videoId = video.id.videoId;
	const url = `https://www.youtube.com/embed/${videoId}`;

	return (
		<div className="video-detail col-md-8">
			<div className="embed-responsive embed-responsive-16by9">
				<iframe className="embed-responsive-item" src={url}></iframe>
			</div>
			<div className="details">
				<div>{video.snippet.title}</div>
				<div>{video.snippet.description}</div>
			</div>
		</div>
	);
};

export default VideoDetail;
````

#### Section 2, Lesson 28: Handling Null Props
- imported VideoDetail to index.js
- modified video_detail.js by adding a 'cache' to wait for the video property to load before rendering
````
index.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCRIVKyQtDyr2YXN3W7LjtMU-p-igDNcFw';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { videos: [] };

		YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
			this.setState({ videos });
		});
	}

	render() {
		return (
			<div>
				<SearchBar />
				<VideoDetail video={this.state.videos[0]} />
				<VideoList videos={this.state.videos} />
			</div>
		);
	}	
};

ReactDOM.render(<App />, document.querySelector('.container'));
````

````
video_detail.js
import React from 'react';

const VideoDetail = ({video}) => {
	if (!video) {
		return <div>Loading...</div>;
	};
	// used to "cache" or wait for the this.state.video to catch up

	const videoId = video.id.videoId;
	const url = `https://www.youtube.com/embed/${videoId}`;

	return (
		<div className="video-detail col-md-8">
			<div className="embed-responsive embed-responsive-16by9">
				<iframe className="embed-responsive-item" src={url}></iframe>
			</div>
			<div className="details">
				<div>{video.snippet.title}</div>
				<div>{video.snippet.description}</div>
			</div>
		</div>
	);
};

export default VideoDetail;
````

#### Section 2, Lesson 29: Video Selection
- want to add ability to select video and have it play on the screen
- implamented callback
- edited index.js, video_list.js, video_list_item.js

````
index.js

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCRIVKyQtDyr2YXN3W7LjtMU-p-igDNcFw';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		};

		YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}

	render() {
		return (
			<div>
				<SearchBar />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} 
				/>
			</div>
		);
	}	
};

ReactDOM.render(<App />, document.querySelector('.container'));
````

````
video_list.js

import React from 'react';
import VideoListItem from './video_list_item'


const VideoList = (props) => {
	const videoItems = props.videos.map((video) => {
		return (
			<VideoListItem
				onVideoSelect={props.onVideoSelect}
				key={video.etag} 
				video={video} 
			/>
		);
	});
	// added unique key for each element in list. key={video.etag}. etag is provided by youtube api

	return (
		<ul className="col-md-4 list-group">
			{videoItems}
		</ul>
	);
};


export default VideoList;

````

````
video_list_item.js

import React from 'react';

// const VideoListItem = (props) => {
// 	const video = props.video;
// 	return <li>Video</li>
// };
//Refactored BELOW!!

// const VideoListItem = ({video}) => {
// 	return <li>Video</li>
// };
//The New Refactored Version. Places 'const video = props.video' to VideoListItem = ({video})

const VideoListItem = ({video, onVideoSelect}) => {
	// const video = props.video;
	// const onVideoSelect = props.onVideoSelect;
	// Refactored as es6, places both as arguments (used to pull multiple properties from prop)
	const imageUrl = video.snippet.thumbnails.default.url;
	return (
		<li onClick={() => onVideoSelect(video)} className="list-group-item">
			<div className="video-list-media">
				<div className="media-left">
					<img className="media-object" src={imageUrl} />
				</div>
				<div className="media-body">
					<div className="media-heading">{video.snippet.title}</div>
				</div>
			</div>
		</li>
	);
};

export default VideoListItem;
````

#### Section 2, Lesson 30: Styling with CSS
// added (to the search_bar.js) div className='search-bar', style tag uses the same name as the component to make it easier to edit.
- edited search_bar.js and style.css
- added some styling, did not post, nothing special.

#### Section 2, Lesson 31: Searching for Videos
- edited search_bar and added "onInputChange" a new function under the SearchBar Component.

````
import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };
  }

  render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
````

#### Section 2, Lesson 32: Throttling Search Term Input
- Problem: there is a throttle issue where typing starts an immediate search. we don't want that
-  // 1st add. debounce calls the innerfunction once every 300 milliseconds.
-  // 2nd change. (replaced inside {} with videoSearch)
- //3rd add = import _ from 'lodash' 

````
import _ from 'lodash' //3rd add.
import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const API_KEY = "AIzaSyCRIVKyQtDyr2YXN3W7LjtMU-p-igDNcFw";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term: term }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {

    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
    // 1st add. debounce calls the innerfunction once every 300 milliseconds.

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        // 2nd change. (replaced inside {} with videoSearch)
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
          videos={this.state.videos}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector(".container"));
````

#### Section 2, Lesson 33: Recap Wrapup
- use Class Components, when you want to track state. Does NOT use react method of getInitialState.
- use Functional Components, when you don't.
- whenever you change state, the Components INSTANTLY re-renders
- this version uses a heavy amount of Callbacks.  Using Redux will reduce the need for them
- Component level state = localized. only triggures a change on the Component.  Redux is for the whole application.

#### Section 3, Lesson 34: Foreword on Redux
1st, description of what redux is and what it does.
2nd, sample application with a head-start.  it will use our existing boilerplate.

````

````

#### Section 3, Lesson 35: What is Redux?
- did didn't really say anything noteworthy here...

````

````

#### Section 3, Lesson 36: More on Redux
- redux is the data, and react is the views.

#### Section 3, Lesson 37: Even More on Redux!
- seperate in Bucket of Data and a Bucket of Views
- the most difficult part of modeling a app
- will model after Tender

#### Section 3, Lesson 38: Putting Redux to Practice
- instruced me to create a new reduxsimplestarter.

#### Section 3, Lesson 39: Reducers
- just a function that returns app state

````
// Application State - Generated by reducers
books: [{title: 'Harry Potter"}, {title: 'Javascript'}],
activeBook: {title: 'Javascript: The good Parts"}  //ActiveBook Reducer
````

- created reducers/reducer_books.js and reducers/indes.js

````
export default function() {
	return [
		{title: 'Javascript: The Good Parts'},
		{title: 'Harry Potter'},
		{title: 'The Dark Tower'},
		{title: 'Eloquent Ruby'}
	]
}
````

````
import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';

const rootReducer = combineReducers({
  books: BooksReducer
});

export default rootReducer;

````

#### Section 3, Lesson 40: Containers - Connecting Redux to React
- container is a react component that has direction connection to state, managed by redux. also called smart component. dumb compoents don't have any connection to redux
- placed in container directory
- which get promoted to container and which stay as regual react components?
- created './containers/book-list.js'

````
import React, { Component } from 'react';

export default class BookList extends Component {
	renderList() {
		return this.props.books.map((book) => {
			return (
				<li key={book.title} className="list-group-item">{book.title}</li>
			);
		});
	}

	render() {
		return (
			<ul className="list-group col-sm-4">
				{this.renderList()}
			</ul>
		)
	}
}
````

#### Section 3, Lesson 41: Containers Continued
- (from mockup of desired web page)
- BookList cares about when the list of books changes (only) (should be containers aka Smart Component)
- BookDetail cares about when the active book changes (only) (should be containers)
- App doesn't care when state changes (should be just component aka dumb compoennt)
- (end of mockup notes)
- only the most partent component that cares about state needs to be connect to redux

#### Section 3, Lesson 42: Implementation of a Container Class
- react and redux aare seperate project.  needs seperate libraty called react/redux.
- edited book-list.js
- edited ./components/app.js
- added new function mapStateToProps
- What does connect do? Makes Smart Containers: function+component=smart_container
````
import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookList extends Component {
	renderList() {
		return this.props.books.map((book) => {
			return (
				<li key={book.title} className="list-group-item">{book.title}</li>
			);
		});
	}

	render() {
		return (
			<ul className="list-group col-sm-4">
				{this.renderList()}
			</ul>
		)
	}
}

function mapStateToProps(state) {
	// Whatever is returned will show up as props
	// inside of BookList
	return {
		books: state.books
	};
	// Whatever is returned will be this.props
}

export default connect(mapStateToProps)(BookList);  //connect does: function+component=container
````
- edited ./components/app.js

````
import React, { Component } from 'react';

import BookList from '../containers/book-list'

export default class App extends Component {
  render() {
    return (
      <div>
				<BookList />
			</div>
    );
  }
}

````

#### Section 4, Lesson 43: Containers and Reducers Review
- A container is a normal react componet that gets Bonded to the application state.  we meld the two together. whenever the app state changes, the container will re-render as well.

#### Section 4, Lesson 44: Actions and Action Creators

- Problem:  reducer_books list is STATIC. It don't change.
- actions and action creators...

actions creator: function that returns an object

action then automatically sent to all reducers

reducers assemble a new state

then the new state flows into all the containers

#### Section 4, Lesson 45: Binding Action Creators

-action creator: function that returns an action

-action: object that flows throught diffrent reducers

- reducers: can use that action to produce a diff value for it's particular piece of state.

-goal: to click on book and get more detail about it.

-edited /actions/index.js

-edited: /containers/book-list.js

````
export function selectBook(book) {
	console.log("a book has been selected:", book.title);
}
````

````
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';

class BookList extends Component {
	renderList() {
		return this.props.books.map((book) => {
			return (
				<li key={book.title} className="list-group-item">{book.title}</li>
			);
		});
	}

	render() {
		return (
			<ul className="list-group col-sm-4">
				{this.renderList()}
			</ul>
		)
	}
}

function mapStateToProps(state) {
	// Whatever is returned will show up as props
	// inside of BookList
	return {
		books: state.books
	};
	// Whatever is returned will be this.props
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
	//Whenever selectBook is called, the result should be passed
	// to all of our reducers
	return bindActionCreators({ selectBook: selectBook }, dispatch)
}

// Promote BookList from a component to a container - it need to know
// about this new dispatch method, selectBook.  Make it avaialbe
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);  //connect does: function+component=container
````

#### Section 4, Lesson 46: Creating an Action

- edited: /actions/indes.js
````
export function selectBook(book) {
	// selectBook is an ActionCreator, it needs to retun an action,
	// an object with a type property.
	// Aways Returns type and payload
	return {
		type: 'BOOK_SELECTED',
		payload: book
	};
}

````

#### Section 4, Lesson 47: Consuming Actions in Reducers

BIBLE STUDY CH:304 - 6:30


#### Section 4, Lesson 48: Consuming Actions in Reducers Contined


#### Section 4, Lesson 49: Conditional Rendering

#### Section 4, Lesson 50: Reducers and Actions Review
- application state is completely diffrent from component State
- application State is formed by reducers
- each key is assigned one reducer
- reducers change state over time via action
- took picture of Graphic Explanation and Flow Chart to root directory.
- App appears to be complete, but it looks ugly.


