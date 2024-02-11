import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';
import RecipeTile from './RecipeTile';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [healthLabels, setHealthLabels] = useState('vegan');

  const YOUR_APP_ID = '18f8f4da';
  const YOUR_APP_KEY = 'cdfd54d4308920b1f29b5d7785717247';

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabels}`;

  async function getRecipes() {
    try {
      const result = await Axios.get(url);
      setRecipes(result.data.hits);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  return (
    <div className="app">
      <h1 onClick={getRecipes}>Recipe Wizard 🍔</h1>
      <form className="app__searchForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="app__input"
          placeholder="Enter ingredient"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />
        <select
          className="app__healthLabels">
          
          <option onClick={() => setHealthLabels("vegan")}>vegan</option>
          <option onClick={() => setHealthLabels("vegetarian")}>vegetarian</option>
          <option onClick={() => setHealthLabels("paleo")}>paleo</option>
          <option onClick={() => setHealthLabels("dairy-free")}>dairy-Free</option>
          <option onClick={() => setHealthLabels("gluten-free")}>gluten-free</option>
          <option onClick={() => setHealthLabels("wheat-free")}>wheat-free</option>
          <option onClick={() => setHealthLabels("low-sugar")}>low-sugar</option>
          <option onClick={() => setHealthLabels("egg-free")}>egg-free</option>
          <option onClick={() => setHealthLabels("peanut-free")}>peanut-free</option>
          <option onClick={() => setHealthLabels("tree-nut-free")}>tree-nut-free</option>
          <option onClick={() => setHealthLabels("soy-free")}>soy-free</option>
          <option  onClick={() => setHealthLabels("fish-free")}>fish-free</option>
          <option onClick={() => setHealthLabels("shellfish-free")}>shellfish-free</option>

        </select>
      </form>
      <div className="app_recipes">
        {recipes.map((recipe, index) => (
          <RecipeTile key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default App;
