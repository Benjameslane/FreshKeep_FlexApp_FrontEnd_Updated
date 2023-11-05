import React, { useState, useContext, useEffect } from 'react';
import { addFoodItem, addStoreFoodItem, updateFoodItem, updateStoreFoodItem } from '../../Services/FoodItemService';
import AuthContext from '../../context/AuthContext';
import "./FoodItemForm.css";

const FoodItemForm = ({ onCancel, onSuccess, userType, foodItem, isEdit}) => {
  const { token } = useContext(AuthContext);
  
  const [formFoodItem, setFormFoodItem] = useState({
    itemName: '',
    expirationDate: '',
    quantity: 1,
    category: '',
    price: 0.00,
    status: '',
    listed: '',
    discounted: ''
  });

  // Formate dateTime from MM-DD-YYYY to YYYY-MM-DD so that input type date can prefill the form
  const formatDateTime = (dateTime) => {
    if (!dateTime) return ''; // Handle the case where dateTime is not provided
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (foodItem) {
      // If foodItem is provided, prefill the form with its values
      setFormFoodItem({
        itemName: foodItem.itemName,
        expirationDate: formatDateTime(foodItem.expirationDate),
        quantity: foodItem.quantity,
        category: foodItem.category,
        price: foodItem.price || 0.00, // Default to 0.00 if price is not present
        status: foodItem.status || '', // Default to an empty string if status is not present
        listed: foodItem.listed,
        discounted: foodItem.discounted
      });
    }
  }, [foodItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'listed') {
      // Map the selected option value to an integer (0 or 1) for the 'listed' field
      const listingValue = value === '0' ? 0 : 1;
      setFormFoodItem({ ...formFoodItem, [name]: listingValue });
    } else if (name === 'discounted') {
      const discountedValue = value === '0' ? 0 : 1;
      setFormFoodItem({ ...formFoodItem, [name]: discountedValue });
    } else {
      setFormFoodItem({ ...formFoodItem, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        foodItem.itemName = formFoodItem.itemName;
        foodItem.expirationDate = formFoodItem.expirationDate;
        foodItem.quantity = formFoodItem.quantity;
        foodItem.category = formFoodItem.category;

        if (userType === "Store Owner") {
          foodItem.price = formFoodItem.price;
          foodItem.status = formFoodItem.status;
          foodItem.listed = formFoodItem.listed;
          foodItem.discounted = formFoodItem.discounted;

          await updateStoreFoodItem(foodItem, token);
        } else if (userType === "Homeowner/Renter") {
          await updateFoodItem(foodItem, token);
        }
      } else {
        if (userType === "Store Owner") {
          await addStoreFoodItem(formFoodItem, token);
        } else if (userType === "Homeowner/Renter") {
          await addFoodItem(formFoodItem, token);
        }
      }
      onSuccess(); // Trigger refresh on inventory table
    } catch (error) {
      alert('Failed to add food item');
    }
  };

  // Return "Add Food Item" form that appears when you click "Add Item"
  return (
    <div class="popup">
      <form onSubmit={handleSubmit}>
        <div class="form">
          {isEdit && (
            <>
            <h2>Edit Food Item</h2>
            </>
          )}
          {!isEdit && (
            <>
            <h2>Add Food Item</h2>
            </>
          )}
          <div>
            <input type="text" name="itemName" value={formFoodItem.itemName} onChange={handleChange} placeholder="Item Name" required />
            <input type="date" name="expirationDate" value={formFoodItem.expirationDate} onChange={handleChange} required />
          </div>
          <div class="field">
          <span class="quantity-input"><input type="number" name="quantity" min="0" value={formFoodItem.quantity} onChange={handleChange} required /></span>
            <input type="text" name="category" value={formFoodItem.category} onChange={handleChange} placeholder="Category" required />
          </div>
          <div class="field">
              {userType === "Store Owner" && (
                  <>
                    <span class="price-input"><input type="number" name="price" step="0.01" min="0" value={formFoodItem.price} onChange={handleChange} required /></span>
                    <select class="select" name="status" value={formFoodItem.status} onChange={handleChange} required>
                      <option value="">Select Status</option>
                      <option value="IN STOCK">IN STOCK</option>
                      <option value="LOW STOCK">LOW STOCK</option>
                      <option value="OUT OF STOCK">OUT OF STOCK</option>
                      <option value="RESTOCKING">RESTOCKING</option>
                    </select>
                    <select class="select" name="listed" value={formFoodItem.listed} onChange={handleChange} required>
                      <option value="">Select Listing</option>
                      <option value="0">Not Listed</option>
                      <option value="1">Listed</option>
                    </select>
                    <select class="select" name="discounted" value={formFoodItem.discounted} onChange={handleChange} required>
                      <option value="">Select Discounting</option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </select>
                  </>
              )}
          </div>
          <div class="buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FoodItemForm;
