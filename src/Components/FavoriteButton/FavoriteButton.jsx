import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isFavorite, toggleFavorite } from '../../utils/favoritesStorage';

const FavoriteButton = ({ item }) => {
    const { t } = useTranslation();
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        setFavorited(isFavorite(item.id));
    }, [item.id]);

    const handleToggle = (e) => {
        e.preventDefault(); // Evitar navegación si está dentro de un link
        e.stopPropagation(); // Evitar eventos del padre
        const newState = toggleFavorite(item);
        setFavorited(newState);
    };

    return (
        <button
            onClick={handleToggle}
            className={`p-2 rounded-full transition-all duration-300 ${
                favorited 
                ? 'bg-yellow-500 text-white scale-110 shadow-lg' 
                : 'bg-white/20 text-white backdrop-blur-md hover:bg-white/40'
            }`}
            title={favorited ? t('favoriteButton.remove') : t('favoriteButton.add')}
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill={favorited ? "currentColor" : "none"} 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
        </button>
    );
};

export default FavoriteButton;
