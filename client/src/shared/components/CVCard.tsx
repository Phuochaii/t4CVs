import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

interface CVCardProps {
  cv: string;
  tag: string[];
  name: string;
}

const CVCard: React.FC<CVCardProps> = ({ cv, tag, name }) => {
  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const maxTagsToShow = 3;

  const displayTags = tag.slice(0, maxTagsToShow);
  const remainingTagsCount = tag.length - maxTagsToShow;
  return (
    <Card
      className="rounded-lg flex flex-col w-64 h-72 border border-transparent transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="size-64 bg-gray-200 relative"
        style={{
          backgroundImage: `url(${cv})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Hiển thị nút khi hover */}
        {hovered && (
          <div className="absolute bottom-4 left-0 w-full h-full flex flex-col items-center justify-end">
            <button
              onClick={() => navigate("/create-cv")}
              className="text-sm font-bold bg-transparent text-white border border-white rounded-lg mb-2 w-3/4"
            >
              Xem trước
            </button>
            <button
              onClick={() => navigate("/create-cv")}
              className="bg-green-500 text-white rounded-lg w-3/4 text-sm font-bold"
            >
              Dùng mẫu
            </button>
          </div>
        )}
      </div>
      <CardContent>
        {/* Hiển thị các tag */}
        <div className="flex flex-wrap">
          {displayTags.map((tagItem, index) => (
            <div
              key={index}
              className="bg-gray-300 rounded-md p-1 mr-1 mb-1 px-2 overflow-hidden"
              style={{
                maxWidth: "100px",
                maxHeight: "35px",
                justifyContent: "center",
              }}
            >
              {tagItem}
            </div>
          ))}
          {remainingTagsCount > 0 && (
            <div
              className="bg-gray-300 rounded-md p-1 mr-1 mb-1"
              style={{
                maxWidth: "100px",
                maxHeight: "35px",
                justifyContent: "center",
              }}
            >
              +{remainingTagsCount}
            </div>
          )}
        </div>
        {/* Hiển thị tên */}
        <div className="mt-2 justify-center items-center font-bold">{name}</div>
      </CardContent>
    </Card>
  );
};

export default CVCard;
