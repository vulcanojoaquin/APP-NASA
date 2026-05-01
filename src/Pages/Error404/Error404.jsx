import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-10 mt-20" >
            <h1 className="text-8xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Oops! Página no encontrada</h2>
            <p className="text-gray-500 mb-8 max-w-md">
                Parece que te has perdido en el espacio. La ruta que intentas buscar no existe o fue movida.
            </p>

            <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
                Volver al Inicio
            </Link>
        </div>
    );
};

export default Error404;
