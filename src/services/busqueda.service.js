import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function servicio() {
  const [list, setList] = useState([]);
  useEffect(() => {
    Axios({
      url: "https://api.datos.gob.mx/v1/condiciones-atmosfericas",
    })
      .then((response) => {
        setList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setList]);

  return (
    <div className="App">
      <div>
        {list.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}