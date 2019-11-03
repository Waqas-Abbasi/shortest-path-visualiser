import {NodeType} from '../components/App';

const dfs = (grid, startNode) => {
    const visitedNodesInOrder = [];
    startNode.parent = null;
    const stack = [startNode];
    while (stack.length > 0) {
        const {row, col, parent} = stack.pop();

        if (grid[row][col].nodeType === NodeType.WALL_NODE) {
            continue;
        }

        if (grid[row][col].nodeType === NodeType.FINISH_NODE) {
            visitedNodesInOrder.push({row, col, parent: parent});
            break;
        }

        if (grid[row][col].nodeType === NodeType.VISITED_NODE) {
            continue;
        }

        if (col < grid[row].length - 1 && grid[row][col + 1].nodeType !== NodeType.VISITED_NODE) {
            stack.push({row, col: col + 1, parent: {row, col}});
        }

        if (col > 0 && grid[row][col - 1].nodeType !== NodeType.VISITED_NODE) {
            stack.push({row, col: col - 1,  parent: {row, col}});
        }

        if (row < grid.length - 1 && grid[row + 1][col].nodeType !== NodeType.VISITED_NODE) {
            stack.push({row: row + 1, col,  parent: {row, col}});
        }

        if (row > 0 && grid[row - 1][col].nodeType !== NodeType.VISITED_NODE) {
            stack.push({row: row - 1, col,  parent: {row, col}});
        }

        if (grid[row][col].nodeType === NodeType.EMPTY_NODE) {
            visitedNodesInOrder.push({row, col, parent: parent});
            grid[row][col].nodeType = NodeType.VISITED_NODE;
        }

    }

    return visitedNodesInOrder;

};

export default dfs;
