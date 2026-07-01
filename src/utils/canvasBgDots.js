const canvasDotColors = [
    'rgba(133, 202, 255)',
    'rgba(133, 202, 255)',
    'rgba(133, 202, 255)',
    'rgba(133, 202, 255)',
    'rgba(255, 231, 76)',
    'rgba(255, 231, 76)',
    'rgba(255, 231, 76)',
    'rgba(255, 231, 76)',
    'rgba(255, 71, 84)',
    'rgba(255, 71, 84)',
];
const lineConnectDotsColor = 'rgba(237, 149, 155)';

export const getDotsConfig = (canvasWidth) => {
    if (canvasWidth > 1600) return { quantity: 600, furthestDistanceForConnection: 76, displayRadius: 260 };
    if (canvasWidth > 1200) return { quantity: 560, furthestDistanceForConnection: 70, displayRadius: 240 };
    if (canvasWidth > 1000) return { quantity: 460, furthestDistanceForConnection: 60, displayRadius: 200 };
    if (canvasWidth > 800) return { quantity: 360, furthestDistanceForConnection: 46, displayRadius: 180 };
    if (canvasWidth > 600) return { quantity: 260, furthestDistanceForConnection: 36, displayRadius: 160 };
    return { quantity: 160, furthestDistanceForConnection: 20, displayRadius: 100 };
};

export const generateDotAndItsProps = (canvasWidth, canvasHeight) => {
    // console.log({ canvasWidth, canvasHeight });

    return {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        velocityX: Math.random() - 0.6,
        velocityY: Math.random() - 0.6,
        radius: Math.random() * 3,
        color: canvasDotColors[Math.floor(Math.random() * canvasDotColors.length)],
    };
};

export const drawSingleDot = (ctx, dotProps, mousePosition, canvasWidth) => {
    ctx.beginPath();
    ctx.arc(dotProps.x, dotProps.y, dotProps.radius, 0, Math.PI * 2, false);

    // calculate the distance from this dot to mouse mousePosition
    // the further the dot from the mouse the more it fades (3 just a tunning value)
    // fading is alpha in rgba,
    const distanceFromDotToMouse = Math.hypot(dotProps.x - mousePosition.x, dotProps.y - mousePosition.y);
    const distanceRatioToCanvasWidth = Math.min(1, Math.max(0, distanceFromDotToMouse / (canvasWidth / 3)));

    ctx.fillStyle = dotProps.color.slice(0, -1) + `, ${1 - distanceRatioToCanvasWidth})`;
    ctx.fill();
};

export const animateDots = (dotsArr, canvasWidth, canvasHeight, deltaTime) => {
    // start at index = 1, because index = 0 is for the mouse
    for (let i = 1; i < dotsArr.length; i++) {
        const dot = dotsArr[i];

        // if dot positions go above canvas and less than 0, reverso dot's velocity
        if (dot.x < 0) {
            dot.x = 0;
            dot.velocityX = -dot.velocityX;
        } else if (dot.x > canvasWidth) {
            dot.x = canvasWidth;
            dot.velocityX = -dot.velocityX;
        }

        if (dot.y < 0) {
            dot.y = 0;
            dot.velocityY = -dot.velocityY;
        } else if (dot.y > canvasHeight) {
            dot.y = canvasHeight;
            dot.velocityY = -dot.velocityY;
        }

        // calculate dot new positions
        dot.x += dot.velocityX * deltaTime * 30;
        dot.y += dot.velocityY * deltaTime * 30;
    }
};

function buildGrid(dotsArr, cellSize, canvasWidth, canvasHeight) {
    const cols = Math.ceil(canvasWidth / cellSize);
    const rows = Math.ceil(canvasHeight / cellSize);
    const grid = new Map();

    for (let i = 0; i < dotsArr.length; i++) {
        const dot = dotsArr[i];
        const col = Math.floor(dot.x / cellSize);
        const row = Math.floor(dot.y / cellSize);
        const key = `${col},${row}`;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key).push(i);
    }
    return { grid, cols, rows };
}

