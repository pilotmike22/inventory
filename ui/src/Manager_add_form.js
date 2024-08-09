import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const itemEndpoint = `http://localhost:5080/post/item`;

const AddForm = () => {
  const initialFormState = { id: null, item_name: "", item_description: "", quantity: "" };
  const [item, setItem] = useState(initialFormState); 

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItem((prevItem) => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!item.item_name || !item.item_description || !item.quantity ) return;

    try {
      const response = await axios.post(itemEndpoint, item);
      console.log('Response:', response);
      navigate('/Manager_inventory', { state: {} });
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  return (
    <div className="loginPage">
      <div className="signUp">
        <h1>Add New Item</h1>
        <form onSubmit={handleSubmit}>
          <div className="formgroup">
            <label htmlFor="item_name">Item Name</label>
            <input
              id="item_name"
              type="text"
              name="item_name"
              value={item.item_name}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="formgroup">
            <label htmlFor="item_description">Description</label>
            <input
              id="item_description"
              type="text"
              name="item_description"
              value={item.item_description}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="formgroup">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-sm btn-secondary">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
