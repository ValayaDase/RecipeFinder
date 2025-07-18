import './Category.css';
import { useEffect, useState } from 'react';
import MealCard from './MealCard';
import axios from 'axios';



function Category(){
const [name, setName] = useState(null);
const [meals , setmeals] = useState(null)

  const handleClick = (selectedName) => {
    setName(selectedName); // always update name
    setmeals(null); // clear previous meals
};



  useEffect(()=>{


     window.dispatchEvent(new Event("clearSearchResults"));


    if(name){
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`;
        axios.get(url)
        .then((response) => {
            setmeals(response.data.meals);
            
            
        })
        .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
  },[name])


    useEffect(() => {
    const clearCategory = () => {
        setmeals(null);
        setName(null);
    };

    window.addEventListener("clearCategoryMeals", clearCategory);

    return () => {
        window.removeEventListener("clearCategoryMeals", clearCategory);
    };
    }, []);


  if(meals){
    return(
        <>
        <MealCard detail={meals} />
        
        <button
            className='back'
            onClick={() => {
                    setmeals(null);
                    setName(null);
                }}
            >
        Back
    </button>
    </>
    )
    
  }

 

    return(
        <>
            <div className="container2">
                <h1>Categories</h1>
                <div className="catg">
                    <div className="catg-card">
                        <img className="img" src="https://previews.123rf.com/images/susansam/susansam1903/susansam190300075/121711821-healthy-meal-fried-fish.jpg" alt="fish" />
                        <h2>Sea Foods</h2>
                        <button onClick={()=>handleClick("seafood")} className='find'>Search Recipes</button>
                    </div>
                    <div className="catg-card">
                        <img className="img" src="https://images.unsplash.com/photo-1606728035253-49e8a23146de?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpY2tlbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D" alt="Chicken" />
                        <h2>Chicken</h2>
                        <button onClick={()=>handleClick("chicken")} className='find'>Search Recipes</button>
                    </div>
                    <div className="catg-card">
                        <img className="img" src="https://belleofthekitchen.com/wp-content/uploads/2024/06/no-bake-oreo-dessert-1-2.jpg" alt="Dessert" />
                        <h2>Dessert</h2>
                        <button onClick={()=>handleClick("dessert")} className='find'>Search Recipes</button>
                    </div>
                    <div className="catg-card">
                        <img className="img" src="https://cdn.prod.website-files.com/63ed08484c069d0492f5b0bc/642c5de2f6aa2bd4c9abbe86_6406876a4676d1734a14a9a3_Bowl-of-vegetables-and-fruits-for-a-vegetarian-diet-vegetarian-weight-loss-plan.jpeg" alt="Vegetarian" />
                        <h2>Vegetarian</h2>
                        <button onClick={()=>handleClick("Vegetarian")} className='find'>Search Recipes</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category;