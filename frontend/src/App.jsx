import "bootstrap/dist/css/bootstrap.min.css";
import TogoForm from "./TogoForm";
import TogoList from "./TogoList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer";

function App() {
  const [togos, setTogos] = useState([]); // state to store list of togos
  const [isDarkMode, setIsDarkMode] = useState(false); // State to track dark mode
  const backendUrl = import.meta.env.MODE === 'production' 
  ? import.meta.env.VITE_APP_BACKEND_URL 
  : 'http://localhost:4000';
  console.log("Backend URL: ", backendUrl);
  // const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:4000';
  
  useEffect(() => {
    async function fetchTogos() {
      try {
        // Fetch togos from the server
        const response = await axios.get(`${backendUrl}/togos`);
        setTogos(response.data); // Update state with fetched togos
      } catch (error) {
        console.error("Error fetching togos:", error);
      }
    }
    fetchTogos(); // Call the function to fetch togos when the component mounts
  }, [backendUrl]); // Make sure to include backendUrl in the dependency

  // Function to add a new togo
  function onAdd(newItem) {
    const newTogo = {
      id: Date.now(), // Unique ID based on the current time
      text: newItem, // Text of the togo
      completed: false, // Initially, the togo is not completed
    }; 

    // Update state to include the new togo
    setTogos((prevTogos) => [...prevTogos, newTogo]);
  }

  async function handleDelete(id) {
    // Function to delete a togo
    try {
      await axios.delete(`${backendUrl}/togos/${id}`); // Send a delete request
      const newTogos = togos.filter((togo) => togo.id !== id); // Remove deleted togo from state
      setTogos(newTogos); // Update state
    } catch (error) {
      console.error("Error deleting togo:", error);
    }
  }

  async function handleEdit(id, newText) {
    // Function to edit togo
    try {
      await axios.put(`${backendUrl}/togos/${id}`, { text: newText }); // send PUT request to update text
      const updatedTogos = togos.map(
        (togo) => (togo.id === id ? { ...togo, text: newText } : togo) // Update the edited togo
      );
      setTogos(updatedTogos); // Update state
    } catch (error) {
      console.error("Error updating togo:", error);
    }
  }

  async function handleToggle(id) {
    // Function to toggle the completion status of a togo
    const togoToToggle = togos.find((togo) => togo.id === id); // Find the togo to toggle
    try {
      await axios.put(`${backendUrl}/togos/${id}`, {
        completed: !togoToToggle.completed, // Toggle the completed status
      });

      const updatedTogos = togos.map(
        (togo) =>
          togo.id === id ? { ...togo, completed: !togo.completed } : togo // Update the completion status
      );
      setTogos(updatedTogos); // Update state
    } catch (error) {
      console.error("error toggling togo status:", error);
    }
  }

  function toggleDarkMode() {
    setIsDarkMode(!isDarkMode);
  }

  // The JSX structure of the component
  return (
    <div
      style={{
        backgroundImage: `url('images/traveller.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
      className={`d-flex mx-auto position-relative flex-column justify-content-center align-items-center ${
        isDarkMode ? "bg-dark text text-white" : "bg-white  text-dark"
      }`}
    >
      <div className="d-flex w-75 justify-content-between">
        <div></div>
        {/* <h1 className="my-auto">My To-go List</h1> */}
        <img
          className="mb-1 mt-3"
          src="/images/togo_logo.png"
          alt="Logo"
          style={{ width: "350px" }}
        />
        <button
          onClick={toggleDarkMode}
          className={`btn m-4 rounded-pill fs-3  border ${
            isDarkMode ? "btn-light" : "btn-dark"
          }`}
          title="change to dark/light mode"
        >
          {isDarkMode ? "☀" : "☾"}
        </button>
      </div>
      <div
        className={`w-75  rounded bg-light border shadow p-4 ${
          isDarkMode ? "bg-dark text-white" : "bg-light text-dark"
        }`}
      >
        <TogoForm onAdd={onAdd} isDarkMode={isDarkMode} />
        <TogoList
          togos={togos}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onToggle={handleToggle}
          isDarkMode={isDarkMode}
        />
      </div>
       <Footer /> {/* Add Footer at the bottom */}
    </div>
  );
}

export default App;
