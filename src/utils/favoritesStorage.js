const FAVORITES_KEY = 'nasa_app_favorites';

export const getFavorites = () => {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
};

export const saveFavorites = (favorites) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (id) => {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === id);
};

export const toggleFavorite = (item) => {
    const favorites = getFavorites();
    const index = favorites.findIndex(fav => fav.id === item.id);

    if (index === -1) {
        // No está, lo agregamos
        favorites.push(item);
    } else {
        // Ya está, lo quitamos
        favorites.splice(index, 1);
    }

    saveFavorites(favorites);
    return index === -1; // Devuelve true si se agregó, false si se quitó
};
