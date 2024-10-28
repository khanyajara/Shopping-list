// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShoppingList from './components/Shoppinglist';
 // Ensure correct casing
import AddItem from './components/AddItem'; // Adjusted if needed
import LoginSignUp from './components/LoginSignUp';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Shopping List App</h1>
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/add-item" element={<AddItem />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
