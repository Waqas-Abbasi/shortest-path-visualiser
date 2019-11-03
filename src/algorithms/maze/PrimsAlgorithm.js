import {NodeType} from '../../components/App';

const primsAlgorithm = (grid, visitedNodesInOrder) => {
    const startRow = getRandomInt(0, grid.length - 1);
    const startCol = getRandomInt(0, grid[0].length - 1);

    let frontierCells = [];

    if (grid[startRow][startCol].nodeType !== NodeType.START_NODE && grid[startRow][startCol].nodeType !== NodeType.FINISH_NODE) {
        grid[startRow][startCol].nodeType = NodeType.EMPTY_NODE;
        visitedNodesInOrder.push(grid[startRow][startCol]);
    }

    let neighbors = [];

    if (startRow + 2 < grid.length && grid[startRow + 2][startCol].nodeType === NodeType.WALL_NODE) {
        neighbors.push([{row: startRow + 1, col: startCol}, {row: startRow + 2, col: startCol}]);
    }

    if (startRow - 2 >= 0 && grid[startRow - 2][startCol].nodeType === NodeType.WALL_NODE) {
        neighbors.push([{row: startRow - 1, col: startCol}, {row: startRow - 2, col: startCol}]);
    }

    if (startCol + 2 < grid[0].length && grid[startRow][startCol + 2].nodeType === NodeType.WALL_NODE) {
        neighbors.push([{row: startRow, col: startCol + 1}, {row: startRow, col: startCol + 2}]);
    }

    if (startCol - 2 >= 0 && grid[startRow][startCol - 2].nodeType === NodeType.WALL_NODE) {
        neighbors.push([{row: startRow, col: startCol - 1}, {row: startRow, col: startCol - 2}]);
    }

    neighbors.forEach(neighbor => frontierCells.push(neighbor));
    while (frontierCells.length > 0) {
        const frontierIndex = getRandomInt(0, frontierCells.length - 1);
        const frontierCell = frontierCells[frontierIndex];


        const cell1 = frontierCell[0];
        const cell2 = frontierCell[1];

        const row1 = cell1.row;
        const col1 = cell1.col;

        const row2 = cell2.row;
        const col2 = cell2.col;

        if(grid[row2][col2].nodeType === NodeType.EMPTY_NODE){
            frontierCells.splice(frontierIndex, 1);
            continue;
        }

        if (grid[row1][col1].nodeType !== NodeType.START_NODE && grid[row1][col1].nodeType !== NodeType.FINISH_NODE) {
            grid[row1][col1].nodeType = NodeType.EMPTY_NODE;
            visitedNodesInOrder.push(grid[row1][col1]);
        }

        if (grid[row2][col2].nodeType !== NodeType.START_NODE && grid[row2][col2].nodeType !== NodeType.FINISH_NODE) {
            grid[row2][col2].nodeType = NodeType.EMPTY_NODE;
            visitedNodesInOrder.push(grid[row2][col2]);
        }


        let neighbors = [];

        if (row2 + 2 < grid.length && grid[row2 + 2][col2].nodeType === NodeType.WALL_NODE) {
            neighbors.push([{row: row2 + 1, col: col2}, {row: row2 + 2, col: col2}]);
        }

        if (row2 - 2 >= 0 && grid[row2 - 2][col2].nodeType === NodeType.WALL_NODE) {
            neighbors.push([{row: row2 - 1, col: col2}, {row: row2 - 2, col: col2}]);
        }

        if (col2 + 2 < grid[0].length && grid[row2][col2 + 2].nodeType === NodeType.WALL_NODE) {
            neighbors.push([{row: row2, col: col2 + 1}, {row: row2, col: col2 + 2}]);
        }

        if (col2 - 2 >= 0 && grid[row2][col2 - 2].nodeType === NodeType.WALL_NODE) {
            neighbors.push([{row: row2, col: col2 - 1}, {row: row2, col: col2 - 2}]);
        }

        neighbors.forEach(neighbor => frontierCells.push(neighbor));

        frontierCells.splice(frontierIndex, 1);
    }

};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


export default primsAlgorithm;
