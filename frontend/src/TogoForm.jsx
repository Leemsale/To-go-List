import React, { useState } from "react";
import axios from "axios";

function TogoForm({ onAdd, isDarkMode, isMobile}) {
  const [item, setItem] = useState(""); // State to store the input value
  const backendUrl = import.meta.env.MODE === 'production' 
    ? import.meta.env.VITE_APP_BACKEND_URL
    : 'http://localhost:4000';


  function handleChange(event) {
    setItem(event.target.value); // Update input as you type
  }

  async function handleSubmit(event) {
    if (item.trim()) {
      // Check if input is not empty
      try {
        // sending POST request to the backend
        const response = await axios.post(`${backendUrl}/togos`, {
          text: item,
        });
        onAdd(response.data); // Call onAdd to add the new togo
        setItem(""); // Clear the field
      } catch (error) {
        console.error("Error adding togo:", error);
      }
    }

    event.preventDefault(); // Prevent the default form submission
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="row gy-2 gx-4 justify-content-center "
      style={{ padding: isMobile ? "5px" : "10px",
        marginBottom: isMobile ? "2px" : "4px",
      }}
    >
      <div className="col-auto">
        <input
          className={`form-control ${
            isDarkMode
              ? "bg-dark text-white border-white dark-mode-placeholder"
              : "bg-light text-dark light-mode-placeholder"
          }`}
          style={{
            width: isMobile ? "100%" : "300px",
            fontSize: isMobile ? "12px" : "16px",
          }}
          onChange={handleChange} // Update input value on change
          type="text"
          name="item"
          placeholder= "Add To-visit destination" // Placeholder text
          value={item} // Controlled input
          required
        />
      </div>
      <button
        type="submit"
        className="btn col-3"
        style={{ backgroundColor: "#F9A804", 
          width: isMobile ? "30%" : "auto",
          fontSize: isMobile ? "10px" : "16px"
        }}
      >
        Add Destination
      </button>
    </form>
  );
}

export default TogoForm;
