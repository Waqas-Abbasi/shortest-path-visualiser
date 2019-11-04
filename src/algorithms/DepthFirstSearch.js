import {NodeType} from '../components/App';

const dfs = (grid, startNode) => {
    //Array for animation
    const visitedNodesInOrder = [];
    startNode.parent = null;

    //Stack to keep track of neighbours to visit next
    //Using a stack allows us to explore a branch to the end until no longer possible after which the algorithm backtraces to the next available node in the stack.
    const stack = [startNode];

    //While there are nodes yet to be visited in the queue or if the end destination is found
    while (stack.length > 0) {
        const {row, col, parent} = stack.pop();

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
            stack.push({row, col: col + 1, parent: {row, col}});
        }

        if (col - 1 >= 0 ) {
            stack.push({row, col: col - 1, parent: {row, col}});
        }

        if (row + 1 < grid.length) {
            stack.push({row: row + 1, col, parent: {row, col}});
        }

        if (row - 1 >= 0 ) {
            stack.push({row: row - 1, col, parent: {row, col}});
        }
    }

    return visitedNodesInOrder;

};

export default dfs;
