// src/components/AddItem.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/action';
import '../styles/AddItem.css';
import ShoppingList from './Shoppinglist';

const AddItem = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState(''); // State for category

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { id: Date.now(), name, quantity, category };
   
    dispatch(addItem(newItem));
    setName('');
    setQuantity('');
    setCategory(''); // Reset category input
  };

  return (
    <div className="add-item-container">
        <h2>Add Item to Shopping List</h2>
        <form onSubmit={handleSubmit} className="add-item-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
            required
            className="input-field"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            required
            className="input-field"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="input-field"
          >
            <option value="" disabled>Select a category</option>
            <option value="Groceries">Groceries</option>
            <option value="Household">Household</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Other">Other</option>
          </select>
          <button type="submit" className="submit-button">Add Item</button>
        </form>
        <ShoppingList />
    </div>
  );
};

export default AddItem;
