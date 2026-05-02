import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home';
import Favorites from './Pages/Favorites/Favorites';
import Details from './Pages/Details/Details';
import Footer from './Components/Footer/Footer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BrowserRouter>
      {/* Header sticky — visible en TODAS las páginas */}
      <Header
        searchValue={searchQuery}
        onSearch={setSearchQuery}
      />

      {/* Rutas — el header queda siempre arriba */}
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>|
      <Footer />
    </BrowserRouter>
  );
}

export default App;
