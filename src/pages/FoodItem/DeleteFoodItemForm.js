import React, { useContext } from 'react';
import { deleteFoodItem, deleteStoreFoodItem } from '../../Services/FoodItemService';
import AuthContext from '../../context/AuthContext';
import "./DeleteFoodItemForm.css";

const DeleteFoodItemForm = ({ onCancel, onSuccess, userType, foodItem }) => {
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userType === "Store Owner") {
        await deleteStoreFoodItem(foodItem.id, token);
      } else if (userType === "Homeowner/Renter") {
        await deleteFoodItem(foodItem.id, token);
      }
      onSuccess(); // Trigger refresh on inventory table
    } catch (error) {
      alert('Failed to add food item');
    }
  };

  const formatDateTime = (dateTime) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const datePart = new Date(dateTime).toLocaleDateString(undefined, options);
    return `${datePart}`;
  };

  // Return "Delete Food Item" form that appears when you click "X"
  return (
    <div class="popup">
      <form onSubmit={handleSubmit}>
        <div class="form">
          <h2>Delete Food Item</h2>
          <div class="food-box">
            <div class="column">
             <p class="food-property">ID:</p>
             <p>{foodItem.id}</p>
             <p class="food-property">Expiration Date:</p>
             <p>{formatDateTime(foodItem.expirationDate)}</p>
             <p class="food-property">Category:</p>
             <p>{foodItem.category}</p>
            </div>
            <div class="column">
             <p class="food-property">Item Name:</p>
             <p>{foodItem.itemName}</p>
             <p class="food-property">Quantity:</p>
             <p>{foodItem.quantity}</p>
             {userType === "Store Owner" && (
               <>
               <p class="food-property">Price:</p>
               <p>{foodItem.price}</p>
               </>
             )}
            </div>
          </div>
          <div class="buttons">
            <button class="delete" type="submit">Delete</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DeleteFoodItemForm;
