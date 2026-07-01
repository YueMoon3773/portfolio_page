import { forwardRef, useImperativeHandle } from 'react';
import useCanvas from '../../../hooks/useCanvas';

import './Canvas.scss';

const Canvas = forwardRef(({ drawFn, ...rest }, ref) => {
    const { CanvasRef, resizeCanvas } = useCanvas(drawFn);

    useImperativeHandle(ref, () => {
        return {
            resizeCanvas,
        };
    });

    return <canvas ref={CanvasRef} {...rest}></canvas>;
});

export default Canvas;