export const drawLines = (ctx, dotsArr, mousePosition, dotConfig) => {
    const lineBaseColor = lineConnectDotsColor.slice(0, -1);

    const alphaSteps = 20;
    const strokeStyleCache = Array.from(
        { length: alphaSteps + 1 },
        (_, i) => `${lineBaseColor}, ${(i / alphaSteps).toFixed(2)})`,
    );

    // for (let i = 0; i < dotsArr.length; i++) {
    //     for (let j = i + 1; j < dotsArr.length; j++) {
    //         const firstDot = dotsArr[i];
    //         const secondDot = dotsArr[j];

    //         const distanceFirstDotToMouse = Math.hypot(firstDot.x - mousePosition.x, firstDot.y - mousePosition.y);
    //         //check if 2 dots pos is less than the furthest allow
    //         //also check if the 1st dot is close to the mouse to draw line
    //         if (
    //             Math.abs(firstDot.x - secondDot.x) < dotConfig.furthestDistanceForConnection &&
    //             Math.abs(firstDot.y - secondDot.y) < dotConfig.furthestDistanceForConnection &&
    //             distanceFirstDotToMouse < dotConfig.displayRadius
    //         ) {
    //             ctx.beginPath();
    //             //move to the 1st dot pos
    //             ctx.moveTo(firstDot.x, firstDot.y);
    //             // draw a line from 1st to 2nd dot
    //             ctx.lineTo(secondDot.x, secondDot.y);

    //             // calculate distance from 1st dot to mouse
    //             const distanceFromFirstDotToMouse = Math.hypot(
    //                 firstDot.x - mousePosition.x,
    //                 firstDot.y - mousePosition.y,
    //             );
    //             let distanceRatioToCanvasWidth = 1 - (distanceFromFirstDotToMouse / dotConfig.displayRadius - 0.6);

    //             if (distanceRatioToCanvasWidth < 0) distanceRatioToCanvasWidth = 0;
    //             else if (distanceRatioToCanvasWidth > 1) distanceRatioToCanvasWidth = 1;

    //             // ctx.strokeStyle = `${lineBaseColor}, ${1 - distanceRatioToCanvasWidth})`;
    //             const alphaIndex = Math.round(Math.min(1, Math.max(0, distanceRatioToCanvasWidth)) * alphaSteps);
    //             ctx.strokeStyle = strokeStyleCache[alphaIndex];
    //             ctx.stroke();
    //             ctx.closePath();
    //         }
    //     }
    // }

    const cellSize = dotConfig.furthestDistanceForConnection;
    const { grid } = buildGrid(dotsArr, cellSize, ctx.canvas.width, ctx.canvas.height);

    const checked = new Set(); // avoid checking the same pair twice across adjacent cells

    for (const [key, indices] of grid) {
        const [col, row] = key.split(',').map(Number);

        // check this cell and the 8 neighboring cells only
        for (let dc = -1; dc <= 1; dc++) {
            for (let dr = -1; dr <= 1; dr++) {
                const neighborKey = `${col + dc},${row + dr}`;
                const neighborIndices = grid.get(neighborKey);
                if (!neighborIndices) continue;

                for (const i of indices) {
                    for (const j of neighborIndices) {
                        if (i >= j) continue; // skip self and duplicate pairs
                        const pairKey = `${i}-${j}`;
                        if (checked.has(pairKey)) continue;
                        checked.add(pairKey);

                        const firstDot = dotsArr[i];
                        const secondDot = dotsArr[j];

                        const distFirstToMouse = Math.hypot(firstDot.x - mousePosition.x, firstDot.y - mousePosition.y);

                        if (
                            Math.abs(firstDot.x - secondDot.x) < dotConfig.furthestDistanceForConnection &&
                            Math.abs(firstDot.y - secondDot.y) < dotConfig.furthestDistanceForConnection &&
                            distFirstToMouse < dotConfig.displayRadius
                        ) {
                            ctx.beginPath();
                            ctx.moveTo(firstDot.x, firstDot.y);
                            ctx.lineTo(secondDot.x, secondDot.y);

                            let distanceRatioToCanvasWidth =
                                1 - Math.max(0, distFirstToMouse / dotConfig.displayRadius + 0.16);
                            distanceRatioToCanvasWidth = Math.min(1, Math.max(0, distanceRatioToCanvasWidth));

                            // ctx.strokeStyle = `${lineConnectDotsColor.slice(0, -1)}, ${distanceRatioToCanvasWidth})`;
                            const alphaIndex = Math.round(
                                Math.min(1, Math.max(0, distanceRatioToCanvasWidth)) * alphaSteps,
                            );
                            ctx.strokeStyle = strokeStyleCache[alphaIndex];
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        }
    }
};
