import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, updateItem, removeItem, boughtItems } from '../redux/action';
import axios from 'axios';
import '../styles/styles.css'; // Importing CSS file
import { useNavigate } from 'react-router-dom';





const ShoppingApp = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.items);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [editedItem, setEditedItem] = useState(null);
    const [category, setCategory] = useState('');
    const [tag, setTag] = useState('');
    const [categories] = useState(['Groceries', 'Household', 'Electronics']); // Example categories
const navigate=useNavigate();

const privacy =()=>{
    navigate("/policy")
}
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
        setTag(item.tag || '');
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/items/${id}`);
        dispatch(removeItem(id));
    };

    const handleUpdate = async () => {
        const updatedItem = { ...editedItem, category, tag };
        await axios.put(`http://localhost:5000/items/${updatedItem.id}`, updatedItem);
        dispatch(updateItem(updatedItem));
        resetItemForm();
    };

    const toggleBought = (id) => {
        dispatch(boughtItems(id));
    };

    const resetItemForm = () => {
        setCategory('');
        setTag('');
        setEditedItem(null);
    };

    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category ? item.category === category : true)
    );

    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    });

    const shareList = () => {
        const listString = sortedItems.map(item => `${item.name} - ${item.quantity}`).join('\n');
        const subject = encodeURIComponent('My Grocery List');
        const body = encodeURIComponent(`Here’s my grocery list:\n\n${listString}`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
    };

    return (
        <div className="shopping-app">

            <div onClick={privacy}> Read our Policy</div>
            <div className="shopping-list-container">
                <h1>Shopping List</h1>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search items"
                />
                <select onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Sort Ascending</option>
                    <option value="desc">Sort Descending</option>
                </select>
                <select onChange={(e) => setCategory(e.target.value)} value={category}>
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <button onClick={shareList}>Share List</button>
                <ul>
                    {sortedItems.map(item => (
                        <li key={item.id} style={{ textDecoration: item.bought ? 'line-through' : 'none' }}>
                            {item.name} - {item.quantity} - {item.category} - {item.tag}
                            <button onClick={() => toggleBought(item.id)}>{item.bought ? 'Unmark' : 'Bought'}</button>
                            <button onClick={() => handleEdit(item)}>Edit</button>
                            <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
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
                            <input
                                type="text"
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                placeholder="Tag"
                            />
                            <button type="submit">Update Item</button>
                            <button onClick={resetItemForm}>Cancel</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShoppingApp;
