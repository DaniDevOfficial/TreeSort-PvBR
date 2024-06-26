import React, { useEffect } from 'react';

interface LabyrinthCanvasProps {
    rows: number;
    cols: number;
    labyrinth: string[][];
}

export function LabyrinthCanvas({ rows, cols, labyrinth }: LabyrinthCanvasProps) {
    const screenWidth = window.innerWidth * 0.8;
    const screenHeight = window.innerHeight * 0.8;
    const cellSize = Math.min(screenWidth / cols, screenHeight / rows);
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
                    if (labyrinth[i][j] === 'wall') {
                        ctx.fillStyle = '#150109';
                        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                    } else if (labyrinth[i][j] === 'fastest') {
                        ctx.fillStyle = '#F91979'; 
                        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                    } else if (labyrinth[i][j] === 'goal') {
                        ctx.fillStyle = '#FA894F';  
                        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                    } else if (labyrinth[i][j] === 'start') {
                        ctx.fillStyle = '#5bc0be'; 
                        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                    } else if (labyrinth[i][j] === 'visited') {
                        ctx.fillStyle = '#F9D423'; 
                        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
                    } else {
                        ctx.fillStyle = '#FFF1F6';
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

}

