import React, { useEffect, useRef, useState } from "react";
import { Rect} from "fabric";
import { IconButton } from "blocksin-system";
const FillFeatureCanvas = ({canvas}) => {

  const [fillColor, setFillColor] = useState("#FF0000"); // Default fill color

  useEffect(() => {
    if(!canvas){
        return;
    }
    canvas.renderAll();
  }, []);

  const handleFill = () => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject(); // Get the currently selected object
    if (activeObject && activeObject.type !== "group") {
      activeObject.set("fill", fillColor); // Update the object's fill color
      canvas.renderAll(); // Re-render the canvas to apply changes
    } else {
      alert("Please select a single object to fill!");
    }
  };
  return (
    <div className="fill-feature">
      <div className="controls" style={{ marginBottom: "10px" }}>
        <label>
          Select Fill Color:{" "}
          <input
            type="color"
            value={fillColor}
            onChange={(e) => setFillColor(e.target.value)}
          />
        </label>
        <button onClick={handleFill} style={{ marginLeft: "10px" }}>
          Fill
        </button>
      </div>
    </div>
  );
};

export default FillFeatureCanvas;
