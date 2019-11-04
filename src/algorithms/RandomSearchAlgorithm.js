import {NodeType} from '../components/App';

const randomSearchAlgorithm = (grid, startNode) => {
    const visitedNodesInOrder = [];
    const n = grid.length;
    const m = grid[0].length;

    //List to keep track of which nodes to visit
    //Used as a queue
    let toVisit = [];
    toVisit.push({row: startNode.row, col: startNode.col, parent: null});


    while (toVisit.length > 0) {
        const {row, col, parent} = toVisit.shift();

        //If current node is end node then break the loop and return the animation array
        if (grid[row][col].nodeType == NodeType.FINISH_NODE) {
            visitedNodesInOrder.push({row, col, parent});
            return visitedNodesInOrder;
        }

        //If current node is already visited or is a wall node then ignore
        if (grid[row][col].nodeType == NodeType.WALL_NODE || grid[row][col].nodeType == NodeType.VISITED_NODE) {
            continue;
        }

        //If current node is unvisited, mark it as visited
        if (grid[row][col].nodeType == NodeType.EMPTY_NODE) {
            grid[row][col].nodeType = NodeType.VISITED_NODE;
            visitedNodesInOrder.push({row, col, parent});
        }

        //Boolean to detect if a neighbour was added in the iteration.
        let didAddNode = false;

        //Each neighbour (top, bottom, left, right) has a 50% chance of being added to the toVisit Queue.
        if (row < n - 1 && grid[row + 1][col].nodeType != NodeType.VISITED_NODE) {
            if (Math.random() <= 0.5) toVisit.push({row: row + 1, col: col, parent: {row, col}});
            didAddNode = true;
        };

        if (row > 0 && grid[row - 1][col].nodeType != NodeType.VISITED_NODE) {
            if (Math.random() <= 0.5) toVisit.push({row: row - 1, col: col, parent: {row, col}});
            didAddNode = true;
        };

        if (col < m - 1 && grid[row][col + 1].nodeType != NodeType.VISITED_NODE) {
            if (Math.random() <= 0.5) toVisit.push({row: row, col: col + 1, parent: {row, col}});
            didAddNode = true;
        };

        if (col > 0 && grid[row][col - 1].nodeType != NodeType.VISITED_NODE) {
            if (Math.random() <= 0.5) toVisit.push({row: row, col: col - 1, parent: {row, col}});
            didAddNode = true;
        };

        const random = Math.random();

        //If no neighbour is selected then choose one of the 4 neighbours (top, bottom, left, right) is selected
        if(!didAddNode){
            if (random < 0.25 && row < n - 1) {
                toVisit.push({row: row + 1, col: col, parent: {row, col}});
            } else if (random < 0.5 && row > 0) {
                toVisit.push({row: row - 1, col: col, parent: {row, col}});
            } else if (random < 0.75 && col < m - 1) {
                toVisit.push({row: row, col: col + 1, parent: {row, col}});
            } else if (random < 1 && col > 0) {
                toVisit.push({row: row, col: col - 1, parent: {row, col}});
            }
        }
    }
    return visitedNodesInOrder;
};

export default randomSearchAlgorithm;
