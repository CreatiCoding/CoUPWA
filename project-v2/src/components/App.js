import React, { Component } from 'react';
import Wrapper from './Wrapper';
import MainHeaderContainer from '../containers/MainHeaderContainer';
import MainMenu from './MainMenu';

class App extends Component {
    render() {
        return (
            <div className="app">
				<MainHeaderContainer />
                <Wrapper />
				<MainMenu />
            </div>
        );
    }
}
export default App;
