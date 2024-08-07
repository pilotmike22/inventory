import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from 'primereact/card';

const GuestDetails = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const [itemDetails, setItemDetails] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchItemData = async () => {
                try {
                    const response = await fetch(`http://localhost:5080/item`);
                    const data = await response.json();
                    const filteredDetails = data.find(item => item.id == id);
                    setItemDetails(filteredDetails);
                } catch (error) {
                    console.error('Error fetching item data:', error);
                }
            };

            fetchItemData();
        }
    }, [id]);

    if (!itemDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className='ItemDetail'>
            <h1>Item Details</h1>
            <Card>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
                        <h2>NAME: {itemDetails.item_name}</h2>
                        <p>ITEM ID: {itemDetails.id}</p>
                        <p>ITEM Description: {itemDetails.item_description}</p>
                        <p>Quantity: {itemDetails.quantity}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default GuestDetails;
