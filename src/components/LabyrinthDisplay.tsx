import React, { useState, useEffect } from 'react';
import { LabyrinthCanvas } from './LabyrinthCanvas';
import { Button, Box, Heading, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';
export function LabyrinthDisplay() {
    const [rows, setRows] = useState(5);
    const [cols, setCols] = useState(5);
    const [wallProbability, setWallProbability] = useState(0.3);
    const [labyrinth, setLabyrinth] = useState([]);
    const [faststestPath, setFaststestPath] = useState([]);
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
        const fastestPath = (findFastestPath(generatedLabyrinth))
        setFaststestPath(fastestPath)
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
        const rows = labyrinth.length; // Anzahl der Zeilen im Labyrinth
        const cols = labyrinth[0].length; // Anzahl der Spalten im Labyrinth

        // Initialisiere ein 2D-Array, um zu verfolgen, welche Zellen bereits besucht wurden
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        // Erstelle eine Warteschlange für die Breitensuche
        const queue = [];
        // Startpunkt mit dem Startpfad zur Warteschlange hinzufügen
        const start = { x: 0, y: 0, path: [{ x: 0, y: 0 }] };
        queue.push(start);

        // Solange die Warteschlange nicht leer ist
        while (queue.length > 0) {
            // Entferne das erste Element aus der Warteschlange
            const { x, y, path } = queue.shift();

            // Überprüfe, ob der aktuelle Punkt das Ziel ist (unterste rechte Ecke des Labyrinths)
            if (x === cols - 1 && y === rows - 1) {
                // Markiere den gefundenen Pfad im Labyrinth und gib ihn zurück
                const markedPath = markPath(labyrinth, path);
                return markedPath;
            }

            // Überprüfe die Nachbarzellen des aktuellen Punktes
            if (x >= 0 && x < cols && y >= 0 && y < rows && !visited[y][x] && labyrinth[y][x] === 'path') {
                // Markiere die aktuelle Zelle als besucht
                visited[y][x] = true;

                // Füge benachbarte Zellen mit aktualisiertem Pfad zur Warteschlange hinzu
                queue.push({ x: x - 1, y, path: path.concat({ x: x - 1, y }) }); // Bewegung nach links
                queue.push({ x: x + 1, y, path: path.concat({ x: x + 1, y }) }); // Bewegung nach rechts
                queue.push({ x, y: y - 1, path: path.concat({ x, y: y - 1 }) }); // Bewegung nach oben
                queue.push({ x, y: y + 1, path: path.concat({ x, y: y + 1 }) }); // Bewegung nach unten
            }
        }

        // Falls kein Pfad gefunden wurde, gib ein leeres Array zurück
        return [];
    }


    function markPath(labyrinth, path) {

        path.forEach(({ x, y }) => {
            labyrinth[y][x] = 'fastest';
        });

        console.log(labyrinth)

        labyrinth[0][0] = 'start'; // Mark the start point as fastest path
        labyrinth[labyrinth.length - 1][labyrinth[0].length - 1] = 'goal'; // Mark the goal as fastest path
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
            <LabyrinthCanvas rows={rows} cols={cols} labyrinth={labyrinth} />
        </Box>
    );
}
