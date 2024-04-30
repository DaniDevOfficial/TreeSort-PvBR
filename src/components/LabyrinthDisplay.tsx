import React, { useState, useEffect } from 'react';
import { LabyrinthCanvas } from './LabyrinthCanvas';
import { Button, Box, Heading, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';
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
                newRow.push(Math.random() < wallProbability ? 'wall' : 'path');
            }
            newLabyrinth.push(newRow);
        }
        newLabyrinth[0][0] = "path";
        newLabyrinth[rows - 1][cols - 1] = "goal";
        console.log(newLabyrinth)
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

            if (x >= 0 && x < cols && y >= 0 && y < rows && !visited[y][x] && labyrinthToCheck[y][x] === "path") {
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
        findFastestPath(generatedLabyrinth);
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


    function findFastestPath(labyrinth) {
        const rows = labyrinth.length;
        const cols = labyrinth[0].length;

        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        const queue = [];
        const start = { x: 0, y: 0, path: [{ x: 0, y: 0 }] }; // Include starting point in the initial path
        queue.push(start);

        while (queue.length > 0) {
            const { x, y, path } = queue.shift();

            if (x === cols - 1 && y === rows - 1) {
                const markedPath = markPath(labyrinth, path);
                console.log(markedPath)
                return path; // Return the path when the goal is reached
            }

            if (x >= 0 && x < cols && y >= 0 && y < rows && !visited[y][x] && labyrinth[y][x] === 'path') {
                visited[y][x] = true;

                // Add adjacent cells to the queue with updated path
                queue.push({ x: x - 1, y, path: path.concat({ x: x - 1, y }) }); // Move left
                queue.push({ x: x + 1, y, path: path.concat({ x: x + 1, y }) }); // Move right
                queue.push({ x, y: y - 1, path: path.concat({ x, y: y - 1 }) }); // Move up
                queue.push({ x, y: y + 1, path: path.concat({ x, y: y + 1 }) }); // Move down
            }
        }

        // If no path is found
        return [];
    }


    function markPath(labyrinth, path) {

        path.forEach(({ x, y }) => {
            labyrinth[y][x] = 'fastest';
        });

        console.log(labyrinth)

        labyrinth[0][0] = 'fastest'; // Mark the start point as fastest path
        return labyrinth;
    }

    return (
        <Box
        >
            <Heading as="h1" size="xl">Labyrinth Game</Heading>
            <Text>Use the controls below to generate a labyrinth and check if a path exists from the top-left to the bottom-right corner.</Text>
            <FormControl>
                <FormLabel htmlFor="rowsInput">Rows:</FormLabel>
                <Input id="rowsInput" type="number" value={rows} onChange={handleRowsChange} />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="colsInput">Columns:</FormLabel>
                <Input id="colsInput" type="number" value={cols} onChange={handleColsChange} />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="probabilityInput">Wall Probability (if this is to high it might crash) :</FormLabel>
                <Input id="probabilityInput" type="number" step="0.01" min="0" max="0.5" value={wallProbability} onChange={handleWallProbabilityChange} />
            </FormControl>
            <Button onClick={generatePossibleLabirynth}>Generate Labyrinth</Button>
            <Button onClick={findFastestPath}>Fastest Path</Button>
            <LabyrinthCanvas rows={rows} cols={cols} labyrinth={labyrinth} />
        </Box>
    );
}
