"use client";
import React from "react";
import { useField, useDocumentInfo } from "@payloadcms/ui";

interface StatusSelectProps {
  path: string;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ path }) => {
  const field = useField<boolean>({ path });
  const { id, collectionSlug } = useDocumentInfo();
  const [isRestoring, setIsRestoring] = React.useState(false);

  if (!field) {
    return null;
  }

  const { value, setValue } = field;
  const isDeleted = value === true;

  const handleRestore = async () => {
    if (!id || !collectionSlug) {
      // Fallback to local state if ID or slug is missing
      setValue(false);
      return;
    }

    setIsRestoring(true);
    try {
      const response = await fetch(`/api/${collectionSlug}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isDeleted: false,
          deletedAt: null,
        }),
      });

      if (response.ok) {
        // Cleanly reload the page into full active/editable mode
        window.location.reload();
      } else {
        console.error("Failed to restore record via API");
        setValue(false);
      }
    } catch (err) {
      console.error("Error restoring record:", err);
      setValue(false);
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      {/* Forcefully hide standard Payload Trash Banner and white Restore Button to prioritize this clean sidebar UI */}
      <style>{`
        .trash-banner {
          display: none !important;
        }
        #action-restore {
          display: none !important;
        }
      `}</style>

      {/* Restore Action Button (shows at the very top when soft-deleted) */}
      {isDeleted && (
        <button
          type="button"
          onClick={handleRestore}
          disabled={isRestoring}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: "4px",
            backgroundColor: isRestoring ? "#86efac" : "#22c55e",
            color: "#ffffff",
            fontWeight: "600",
            fontSize: "13px",
            border: "none",
            cursor: isRestoring ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "4px",
            transition: "background-color 0.2s ease",
            boxShadow: "0 2px 4px rgba(34, 197, 94, 0.2)",
          }}
          onMouseOver={(e) => {
            if (!isRestoring) e.currentTarget.style.backgroundColor = "#16a34a";
          }}
          onMouseOut={(e) => {
            if (!isRestoring) e.currentTarget.style.backgroundColor = "#22c55e";
          }}
        >
          {isRestoring ? "Restoring..." : "Restore Record"}
        </button>
      )}

      <label
        style={{
          fontSize: "11px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "var(--theme-elevation-400, #888)",
        }}
      >
        Status
      </label>

      <select
        value={isDeleted ? "deleted" : "active"}
        onChange={(e) => {
          setValue(e.target.value === "deleted");
        }}
        style={{
          width: "100%",
          padding: "10px 14px",
          borderRadius: "4px",
          border: "1px solid var(--theme-elevation-150, #ccc)",
          backgroundColor: "var(--theme-input-bg, #fff)",
          color: "var(--theme-elevation-800, #333)",
          fontSize: "14px",
          fontFamily: "inherit",
          fontWeight: "500",
          cursor: "pointer",
          outline: "none",
          transition: "border-color 0.2s ease",
        }}
      >
        <option value="active">Active</option>
        <option value="deleted">Deleted</option>
      </select>
    </div>
  );
};

export default StatusSelect;
