import React, { useState, useEffect } from 'react';
import './RecipeTile.css';
import Axios from 'axios';
import './App';

export default function RecipeTile({ recipe }) {

  const YOUR_APP_ID = '18f8f4da';
  const YOUR_APP_KEY = 'cdfd54d4308920b1f29b5d7785717247';

  const [showModal, setShowModal] = useState(false);
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    if (showModal) {
      // Fetch the recipe details when the modal is shown
      fetchRecipeDetails();
    }
  }, [showModal]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const fetchRecipeDetails = async () => {
    try {
      const response = await Axios.get(`https://api.edamam.com/search?r=${encodeURIComponent(recipe.recipe.uri)}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
      setRecipeDetails(response.data[0]);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  return (
    <div className="recipeTile">
      <img className="recipeTile__img" src={recipe.recipe.image} alt={recipe.recipe.label} />
      <p className="recipeTile__name">{recipe.recipe.label}</p>
      <button className="recipeTile__button" onClick={toggleModal}>
        View Recipe
      </button>
      {showModal && recipeDetails && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <h2>{recipe.recipe.label}</h2>
            <h3>Ingredients:</h3>
            <ul>
              {recipeDetails.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.text}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
