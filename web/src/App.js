import React, { useEffect, useState } from "react";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";
import api from "./services/api";
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    const loadDevs = async () => {
      const response = await api.get("/devs");
      setDevs(response.data);
    };
    loadDevs();
  }, []);

  const handleAddDev = async data => {
    const response = await api.post("/devs", data);
    setDevs([...devs, response.data]);
  };

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
