
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Detalles from './Pages/Details/Details';
import Favoritos from './Pages/Favorites/Favorites';
import Footer from './Footer/Footer';
import Error404 from './Pages/Error404/Error404';

// import AppRoutes from './routes/AppRoutes'; // Descartado para mantener el estado de búsqueda global

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      {/* Header sticky — visible en TODAS las páginas */}
      <Header
        searchValue={searchQuery}
        onSearch={setSearchQuery}
      />

      {/* Rutas definidas aquí para poder pasarle searchQuery a Home */}
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/detalles/:id" element={<Detalles />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;