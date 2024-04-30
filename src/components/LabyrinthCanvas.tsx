import React, { useEffect } from 'react';

interface LabyrinthCanvasProps {
    rows: number;
    cols: number;
    labyrinth: boolean[][];
}

export function LabyrinthCanvas({ rows, cols, labyrinth }: LabyrinthCanvasProps) {
    const cellSize = 20; 
    const canvasWidth = cols * cellSize;
    const canvasHeight = rows * cellSize;

    useEffect(() => {
        if (labyrinth.length === 0) {
            return;
        }
        const drawLabyrinth = (ctx: CanvasRenderingContext2D) => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (labyrinth[i][j]) {
                        // Draw wall
                        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                    }
                }
            }
        };

        const canvas = document.getElementById('labyrinth-canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            drawLabyrinth(ctx);
        }
    }, [labyrinth]);

    return (
        <canvas
            id="labyrinth-canvas"
            width={canvasWidth}
            height={canvasHeight}
            style={{ border: '1px solid black' }}
        ></canvas>
    );

    const drawCanvas = (canvas: HTMLCanvasElement) => {
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                drawLabyrinth(ctx);
            }
        }
    };

    return (
        <canvas
            ref={drawCanvas}
            width={canvasWidth}
            height={canvasHeight}
            style={{ border: '1px solid black' }}
        ></canvas>
    );
};

