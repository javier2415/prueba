import React, { useState, useEffect } from "react";
import Axios from "axios";
import logo from './logo.svg';
import './App.css';
import Moment from 'moment';

function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    Axios({
      url: "https://api.datos.gob.mx/v1/condiciones-atmosfericas",
    })
      .then((response) => {
        console.log(response);
        
        // // filtro por pagina
        // let total = response.data.pagination.total;
        // let numero_pagina = 1;
        // let idInicio = numero_pagina * 10;
        // let lista_respuesta = [];
        
        // response.data.results.map((item)=>{
        //     let contador = 1;
        //     if(contador < 10){
        //       console.log("respuesta" + response.data.results[idInicio])
        //       contador ++;
        //       let respuesta = response.data.results[idInicio];
        //       idInicio = idInicio + 1;
        //       lista_respuesta.push(response.data.results[idInicio]);
        //     }

        // });

        setList(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setList]);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <label>Pagina</label>
      <select>
        <option value={1}>1</option>
      </select>
      <div className="container">
            <table>
                <thead>
                <tr>
                <th>_id</th>
                <th>cityid</th>
                <th>name</th>
                <th>state</th>
                <th>probabilityofprecip</th>
                <th>relativehumidity</th>
                <th>Lastreporttimeformato(YYYY/MM/DD)</th>
                <th>LLUEVE</th>
                </tr>
                </thead>
                <tbody>
                        {list.map((item) => (
                    <tr className="row">
                      <td key={item._id}>
                        {item._id}
                      </td>
                      <td>
                        {item.cityid}
                      </td>
                      <td>
                        {item.name}
                      </td>
                      <td>
                        {item.state}
                      </td>     
                      <td>
                        {item.probabilityofprecip}
                      </td>
                      <td>
                        {item.relativehumidity}
                      </td>
                      <td>
                        {Moment(item.lastreporttime).format('YYYY/MM/DD')}
                      </td>
                      <td>
                        {(item.probabilityofprecip > 60 || item.relativehumidity > 50 ? "SI LLUEVE" : "NO LLUEVE")}
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
    </div>
  );
}

export default App;
