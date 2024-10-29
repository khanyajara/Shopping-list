

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShoppingList from './components/Shoppinglist';
import AddItem from './components/AddItem'; 
import LoginSignUp from './components/LoginSignUp';
import PrivacyPolicy from './components/policy';

const App = () => {
  return (
    <Router>
      <div>
        <h1></h1>
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/policy" element={<PrivacyPolicy/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
