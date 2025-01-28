import React, { useEffect, useState } from 'react';
import { Input } from 'blocksin-system';
import '../assets/style/Dialog.scss';

export default function Setting({ canvas }) {
    const [selectedObject, setSelectedObject] = useState(null);
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [diameter, setDiameter] = useState('');
    const [color, setColor] = useState('');
    const [base, setBase] = useState('');
    const [triangleHeight, setTriangleHeight] = useState('');

    useEffect(() => {
        if (canvas) {
            const handleObjectSelection = (event) => {
                const object = event.selected?.[0];
                if (object) {
                    setSelectedObject(object);
                    updateSettings(object);
                }
            };

            const clearSelection = () => {
                setSelectedObject(null);
                clearSettings();
            };

            const handleObjectModified = (event) => {
                const modifiedObject = event.target;
                if (modifiedObject) {
                    // After moving the object, update the selected object properties
                    setWidth(Math.round(modifiedObject.width * modifiedObject.scaleX));
                    setHeight(Math.round(modifiedObject.height * modifiedObject.scaleY));
                    setColor(modifiedObject.fill);
                    if (modifiedObject.type === 'circle') {
                        setDiameter(Math.round(modifiedObject.radius * 2 * modifiedObject.scaleX));
                    } else if (modifiedObject.type === 'triangle') {
                        setBase(Math.round(modifiedObject.width * modifiedObject.scaleX));
                        setTriangleHeight(Math.round(modifiedObject.height * modifiedObject.scaleY));
                    }
                }
            };

            canvas.on('selection:created', handleObjectSelection);
            canvas.on('selection:updated', handleObjectSelection);
            canvas.on('selection:cleared', clearSelection);
            canvas.on('object:modified', handleObjectModified); // Listen to object modification

            return () => {
                canvas.off('selection:created', handleObjectSelection);
                canvas.off('selection:updated', handleObjectSelection);
                canvas.off('selection:cleared', clearSelection);
                canvas.off('object:modified', handleObjectModified); // Cleanup event listener
            };
        }
    }, [canvas]);

    const updateSettings = (object) => {
        if (!object) return;

        if (object.type === 'rect') {
            setWidth(Math.round(object.width * object.scaleX));
            setHeight(Math.round(object.height * object.scaleY));
            setColor(object.fill);
            setDiameter('');
            setBase('');
            setTriangleHeight('');
        } else if (object.type === 'circle') {
            setDiameter(Math.round(object.radius * 2 * object.scaleX));
            setColor(object.fill);
            setWidth('');
            setHeight('');
            setBase('');
            setTriangleHeight('');
        } else if (object.type === 'triangle') {
            setBase(Math.round(object.width * object.scaleX));
            setTriangleHeight(Math.round(object.height * object.scaleY));
            setColor(object.fill);
            setWidth('');
            setHeight('');
            setDiameter('');
        }
    };

    const clearSettings = () => {
        setWidth('');
        setHeight('');
        setDiameter('');
        setColor('');
        setBase('');
        setTriangleHeight('');
    };

    const handleWidthChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            setWidth(intValue);
            if (selectedObject && selectedObject.type === "rect" && intValue >= 0) {
                selectedObject.set({ width: intValue / selectedObject.scaleX });
                canvas.renderAll(); // Force re-render
            }
        }
    };

    const handleHeightChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            setHeight(intValue);
            if (selectedObject && selectedObject.type === "rect" && intValue >= 0) {
                selectedObject.set({ height: intValue / selectedObject.scaleY });
                canvas.renderAll(); // Force re-render
            }
        }
    };

    const handleDiameterChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            setDiameter(intValue);
            if (selectedObject && selectedObject.type === "circle" && intValue >= 0) {
                selectedObject.set({ radius: intValue / 2 / selectedObject.scaleX });
                canvas.renderAll(); // Force re-render
            }
        }
    };

    const handleBaseChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            setBase(intValue);
            if (selectedObject && selectedObject.type === "triangle" && intValue >= 0) {
                selectedObject.set({ width: intValue / selectedObject.scaleX });
                canvas.renderAll(); // Force re-render
            }
        }
    };

    const handleTriangleHeightChange = (e) => {
        const value = e.target.value.replace(/,/g, "");
        const intValue = parseInt(value, 10);
        if (!isNaN(intValue)) {
            setTriangleHeight(intValue);
            if (selectedObject && selectedObject.type === "triangle" && intValue >= 0) {
                selectedObject.set({ height: intValue / selectedObject.scaleY });
                canvas.renderAll(); // Force re-render
            }
        }
    };

    const handleColorChange = (e) => {
        const value = e.target.value;
        setColor(value);
        if (selectedObject) {
            selectedObject.set({ fill: value });
            canvas.renderAll(); // Force re-render
        }
    };

    return (
        <div className='Settings upmp darkmode'>
            {selectedObject?.type === 'rect' && (
                <>
                    <Input
                        fluid
                        label="Width"
                        value={width}
                        onChange={handleWidthChange}
                    />
                    <Input
                        fluid
                        label="Height"
                        value={height}
                        onChange={handleHeightChange}
                    />
                    <Input
                        fluid
                        label="Color"
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                    />
                </>
            )}
            {selectedObject?.type === 'circle' && (
                <>
                    <Input
                        fluid
                        label="Diameter"
                        value={diameter}
                        onChange={handleDiameterChange}
                    />
                    <Input
                        fluid
                        label="Color"
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                    />
                </>
            )}
            {selectedObject?.type === 'triangle' && (
                <>
                    <Input
                        fluid
                        label="Base"
                        value={base}
                        onChange={handleBaseChange}
                    />
                    <Input
                        fluid
                        label="Height"
                        value={triangleHeight}
                        onChange={handleTriangleHeightChange}
                    />
                    <Input
                        fluid
                        label="Color"
                        type="color"
                        value={color}
                        onChange={handleColorChange}
                    />
                </>
            )}
        </div>
    );
}
