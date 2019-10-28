import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HomeHilal from './home/HomeHilal';
 import Request from './Request/Request'; 
import * as serviceWorker from './serviceWorker';
 
  import registerServiceWorker from './registerServiceWorker';

  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
/*const routing = (
    <Router>
      <div>
      <Switch> <Route path="/" exact component={App} />
      <Route path="/HomeHilal"   component={HomeHilal} />
      <Route path="/Request"   component={Request} />
    <Route component={notFound} />
        </Switch>
     
      </div>
    </Router>
  )
  function notFound() {
    return <h2>notFound</h2>;
  }*/