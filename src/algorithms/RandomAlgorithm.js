import {NodeType} from '../components/App';

const randomAlgorithm = (grid, startNode) => {
    const visitedNodesInOrder = [];
    const n = grid.length;
    const m = grid[0].length;

    let toVisit = [];
    toVisit.push({row: startNode.row, col: startNode.col, parent: null});


    while (toVisit.length > 0) {
        const {row, col, parent} = toVisit.shift();

        if (grid[row][col].nodeType == NodeType.FINISH_NODE) {
            visitedNodesInOrder.push({row, col, parent});
            return visitedNodesInOrder;
        }

        if (grid[row][col].nodeType == NodeType.WALL_NODE || grid[row][col].nodeType == NodeType.VISITED_NODE) {
            continue;
        }


        const random = Math.random();

        if (random < 0.25 && row < n - 1) {
            toVisit.push({row: row + 1, col: col, parent: {row, col}});
        } else if (random < 0.5 && row > 0) {
            toVisit.push({row: row - 1, col: col, parent: {row, col}});
        } else if (random < 0.75 && col < m - 1) {
            toVisit.push({row: row, col: col + 1, parent: {row, col}});
        } else if (random < 1 && col > 0) {
            toVisit.push({row: row, col: col - 1, parent: {row, col}});
        }


        if (row < n - 1 && grid[row + 1][col].nodeType != NodeType.VISITED_NODE) {
            if (Math.random() <= 0.5) toVisit.push({row: row + 1, col: col, parent: {row, col}});
        }
        ;

        if (row > 0 && grid[row - 1][col].nodeType != NodeType.VISITED_NODE) {
            if (Math.random() <= 0.5) toVisit.push({row: row - 1, col: col, parent: {row, col}});
        }
        ;

        if (col < m - 1 && grid[row][col + 1].nodeType != NodeType.VISITED_NODE) {
            if (Math.random() <= 0.5) toVisit.push({row: row, col: col + 1, parent: {row, col}});
        }
        ;

        if (col > 0 && grid[row][col - 1].nodeType != NodeType.VISITED_NODE) {
            if (Math.random() <= 0.5) toVisit.push({row: row, col: col - 1, parent: {row, col}});
        }
        ;


        if (grid[row][col].nodeType == NodeType.EMPTY_NODE) {
            grid[row][col].nodeType = NodeType.VISITED_NODE;
            visitedNodesInOrder.push({row, col, parent});
        }

    }
    return visitedNodesInOrder;
};

export default randomAlgorithm;
