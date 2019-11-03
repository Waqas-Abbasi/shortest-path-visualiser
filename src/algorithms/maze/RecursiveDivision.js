import {NodeType} from '../../components/Grid';

const recursiveDivision = (grid, rowStart, rowEnd, colStart, colEnd, horizontal, animateMazeArray) => {
    if (horizontal) {
        if (rowEnd - rowStart < 2) {
            return;
        }

        const rowLine = Math.floor(getRandomInt(rowStart, rowEnd) / 2) * 2;
        const colBreak = Math.floor(getRandomInt(colStart, colEnd) / 2) * 2 + 1;

        for (let i = colStart; i <= colEnd; i++) {
            if (i == colBreak || grid[rowLine][i].nodeType === NodeType.START_NODE || grid[rowLine][i].nodeType === NodeType.FINISH_NODE) continue;
            animateMazeArray.push(grid[rowLine][i]);
        }

        recursiveDivision(grid, rowStart, rowLine - 1, colStart, colEnd, !horizontal, animateMazeArray);
        recursiveDivision(grid, rowLine + 1, rowEnd, colStart, colEnd, !horizontal, animateMazeArray);
    } else {
        if (colEnd - colStart < 2) {
            return;
        }
        const colLine = Math.floor(getRandomInt(colStart, colEnd) / 2) * 2;
        const rowBreak = Math.floor(getRandomInt(rowStart, rowEnd) / 2) * 2 + 1;


        for (let i = rowStart; i <= rowEnd; i++) {
            if (i == rowBreak || grid[i][colLine].nodeType === NodeType.START_NODE || grid[i][colLine].nodeType === NodeType.FINISH_NODE) continue;
            animateMazeArray.push(grid[i][colLine]);
        }

        recursiveDivision(grid, rowStart, rowEnd, colStart, colLine - 1, !horizontal, animateMazeArray);
        recursiveDivision(grid, rowStart, rowEnd, colLine + 1, colEnd, !horizontal, animateMazeArray);
    }


};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default recursiveDivision;
