import React,{ useRef, useEffect, useState } from "react"


function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    
    canvas.style.width = '${window.innerWidth}px';
    
    canvas.style.height = '${window.innerHeight}px';

    const context = canvas.getContext("2d")
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context;
  }, [])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
 }

  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return
    }
    const{offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()

  }

  const erase = () => {
    contextRef.current.clearRect(0, 0, 100, 100);
  }
  return (
   <canvas
   onMouseDown={startDrawing}
   onMouseUp={finishDrawing}
   onMouseMove={draw}
   onDoubleClick={erase}
   ref={canvasRef}
   />

  );
}

export default App;
