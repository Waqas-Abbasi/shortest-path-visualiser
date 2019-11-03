import PriorityQueue from '../data-structures/PriorityQueue';
import {NodeType} from '../components/App';

const dijkstra = (grid, startNode) => {
    const n = grid.length;
    const m = grid[0].length;

    const visitedNodesInOrder = [];
    const pq = new PriorityQueue((a, b) => a.distance < b.distance);

    startNode.parent = null;
    //Store in an object {node: {row, col, parent}, distance: x}
    pq.push({node: startNode, distance: 0});

    while(!pq.isEmpty()){
        const {node, distance} = pq.pop();

        const row = node.row;
        const col = node.col;
        const parent = node.parent;

        if(grid[row][col].nodeType == NodeType.VISITED_NODE){
            continue;
        }
        if (grid[row][col].nodeType === NodeType.FINISH_NODE) {
            visitedNodesInOrder.push({row, col, parent});
            break;
        }

        if (grid[row][col].nodeType === NodeType.WALL_NODE) {
            continue;
        }

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

        if (grid[row][col].nodeType === NodeType.EMPTY_NODE) {
            visitedNodesInOrder.push({row, col, parent: parent});
            grid[row][col].nodeType = NodeType.VISITED_NODE;
        }

    }

    return visitedNodesInOrder
};

export default dijkstra;
