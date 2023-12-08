import React, { useEffect, useState } from "react";
import { getListedStoreFoodItems } from "../../Services/FoodItemService";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css";

const HomePage = () => {
  // The "user" value from this Hook contains user information (id, userName, email) from the decoded token
  // The "token" value is the JWT token sent from the backend that you will send back in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [listedFoodItems, setListedFoodItems] = useState(null);

  useEffect(() => {
    getListedItems();
  }, [token]);

  const getListedItems = async () => {
    try {
      let response = await getListedStoreFoodItems(token);
      setListedFoodItems(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const formatDateTime = (dateTime) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const datePart = new Date(dateTime).toLocaleDateString(undefined, options);
    return `${datePart}`;
  };

  const renderHomePage = () => {
    if (user.userType === "Store Owner") {
      return (
        <div className="store-header">
          <h1>Welcome {user.userName}!</h1>
          <h1>Listings</h1>
          {listedFoodItems && (
            <div className="store-container">
            {listedFoodItems.map((foodItem) => (
              <div key={foodItem.id} className="food-box">
                <div className="column">
                  <p className="food-property">ID:</p>
                  <p>{foodItem.id}</p>
                  <p className="food-property">Expiration Date:</p>
                  <p>{formatDateTime(foodItem.expirationDate)}</p>
                  <p className="food-property">Category:</p>
                  <p>{foodItem.category}</p>
                </div>
                <div className="column">
                  <p className="food-property">Item Name:</p>
                  <p>{foodItem.itemName}</p>
                  <p className="food-property">Quantity:</p>
                  <p>{foodItem.quantity}</p>
                  <p className="food-property">Price:</p>
                  <p>{foodItem.price}</p>
                </div>
              </div>
              ))}
              </div>
          )}
        </div>
      );
    } else if (user.userType === "Homeowner/Renter") {
      return (
        <div className="store-header">
          <h1>Welcome to FreshKeep, {user.userName}!</h1>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="container">
      {console.log(user)}
      {renderHomePage()}
    </div>
  );
};

export default HomePage;
