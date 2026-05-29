"use client";
import React from "react";

interface StatusCellProps {
  cellData: boolean | string | null | undefined;
}

const StatusCell: React.FC<StatusCellProps> = ({ cellData }) => {
  // Handle both boolean and string values (for backward compatibility)
  const isDeleted = cellData === true || String(cellData) === "true" || cellData === "deleted";
  const label = isDeleted ? "Deleted" : "Active";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        borderRadius: "12px",
        fontSize: "11px",
        fontWeight: "bold",
        textTransform: "uppercase",
        backgroundColor: isDeleted ? "#fee2e2" : "#dcfce7",
        color: isDeleted ? "#991b1b" : "#166534",
        border: `1px solid ${isDeleted ? "#fecaca" : "#bbf7d0"}`,
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: isDeleted ? "#ef4444" : "#22c55e",
          marginRight: "6px",
        }}
      />
      {label}
    </div>
  );
};

export default StatusCell;
