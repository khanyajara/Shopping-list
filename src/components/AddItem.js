import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/action';
import '../styles/AddItem.css';
import ShoppingList from './Shoppinglist';
import axios from 'axios';

const categoryTypes = {
  Groceries: ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Snacks'],
  Household: ['Cleaning Supplies', 'Furniture', 'Decor', 'Appliances'],
  Electronics: ['Phones', 'Laptops', 'Cameras', 'Accessories'],
  Clothing: ['Men', 'Women', 'Kids', 'Shoes', 'Accessories'],
  Other: ['Miscellaneous', 'Gift Items', 'Stationery'],
};

const AddItem = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [productType, setProductType] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !category || !productType) {
      setError('Please fill in all fields');
      return;
    }
    const newItem = { id: Date.now(), name, quantity, category, productType };

    // Add to Redux store
    dispatch(addItem(newItem));

    // Add to shoppinglist.json
    try {
      await axios.post('http://localhost:5000/items', newItem);
      setName('');
      setQuantity('');
      setCategory('');
      setProductType('');
      setError(null);
    } catch (err) {
      setError('Error adding item to file');
    }
  };

  return (
    <div className="add-item-container">
      <h2>Add Item to Shopping List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
          onChange={(e) => {
            setCategory(e.target.value);
            setProductType('');
          }}
          required
          className="input-field"
        >
          <option value="" disabled>
            Select a category
          </option>
          {Object.keys(categoryTypes).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {category && (
          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            required
            className="input-field"
          >
            <option value="" disabled>
              Select a product type
            </option>
            {categoryTypes[category].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        )}
        <button type="submit" className="submit-button">
          Add Item
        </button>
      </form>
      <ShoppingList />
    </div>
  );
};

export default AddItem;
