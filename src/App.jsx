
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
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
      </Routes>
    </Router>
  );
}

export default App;