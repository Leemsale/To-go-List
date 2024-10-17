import React from "react";
import TogoItem from "./TogoItem";

function TogoList({ togos, onDelete, onEdit, onToggle, isDarkMode }) {
  return (
    <div className="list-group">
      <ul>
        {togos.map((togo) => (
          <TogoItem
            key={togo.id}
            togo={togo}
            onDelete={onDelete}
            onEdit={onEdit}
            onToggle={onToggle}
            isDarkMode={isDarkMode}
          />
        ))}
      </ul>
    </div>
  );
}

export default TogoList;
