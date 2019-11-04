import PriorityQueue from '../data-structures/PriorityQueue';
import {NodeType} from '../components/App';

const aStar = (grid, startNode, finishNode) => {
    const n = grid.length;
    const m = grid[0].length;

    const startRow = startNode.row;
    const startCol = startNode.col;

    const endRow = finishNode.row;
    const endCol = finishNode.col;

    //Array for animation.
    const visitedNodesInOrder = [];

    //Priority Queue to keep track of the heuristic
    const pq = new PriorityQueue((a, b) => a.distance <= b.distance);

    startNode.parent = null;
    startNode.g = 0;

    //Store in an object {node: {row, col, parent}, distance: x}
    let distance = Math.abs(endRow - startRow) + Math.abs(endCol - startCol);
    pq.push({node: startNode, distance});

    while (!pq.isEmpty()) {
        const {node, parent} = pq.pop();

        const row = node.row;
        const col = node.col;


        //If a node is already visited or is a wall
        if (grid[row][col].nodeType === NodeType.VISITED_NODE
            || grid[row][col].nodeType === NodeType.WALL_NODE) {
            continue;
        }

        //If a node is the end destination then end algorithm
        if (grid[row][col].nodeType === NodeType.FINISH_NODE) {
            visitedNodesInOrder.push({row, col, parent});
            return visitedNodesInOrder;
        }


        //Mark node as visited if it is an empty node
        if (grid[row][col].nodeType === NodeType.EMPTY_NODE) {
            visitedNodesInOrder.push({row, col, parent});
            grid[row][col].nodeType = NodeType.VISITED_NODE;
        }


        //Distance of each neighbor is evaluated as the distance from Starting Position and the distance from the Ending Position
        //Push top, bottom, left, right neighbours to priority queue

        if (row + 1 < n) {
            pq.push({
                node: {row: row + 1, col, g: node.g + 1},
                distance: node.g + 1 + Math.abs(endRow - row - 1) + Math.abs(endCol - col),
                parent: {row, col}
            });
        }

        if (row - 1 >= 0) {
            pq.push({
                node: {row: row - 1, col, g: node.g + 1},
                distance: node.g + 1 + Math.abs(endRow - row + 1) + Math.abs(endCol - col),
                parent: {row, col}
            });
        }

        if (col - 1 >= 0) {
            pq.push({
                node: {row, col: col - 1, g: node.g + 1},
                distance: node.g + 1 + Math.abs(endRow - row) + Math.abs(endCol - col + 1),
                parent: {row, col}
            });
        }

        if (col + 1 < m) {
            pq.push({
                node: {row, col: col + 1, g: node.g + 1},
                distance: node.g + 1 + Math.abs(endRow - row) + Math.abs(endCol - col - 1),
                parent: {row, col}
            });
        }

    }
    return visitedNodesInOrder;
};

export default aStar;
