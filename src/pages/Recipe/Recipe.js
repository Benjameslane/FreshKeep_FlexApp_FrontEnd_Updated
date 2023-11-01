import React, { useEffect, useState } from 'react';
import RecipeService from '../../Services/RecipeService';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await RecipeService.getRecipesByExpiringItems(7);

      setRecipes(data);
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (recipes.length === 0) {
    return <p>No recipes found for items expiring soon.</p>;
  }

  return (
    <div>
      <h2>Recipes for Expiring Items</h2>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
