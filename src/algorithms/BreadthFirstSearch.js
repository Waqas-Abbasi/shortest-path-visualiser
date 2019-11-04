import {NodeType} from '../components/App';

const bfs = (grid, startNode) => {
    //Array for animation
    const visitedNodesInOrder = [];
    startNode.parent = null;

    //Queue to keep track of neighbours to visit next
    //Using a queue allows us to explore all nodes at a certain depth before moving on
    const queue = [startNode];

    //While there are nodes yet to be visited in the queue or if the end destination is found
    while (queue.length > 0) {
        const {row, col, parent} = queue.shift();

        //Skip iteration if the node is a wall.
        if (grid[row][col].nodeType === NodeType.WALL_NODE || grid[row][col].nodeType === NodeType.VISITED_NODE) {
            continue;
        }

        //If the ending node is found, stop the while loop.
        if (grid[row][col].nodeType === NodeType.FINISH_NODE) {
            visitedNodesInOrder.push({row, col, parent: parent});
            break;
        }

        //If the current node is not yet visited, then mark it as visited
        if (grid[row][col].nodeType === NodeType.EMPTY_NODE) {
            visitedNodesInOrder.push({row, col, parent: parent});
            grid[row][col].nodeType = NodeType.VISITED_NODE;
        }

        //Add top, bottom, left, right neighbour to the queue
        if (col + 1 < grid[row].length) {
            queue.push({row, col: col + 1, parent: {row, col}});
        }

        if (col - 1 >= 0 ) {
            queue.push({row, col: col - 1, parent: {row, col}});
        }

        if (row + 1 < grid.length) {
            queue.push({row: row + 1, col, parent: {row, col}});
        }

        if (row - 1 >= 0 ) {
            queue.push({row: row - 1, col, parent: {row, col}});
        }
    }

    return visitedNodesInOrder;

};

export default bfs;
