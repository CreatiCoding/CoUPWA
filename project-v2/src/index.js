import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';

if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/service-worker.js')
		.then(function() { console.log('Service Worker Registered'); });
}


ReactDom.render(<App />, document.getElementById('root'));
