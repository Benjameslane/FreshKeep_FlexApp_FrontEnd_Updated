import React, { useEffect, useState } from 'react';
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
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  useEffect(() => {
    fetchExpiringFood();
  }, [token]);

  const fetchExpiringFood = async () => {
    try {
      let response = await getExpiringFoodItems(token);
      fetchRecipes(response);
    } catch (error) {
      console.error("Error fetching expiring food items:", error);
    }
  };

  const fetchRecipes = async (expiringFood) => {
    try {
      let response = await getRecipes(expiringFood, token);
      setRecipes(response);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const openPopup = (recipe) => {
    setSelectedRecipe(recipe);
    setSelectedRecipeId(recipe.id);
    setShowRecipe(true);
  };

  const closePopup = () => {
    setSelectedRecipe(null);
    setSelectedRecipeId(null);
    setShowRecipe(false);
  };

  return (
    <div className="recipe-container">
      <h1>Recipes for Expiring Food!</h1>
      <div className="recipe-image-container">
        {recipes.map(recipe => (
          <div
            className={`image ${selectedRecipeId && selectedRecipeId !== recipe.id ? 'inactive' : ''}`}
            key={recipe.id}
            onClick={() => openPopup(recipe)}
          >
            <img src={recipe.image} alt={recipe.title} />
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
