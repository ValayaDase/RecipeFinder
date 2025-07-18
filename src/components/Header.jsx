import axios from 'axios';
import './Header.css';
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from 'react';
import MealCard from './MealCard';

function Header() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleInput = (event) => {
        setSearch(event.target.value);
    };

    const handleClick = () => {
        // Don't fetch if search is empty
        if (search.trim() === "") {
            return;
        }

        window.dispatchEvent(new Event("clearCategoryMeals")); // optional if you use categories elsewhere

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;

        axios.get(url)
            .then((response) => {
                const fetchedData = response.data.meals;
                setData(fetchedData);
                setHasSearched(true);

                if (!fetchedData) {
                    setShowError(true);
                    setTimeout(() => setShowError(false), 3000); // hide error after 3 sec
                }

                setSearch(""); // clear input
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setShowError(true);
                setTimeout(() => setShowError(false), 3000);
            });
    };

    useEffect(() => {
        const clearSearchResults = () => setData(null);

        window.addEventListener("clearSearchResults", clearSearchResults);

        return () => {
            window.removeEventListener("clearSearchResults", clearSearchResults);
        };
    }, []);

    return (
        <>
            <div className="container">
                <div className="name">
                    <h1>RecipeFinder</h1>
                </div>
                <div className="search">
                    <input
                        onChange={handleInput}
                        className="search-bar"
                        type="text"
                        value={search}
                        placeholder="Search for recipes..."
                    />
                    <button onClick={handleClick} className="search-button">
                        <FaSearch />
                    </button>
                </div>
            </div>

            {showError && <p className="error">No recipes found!</p>}

            {/* Render MealCard only if data is present */}
            {data && <MealCard detail={data} />}
        </>
    );
}

export default Header;
