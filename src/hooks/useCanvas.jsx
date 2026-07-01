import { useRef, useEffect } from 'react';

const useCanvas = (drawFn) => {
    const CanvasRef = useRef(null);

    useEffect(() => {
        let canvas;
        let ctx;
        let animationFrameId;
        let frameCount = 0;

        const render = () => {
            frameCount++;
            drawFn(ctx, frameCount);
            animationFrameId = window.requestAnimationFrame(render);
        };

        if (CanvasRef.current) {
            canvas = CanvasRef.current;
            ctx = canvas.getContext('2d');
            render();
        }

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [drawFn]);

    const resizeCanvas = (canvasWidth, canvasHeight) => {
        // console.log(CanvasRef.current);

        if (CanvasRef.current.width !== canvasWidth || CanvasRef.current.height !== canvasHeight) {
            CanvasRef.current.width = canvasWidth;
            CanvasRef.current.height = canvasHeight;

            // return
        }
    };

    return { CanvasRef, resizeCanvas };
};

export default useCanvas;
