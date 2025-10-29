import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Categories.css';

export function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(
                    'https://api.themoviedb.org/3/genre/movie/list?api_key=5f8557497311bd7eeea85b64c12d8fd4&language=en-US'
                );
                const data = await response.json();
                setCategories(data.genres);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId) => {
        navigate(`/movies?with_genres=${categoryId}&page=1`);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="categories-container">
            <h2 className="text-center mb-4">Movie Categories</h2>
            <div className="row g-4">
                {categories.map((category) => (
                    <div key={category.id} className="col-sm-6 col-md-4 col-lg-3">
                        <div 
                            className="category-card"
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{category.name}</h5>
                                    <p className="card-text">
                                        Explore {category.name} movies
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
