/*
import React, { useEffect, useRef, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { Button, Row, Col } from "react-bootstrap";

const FaceTryOn = ({ frameUrl }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceMeshRef = useRef(null);
  const processedFrameRef = useRef(null);
  const resultsRef = useRef(null);

  // Manual States - No Auto Scaling or Rotation anymore
  const [adjust, setAdjust] = useState({ 
    x: 0, 
    y: 0, 
    scale: 1.5, // Starting scale
    rotate: 0, 
    perspective: 1.0 // This "squishes" the side-angle image to look straight
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. Process Glass Image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = frameUrl;
    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = img.width; tempCanvas.height = img.height;
      tempCtx.drawImage(img, 0, 0);
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if ((data[i] + data[i + 1] + data[i + 2]) / 3 > 230) data[i + 3] = 0;
      }
      tempCtx.putImageData(imageData, 0, 0);
      processedFrameRef.current = tempCanvas;
    };

    // 2. Initialize Tracking (Only for the Nose Bridge Anchor)
    faceMeshRef.current = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMeshRef.current.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMeshRef.current.onResults((results) => {
      resultsRef.current = results;
      if (!isReady) setIsReady(true);
    });

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (faceMeshRef.current) await faceMeshRef.current.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    return () => { if (faceMeshRef.current) faceMeshRef.current.close(); };
  }, [frameUrl]);

  // 3. Drawing Loop
  useEffect(() => {
    let animationFrameId;
    const draw = () => {
      const canvas = canvasRef.current;
      const results = resultsRef.current;
      if (canvas && results && results.multiFaceLandmarks?.[0] && processedFrameRef.current) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const nose = results.multiFaceLandmarks[0][168]; // Use nose bridge as anchor

        // Manual Calculations
        const w = (100 * adjust.scale); 
        const h = (processedFrameRef.current.height / processedFrameRef.current.width) * w;

        ctx.save();
        // Anchor to nose but add manual X/Y offsets
        ctx.translate((nose.x * canvas.width) + adjust.x, (nose.y * canvas.height) + adjust.y);
        
        // Manual Rotation
        ctx.rotate((adjust.rotate * Math.PI) / 180);

        // Manual Perspective Squish (Fixes the side-angle image)
        ctx.scale(adjust.perspective, 1);

        ctx.drawImage(processedFrameRef.current, -w / 2, -h / 2, w, h);
        ctx.restore();
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [adjust, isReady]);

  const update = (key, val) => setAdjust(p => ({ ...p, [key]: p[key] + val }));

  return (
    <div style={{ width: "100%", maxWidth: "640px", margin: "auto" }}>
      <div style={{ position: "relative", width: "100%", height: "480px", background: "#000", borderRadius: "10px", overflow: "hidden" }}>
        <video ref={videoRef} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }} playsInline />
        <canvas ref={canvasRef} width={640} height={480} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", transform: "scaleX(-1)" }} />
      </div>

      <div className="mt-3 p-3 bg-dark text-white rounded shadow">
        <h6 className="text-center mb-3">Manual Alignment Tools</h6>
        
        <Row className="mb-2 g-2">
          <Col><Button variant="outline-light" className="w-100" onClick={() => update('y', -3)}>Up ↑</Button></Col>
          <Col><Button variant="outline-light" className="w-100" onClick={() => update('y', 3)}>Down ↓</Button></Col>
          <Col><Button variant="outline-light" className="w-100" onClick={() => update('x', -3)}>Left ←</Button></Col>
          <Col><Button variant="outline-light" className="w-100" onClick={() => update('x', 3)}>Right →</Button></Col>
        </Row>

        <Row className="mb-2 g-2">
          <Col><Button variant="primary" className="w-100" onClick={() => update('scale', 0.1)}>Size +</Button></Col>
          <Col><Button variant="primary" className="w-100" onClick={() => update('scale', -0.1)}>Size -</Button></Col>
          <Col><Button variant="info" className="w-100" onClick={() => update('rotate', 2)}>Rotate ↻</Button></Col>
          <Col><Button variant="info" className="w-100" onClick={() => update('rotate', -2)}>Rotate ↺</Button></Col>
        </Row>

        <Row className="g-2">
          <Col><Button variant="warning" className="w-100" onClick={() => update('perspective', -0.05)}>Straighten L</Button></Col>
          <Col><Button variant="warning" className="w-100" onClick={() => update('perspective', 0.05)}>Straighten R</Button></Col>
          <Col><Button variant="danger" className="w-100" onClick={() => setAdjust({x:0, y:0, scale:1.5, rotate:0, perspective:1})}>Reset</Button></Col>
        </Row>
      </div>
    </div>
  );
};

export default FaceTryOn;
*/


