import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Home from './Pages/Home/Home'; // Importamos el Home real
import './App.css';

// ── Páginas placeholder (las vas a crear en tareas siguientes) ──
const Favoritos = () => (
  <main className="p-8 text-white">
    <h1 className="text-3xl font-bold">⭐ Favoritos</h1>
    <p className="mt-2 text-gray-400">Aún no tenés favoritos guardados.</p>
  </main>
);

const Detalles = () => (
  <main className="p-8 text-white">
    <h1 className="text-3xl font-bold">🔭 Detalle</h1>
    <p className="mt-2 text-gray-400">Aquí se mostrará el detalle del elemento.</p>
  </main>
);

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
        {/* Acá le pasamos el searchQuery al Home para que filtre */}
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/detalles/:id" element={<Detalles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;