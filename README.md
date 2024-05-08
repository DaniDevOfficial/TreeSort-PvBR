# Treetraversal

Treetraversal wird verwendet um alle Knoten eines Baumes zu besuchen. Es gibt verschiedene Methoden um dies zu tun. In diesem Projekt wird nur die Breiten suche Implementiert. Es gibt zu dem ganzen auch ein Video auf Youtube: https://www.youtube.com/watch?v=7uQcJ0fYBdM.

## Instalierung 

```bash
npm install

npm start
```

## Was ist Tree Traversal?

Treetraversal wird verwendet um alle Knoten eines Baumes zu besuchen. Es gibt verschiedene Methoden um dies zu tun.

### Breitensuche

Die Breitensuche ist eine Methode um alle Knoten eines Baumes zu besuchen. Dabei wird zuerst der Wurzelknoten besucht und dann die Kinder des Wurzelknotens. Danach werden die Kinder der Kinder besucht. Dies wird so lange gemacht bis alle Knoten besucht wurden.

![Breitensuche](/assets/breitensuche.png)


Wir haben dafür den Algorithmus mit JavaScript implementiert.

```js
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
        // Nimmt das erste Element aus der Warteschlange
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
```

Um das ganze besser im Frontend darstellen zu können haben wir noch eine Simple Markierfunktion geschrieben, welche  den schnellsten pfad markiert. 

```js
function markPath(labyrinth, path) {

    path.forEach(({ x, y }) => {
        labyrinth[y][x] = 'fastest'; // Markiere den Pfad im Labyrinth
    });

    labyrinth[0][0] = 'start'; // Startpunkt wieder markieren
    labyrinth[labyrinth.length - 1][labyrinth[0].length - 1] = 'goal'; // Zielpunkt markieren
    return labyrinth;
}
```
### Tiefensuche

Die Tiefensuche ist eine Methode um alle Knoten eines Baumes zu besuchen. Dabei wird zuerst der Wurzelknoten besucht und dann die Kinder des Wurzelknotens. Danach werden die Kinder der Kinder besucht. Dies wird so lange gemacht bis alle Knoten besucht wurden.

![Tiefensuche](/assets/tiefensuche.png)


## Webseite 

Die Webseite ist unter folgendem Link erreichbar: https://treetraversal.vercel.app/

![Webseite](/assets/webseite.png)

Auf der Webseite kann man angeben, wie viele Zeilen und Spalten das Labyrinth haben muss und die warscheindlichkeit, dass ein Feld blockiert ist. Danach kann man ein Labyrinth generieren und sieht sofort den schnellsten Pfad, welcher mit der Breitensuche gefunden wurde.


### Projektumsetzung  

Mitglieder dieses Projektes sind:

* Aakash Sethi
* David Bischof
* David Hofstetter
* Justin Calle

Um eine ordentliche und angenehme Arbeitsatmosphäre aufrechtzuerhalten, haben wir zu Beginn einen Zeitplan erstellt, der uns auf dem roten Faden hält.
![Zeitplan](/assets/zeitplan.png)

Jedes Teammitglied hat seine Tätigkeiten in einem Arbeitsjournal zusammengefasst:

[Aakash Sethi](https://github.com/DaniDevOfficial/TreeSort-PvBR/blob/main/Journale/AakashSethi.md)

[David Bischof](https://github.com/DaniDevOfficial/TreeSort-PvBR/blob/main/Journale/DavidBischof.md)

[David Hofstetter](https://github.com/DaniDevOfficial/TreeSort-PvBR/blob/main/Journale/DavidHoffstetter.md)

[Justin Calle](https://github.com/DaniDevOfficial/TreeSort-PvBR/blob/main/Journale/JustinCalle.md)


