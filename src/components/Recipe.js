import { useState } from 'react/cjs/react.development';
import RecipeDetails from './RecipeDetails';

const Recipe = ({ recipe }) => {
  const { label, image, url, ingredients } = recipe.recipe;
  const [show, setShow] = useState(false);

  return (
    <div className='recipe'>
      <h2>{label}</h2>
      <img src={image} alt={label} />
      <button
        type='button'
        onClick={(e) => {
          e.preventDefault();
          window.location.href = { url };
        }}
      >
        Recipe
      </button>
      <button onClick={() => setShow(!show)}>Ingredients</button>

      {show && <RecipeDetails ingredients={ingredients} />}
    </div>
  );
};

export default Recipe;
