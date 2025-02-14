import React, { useRef, useEffect, useState } from 'react';
import { Canvas, Rect, Circle, Triangle, Line, PencilBrush } from 'fabric'; 
import { IconButton } from "blocksin-system";
import { TrashIcon,ReloadIcon,SquareIcon,TransformIcon, CircleIcon, TriangleIcon, BorderSolidIcon, Cross1Icon, PenIcon ,UndoIcon} from "sebikostudio-icons";
import '../assets/style/Dialog.scss';
import Setting from '../components/Setting';
import CanvasSetting from '../components/CanvasSetting';
import PenSetting from '../components/PenSetting';
import CanvasColor from '../components/CanvasColor';
import FillFeatureCanvas from '../components/FillFeatureCanvas';
import ChatSection from '../components/ChatSection';

export default function Whiteboard({users,socket}) {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [selectedObject, setSelectedObject] = useState(null);
    const [isDrawingMode, setIsDrawingMode] = useState(false); 
    const [isEraserMode, setIsEraserMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [history, setHistory] = useState([]);
    // const [currentStep, setCurrentStep] = useState(0);
   
    useEffect(() => {
        if (canvasRef.current) {
            const initCanvas = new Canvas(canvasRef.current, {
                width: 500,
                height: 500,
                selection: true,  
            });
            
            const brush = new PencilBrush(initCanvas);
            brush.color = "#000000";  
            brush.width = 5;
    
            initCanvas.freeDrawingBrush = brush;
            initCanvas.backgroundColor = '#fff';
            initCanvas.renderAll();
            setCanvas(initCanvas);


            initCanvas.on('object:selected', (e) => {
                setSelectedObject(e.target); 
            });
    
            initCanvas.on('selection:cleared', () => {
                setSelectedObject(null);  
            });
            
            
            // saveState(initCanvas);
            return () => {
                initCanvas.dispose();
            }
        }
    }, []);
    const toggleDrawingMode = () => {
        if (canvas) {
            setIsDrawingMode((prev) => {
                const newMode = !prev;
                canvas.isDrawingMode = newMode; 
                return newMode;
            });
        }
    };

    const addShape = (shape) => {
        if (canvas) {
            canvas.isDrawingMode = false; 
            canvas.add(shape);
            canvas.renderAll();  
            
            canvas.isDrawingMode = isDrawingMode;  
        }
    };

    const addRectangle = () => {
        const rect = new Rect({
            top: 100,
            left: 50,
            width: 100,
            height: 60,
            fill: '#D84D42',
        });
        addShape(rect);
    };

    const addCircle = () => {
        const circle = new Circle({
            top: 200,
            left: 100,
            radius: 50,
            fill: '#4287f5',
        });
        addShape(circle);
    };

    const addTriangle = () => {
        const triangle = new Triangle({
            top: 150,
            left: 200,
            width: 100,
            height: 100,
            fill: '#4287f5',
        });
        addShape(triangle);
    };

    const addLine = () => {
        const x1 = Math.random() * 500;
        const y1 = Math.random() * 500;
        const x2 = Math.random() * 500;
        const y2 = Math.random() * 500;

        const line = new Line([x1, y1, x2, y2], {
            stroke: '#4287f5',
            strokeWidth: 2,
        });

        addShape(line);
    };

    const removeSelectedObject = () => {
        if (canvas && selectedObject) {
            canvas.remove(selectedObject);
            canvas.renderAll();
            setSelectedObject(null);
            // saveState(canvas); 
        }
    };

    const clearCanvas = () => {
        if (canvas) {
            // saveState(canvas); 
            canvas.getObjects().forEach(obj => {
                setHistory(prevHistory => [...prevHistory, obj]);
                canvas.remove(obj);
            });
            canvas.renderAll();
            setSelectedObject(null);
        }
    };

    // const saveState = (canvas) => {
    //     const canvasState = JSON.stringify(canvas.toJSON());
    //     // If we're not at the end, discard forward steps before saving
    //     if (currentStep < history.length - 1) {
    //         setHistory(history.slice(0, currentStep + 1));  // Truncate history to current step
    //     }
    //     setHistory(prevHistory => [...prevHistory, canvasState]);  // Add the new state
    //     setCurrentStep(currentStep + 1);  // Update the current step pointer
    // };
    
    // Undo functionality
    const undo = () => {
        if (canvas) {
            let recentObject = canvas.item(canvas.size() - 1);
            setHistory(prevHistory => [...prevHistory, recentObject]); // No need to wrap in array
            canvas.remove(recentObject);
            canvas.renderAll();
            setSelectedObject(null);
        }
    };
    
    const redo = () => {
        if (history.length > 0) {
            // Get the most recent item from history
            const objectToRedo = history[history.length - 1];
            
            canvas.add(objectToRedo);
            canvas.renderAll();
            
            // Remove the object from history (it's now been redone)
            setHistory(prevHistory => prevHistory.slice(0, -1)); // Remove the last item
    
            setSelectedObject(null);
        }
    };
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
   
    return (

        <div className=' absolute flex flex-col items-center'>
            <div className='bg-red-500 w-[70vw] h-[10vh]'>Connected Users: {users.length}</div>
        <div className=' flex'>
        <div className='h-[80vh] flex justify-between items-center w-[10vw] bg-pink-700'>
         <div className='Toolbar darkmode'>
            <IconButton onClick={toggleDrawingMode} variant="ghost" size="medium">
                    <PenIcon color={isDrawingMode ? 'white' : 'gray'} />
            </IconButton>
                
                <IconButton onClick={clearCanvas} variant="ghost" size="medium">
                    <TrashIcon />
                </IconButton>
                

                <IconButton onClick={undo} variant="ghost" size="medium">
                    <UndoIcon />
                </IconButton>
                <IconButton onClick={redo} variant="ghost" size="medium">
                <ReloadIcon />
                </IconButton>
                <IconButton onClick={toggleMenu} variant="ghost" size="medium">
                    <TransformIcon />
                </IconButton>
                {/* Only show the menu buttons when isMenuOpen is true */}
                {isMenuOpen && (
                    <div className="menuOptions darkmode">
                        <IconButton onClick={addRectangle} variant="ghost" size="medium">
                            <SquareIcon />
                        </IconButton>
                        <IconButton onClick={addCircle} variant="ghost" size="medium">
                            <CircleIcon />
                        </IconButton>
                        <IconButton onClick={addTriangle} variant="ghost" size="medium">
                            <TriangleIcon />
                        </IconButton>
                        <IconButton onClick={addLine} variant="ghost" size="medium">
                            <BorderSolidIcon />
                        </IconButton>
                    </div>
                )}
               
            </div>
         </div>
           <div className='h-[80vh] overflow-hidden w-[65vw] flex justify-center items-center bg-green-600'>
           <canvas  ref={canvasRef} className='max-w-full max-h-full ' />
           </div>
         
         <div className='h-[80vh] w-[25vw]  '>
         <div className='Settings-wrapper w-full flex flex-col h-[40%]'>
                <Setting  canvas={canvas} />
                <CanvasSetting canvas={canvas} />
                <PenSetting canvas={canvas} />
            </div>
         </div>
        </div>
         <ChatSection socket={socket} />
            
            
            <CanvasColor  canvas={canvas}/>
        
        </div>
    );
}
