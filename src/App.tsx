import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Header from './components/header/header';
import PageRender from './PageRender';
import Alert from './components/alert/Alert';
import AddPopup from './components/popup/TaskPopup';


function App() {
  return (
    <>
      <Router>
        <Alert/>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<PageRender/>}/>
          <Route path="/:page" element={<PageRender/>}/>
          <Route path="/:page/:slug" element={<PageRender/>}/>
          <Route path="/popup" element={<AddPopup />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
