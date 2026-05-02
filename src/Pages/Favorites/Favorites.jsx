import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../../Components/Card/Card';
import { Link } from 'react-router-dom';
import FavoriteButton from '../../Components/FavoriteButton/FavoriteButton';
import { getFavorites } from '../../utils/favoritesStorage';

const Favorites = () => {
    const { t } = useTranslation();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Cargar favoritos al montar el componente
        setFavorites(getFavorites());
    }, []);

    // Función para refrescar la lista si se quita un favorito desde esta misma página
    const handleUpdate = () => {
        setFavorites(getFavorites());
    };

    return (
        <main className="w-full p-6 min-h-screen bg-slate-950">
            <h1 className="text-3xl font-bold text-white mb-6">
                {t('favorites.title')}
            </h1>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20">
                    <p className="text-gray-400 text-xl mb-4">{t('favorites.empty')}</p>
                    <Link to="/" className="text-blue-400 hover:underline">
                        {t('favorites.goHome')}
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((item) => (
                        <div key={item.id} onClick={handleUpdate}>
                             <Link to={`/details/${item.id}`}>
                                <Card className="bg-white hover:scale-105 transition-transform duration-300 border-gray-200">
                                    <div className="relative">
                                        <img
                                            src={item.hdurl || item.url}
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-2 right-2">
                                            <FavoriteButton item={item} />
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <h2 className="!text-black font-semibold text-lg">
                                            {item.title}
                                        </h2>
                                        <p className="!text-gray-600 text-sm mt-1">
                                            {item.date}
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default Favorites;