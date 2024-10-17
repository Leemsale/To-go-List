import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { Fab } from "@mui/material";

function TogoItem({ togo, onDelete, onEdit, onToggle, isDarkMode }) {
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
              <SaveIcon />
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
                }}
              >
                {togo.text}
              </span>{" "}
              {/* Display togo text */}
            </div>
            <div>
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
                <EditIcon style={{ fontSize: "25px" }} />
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
                <DeleteIcon />
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
