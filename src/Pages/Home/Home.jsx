import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAllApod } from "../../services/apodService";
import Card from '../../Components/Card/Card';
import { Link } from 'react-router-dom';
import FavoriteButton from '../../Components/FavoriteButton/FavoriteButton';

const Home = ({ searchQuery }) => {
  const { t } = useTranslation();
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
    let ignore = false; // 1. Bandera para ignorar respuestas viejas

    setLoading(true);

    getAllApod(page, 10, searchQuery)
      .then((responseData) => {

        if (ignore) return; // 2. Si la petición fue cancelada, no hacemos nada
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
        if (ignore) return;
        console.error(error);
        setLoading(false);
      });

    // 3. Cleanup: si searchQuery o page cambian antes de que llegue la respuesta,
    // marcamos ignore = true para que esa respuesta vieja no duplique datos.
    return () => {
      // ignore = true;
    };
  }, [searchQuery, page]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {

      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10;

      console.log(loading, nearBottom, hasMore);
      if (nearBottom && !loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    };


    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <main className="w-full p-6 min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section
        className="relative w-full h-96 flex items-center justify-center"
        style={{ backgroundImage: `url(https://futuroelectrico.com/wp-content/uploads/2020/06/Exploracion-Espacial.jpg)`, backgroundAttachment: 'fixed', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Overlay oscuro para que el texto se lea bien */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Texto encima */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">{t('home.title')}</h1>
          <p className="text-xl text-gray-300">{t('home.subtitle')}</p>
        </div>
      </section>
      {loading && (
        <p className="text-gray-400">{t('home.loading')}</p>
      )}

      {!loading && data.length === 0 && (
        <p className="text-gray-400 text-lg mt-10 text-center">
          {t('home.noResults')}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {data.map((item, index) => (
          <Link to={`/details/${item.id}`} key={item.id}>

            <Card
              key={item.id || index}
              className="bg-white hover:scale-105 transition-transform duration-300 border-gray-200"
            >
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
        ))}
      </div>
    </main>
  );
};

export default Home;