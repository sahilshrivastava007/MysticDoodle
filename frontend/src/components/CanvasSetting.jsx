import { Input } from 'blocksin-system';
import React, { useEffect, useState } from 'react';
import '../assets/style/Dialog.scss';
import { Canvas,Rect } from 'fabric';

export default function CanvasSetting({ canvas }) {
    const [canvasHeight, setCanvasHeight] = useState(500);
    const [canvasWidth, setCanvasWidth] = useState(500);
    
    useEffect(() => {
        if (canvas) {
            try {
                canvas.setWidth(canvasWidth);
                canvas.setHeight(canvasHeight);
               
            } catch (error) {
                console.error("Error updating canvas:", error);
            }
        }
    }, [canvasHeight, canvasWidth, canvas]); // Add bgcolor to dependencies

    // const handleCanvasColorChange = (e) => {
    //     const color = e.target.value;
    //     setBgcolor(color);
    //     canvas.setBackgroundColor(bgcolor, () => {
    //         canvas.renderAll();
    //     });
    // };

   
    const handleWidthChange = (e) => {
        const value = e.target.value;
        const intValue = parseInt(value, 10);
        if(intValue>=900){
            setCanvasWidth(900)
        }else{
        setCanvasWidth(!isNaN(intValue) && intValue >= 0 ? intValue : 0);
        }
    };

    const handleHeightChange = (e) => {
        const value = e.target.value;
        const intValue = parseInt(value, 10);
        if(intValue>=551){
            setCanvasWidth(550)
        }else{
        setCanvasHeight(!isNaN(intValue) && intValue >= 0 ? intValue : 0);
        }
    };

    return (
        <div className="Settings darkmode ">
            <Input
                fluid
                label="Canvas Width"
                value={canvasWidth}
                onChange={handleWidthChange}
                classNamew="w-full"
            />
            <Input
                fluid
                label="Canvas Height"
                value={canvasHeight}
                onChange={handleHeightChange}
            />
             
        </div>
    );
}
