"use client";
import React from "react";

interface ImageCellProps {
  cellData: string | { url?: string } | null | undefined;
  rowData: {
    photo?: string | { url?: string } | null | undefined;
    photoURL?: string | null | undefined;
  };
}

const ImageCell: React.FC<ImageCellProps> = (props) => {
  const { cellData, rowData } = props;

  let imageUrl =
    typeof cellData === "object" && cellData !== null
      ? (cellData as { url?: string })?.url
      : (cellData as string);

  if (!imageUrl && rowData?.photoURL) {
    imageUrl = rowData.photoURL;
  }

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
      {/* eslint-disable-next-line @next/next/no-img-element */}
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
