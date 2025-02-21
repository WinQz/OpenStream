import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Watch from './pages/Watch';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/watch/:id" component={Watch} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;