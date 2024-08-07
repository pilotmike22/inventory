import './App.css';
import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const baseUrl = 'http://localhost:5080/item';

const GuestInventory = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(baseUrl)
            .then((res) => res.json())
            .then((data) => setItems(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleClick = (id) => {
        navigate('/Guest_details', { state: { id } });
    };

    const buttonStyle = {
        flex: 1,
        minWidth: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '0.875rem',
        padding: '0.5rem',
    };

    return (
        <div className='GuestInventory'>
            <h1>Welcome Guest</h1>
            <h2>All Inventory</h2>
            <Card>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {items.map((item) => (
                        <div key={item.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
                            <h2>NAME: {item.item_name}</h2>
                            <p>ITEM ID: {item.id}</p>
                            <p>ITEM Description: {item.item_description}</p>
                            <p>Quantity: {item.quantity}</p>
                            <Button
                                onClick={() => handleClick(item.id)}
                                className="p-button destination-button"
                                label="View Details"
                                icon="pi pi-info-circle"
                                style={buttonStyle}
                            />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default GuestInventory;
