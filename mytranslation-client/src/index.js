import React from 'react';
import ReactDOM from 'react-dom';
import Translate from '../src/components/translate/translate.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Translate />, document.getElementById('root'));
registerServiceWorker();
