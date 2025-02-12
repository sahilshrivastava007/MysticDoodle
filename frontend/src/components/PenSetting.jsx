import React, { useEffect, useState } from 'react';
import { Input } from 'blocksin-system';
import '../assets/style/Dialog.scss';

export default function PenSetting({ canvas }) {
    const [penColor, setPenColor] = useState('#000000'); // Pen color state
    const [penWidth, setPenWidth] = useState(5); // Pen stroke width state
    const [selectedObject, setSelectedObject] = useState(null);

    useEffect(() => {
        if (canvas) {
            const handleObjectSelection = (event) => {
                const object = event.selected?.[0];
                if (object) {
                    setSelectedObject(object);
                }
            };

            const clearSelection = () => {
                setSelectedObject(null);
            };

            // Listen to selection events to track object selection and modification
            canvas.on('selection:created', handleObjectSelection);
            canvas.on('selection:updated', handleObjectSelection);
            canvas.on('selection:cleared', clearSelection);

            return () => {
                canvas.off('selection:created', handleObjectSelection);
                canvas.off('selection:updated', handleObjectSelection);
                canvas.off('selection:cleared', clearSelection);
            };
        }
    }, [canvas]);

    // Function to update pen color
    const handlePenColorChange = (e) => {
        const color = e.target.value;
        setPenColor(color);
        if (canvas) {
            // Set the color of the drawing brush
            canvas.freeDrawingBrush.color = color;
        }
    };

    // Function to update pen width
    const handlePenWidthChange = (e) => {
        const width = parseInt(e.target.value, 10);
        setPenWidth(width);
        if (canvas) {
            // Set the width (stroke size) of the drawing brush
            canvas.freeDrawingBrush.width = width;
        }
    };


    return (
        <div className='w-full p-[1px] box-border rounded text-center butmp darkmode'>
            
            <Input
                fluid
                label="Pen Color"
                type="color"
                value={penColor}
                onChange={handlePenColorChange}
            />
            <Input 
                fluid
                label="Pen Width"
                type="range"
                value={penWidth}
                onChange={handlePenWidthChange}
                min={1}
                max={100}
            />
           
            
        </div>
    );
}
