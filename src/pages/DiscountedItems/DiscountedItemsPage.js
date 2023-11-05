import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { getDiscountedStoreFoodItems, getDiscountedStoreInventoryByStoreOwner } from "../../Services/FoodItemService"
import { getStoreOwnersList } from "../../Services/UserService"
import "./DiscountedItemsPage.css";

const DiscountedItemsPage = () => {
  const [user, token] = useAuth();
  const [discountedFoodItems, setDiscountedFoodItems] = useState(null);
  const [storeOwners, setStoreOwners] = useState(null);
  const [storeOwnersWithInventory, setStoreOwnersWithInventory] = useState(null);

  useEffect(() => {
    getDiscountedItems();
    getStoreOwners();
  }, [token]);

  const getDiscountedItems = async () => {
    try {
      let response = await getDiscountedStoreFoodItems(token);
      setDiscountedFoodItems(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getStoreOwners = async () => {
    try {
      let response = await getStoreOwnersList(token);
      setStoreOwners(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const formatDateTime = (dateTime) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const datePart = new Date(dateTime).toLocaleDateString(undefined, options);
    return `${datePart}`;
  };

  const formatItemString = (itemName) => {
    return String(itemName).toUpperCase();
  };

  /* 
    Function runs when storeOwners is available and contains data. 
    It asynchronously retrieves inventory data for each store owner using their IDs and filters 
    out store owners with non-empty inventories, storing the results in the storeOwnersWithInventory state
  */
  useEffect(() => {
    if (storeOwners && storeOwners.length > 0) {
      const ownersWithInventoryPromises = storeOwners.map(async (storeOwner) => {
        const response = await getDiscountedStoreInventoryByStoreOwner(storeOwner.userId, token);
        if (response) {
            return { storeOwner, storeOwnerInventory: response };
        }
      });

      Promise.all(ownersWithInventoryPromises)
        .then((results) => {
          const ownersWithInventory = results.filter((result) => result.storeOwnerInventory.length > 0);
          setStoreOwnersWithInventory(ownersWithInventory);
        })
        .catch((error) => {
        console.log(error.response.data);
      });
    }
  }, [storeOwners, token]);

  const renderDiscountedItemsPage = () => {
    if (user.userType === "Store Owner") {
      return (
        <div className="discounted-header">
          <h1>Listed Discounted Items</h1>
          {discountedFoodItems && (
            <div class="discounted-container">
            {discountedFoodItems.map((foodItem) => (
              <div key={foodItem.Id} class="food-box">
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
                  <p class="food-property">Price:</p>
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
        <div className="discounted-header">
          <h1>Discounted Items</h1>
            {storeOwnersWithInventory && (
              <div class="discounted-container">
                {storeOwnersWithInventory.map((result) => (
                  <div key={result.storeOwner.userId} class="food-box">
                    <div class="column">
                      <h3>Store Owners</h3>
                      <h4>{result.storeOwner.firstName} {result.storeOwner.lastName}</h4>
                      <h6>{result.storeOwner.email}</h6>
                      {result.storeOwnerInventory.map((foodItem) => (
                        <p key={foodItem.id}>
                          <strong>{formatItemString(foodItem.itemName)}</strong> | EXP {formatDateTime(foodItem.expirationDate)} | ${foodItem.price} | Qty. {foodItem.quantity}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      );
    }
    return null;
  }

  return (
    <div className="container">
      {console.log(user)}
      {renderDiscountedItemsPage()}
    </div>
  );
};

export default DiscountedItemsPage;
