import {NodeType} from '../../components/App';

const primsAlgorithm = (grid, visitedNodesInOrder) => {
    //Choosing Random starting position
    const startRow = getRandomInt(0, grid.length - 1);
    const startCol = getRandomInt(0, grid[0].length - 1);

    //List to keep track of unvisited neighbours of visited cells that can be visited next.
    let frontierCells = [];

    //Make sure starting position isn't a Starting or Ending Node
    if (grid[startRow][startCol].nodeType !== NodeType.START_NODE && grid[startRow][startCol].nodeType !== NodeType.FINISH_NODE) {
        grid[startRow][startCol].nodeType = NodeType.EMPTY_NODE;
        visitedNodesInOrder.push(grid[startRow][startCol]);
    }

    //Frontier List to keep track of direct neighbours of the current node
    let neighbors = [];


    //If a top neighbour exists then add to neighbour list
    if (startRow + 2 < grid.length && grid[startRow + 2][startCol].nodeType === NodeType.WALL_NODE) {
        neighbors.push([{row: startRow + 1, col: startCol}, {row: startRow + 2, col: startCol}]);
    }

    //If a bottom neighbour exists then add to neighbour list
    if (startRow - 2 >= 0 && grid[startRow - 2][startCol].nodeType === NodeType.WALL_NODE) {
        neighbors.push([{row: startRow - 1, col: startCol}, {row: startRow - 2, col: startCol}]);
    }

    //If a right neighbor exists, then push to neighbours list.
    if (startCol + 2 < grid[0].length && grid[startRow][startCol + 2].nodeType === NodeType.WALL_NODE) {
        neighbors.push([{row: startRow, col: startCol + 1}, {row: startRow, col: startCol + 2}]);
    }

    //If a left neighbor exists, then push to neighbours list.
    if (startCol - 2 >= 0 && grid[startRow][startCol - 2].nodeType === NodeType.WALL_NODE) {
        neighbors.push([{row: startRow, col: startCol - 1}, {row: startRow, col: startCol - 2}]);
    }

    //Add all starting neighbours to Frontier List
    neighbors.forEach(neighbor => frontierCells.push(neighbor));

    //Keep Iterating while there are unvisited neighbours
    while (frontierCells.length > 0) {

        //Choose a random unvisited neighbour from all the visited nodes.
        const frontierIndex = getRandomInt(0, frontierCells.length - 1);
        const frontierCell = frontierCells[frontierIndex];

        //Each cell is treated as 2 cells since the maze is of an odd length
        const cell1 = frontierCell[0];
        const cell2 = frontierCell[1];

        const row1 = cell1.row;
        const col1 = cell1.col;

        const row2 = cell2.row;
        const col2 = cell2.col;

        //Checks if neighbour is already visited, if so delete from list and continue to next iteration
        if(grid[row2][col2].nodeType === NodeType.EMPTY_NODE){
            frontierCells.splice(frontierIndex, 1);
            continue;
        }

        //If Neighbour is unvisited, mark it as visited and push it to visited nodes in order for animation
        if (grid[row1][col1].nodeType !== NodeType.START_NODE && grid[row1][col1].nodeType !== NodeType.FINISH_NODE) {
            grid[row1][col1].nodeType = NodeType.EMPTY_NODE;
            visitedNodesInOrder.push(grid[row1][col1]);
        }

        if (grid[row2][col2].nodeType !== NodeType.START_NODE && grid[row2][col2].nodeType !== NodeType.FINISH_NODE) {
            grid[row2][col2].nodeType = NodeType.EMPTY_NODE;
            visitedNodesInOrder.push(grid[row2][col2]);
        }


        let neighbors = [];


        //If a top unvisited neighbour exists then add to neighbour list
        if (row2 + 2 < grid.length && grid[row2 + 2][col2].nodeType === NodeType.WALL_NODE) {
            neighbors.push([{row: row2 + 1, col: col2}, {row: row2 + 2, col: col2}]);
        }

        //If a bottom unvisited neighbour exists then add to neighbour list
        if (row2 - 2 >= 0 && grid[row2 - 2][col2].nodeType === NodeType.WALL_NODE) {
            neighbors.push([{row: row2 - 1, col: col2}, {row: row2 - 2, col: col2}]);
        }

        //If a right unvisited neighbour exists then add to neighbour list
        if (col2 + 2 < grid[0].length && grid[row2][col2 + 2].nodeType === NodeType.WALL_NODE) {
            neighbors.push([{row: row2, col: col2 + 1}, {row: row2, col: col2 + 2}]);
        }

        //If a left unvisited neighbour exists then add to neighbour list
        if (col2 - 2 >= 0 && grid[row2][col2 - 2].nodeType === NodeType.WALL_NODE) {
            neighbors.push([{row: row2, col: col2 - 1}, {row: row2, col: col2 - 2}]);
        }

        //Push all unvisited neighbours to Frontier List
        neighbors.forEach(neighbor => frontierCells.push(neighbor));

        //Remove the current node that was just visited.
        frontierCells.splice(frontierIndex, 1);
    }

};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


export default primsAlgorithm;
