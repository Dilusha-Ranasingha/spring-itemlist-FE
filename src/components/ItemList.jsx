import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemList() {
    const [itemName, setItemName] = useState('');
    const [items, setItems] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await axios.get('http://localhost:8080/items');
        setItems(response.data);
    };

    const addItem = async () => {
        if (itemName.trim() !== '') {
            await axios.post('http://localhost:8080/items', { name: itemName });
            setSuccessMessage('Item added successfully!');
            setItemName('');
            fetchItems();
            setTimeout(() => setSuccessMessage(''), 2000); // Hide message after 2 seconds
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', padding: 20, border: '1px solid #ccc', borderRadius: 10 }}>
            <h2>Item List</h2>
            <input 
                type="text" 
                placeholder="Item Name" 
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                style={{ width: '100%', padding: 8, marginBottom: 10 }}
            />
            <button onClick={addItem} style={{ width: '100%', padding: 10, backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 5 }}>
                Add Item
            </button>
            {successMessage && <p style={{ color: 'blue' }}>{successMessage}</p>}
            {items.map(item => (
                <div key={item.id} style={{ padding: 10, border: '1px solid #ccc', borderRadius: 5, marginTop: 5 }}>
                    {item.name}
                </div>
            ))}
        </div>
    );
}

export default ItemList;