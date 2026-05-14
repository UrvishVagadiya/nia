"use client";
import React from "react";

interface ImageCellProps {
  cellData: unknown; // cellData can be string or object from Payload
  rowData: {
    photo?: string | { url?: string };
    photoURL?: string;
  };
}

const ImageCell: React.FC<ImageCellProps> = (props) => {
  const { cellData, rowData } = props;

  // 1. Try to get URL from the 'photo' upload field (which might be an object)
  let imageUrl =
    typeof cellData === "object" && cellData !== null
      ? (cellData as { url?: string })?.url
      : (cellData as string);

  // 2. Fallback to 'photoURL' field if 'photo' is empty
  if (!imageUrl && rowData?.photoURL) {
    imageUrl = rowData.photoURL;
  }

  // 3. If we still don't have an image, try checking if rowData.photo is an object
  if (!imageUrl && rowData?.photo) {
    imageUrl =
      typeof rowData.photo === "object" && rowData.photo !== null
        ? (rowData.photo as { url?: string })?.url
        : (rowData.photo as string);
  }

  if (!imageUrl) {
    return <span style={{ color: "var(--theme-elevation-400)", fontSize: "10px" }}>No Image</span>;
  }

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "4px",
        overflow: "hidden",
        background: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={imageUrl}
        alt="Thumbnail"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
};

export default ImageCell;
