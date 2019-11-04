import PriorityQueue from '../data-structures/PriorityQueue';
import {NodeType} from '../components/App';

const dijkstra = (grid, startNode) => {
    const n = grid.length;
    const m = grid[0].length;

    //Array for animation
    const visitedNodesInOrder = [];

    //Priority queue for prioritising nodes with a lower distance
    const pq = new PriorityQueue((a, b) => a.distance < b.distance);

    startNode.parent = null;

    //Store in an object {node: {row, col, parent}, distance: x}
    pq.push({node: startNode, distance: 0});

    while(!pq.isEmpty()){
        const {node, distance} = pq.pop();

        const row = node.row;
        const col = node.col;
        const parent = node.parent;

        //If a node is a wall node or visited then ignore and continue to next element
        if(grid[row][col].nodeType == NodeType.VISITED_NODE || grid[row][col].nodeType === NodeType.WALL_NODE){
            continue;
        }
        //If end node is found break while loop
        if (grid[row][col].nodeType === NodeType.FINISH_NODE) {
            visitedNodesInOrder.push({row, col, parent});
            break;
        }

        //If current node is not yet visited then mark it as visited
        if (grid[row][col].nodeType === NodeType.EMPTY_NODE) {
            visitedNodesInOrder.push({row, col, parent: parent});
            grid[row][col].nodeType = NodeType.VISITED_NODE;
        }

        //Add top, bottom, left, right neighbours to the priority queue
        if (row < n - 1 && grid[row + 1][col].nodeType !== NodeType.VISITED_NODE) {
            pq.push({node: {row: row + 1, col, parent: {row, col}}, distance: distance + 1});
        }

        if (row > 0 && grid[row - 1][col].nodeType !== NodeType.VISITED_NODE) {
            pq.push({node: {row: row - 1, col, parent: {row, col}}, distance: distance + 1});
        }

        if (col < m - 1 && grid[row][col + 1].nodeType !== NodeType.VISITED_NODE) {
            pq.push({node: {row: row, col: col + 1, parent: {row, col}}, distance: distance + 1});
        }

        if (col > 0  && grid[row][col - 1].nodeType !== NodeType.VISITED_NODE) {
            pq.push({node: {row: row, col: col - 1, parent: {row, col}}, distance: distance + 1});
        }
    }

    return visitedNodesInOrder
};

export default dijkstra;
