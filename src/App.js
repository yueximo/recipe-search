import './App.css';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios';
import Recipe from './components/Recipe';
import Alert from './components/Alert';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('');

  const APP_ID = 'c4a5984b';
  const APP_KEY = 'bac0b0d0c54fbd86aea411b004c9e790';

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== '') {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert('No recipes found');
      }
      setAlert('');
      setQuery('');
      setRecipes(result.data.hits);

      console.log(result);
    } else {
      setAlert('Please fill the form!');
    }
  };

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <div className='App'>
      <h1>Recipe Search</h1>
      <form className='search-form' onSubmit={submitHandler}>
        {alert !== '' && <Alert alert={alert} />}
        <input
          type='text'
          name='query'
          placeholder='Search'
          autoComplete='off'
          onChange={onChange}
          className='recipe-search'
          value={query}
        />
        <input type='submit' value='Search'></input>
      </form>
      <div className='recipes'>
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
}

export default App;
