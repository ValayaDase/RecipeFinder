import axios from "axios";
import './MealInfo.css';
import { useEffect, useState } from "react";

function MealInfo(props) {
  const mealId = props.mealId;
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    axios.get(url)
      .then((response) => {
        setMeal(response.data.meals[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [mealId]);

  const getIngredients = () => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  if (!meal) return <p>Loading...</p>;

  return (
    <div className="info-container">
      <h1><i>{meal.strMeal}</i></h1>
      <div className="img">
        <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%', borderRadius: '10px' }} />
      </div>
      <div className="items">
        <div className="ingredients">
          <h3>Ingredients</h3>
          <ul>
            {getIngredients().map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        </div>
      </div>
      <div className="recipe">
        <h3>Instructions</h3>
        <p>{meal.strInstructions}</p>
      </div>
    </div>
  );
}

export default MealInfo;
