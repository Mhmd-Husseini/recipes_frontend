import React, { useEffect, useState } from 'react';
import Input from '../../Input';
import { sendRequest } from '../../../config/request';
import './style.css';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { recipe_id } = useParams();
  const [details, setDetails] = useState([]);
  const [comment, setComment] = useState('');

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
      <div className='name'>
        <h1>{details.title}</h1>
      </div>
      <div className="recipe-details">
          <div className="recipe-info">
            <h2>Description</h2>
            <p>{details.description}</p>
            <p>Cuisine: {details.cuisine}</p>
          </div>
        <div className="recipe-info">
          <h2>Directions</h2>
          <p>{details.directions}</p>
        </div>
        <div className="recipe-info">
          <h2>Ingredients</h2>
            {details.ingredients &&
              details.ingredients.map((ingredient) => (
                <p key={ingredient.id}>
                  {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                </p>
              ))}
        </div>
      </div>
      <div className="comments">
        <h2>Comments:</h2>
        <ul>
          {details.comments &&
            details.comments.map((comment) => (
              <li key={comment.id}>
                {comment.text} - by {comment.username}
              </li>
            ))}
        </ul>
      </div>
      <div className='comment-input'>
        <i class="fa-solid fa-thumbs-up fa-2xl like"></i>        
        <Input  value={comment} onChange={(newComment) => setComment(newComment)}  placeholder={'Comment here'}/>
      </div>
    </div>
  );
};

export default RecipeDetails;
