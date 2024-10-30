import React from "react";
import TogoItem from "./TogoItem";

function TogoList({ togos, onDelete, onEdit, onToggle, isDarkMode, isMobile }) {
  return (
    <div className="list-group">
      <ul style={{ padding: isMobile ? "0px" : "15px"}}>
        {togos.map((togo) => (
          <TogoItem
            key={togo.id}
            togo={togo}
            onDelete={onDelete}
            onEdit={onEdit}
            onToggle={onToggle}
            isDarkMode={isDarkMode}
            isMobile={isMobile}
          />
        ))}
      </ul>
    </div>
  );
}

export default TogoList;
