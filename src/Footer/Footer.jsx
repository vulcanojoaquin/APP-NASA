import React from 'react';
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 px-4 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
                <div>
                    <h3 className="font-bold text-xl mb-2">NASA App PWA</h3>
                    <p className="text-sm text-gray-400">Explorando el universo todos los días</p>
                </div>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
                    <a href="#" className="hover:text-pink-400 transition-colors">Instagram</a>
                    <a href="#" className="hover:text-blue-600 transition-colors">Facebook</a>
                </div>
                <div className="text-sm text-gray-400">
                    <p>Email: contacto@nasa.com</p>
                    <p>Tel: +54 11 1234-1234</p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;