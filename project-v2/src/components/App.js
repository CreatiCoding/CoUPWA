import React, { Component } from 'react';
import '../css/test.css';

class App extends Component {
    render() {
        const url = './image/react.png';
        return (
            <div>
                <h1>hello</h1>
                <img src={url} />
            </div>
        );
    }
}
export default App;
