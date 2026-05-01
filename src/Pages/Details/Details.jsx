import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"
import { getApodById } from "../../services/apodService"
import { Link } from "react-router-dom"
import Error404 from "../Error404/Error404"
import FavoriteButton from "../../Components/FavoriteButton/FavoriteButton"

const  Details =() => {

    const { id } = useParams() // con esto se obtiene el id de la url
    const [item, setItem] = useState(null)
    const [loading,setLoading] = useState(true)
    const [notFound,setNotFound] = useState(false)

    useEffect(() =>{
        getApodById(id).then (data => {
            if (data === null){
                setNotFound(true)                
            }
            else{
            setItem(data);
            }
            setLoading(false)
            console.log(notFound,data);
            
        })
    }, [id]);


    if (loading) return <p className="text-white">Cargando...</p>;
    if (notFound) return <Error404/>

return (
    <main className="p-6 min-h-screen bg-slate-950 text-white">
    <Link to="/" className="text-blue-400 hover:text-blue-300 mb-6 inline-block"> {/*boton para volver al home */}
        ← Volver
    </Link>

    {/* Layout flex: imagen izquierda, texto derecha */}
    <div className="flex flex-col md:flex-row gap-8 mt-4">
    
      {/* Imagen izquierda */}
    <div className="md:w-1/2">
        <img 
            src={item.hdurl} 
            alt={item.title} 
            className="w-full h-auto rounded-lg object-cover"
        />
    </div>

      {/* Texto derecha */}
    <div className="md:w-1/2 flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{item.title}</h1>
            <FavoriteButton item={item} />
        </div>
        <p className="text-blue-400 text-sm">{item.date}</p>
        <p className="text-gray-300 leading-relaxed">{item.explanation}</p>
        {item.copyright && (
        <p className="text-gray-500 text-sm mt-auto">© {item.copyright}</p>
        )}
    </div>

    </div>
</main>
);
}

export default Details