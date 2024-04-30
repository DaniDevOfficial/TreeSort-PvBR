import React, { useState, useEffect } from 'react';
import { LabyrinthCanvas } from './LabyrinthCanvas';

export function LabyrinthDisplay() {
    const [rows, setRows] = useState(5);
    const [cols, setCols] = useState(5);
    const [wallProbability, setWallProbability] = useState(0.3);
    const [labyrinth, setLabyrinth] = useState([]);

    useEffect(() => {
        generateLabyrinth();
    }, []);

    function generateLabyrinth() {
        const newLabyrinth = [];
        for (let i = 0; i < rows; i++) {
            const newRow = [];
            for (let j = 0; j < cols; j++) {
                newRow.push(Math.random() < wallProbability);
            }
            newLabyrinth.push(newRow);
        }
        newLabyrinth[0][0] = false; 
        newLabyrinth[rows - 1][cols - 1] = false; 
        return newLabyrinth;
    }


    function checkIfPathExists(labyrinthToCheck) {
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        const stack = [];
        stack.push({ x: 0, y: 0 }); // Start at top-left corner

        while (stack.length > 0) {
            const { x, y } = stack.pop();

            if (x === cols - 1 && y === rows - 1) { // Reached bottom-right corner
                return true;
            }

            if (x >= 0 && x < cols && y >= 0 && y < rows && !visited[y][x] && !labyrinthToCheck[y][x]) {
                visited[y][x] = true;
                stack.push({ x: x - 1, y }); // Move left
                stack.push({ x: x + 1, y }); // Move right
                stack.push({ x, y: y - 1 }); // Move up
                stack.push({ x, y: y + 1 }); // Move down
            }
        }

        return false;
    }

    function generatePossibleLabirynth() {
        let generatedLabyrinth = generateLabyrinth();
        while (!checkIfPathExists(generatedLabyrinth)) {
            generatedLabyrinth = generateLabyrinth();
        }
        setLabyrinth(generatedLabyrinth);
    }

    function handleRowsChange(event) {
        const newRows = parseInt(event.target.value);
        if (!isNaN(newRows) && newRows > 0) {
            setRows(newRows);
        }
    }

    function handleColsChange(event) {
        const newCols = parseInt(event.target.value);
        if (!isNaN(newCols) && newCols > 0) {
            setCols(newCols);
        }
    }

    function handleWallProbabilityChange(event) {
        const newWallProbability = parseFloat(event.target.value);
        if (!isNaN(newWallProbability) && newWallProbability >= 0 && newWallProbability <= 1) {
            setWallProbability(newWallProbability);
        }
    }

    return (
        <div className="App">
            <h1>Labyrinth Game</h1>
            <p>Use the controls below to generate a labyrinth and check if a path exists from the top-left to the bottom-right corner.</p>
            <div>
                <label htmlFor="rowsInput">Rows:</label>
                <input id="rowsInput" type="number" value={rows} onChange={handleRowsChange} />
            </div>
            <div>
                <label htmlFor="colsInput">Columns:</label>
                <input id="colsInput" type="number" value={cols} onChange={handleColsChange} />
            </div>
            <div>
                <label htmlFor="probabilityInput">Wall Probability:</label>
                <input id="probabilityInput" type="number" step="0.01" min="0" max="1" value={wallProbability} onChange={handleWallProbabilityChange} />
            </div>
            <button onClick={generatePossibleLabirynth}>Generate Labyrinth</button>
            <LabyrinthCanvas rows={rows} cols={cols} labyrinth={labyrinth} />
        </div>
    );
}
