import { useState, useEffect } from 'react';
import { getAllApod } from "../../services/apodService"




function Home() {
const [data, setData] = useState([])

useEffect(() => {
    getAllApod().then(data => setData(data))
}, []); //el [] hace que se ejecutee una sola vez cuando el componnente se monta

    return(
        <div>
            {data.map(item => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <img src={item.hdurl} width="200" />
                    <p>{item.date}</p>
                </div>
            ))}
        </div>
    )
}

export default Home