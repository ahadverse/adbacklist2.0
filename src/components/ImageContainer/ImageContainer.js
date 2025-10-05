import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const ImageContainer = ({ data }) => {
  const images = data?.images?.filter((img) => img && img !== "empty") || [];
  const [index, setIndex] = useState(-1);
  return (
    <div>
      <div className='flex flex-wrap gap-5 justify-center'>
        {images.map((img, idx) => (
          <img
            key={idx}
            className='sm:min-w-40 h-[250px] object-cover cursor-pointer'
            src={img}
            alt={`image-${idx}`}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      {index >= 0 && (
        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={images.map((url) => ({ src: url }))}
          index={index}
          plugins={[Zoom]}
          onIndexChange={setIndex} // swipe to change image
          zoom={{ maxZoomPixelRatio: 3 }}
          animation={{ zoom: 500 }}
        />
      )}
    </div>
  );
};

export default ImageContainer;
