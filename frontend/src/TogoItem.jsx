import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { Fab } from "@mui/material";

function TogoItem({ togo, onDelete, onEdit, onToggle, isDarkMode, isMobile }) {
  const [isEditing, setIsEditing] = useState(false); // State to track editing
  const [newText, setNewText] = useState(togo.text); // State for the new text

  const handleEdit = () => {
    setIsEditing(true); // Set editing mode
  };

  const handleChange = (event) => {
    setNewText(event.target.value); // Update new text as you type
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    onEdit(togo.id, newText); // Call onEdit with the new text
    setIsEditing(false); // Exit editing mode
  };

  const handleDeleteClick = () => {
    // show confirmation alert
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      onDelete(togo.id);
    }
  };

  return (
    <li
      className={`list-group-item ${
        isDarkMode ? "bg-dark text-white" : "bg-light text-dark"
      }`}
      style={{
        fontsize: isMobile ? "12px" : "16px", // Adjust font size for mobile
        padding: isMobile ? "5px" : "10px",
      }}
    >
      {isEditing ? (
        <div className="">
          <form onSubmit={handleSubmit}>
            <input
              className={`me-2 round border col-10 ${
                isDarkMode ? "bg-dark text-white" : "bg-light text-dark"
              }`}
              type="text"
              value={newText}
              onChange={handleChange}
              required
              style={{ width: isMobile ? "100%" : "80%",
                fontsize: isMobile ? "12px" : "16px",
              }}
            />
            <Fab
              type="submit"
              sx={{
                backgroundColor: "#F9A804",
                "&:hover": {
                  backgroundColor: "#e69502", // Slightly darker on hover
                },
              }}
              aria-label="add"
              className="me-3"
              size="small"
              title="Save" // Tooltip on hover
            >
              <SaveIcon style={{ fontSize: isMobile ? "20px" : "25px" }}/>
            </Fab>
          </form>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <div>
              <input
                type="checkbox"
                checked={togo.completed}
                onChange={() => onToggle(togo.id)}
                className="form-check-input me-2"
                style={{ 
                  width: isMobile ? "16px" : "20px", 
                  height: isMobile ? "16px" : "20px",
                }}
              />
              {/* Apply conditional styling to the text based on completion status */}
              <span
                style={{
                  textDecoration: togo.completed ? "Line-through" : "none",
                  color: togo.completed
                    ? "gray"
                    : isDarkMode
                    ? "white"
                    : "black",
                    fontSize: isMobile ? "12px" : "16px",
                }}
              >
                {togo.text}
              </span>{" "}
              {/* Display togo text */}
            </div>
            <div className="d-flex justify-content-between"
                 style={{
                     gap: isMobile ? "0px" : "8px", // Adjust spacing between buttons
                    padding: isMobile ? "0px" : "5px", // Adjust padding
                 }}>
              {/* <button onClick={handleEdit} className="btn me-2" style={{ backgroundColor: "#6CBEC7"}}>
                Edit
              </button> */}
              <Fab
                onClick={handleEdit}
                sx={{
                  backgroundColor: "#F9A804",
                  "&:hover": {
                    backgroundColor: "#e69502", // Slightly darker on hover
                  },
                }}
                aria-label="add"
                className="me-3"
                size="small"
                title="Edit" // Tooltip on hover
              >
                <EditIcon style={{ fontSize: isMobile ? "20px" : "25px" }} />
              </Fab>
              <Fab
                onClick={handleDeleteClick}
                sx={{
                  backgroundColor: "#F9A804",
                  "&:hover": {
                    backgroundColor: "#e69502", // Slightly darker on hover
                  },
                }}
                aria-label="add"
                size="small"
                title="Delete" //Tooltip on hover
              >
                <DeleteIcon style={{ fontSize: isMobile ? "20px" : "25px" }}/>
              </Fab>
              {/* <button
                onClick={handleDeleteClick} // Use the delete click handler
                className="btn" style={{ backgroundColor: "#6CBEC7"}} 
              >
                Delete
              </button> */}
              {/*passing a function as a prop */}
            </div>
          </div>
        </>
      )}
    </li>
  );
}

export default TogoItem;
