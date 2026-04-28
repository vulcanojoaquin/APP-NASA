import { useState, useEffect } from 'react';
import { getAllApod } from "../../services/apodService";
import Card from '../../Components/Card/Card';

const Home = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Resetear búsqueda
  useEffect(() => {
    setPage(1);
    setData([]);
    setHasMore(true);
  }, [searchQuery]);

  // Cargar datos
  useEffect(() => {
    setLoading(true);

    getAllApod(page, 10, searchQuery)
      .then((responseData) => {
        if (responseData.length === 0) {
          setHasMore(false);
        } else {
          setData((prev) =>
            page === 1 ? responseData : [...prev, ...responseData]
          );
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [searchQuery, page]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200;

      if (nearBottom && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <main className="w-full p-6 min-h-screen bg-slate-950">
      <h1 className="text-3xl font-bold text-white mb-6">
        🚀 NASA App
      </h1>

      {loading && (
        <p className="text-gray-400">Cargando...</p>
      )}

      {!loading && data.length === 0 && (
        <p className="text-gray-400 text-lg mt-10 text-center">
          😕 No se encontraron elementos para tu búsqueda.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <Card
            key={item.id || index}
            className="bg-white hover:scale-105 transition-transform duration-300 border-gray-200"
          >
            <img
              src={item.hdurl || item.url}
              alt={item.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="!text-black font-semibold text-lg">
                {item.title}
              </h2>

              <p className="!text-gray-600 text-sm mt-1">
                {item.date}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Home;