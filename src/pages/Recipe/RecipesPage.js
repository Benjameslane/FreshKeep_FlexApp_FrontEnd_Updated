import React from "react";
import { useEffect, useState } from "react";
import { getExpiringFoodItems } from '../../Services/FoodItemService';
import { getRecipes } from '../../Services/RecipeService';
import useAuth from "../../hooks/useAuth";
import RecipeModal from "../Recipe/RecipeModal";
import "./RecipesPage.css";

const RecipesPage = () => {
  const [user, token] = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [showRecipe, setShowRecipe] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchExpiringFood();
  }, [token]);

  const fetchExpiringFood = async () => {
    try {
      let response;
      if (user.userType === "Homeowner/Renter") {
        response = await getExpiringFoodItems(token);
      }
      // Call fetchRecipes here since we have the expiringFood data
      fetchRecipes(response)
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const fetchRecipes = async (expiringFood) => {
    try {
      let response;
      if (user.userType === "Homeowner/Renter") {
        response = await getRecipes(expiringFood, token);
      }
      setRecipes(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const openPopup = (recipe) => {
    setSelectedRecipe(recipe);
    setShowRecipe(true);
  };

  const closePopup = () => {
    setSelectedRecipe(null);
    setShowRecipe(false);
  };

  return (
    <div className="recipe-container">
      {console.log(user)}
      <h1>Recipes for Expiring Food!</h1>
      <div className="recipe-image-container">
        {recipes &&
          recipes.map((recipe) => (
            <div class="image" key={recipe.id} onClick={() => openPopup(recipe)}>
              <img src={recipe.image} alt="" />
            </div>
        ))}
      </div>
      
      {showRecipe && (
        <RecipeModal
          onCancel={closePopup}
          recipe={selectedRecipe}
        />
      )}
    </div>
  );
};

export default RecipesPage;