import React, { useEffect, useRef, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { Button, Row, Col } from "react-bootstrap";

const FaceTryOn = ({ frameUrl }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const faceMeshRef = useRef(null);
  const processedFrameRef = useRef(null);
  const resultsRef = useRef(null);

  // Manual States - No Auto Scaling or Rotation anymore
  const [adjust, setAdjust] = useState({ 
    x: 0, 
    y: 0, 
    scale: 1.5, // Starting scale
    rotate: 0, 
    perspective: 1.0 // This "squishes" the side-angle image to look straight
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. Process Glass Image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = frameUrl;
    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      tempCanvas.width = img.width; tempCanvas.height = img.height;
      tempCtx.drawImage(img, 0, 0);
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if ((data[i] + data[i + 1] + data[i + 2]) / 3 > 230) data[i + 3] = 0;
      }
      tempCtx.putImageData(imageData, 0, 0);
      processedFrameRef.current = tempCanvas;
    };

    // 2. Initialize Tracking (Only for the Nose Bridge Anchor)
    faceMeshRef.current = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMeshRef.current.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMeshRef.current.onResults((results) => {
      resultsRef.current = results;
      if (!isReady) setIsReady(true);
    });

    if (videoRef.current) {
      const camera = new Camera(videoRef.current, {
        onFrame: async () => {
          if (faceMeshRef.current) await faceMeshRef.current.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    return () => { if (faceMeshRef.current) faceMeshRef.current.close(); };
  }, [frameUrl]);

  // 3. Drawing Loop
  useEffect(() => {
    let animationFrameId;
    const draw = () => {
      const canvas = canvasRef.current;
      const results = resultsRef.current;
      if (canvas && results && results.multiFaceLandmarks?.[0] && processedFrameRef.current) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const nose = results.multiFaceLandmarks[0][168]; // Use nose bridge as anchor

        // Manual Calculations
        const w = (100 * adjust.scale); 
        const h = (processedFrameRef.current.height / processedFrameRef.current.width) * w;

        ctx.save();
        // Anchor to nose but add manual X/Y offsets
        ctx.translate((nose.x * canvas.width) + adjust.x, (nose.y * canvas.height) + adjust.y);
        
        // Manual Rotation
        ctx.rotate((adjust.rotate * Math.PI) / 180);

        // Manual Perspective Squish (Fixes the side-angle image)
        ctx.scale(adjust.perspective, 1);

        ctx.drawImage(processedFrameRef.current, -w / 2, -h / 2, w, h);
        ctx.restore();
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [adjust, isReady]);

  const update = (key, val) => setAdjust(p => ({ ...p, [key]: p[key] + val }));

  return (
    <div style={{ width: "100%", maxWidth: "640px", margin: "auto" }}>
      <div style={{ position: "relative", width: "100%", height: "480px", background: "#000", borderRadius: "10px", overflow: "hidden" }}>
        <video ref={videoRef} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" }} playsInline />
        <canvas ref={canvasRef} width={640} height={480} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", transform: "scaleX(-1)" }} />
      </div>

      <div className="mt-3 p-3 bg-dark text-white rounded shadow">
        <h6 className="text-center mb-3">Manual Alignment Tools</h6>
        
        <Row className="mb-2 g-2">
          <Col><Button variant="outline-light" className="w-100" onClick={() => update('y', -3)}>Up ↑</Button></Col>
          <Col><Button variant="outline-light" className="w-100" onClick={() => update('y', 3)}>Down ↓</Button></Col>
          <Col><Button variant="outline-light" className="w-100" onClick={() => update('x', -3)}>Left ←</Button></Col>
          <Col><Button variant="outline-light" className="w-100" onClick={() => update('x', 3)}>Right →</Button></Col>
        </Row>

        <Row className="mb-2 g-2">
          <Col><Button variant="primary" className="w-100" onClick={() => update('scale', 0.1)}>Size +</Button></Col>
          <Col><Button variant="primary" className="w-100" onClick={() => update('scale', -0.1)}>Size -</Button></Col>
          <Col><Button variant="info" className="w-100" onClick={() => update('rotate', 2)}>Rotate ↻</Button></Col>
          <Col><Button variant="info" className="w-100" onClick={() => update('rotate', -2)}>Rotate ↺</Button></Col>
        </Row>

        <Row className="g-2">
          <Col><Button variant="warning" className="w-100" onClick={() => update('perspective', -0.05)}>Straighten L</Button></Col>
          <Col><Button variant="warning" className="w-100" onClick={() => update('perspective', 0.05)}>Straighten R</Button></Col>
          <Col><Button variant="danger" className="w-100" onClick={() => setAdjust({x:0, y:0, scale:1.5, rotate:0, perspective:1})}>Reset</Button></Col>
        </Row>
      </div>
    </div>
  );
};

export default FaceTryOn;