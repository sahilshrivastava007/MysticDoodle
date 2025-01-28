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
    <div className="flex items-center mb-4 space-x-4"> {/* Flex container to align items horizontally with spacing */}
      <IconButton className="" onClick={togglefill} variant="ghost" size="medium">
        <BlendingModeIcon color={fillon && !canvas.isDrawingMode ? 'black' : 'gray'} />
      </IconButton>
      <div className="grid grid-cols-20 gap-2">
        <div className="w-10 h-10" style={{ backgroundColor: "#4169E1" }} onClick={() => funcColor("#4169E1")}></div> {/* Royal Blue */}
        <div className="w-10 h-10" style={{ backgroundColor: "#602F6B" }} onClick={() => funcColor("#602F6B")}></div> {/* Imperial Purple */}
        <div className="w-10 h-10" style={{ backgroundColor: "#DC143C" }} onClick={() => funcColor("#DC143C")}></div> {/* Crimson Red */}
        <div className="w-10 h-10" style={{ backgroundColor: "#FFD700" }} onClick={() => funcColor("#FFD700")}></div> {/* Golden Yellow */}
        <div className="w-10 h-10" style={{ backgroundColor: "#50C878" }} onClick={() => funcColor("#50C878")}></div> {/* Emerald Green */}
        <div className="w-10 h-10" style={{ backgroundColor: "#9B111E" }} onClick={() => funcColor("#9B111E")}></div> {/* Ruby Red */}
        <div className="w-10 h-10" style={{ backgroundColor: "#0F52BA" }} onClick={() => funcColor("#0F52BA")}></div> {/* Sapphire Blue */}
        <div className="w-10 h-10" style={{ backgroundColor: "#9966CC" }} onClick={() => funcColor("#9966CC")}></div> {/* Amethyst Purple */}
        <div className="w-10 h-10" style={{ backgroundColor: "#C0C0C0" }} onClick={() => funcColor("#C0C0C0")}></div> {/* Silver */}
        <div className="w-10 h-10" style={{ backgroundColor: "#FFFFF0" }} onClick={() => funcColor("#FFFFF0")}></div> {/* Ivory */}
        <div className="w-10 h-10" style={{ backgroundColor: "#800020" }} onClick={() => funcColor("#800020")}></div> {/* Burgundy */}
        <div className="w-10 h-10" style={{ backgroundColor: "#F7E7CE" }} onClick={() => funcColor("#F7E7CE")}></div> {/* Champagne */}
        <div className="w-10 h-10" style={{ backgroundColor: "#36454F" }} onClick={() => funcColor("#36454F")}></div> {/* Charcoal Gray */}
        <div className="w-10 h-10" style={{ backgroundColor: "#FFD700" }} onClick={() => funcColor("#FFD700")}></div> {/* Royal Gold */}
        <div className="w-10 h-10" style={{ backgroundColor: "#353839" }} onClick={() => funcColor("#353839")}></div> {/* Onyx Black */}
        <div className="w-10 h-10" style={{ backgroundColor: "#96A8A1" }} onClick={() => funcColor("#96A8A1")}></div> {/* Pewter Gray */}
        <div className="w-10 h-10" style={{ backgroundColor: "#40E0D0" }} onClick={() => funcColor("#40E0D0")}></div> {/* Turquoise */}
        <div className="w-10 h-10" style={{ backgroundColor: "#B0C4DE" }} onClick={() => funcColor("#B0C4DE")}></div> {/* Light Steel Blue */}
        <div className="w-10 h-10" style={{ backgroundColor: "#8B0000" }} onClick={() => funcColor("#8B0000")}></div> {/* Dark Red */}
        <div className="w-10 h-10" style={{ backgroundColor: "#483D8B" }} onClick={() => funcColor("#483D8B")}></div> {/* Dark Slate Blue */}
        <div className="w-10 h-10" style={{ backgroundColor: "#A52A2A" }} onClick={() => funcColor("#A52A2A")}></div> {/* Brown */}
      <div className="w-10 h-10" style={{ backgroundColor: "#556B2F" }} onClick={() => funcColor("#556B2F")}></div> {/* Dark Olive Green */}
      <div className="w-10 h-10" style={{ backgroundColor: "#8B4513" }} onClick={() => funcColor("#8B4513")}></div> {/* Saddle Brown */}
      <div className="w-10 h-10" style={{ backgroundColor: "#FAFAD2" }} onClick={() => funcColor("#FAFAD2")}></div> {/* Light Goldenrod Yellow */}
      <div className="w-10 h-10" style={{ backgroundColor: "#708090" }} onClick={() => funcColor("#708090")}></div> {/* Slate Gray */}
      <div className="w-10 h-10" style={{ backgroundColor: "#D2691E" }} onClick={() => funcColor("#D2691E")}></div> {/* Chocolate */}
      <div className="w-10 h-10" style={{ backgroundColor: "#7FFF00" }} onClick={() => funcColor("#7FFF00")}></div> {/* Chartreuse */}
      <div className="w-10 h-10" style={{ backgroundColor: "#6A5ACD" }} onClick={() => funcColor("#6A5ACD")}></div> {/* Slate Blue */}
      <div className="w-10 h-10" style={{ backgroundColor: "#9932CC" }} onClick={() => funcColor("#9932CC")}></div> {/* Dark Orchid */}
      <div className="w-10 h-10" style={{ backgroundColor: "#FF69B4" }} onClick={() => funcColor("#FF69B4")}></div> {/* Hot Pink */}
      <div className="w-10 h-10" style={{ backgroundColor: "#2F4F4F" }} onClick={() => funcColor("#2F4F4F")}></div> {/* Dark Slate Gray */}
      <div className="w-10 h-10" style={{ backgroundColor: "#BC8F8F" }} onClick={() => funcColor("#BC8F8F")}></div> {/* Rosy Brown */}
      <div className="w-10 h-10" style={{ backgroundColor: "#4682B4" }} onClick={() => funcColor("#4682B4")}></div> {/* Steel Blue */}
      <div className="w-10 h-10" style={{ backgroundColor: "#F4A460" }} onClick={() => funcColor("#F4A460")}></div> {/* Sandy Brown */}
      <div className="w-10 h-10" style={{ backgroundColor: "#FFDAB9" }} onClick={() => funcColor("#FFDAB9")}></div> {/* Peach Puff */}
      <div className="w-10 h-10" style={{ backgroundColor: "#ADD8E6" }} onClick={() => funcColor("#ADD8E6")}></div> {/* Light Blue */}
      <div className="w-10 h-10" style={{ backgroundColor: "#DAA520" }} onClick={() => funcColor("#DAA520")}></div> {/* Goldenrod */}
      <div className="w-10 h-10" style={{ backgroundColor: "#9370DB" }} onClick={() => funcColor("#9370DB")}></div> {/* Medium Purple */}
      <div className="w-10 h-10" style={{ backgroundColor: "#BA55D3" }} onClick={() => funcColor("#BA55D3")}></div> {/* Medium Orchid */}
      <div className="w-10 h-10" style={{ backgroundColor: "#3CB371" }} onClick={() => funcColor("#3CB371")}></div> {/* Medium Sea Green */}
      </div>
    </div>
  
   
  </div>
  

  )
}
