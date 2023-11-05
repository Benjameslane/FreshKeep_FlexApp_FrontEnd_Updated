import React, { useState } from 'react';
import { getNearestFoodShelters, getUserLocation } from '../../Services/PlacesService';
import"./FoodShelterList.css";

const FoodShelterList = () => {
  const [address, setAddress] = useState('');
  const [foodShelters, setFoodShelters] = useState(null);

  const handleSearch = async () => {
    try {
      const userLocation = await getUserLocation(address);
      const shelters = await getNearestFoodShelters(userLocation.latitude, userLocation.longitude);
      setFoodShelters(shelters);
    } catch (error) {
      console.error('Error searching for food shelters:', error);
    }
  };

  return (
    <div>
      <div className="shelter-header">
        <h1>Find Nearest Food Shelters</h1>
        <div className="shelter-input">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {foodShelters && (
        <div className="shelter-container">
          {foodShelters.map((shelter, index) => (
            <div key={index} class="box">
              <p><strong>{shelter.name}</strong></p>
              <p>{shelter.vicinity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodShelterList;
