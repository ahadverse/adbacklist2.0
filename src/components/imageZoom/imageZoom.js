import React, { useState } from "react";

const ZoomableImage = ({ imageUrl }) => {
  const [scale, setScale] = useState(1);

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = e.target;

    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;

    e.target.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseWheel = (e) => {
    e.preventDefault();

    setScale((prevScale) => prevScale + e.deltaY * -0.01);

    // Restrict the zoom level between a minimum and maximum value
    setScale((prevScale) => Math.min(Math.max(1, prevScale), 3));
  };

  return (
    <div
      className="zoom-container"
      style={{ overflow: "hidden", position: "relative" }}
      onMouseMove={handleMouseMove}
      onWheel={handleMouseWheel}
    >
      <img
        className="w-fit sm:h-[600px] h-[400px] m-auto cursor-zoom-in"
        src={imageUrl}
        alt="Zoomable Image"
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.3s ease-in-out",
        }}
      />
    </div>
  );
};

export default ZoomableImage;
