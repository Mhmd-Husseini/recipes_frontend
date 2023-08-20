import React, { useEffect, useState } from 'react';
import RecipeCard from '../../RecipeCard';
import { sendRequest } from '../../../config/request';
import './style.css';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { recipe_id } = useParams();

  const [details, setDetails] = useState([]);

  const fetchDetails = async () => {
    try {
      const response = await sendRequest({ route: `/getRecipe/${recipe_id}`, body: '' });
      setDetails(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="details">
      <div className="recipe-images">
        {details.images &&
          details.images.map((image) => (
          <img key={image.id} src={image.image_url} alt={`Recipe ${details.title}`} />
        ))}
      </div>
      <div className="recipe-details">

        <div className="recipe-info">
          <h2>{details.title}</h2>
          <p>{details.description}</p>
          <p>Cuisine: {details.cuisine}</p>
          <p>Likes: {details.likes_count}</p>
        </div>
      </div>
      <div className="ingredients">
        <h3>Ingredients</h3>
        <ul>
          {details.ingredients &&
            details.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name} - {ingredient.quantity} {ingredient.unit}
              </li>
            ))}
        </ul>
      </div>
      <div className="comments">
        <h3>Comments</h3>
        <ul>
          {details.comments &&
            details.comments.map((comment) => (
              <li key={comment.id}>
                {comment.text} - by {comment.username}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetails;
