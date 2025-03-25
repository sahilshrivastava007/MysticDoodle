import React, { useRef, useState, useEffect } from "react";
import ChatSection from "../components/ChatSection";

const Whiteboard = ({users,socket}) => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState(undefined);
  const [color, setColor] = useState("#000000");
  const [startPoint, setStartPoint] = useState(null);
  const [lines, setLines] = useState([]);
  const [straightLineMode, setStraightLineMode] = useState(false);
  const [radius, setRadius] = useState(5);
  const [isEraser, setIsEraser] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * 0.9;
      canvas.height = window.innerHeight * 0.7;
      const ctx = canvas.getContext("2d");
      ctx.lineCap = "round";
      ctx.lineWidth = radius;
      ctx.strokeStyle = color;
      setContext(ctx);
      redrawCanvas();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "z") undo();
      if (e.ctrlKey && e.key === "y") redo();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (context) {
      context.lineWidth = radius;
      context.strokeStyle = isEraser ? "#FFFFFF" : color;
    }
  }, [color, radius, context, isEraser]);

  const startPaint = (event) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
      if (straightLineMode) setStartPoint(coordinates);
    }
  };

  const paint = (event) => {
    if (!isPainting || straightLineMode) return;
    const newMousePosition = getCoordinates(event);
    if (mousePosition && newMousePosition) {
      drawLine(newMousePosition);
      setMousePosition(newMousePosition);
    }
  };

  const exitPaint = () => {
    setIsPainting(false);
    setMousePosition(undefined);
    setStartPoint(null);
  };

  const getCoordinates = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const drawLine = (position) => {
    context.beginPath();
    context.moveTo(mousePosition.x, mousePosition.y);
    context.lineTo(position.x, position.y);
    context.stroke();
    const newLine = { start: mousePosition, end: position, color, radius };
    setLines((prev) => [...prev, newLine]);
  };

  const handleMouseUp = (event) => {
    if (straightLineMode && startPoint) drawStraightLine(event);
    exitPaint();
  };

  const drawStraightLine = (event) => {
    if (straightLineMode && startPoint) {
      const endPoint = getCoordinates(event);
      context.beginPath();
      context.moveTo(startPoint.x, startPoint.y);
      context.lineTo(endPoint.x, endPoint.y);
      context.stroke();
      const newLine = { start: startPoint, end: endPoint, color, radius };
      setLines((prev) => [...prev, newLine]);
    }
  };

  const fillCanvas = () => {
    if (!context) return;
    context.fillStyle = color;
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setLines((prev) => [
      ...prev,
      {
        type: "fill",
        color,
        x: 0,
        y: 0,
        width: canvasRef.current.width,
        height: canvasRef.current.height,
      },
    ]);
  };

  const clearCanvas = () => {
    if (!context) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setLines([]);
    setHistory([]);
  };

  const undo = () => {
    if (lines.length > 0) {
      setHistory((prev) => [...prev, lines[lines.length - 1]]);
      setLines((prev) => prev.slice(0, -1));
      redrawCanvas();
    }
  };

  const redo = () => {
    if (history.length > 0) {
      setLines((prev) => [...prev, history[history.length - 1]]);
      setHistory((prev) => prev.slice(0, -1));
      redrawCanvas();
    }
  };

  const redrawCanvas = () => {
    if (!context) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    lines.forEach((line) => {
      if (line.type === "fill") {
        context.fillStyle = line.color;
        context.fillRect(line.x, line.y, line.width, line.height);
      } else {
        context.strokeStyle = line.color;
        context.lineWidth = line.radius;
        context.beginPath();
        context.moveTo(line.start.x, line.start.y);
        context.lineTo(line.end.x, line.end.y);
        context.stroke();
      }
    });
  };

  const scribbleColors = [
    "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
    "#FFEEAD", "#D4A5A5", "#9B59B6", "#3498DB",
    "#E74C3C", "#2ECC71",
  ];

  return (
   
    <div style={{
      minHeight: "100vh",
      background: "#FFF5E6",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive",
    }}>
        <div className='bg-red-500 w-[70vw] h-[10vh]'>Connected Users: {users.length}</div>
      <div style={{
        width: "90%",
        maxWidth: "1000px",
        background: "rgba(255, 255, 255, 0.8)",
        borderRadius: "20px",
        padding: "20px",
        border: "3px dashed #FF9F1C",
        marginBottom: "20px",
      }}>
        <h2 style={{
          textAlign: "center",
          color: "#FF6B6B",
          margin: "0 0 15px 0",
          fontSize: "24px",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}>
          Scribble Time!
        </h2>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {scribbleColors.map((c) => (
              <button
                key={c}
                style={{
                  backgroundColor: c,
                  width: "40px",
                  height: "40px",
                  border: `3px solid ${c === color ? "#FFF" : "#FFD700"}`,
                  borderRadius: "50%",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
                onClick={() => setColor(c)}
                onMouseEnter={(e) => e.target.style.transform = "scale(1.2) rotate(5deg)"}
                onMouseLeave={(e) => e.target.style.transform = "scale(1) rotate(0)"}
              />
            ))}
          </div>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
          }}>
            <button
              style={{
                padding: "12px 20px",
                background: isEraser ? "#FF4444" : "#4ECDC4",
                color: "white",
                border: "2px solid #FFD700",
                borderRadius: "15px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={() => setIsEraser(!isEraser)}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              {isEraser ? "✏️ Draw" : "🧹 Erase"}
            </button>

            <button
              style={{
                padding: "12px 20px",
                background: straightLineMode ? "#96CEB4" : "#FFEEAD",
                color: straightLineMode ? "white" : "#333",
                border: "2px solid #FFD700",
                borderRadius: "15px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={() => setStraightLineMode(!straightLineMode)}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              {straightLineMode ? "✍️ Free" : "📏 Line"}
            </button>

            <button
              style={{
                padding: "12px 20px",
                background: "#D4A5A5",
                color: "white",
                border: "2px solid #FFD700",
                borderRadius: "15px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={fillCanvas}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              🎨 Fill
            </button>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#FFEEAD",
              padding: "10px",
              borderRadius: "15px",
              border: "2px solid #FFD700",
            }}>
              <input
                type="range"
                min="2"
                max="20"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                style={{
                  width: "100px",
                  cursor: "pointer",
                  accentColor: color,
                }}
              />
              <span style={{ color: "#333", fontSize: "16px" }}>
                {radius}
              </span>
            </div>

            <button
              style={{
                padding: "12px 20px",
                background: "#FF6B6B",
                color: "white",
                border: "2px solid #FFD700",
                borderRadius: "15px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={clearCanvas}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              🗑️ Clear
            </button>

            <button
              style={{
                padding: "12px 20px",
                background: "#3498DB",
                color: "white",
                border: "2px solid #FFD700",
                borderRadius: "15px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "16px",
                fontWeight: "bold",
                opacity: lines.length === 0 ? 0.5 : 1,
              }}
              onClick={undo}
              disabled={lines.length === 0}
              onMouseEnter={(e) => e.target.style.transform = lines.length > 0 ? "scale(1.1)" : "scale(1)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              ⬅️ Undo
            </button>

            <button
              style={{
                padding: "12px 20px",
                background: "#9B59B6",
                color: "white",
                border: "2px solid #FFD700",
                borderRadius: "15px",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "16px",
                fontWeight: "bold",
                opacity: history.length === 0 ? 0.5 : 1,
              }}
              onClick={redo}
              disabled={history.length === 0}
              onMouseEnter={(e) => e.target.style.transform = history.length > 0 ? "scale(1.1)" : "scale(1)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              ➡️ Redo
            </button>
          </div>
        </div>
      </div>
//heleo ji
      <canvas
        ref={canvasRef}
        onMouseDown={startPaint}
        onMouseMove={paint}
        onMouseUp={handleMouseUp}
        onMouseLeave={exitPaint}
        style={{
          borderRadius: "15px",
          backgroundColor: "white",
          border: "3px solid #FF9F1C",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          cursor: isEraser ? "cell" : straightLineMode ? "crosshair" : "default",
          touchAction: "none",
        }}
      />
        <ChatSection socket={socket} />
    </div>
  );
};

export default Whiteboard;