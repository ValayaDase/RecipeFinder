import './MealCard.css';
import MealInfo from './MealInfo';
import { useState } from 'react';

function MealCard(props) {
  const details = props.detail;
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleClick = (id) => {
    setSelectedMeal(id); // open modal with selected meal ID
  };

  const closeModal = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="meals-container">
      {details && details.length > 0 ? (
        details.map((meal) => (
          <div className="meal-card" key={meal.idMeal}>
            <img className="meal-img" src={meal.strMealThumb} alt={meal.strMeal} />
            <h2>{meal.strMeal}</h2>
            <button onClick={() => handleClick(meal.idMeal)} className="meal-btn">See Recipe</button>
          </div>
        ))
      ) : " "}

      {selectedMeal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>      
            <button className="close-btn" onClick={closeModal}>X</button>
            <MealInfo mealId={selectedMeal} />
          </div>
        </div>
      )}
    </div>

    // e.stopPropagation()  clicking inside the modal box does not close it.
  );
}

export default MealCard;
