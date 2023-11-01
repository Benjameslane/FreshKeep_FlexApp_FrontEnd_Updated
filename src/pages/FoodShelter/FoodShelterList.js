import React, { useState } from 'react';
import { getNearestFoodShelters } from '../../api';
import"./FoodShelterList.css";

const FoodShelterList = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [foodShelters, setFoodShelters] = useState(null);

  const handleSearch = async () => {
    try {
      const shelters = await getNearestFoodShelters(latitude, longitude);
      setFoodShelters(shelters);
    } catch (error) {
      console.error('Error searching for food shelters:', error);
    }
  };

  return (
    <div>
      <h1>Find Nearest Food Shelters</h1>
      <div>
        <label>Latitude:</label>
        <input
          type="number"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <label>Longitude:</label>
        <input
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {foodShelters && (
        <ul>
          {foodShelters.map((shelter, index) => (
            <li key={index}>
              {shelter.name} - {shelter.vicinity}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodShelterList;
