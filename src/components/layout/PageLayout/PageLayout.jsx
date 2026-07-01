import { useState, useEffect, useRef } from 'react';
import { z } from 'zod';

import {
    getDotsConfig,
    generateDotAndItsProps,
    drawSingleDot,
    animateDots,
    drawLines,
} from '../../../utils/canvasBgDots';
import ValidatedComponent from '../../../utils/validateComponentProps';

// import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import Canvas from '../../base/Canvas/Canvas';

import './PageLayout.scss';

const pageLayoutSchema = z.object({
    pageType: z.string().default('normalPage'),
    sideBarDelayMotion: z.number().optional(),
    children: z.unknown(),
});

const PageLayout = ({ pageType = 'normalPage', sideBarDelayMotion = 0.36, children }) => {
    const canvasBgWrapperRef = useRef(null);
    const canvasApiRef = useRef(null); // this will hold resizeCanvas func exposed by <Canvas></Canvas> when it rendered

    // variables for drawing and animate canvas
    const lastTimeRef = useRef(performance.now());
    const dotArrRef = useRef([]);
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const dotsConfigRef = useRef(getDotsConfig(window.innerWidth));

    const setupCanvas = () => {
        const canvasWidth = canvasBgWrapperRef.current.clientWidth;
        const canvasHeight = canvasBgWrapperRef.current.clientHeight;

        if (
            canvasWidth === 0 ||
            canvasWidth === undefined ||
            canvasWidth === null ||
            canvasHeight === 0 ||
            canvasHeight === undefined ||
            canvasHeight === null
        ) {
            console.warn('Canvas container has zero size, skipping setup.');
            return;
        }

        // resize canvas by imperative handle get from forwardRef from <Canvas></Canvas>
        canvasApiRef.current.resizeCanvas(canvasWidth, canvasHeight);

        const newConfig = getDotsConfig(canvasWidth);
        dotsConfigRef.current = newConfig;

        const newDotsArr = [];
        for (let i = 0; i < newConfig.quantity; i++) newDotsArr.push(generateDotAndItsProps(canvasWidth, canvasHeight));

        newDotsArr[0].radius = 1.6;
        newDotsArr[0].color = '#ff4754';
        dotArrRef.current = newDotsArr;

        // set current mouse pos in the center of the canvas
        mousePositionRef.current = { x: canvasWidth / 2, y: canvasHeight / 2 };
    };

    const drawFnHomePage = (ctx, frameCount) => {
        const currentTime = performance.now();
        let deltaTime = (currentTime - lastTimeRef.current) / 1000; // convert to ms
        deltaTime = Math.min(deltaTime, 1 / 15); // don't use frame longer than 15fps
        lastTimeRef.current = currentTime;

        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;

        // clear the entire canvas before re-draw current canvas frame
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const dotsArr = dotArrRef.current;
        const mousePosition = mousePositionRef.current;
        const dotsConfig = dotsConfigRef.current;

        dotsArr.forEach((dot) => drawSingleDot(ctx, dot, mousePosition, canvasWidth));
        drawLines(ctx, dotsArr, mousePosition, dotsConfig);
        animateDots(dotsArr, canvasWidth, canvasHeight, deltaTime);
    };

    const drawFnErrorPage = (ctx, frameCount) => {
        const currentTime = performance.now();
        let deltaTime = (currentTime - lastTimeRef.current) / 1000; // convert to ms
        deltaTime = Math.min(deltaTime, 1 / 15); // don't use frame longer than 15fps
        lastTimeRef.current = currentTime;

        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;

        // clear the entire canvas before re-draw current canvas frame
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        const dotsArr = dotArrRef.current;
        const mousePosition = mousePositionRef.current;
        const dotsConfig = dotsConfigRef.current;

        dotsArr.forEach((dot) => drawSingleDot(ctx, dot, mousePosition, canvasWidth));
        animateDots(dotsArr, canvasWidth, canvasHeight, deltaTime);
    };

    const drawFn = (ctx, frameCount) => {
        if (pageType === 'homePage') return drawFnHomePage(ctx, frameCount);
        else if (pageType === 'errorPage') return drawFnErrorPage(ctx, frameCount);
    };

    // set up canvas
    useEffect(() => {
        if (pageType === 'homePage' || pageType === 'errorPage') setupCanvas();
    }, [pageType]);

    // re-set up canvas when screen size change
    useEffect(() => {
        if (pageType === 'homePage' || pageType === 'errorPage') window.addEventListener('resize', setupCanvas);
        return () => {
            if (pageType === 'homePage' || pageType === 'errorPage') window.removeEventListener('resize', setupCanvas);
        };
    }, [pageType]);

    // handle mouse/touch moving effect
    useEffect(() => {
        const updatePosition = (clientX, clientY) => {
            // use clientX/Y to match with canvas viewport
            const rect = canvasBgWrapperRef.current.getBoundingClientRect();
            // subtracting rect.left/rect.top from e.clientX/e.clientY correctly converts "mouse position in the viewport" into "mouse position relative to this specific div's top-left corner,"
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            mousePositionRef.current.x = x;
            mousePositionRef.current.y = y;

            const dotsArr = dotArrRef.current;
            if (dotsArr[0]) {
                dotsArr[0].x = x;
                dotsArr[0].y = y;
            }
        };

        const mouseMovingInCanvasHandler = (e) => updatePosition(e.clientX, e.clientY);
        const touchMovingInCanvasHandler = (e) => {
            if (e.touches.length > 0) {
                updatePosition(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        if (pageType === 'homePage' || pageType === 'errorPage') {
            window.addEventListener('mousemove', mouseMovingInCanvasHandler);
            window.addEventListener('touchmove', touchMovingInCanvasHandler);
        }

        return () => {
            if (pageType === 'homePage' || pageType === 'errorPage') {
                window.removeEventListener('mousemove', mouseMovingInCanvasHandler);
                window.removeEventListener('touchmove', touchMovingInCanvasHandler);
            }
        };
    }, [pageType]);

    return (
        <div className="layoutWrapper">
            {(pageType === 'homePage' || pageType === 'errorPage') && (
                <div ref={canvasBgWrapperRef} className="canvasBgWrapper">
                    <Canvas ref={canvasApiRef} drawFn={drawFn}></Canvas>
                </div>
            )}
            {pageType !== 'errorPage' && <SideBar delayMotion={sideBarDelayMotion}></SideBar>}
            {/* {pageType !== 'errorPage' && <SideBar></SideBar>} */}
            {/* <Header></Header> */}
            {children}
        </div>
    );
};

export default ValidatedComponent(PageLayout, pageLayoutSchema);
