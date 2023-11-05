import React from 'react';
import "./RecipeModal.css";

const RecipeModal = ({ onCancel, recipe }) => {

  return (
    <div class="recipe-modal">
      <div class="recipe-dialog">
        <div class="recipe-header">
          <h2>{recipe.title}</h2>
          <div class="close-btn" onClick={onCancel}>&times;</div>
        </div>
        <div class="recipe-body">
          <div class="content">
            <h3>Ingredients:</h3>
            {recipe.usedIngredients && 
              recipe.usedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            <h3>Missing Ingredients:</h3>
            {recipe.missedIngredients && 
              recipe.missedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
