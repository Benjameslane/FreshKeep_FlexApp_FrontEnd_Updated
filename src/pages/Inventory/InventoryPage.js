import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./InventoryPage.css";
import FoodItemForm from "../FoodItem/FoodItemForm";
import DeleteFoodItemForm from "../FoodItem/DeleteFoodItemForm";
import { getStoreInventory, getUserInventory } from "../../Services/FoodItemService";

const InventoryPage = () => {
  const [user, token] = useAuth();
  const [inventory, setInventory] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  useEffect(() => {
    fetchInventory();
  }, [token]);

  const fetchInventory = async () => {
    try {
      let response;
      if (user.userType === "Store Owner") {
        response = await getStoreInventory(token);
      } else if (user.userType === "Homeowner/Renter") {
        response = await getUserInventory(token);
      }
      setInventory(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // Returns the DateTime in MM/DD/YYYY format
  const formatDateTime = (dateTime) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const datePart = new Date(dateTime).toLocaleDateString(undefined, options);
    return `${datePart}`;
  };

  /*
  Returns expired if expirationDate is older than currentDate
  Returns expiring if expirationDate is within 7 days of currentDate
  UserInventoryPage.css handles what color row turns into based on the return of getRowClass
  */
  const getRowClass = (expirationDate) => {
    const currentDate = new Date();
    const expiration = new Date(expirationDate);

    if (expiration < currentDate) {
      return 'expired';
    }

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    if (expiration <= sevenDaysFromNow) {
      return 'expiring';
    }
  };

  const renderTableColumns = () => {
    if (user.userType === "Store Owner") {
      return (
        <tr>
          <th></th>
          <th>Id</th>
          <th>Item Name</th>
          <th>Expiration Date</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Price</th>
          <th>Status</th>
          <th>Listing</th>
          <th>Discounted</th>
          <th></th>
        </tr>
      );
    } else if (user.userType === "Homeowner/Renter") {
      return (
        <tr>
          <th></th>
          <th>Id</th>
          <th>Item Name</th>
          <th>Expiration Date</th>
          <th>Quantity</th>
          <th>Category</th>
          <th></th>
        </tr>
      );
    }
  };

  const formatListing = (listed) => {
    if (listed === 0) {
      return "Not Listed"
    } else if (listed === 1) {
      return "Listed"
    }
  };

  const formatDiscounted = (discounted) => {
    if (discounted === 0) {
      return "N"
    } else if (discounted === 1) {
      return "Y"
    }
  };

  const handleAddItemClick = () => {
    setShowAddForm(true);
    setShowUpdateForm(false);
    setShowDeleteForm(false);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleEditItem = async (foodItem) => {
    setSelectedFoodItem(foodItem);
    setShowUpdateForm(true);
    setShowDeleteForm(false);
    setShowAddForm(false);
  };

  const handleCancelEdit = async () => {
    setSelectedFoodItem(null);
    setShowUpdateForm(false);
  };

  // OnClick of the Delete button we set the selected food in the entry and then pass it to the delete form
  const handleDeleteItem = (foodItem) => {
    setSelectedFoodItem(foodItem);
    setShowDeleteForm(true);
    setShowUpdateForm(false);
    setShowAddForm(false);
  };

  const handleCancelDelete = () => {
    setSelectedFoodItem(null);
    setShowDeleteForm(false);
  };

  // Returns page with title, table of user food items and add item button
  return (
    <div className="container">
      {console.log(user)}
      <h1>Inventory for {user.userName}!</h1>
      <table className="inventory-table">
        <thead>{renderTableColumns()}</thead>
        <tbody>
          {inventory &&
            inventory.map((foodItem) => (
              <tr key={foodItem.id}>
                <td><button onClick={() => handleEditItem(foodItem)}>Edit</button></td>
                <td className={getRowClass(foodItem.expirationDate)}>{foodItem.id}</td>
                <td className={getRowClass(foodItem.expirationDate)}>{foodItem.itemName}</td>
                <td className={getRowClass(foodItem.expirationDate)}>{formatDateTime(foodItem.expirationDate)}</td>
                <td className={getRowClass(foodItem.expirationDate)}>{foodItem.quantity}</td>
                <td className={getRowClass(foodItem.expirationDate)}>{foodItem.category}</td>
                {user.userType === "Store Owner" && (
                  <>
                    <td className={getRowClass(foodItem.expirationDate)}>{foodItem.price}</td>
                    <td className={getRowClass(foodItem.expirationDate)}>{foodItem.status}</td>
                    <td className={getRowClass(foodItem.expirationDate)}>{formatListing(foodItem.listed)}</td>
                    <td className={getRowClass(foodItem.expirationDate)}>{formatDiscounted(foodItem.discounted)}</td>
                  </>
                )}
                <td><button class="delete" onClick={() => handleDeleteItem(foodItem)}>&times;</button></td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={handleAddItemClick}>Add Item</button>

      {showAddForm && (
        <FoodItemForm
          token={token}
          onSuccess={() => {
            fetchInventory();
            setShowAddForm(false);
          }}
          onCancel={handleCancelAdd}
          userType={user.userType}
          isEdit={false}
        />
      )}

      {showUpdateForm && selectedFoodItem && (
        <FoodItemForm
          token={token}
          onSuccess={() => {
            fetchInventory();
            setShowUpdateForm(false);
          }}
          onCancel={handleCancelEdit}
          userType={user.userType}
          foodItem={selectedFoodItem}
          isEdit={true}
        />
      )}

      {showDeleteForm && selectedFoodItem && (
        <DeleteFoodItemForm
          token={token}
          onSuccess={() => {
            fetchInventory();
            setShowDeleteForm(false);
          }}
          onCancel={handleCancelDelete}
          userType={user.userType}
          foodItem={selectedFoodItem}
        />
      )}
    </div>
  );
};

export default InventoryPage;
