
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, updateItem, removeItem, boughtItems } from '../redux/action';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaSort, FaTrash, FaEdit, FaCheck, FaShoppingCart } from 'react-icons/fa';
import { GiFruitBowl, GiWashingMachine, GiSmartphone } from 'react-icons/gi';
import styles from '../styles/styles.css';

const categoryTypes = {
  Groceries: ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Snacks'],
  Household: ['Cleaning Supplies', 'Furniture', 'Decor', 'Appliances'],
  Electronics: ['Phones', 'Laptops', 'Cameras', 'Accessories'],
};

const ShoppingApp = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editedItem, setEditedItem] = useState(null);
  const [category, setCategory] = useState('');
  const [productType, setProductType] = useState('');
  const [tag, setTag] = useState('');
  const [categories] = useState(Object.keys(categoryTypes));
  const navigate = useNavigate();

  const handlePrivacy = () => {
    navigate("/policy");
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items`);
        dispatch(setItems(response.data));
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, [dispatch]);

  const handleEdit = (item) => {
    setEditedItem(item);
    setCategory(item.category);
    setProductType(item.productType || '');
    setTag(item.tag || '');
  };

  const handleDelete = async (id) => {
    
    dispatch(removeItem(id));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedItem = { ...editedItem, category, productType,  };
  
    dispatch(updateItem(updatedItem));
    resetItemForm();
  };

  const toggleBought = (id) => {
    dispatch(boughtItems(id));
  };

  const resetItemForm = () => {
    setCategory('');
    setProductType('');
    setTag('');
    setEditedItem(null);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (category ? item.category === category : true) &&
    (productType ? item.productType === productType : true)
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    }
    return b.name.localeCompare(a.name);
  });

  const shareToPlatform = (platform) => {
    const listString = sortedItems.map(item => `${item.name} - ${item.quantity} (${item.productType || 'No type'})`).join('\n');
    const encodedMessage = encodeURIComponent(`Shopping List:\n\n${listString}`);

    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodedMessage}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://example.com')}&quote=${encodedMessage}`;
        break;
      case 'instagram':
        alert('Instagram sharing is only available through the mobile app.');
        return;
      case 'gmail':
        url = `mailto:?subject=My Shopping List&body=${encodedMessage}`;
        break;
      default:
        break;
    }
    if (url) window.open(url, '_blank');
  };

  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = sortedItems.filter(item => item.category === category);
    return acc;
  }, {});

  return (
    <div className="shopping-app">
      <div onClick={handlePrivacy}>Read our Policy</div>
      <div className="shopping-list-container">
        <h1>Shopping List</h1>
        <div className="search-sort-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items"
            className="search-input"
          />
          <FaSearch />
          <select onChange={(e) => setSortOrder(e.target.value)} className="sort-dropdown">
            <option value="asc">Sort Ascending</option>
            <option value="desc">Sort Descending</option>
          </select>
          <FaSort />
        </div>
        <select onChange={(e) => setCategory(e.target.value)} value={category} className="category-dropdown">
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {category && (
          <select onChange={(e) => setProductType(e.target.value)} value={productType} className="product-type-dropdown">
            <option value="">All Product Types</option>
            {categoryTypes[category].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        )}
        <div className="share-buttons">
          <button onClick={() => shareToPlatform('whatsapp')} className="share-button">
            <FaShoppingCart /> Share to WhatsApp
          </button>
          <button onClick={() => shareToPlatform('facebook')} className="share-button">
            <FaShoppingCart /> Share to Facebook
          </button>
          <button onClick={() => shareToPlatform('instagram')} className="share-button">
            <FaShoppingCart /> Share to Instagram
          </button>
          <button onClick={() => shareToPlatform('gmail')} className="share-button">
            <FaShoppingCart /> Share via Gmail
          </button>
        </div>

        {categories.map(cat => (
          <div key={cat} className="category-section">
            <h2>
              {cat === 'Groceries' && <GiFruitBowl />}
              {cat === 'Household' && <GiWashingMachine />}
              {cat === 'Electronics' && <GiSmartphone />}
              {cat}
            </h2>
            <ul>
              {groupedItems[cat].map(item => (
                <li key={item.id} style={{ textDecoration: item.bought ? 'line-through' : 'none' }}>
                  {item.name} - {item.quantity} - {item.productType || 'No type'} - {item.tag}
                  <button onClick={() => toggleBought(item.id)} className="buy-button">
                    <FaCheck />
                  </button>
                  <button onClick={() => handleEdit(item)} className='edit-button'>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="delete-button">
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {editedItem && (
          <div>
            <h2>Edit Item</h2>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                value={editedItem.name}
                onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
                placeholder="Item Name"
              />
              <input
                type="number"
                value={editedItem.quantity}
                onChange={(e) => setEditedItem({ ...editedItem, quantity: e.target.value })}
                placeholder="Quantity"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {category && (
                <select
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                >
                  {categoryTypes[category].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              )}
              
              <button type="submit">Update Item</button>
              <button type="button" onClick={resetItemForm}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingApp;