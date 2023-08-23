import React from 'react';
import "./style.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      {recipe.images && recipe.images.length > 0 ? (
        <img src={`data:image/jpeg;base64,${recipe.images[0].image_url}`} alt={recipe.title} />
      ) : (
        <img src="http://content.health.harvard.edu/wp-content/uploads/2021/11/7640be02-f078-4f16-91da-6cf32d186e46.jpg" alt={recipe.title} />
      )}
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <p>Cuisine: {recipe.cuisine}</p>
      <p>Likes: {recipe.likes_count}</p>
    </div>
  );
};

export default RecipeCard;
