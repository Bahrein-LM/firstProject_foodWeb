import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import  NavbarComponent  from './components/NavbarComponent';
import {Home, Sukses} from './pages';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sukses' element={<Sukses />} />
          </Routes>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
