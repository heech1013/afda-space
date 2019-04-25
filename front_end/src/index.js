import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

require('dotenv').config();

ReactDOM.render(<Root/>, document.getElementById('root'));

(process.env.NODE_ENV === 'production') ?
serviceWorker.unregister() : serviceWorker.register();