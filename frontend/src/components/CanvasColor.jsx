import React, { useState } from 'react'
import '../assets/style/Dialog.scss';
import { IconButton } from "blocksin-system";
import { BlendingModeIcon,ReloadIcon,SquareIcon,TransformIcon, CircleIcon, TriangleIcon, BorderSolidIcon, Cross1Icon, PenIcon ,UndoIcon} from "sebikostudio-icons";
import '../assets/style/Dialog.scss';
export default function CanvasColor({canvas}) {
  const [fillon,setFillon]=useState(false);
  const handleFill = (fillColor) => {
    if (!canvas) return;

    const activeObject = canvas.getActiveObject(); // Get the currently selected object
    if (activeObject && activeObject.type !== "group") {
      activeObject.set("fill", fillColor); // Update the object's fill color
      canvas.renderAll(); // Re-render the canvas to apply changes
     
    } else{
      const newFillOn = !fillon; // Determine the new state
      setFillon(newFillOn); 
    }
  };
    const funcColor=(color)=>{
      if(!fillon){
        canvas.backgroundColor=color;
        canvas.renderAll();
      }else{
        handleFill(color);
      }
    }
    const togglefill = () => {
      const newFillOn = !fillon; // Determine the new state
      setFillon(newFillOn); // Update the state
      canvas.isDrawingMode=!newFillOn;
      canvas.renderAll();
    };
    
  return (
    <div className='mt-4 mb-4'>
  <div className="flex flex-wrap items-center mb-4 space-x-4"> 
    <IconButton onClick={togglefill} variant="ghost" size="medium">
      <BlendingModeIcon color={fillon && !canvas.isDrawingMode ? 'black' : 'gray'} />
    </IconButton>
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
    {["#4169E1", "#602F6B", "#DC143C", "#FFD700", "#50C878", "#9B111E", "#0F52BA", "#9966CC", "#C0C0C0", "#FFFFF0",
      "#800020", "#F7E7CE", "#36454F", "#FFD700", "#353839", "#96A8A1", "#40E0D0", "#B0C4DE", "#8B0000", "#483D8B",
      "#A52A2A", "#556B2F", "#8B4513", "#FAFAD2", "#708090", "#D2691E", "#7FFF00", "#6A5ACD", "#9932CC", "#FF69B4",
      "#2F4F4F", "#BC8F8F", "#4682B4", "#F4A460", "#FFDAB9", "#ADD8E6", "#DAA520", "#9370DB", "#BA55D3", "#3CB371"].map(color => (
        <div key={color} className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 cursor-pointer" 
             style={{ backgroundColor: color }} onClick={() => funcColor(color)}>
        </div>
    ))}
  </div>
</div>

  

  )
}
