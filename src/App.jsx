import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://69eb6fd597482ad5c527b5ee.mockapi.io/api/planetas/APOD")
      .then((res) => res.json())
      .then((json) => {
        console.log(json); // 👈 para probar
        setData(json);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div >
      <h1>API NASA</h1>
    <div style={{display: "flex", flexDirection:"column", gap:"20px"}}>
      {data.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <img src={item.hdurl} width="200" />
          <p>{item.date}</p>
        </div>
      ))}
    </div>
    <section>
       <div className="ticks"></div>
       <section id="spacer"></section>
    </section>
  </div>
 )
}