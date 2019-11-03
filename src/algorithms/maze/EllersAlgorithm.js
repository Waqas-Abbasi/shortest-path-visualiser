import {NodeType} from '../../components/App';

const ellersAlgorithm = (grid, visitedNodesInOrder) => {

    const n = grid.length;
    const m = grid[0].length;

    const setMap = {};
    let setNumber = 0;
    const setList = new Array(n).fill(null).map(() => new Array(m).fill(null));

    for (let i = 0; i < n; i += 2) {

        //Initalise and assign each cell to a set if they don't already have one
        for (let j = 0; j < m; j += 2) {
            if (!setList[i][j]) {
                setList[i][j] = setNumber;

                setMap[setNumber] = [grid[i][j]];

                if (grid[i][j].nodeType !== NodeType.START_NODE && grid[i][j].nodeType !== NodeType.FINISH_NODE) {
                    grid[i][j].nodeType = NodeType.EMPTY_NODE;
                    visitedNodesInOrder.push(grid[i][j]);
                }

                setNumber++;
            }
        }

        //Number of cells to join
        let adjacentCellsJoin = Math.floor(m / 4);

        //Randomly Join adjacent cells
        const randomJoinList = [];

        for (let j = 0; j < adjacentCellsJoin; j++) {
            let randomJoinIndex = getRandomInt(0, m);
            if (randomJoinIndex % 2 !== 0) {
                randomJoinIndex = Math.floor(randomJoinIndex / 2);
                randomJoinIndex = randomJoinIndex % 2 === 0 ? randomJoinIndex : randomJoinIndex + 1;
            }

            if (grid[i][randomJoinIndex].Visited) {
                adjacentCellsJoin++;
                continue;
            }

            if (randomJoinList.includes(randomJoinIndex)) {
                adjacentCellsJoin++;
                continue;
            } else {
                randomJoinList.push(randomJoinIndex);
            }


            const leftJoin = Math.random();

            //50% chance to merge with adjacent left or adjacent right
            if (leftJoin <= 0.5) {
                if (randomJoinIndex - 2 >= 0) {
                    const set1 = setList[i][randomJoinIndex];
                    const set2 = setList[i][randomJoinIndex - 2];

                    if (setMap[set1].length > setMap[set2].length) {
                        setList[i][randomJoinIndex - 2] = set1;
                        setMap[set1].push(grid[i][randomJoinIndex - 2]);

                        setMap[set2] = setMap[set2].filter(item => item.row !== i && item.col !== randomJoinIndex - 2);

                    } else if (setMap[set1].length < setMap[set2].length) {
                        setList[i][randomJoinIndex] = set2;
                        setMap[set2].push(grid[i][randomJoinIndex]);

                        setMap[set1] = setMap[set1].filter(item => item.row !== i && item.col !== randomJoinIndex);
                    } else {
                        if (Math.random() <= 0.5) {
                            setList[i][randomJoinIndex - 2] = set1;
                            setMap[set1].push(grid[i][randomJoinIndex - 2]);

                            setMap[set2] = setMap[set2].filter(item => item.row !== i && item.col !== randomJoinIndex - 2);
                        } else {
                            setList[i][randomJoinIndex] = set2;
                            setMap[set2].push(grid[i][randomJoinIndex]);

                            setMap[set1] = setMap[set1].filter(item => item.row !== i && item.col !== randomJoinIndex);
                        }
                    }

                    if (grid[i][randomJoinIndex - 1].nodeType !== NodeType.START_NODE && grid[i][randomJoinIndex - 1].nodeType !== NodeType.FINISH_NODE) {
                        grid[i][randomJoinIndex - 1].nodeType = NodeType.EMPTY_NODE;
                        visitedNodesInOrder.push(grid[i][randomJoinIndex - 1]);
                    }
                    grid[i][randomJoinIndex - 2].Visited = true;
                } else {
                    const set1 = setList[i][randomJoinIndex];
                    const set2 = setList[i][randomJoinIndex + 2];

                    if (setMap[set1].length > setMap[set2].length) {
                        setList[i][randomJoinIndex + 2] = set1;
                        setMap[set1].push(grid[i][randomJoinIndex + 2]);

                        setMap[set2] = setMap[set2].filter(item => item.row !== i && item.col !== randomJoinIndex + 2);
                    } else if (setMap[set1].length < setMap[set2].length) {
                        setList[i][randomJoinIndex] = set2;
                        setMap[set2].push(grid[i][randomJoinIndex]);

                        setMap[set1] = setMap[set1].filter(item => item.row !== i && item.col !== randomJoinIndex);
                    } else {
                        if (Math.random() <= 0.5) {
                            setList[i][randomJoinIndex + 2] = set1;
                            setMap[set1].push(grid[i][randomJoinIndex + 2]);

                            setMap[set2] = setMap[set2].filter(item => item.row !== i && item.col !== randomJoinIndex + 2);
                        } else {
                            setList[i][randomJoinIndex] = set2;
                            setMap[set2].push(grid[i][randomJoinIndex]);

                            setMap[set1] = setMap[set1].filter(item => item.row !== i && item.col !== randomJoinIndex);
                        }
                    }

                    if (grid[i][randomJoinIndex + 1].nodeType !== NodeType.START_NODE && grid[i][randomJoinIndex + 1].nodeType !== NodeType.FINISH_NODE) {
                        grid[i][randomJoinIndex + 1].nodeType = NodeType.EMPTY_NODE;
                        visitedNodesInOrder.push(grid[i][randomJoinIndex + 1]);
                    }
                    grid[i][randomJoinIndex + 2].Visited = true;
                }

            } else {
                if (randomJoinIndex + 2 < n) {
                    const set1 = setList[i][randomJoinIndex];
                    const set2 = setList[i][randomJoinIndex + 2];

                    if (setMap[set1].length > setMap[set2].length) {
                        setList[i][randomJoinIndex + 2] = set1;
                        setMap[set1].push(grid[i][randomJoinIndex + 2]);

                        setMap[set2] = setMap[set2].filter(item => item.row !== i && item.col !== randomJoinIndex + 2);
                    } else if (setMap[set1].length < setMap[set2].length) {
                        setList[i][randomJoinIndex] = set2;
                        setMap[set2].push(grid[i][randomJoinIndex]);

                        setMap[set1] = setMap[set1].filter(item => item.row !== i && item.col !== randomJoinIndex);
                    } else {
                        if (Math.random() <= 0.5) {
                            setList[i][randomJoinIndex + 2] = set1;
                            setMap[set1].push(grid[i][randomJoinIndex + 2]);

                            setMap[set2] = setMap[set2].filter(item => item.row !== i && item.col !== randomJoinIndex + 2);
                        } else {
                            setList[i][randomJoinIndex] = set2;
                            setMap[set2].push(grid[i][randomJoinIndex]);

                            setMap[set1] = setMap[set1].filter(item => item.row !== i && item.col !== randomJoinIndex);
                        }
                    }

                    if (grid[i][randomJoinIndex + 1].nodeType !== NodeType.START_NODE && grid[i][randomJoinIndex + 1].nodeType !== NodeType.FINISH_NODE) {
                        grid[i][randomJoinIndex + 1].nodeType = NodeType.EMPTY_NODE;
                        visitedNodesInOrder.push(grid[i][randomJoinIndex + 1]);
                    }
                    grid[i][randomJoinIndex + 2].Visited = true;
                } else {
                    const set1 = setList[i][randomJoinIndex];
                    const set2 = setList[i][randomJoinIndex - 2];

                    if (setMap[set1].length > setMap[set2].length) {
                        setList[i][randomJoinIndex - 2] = set1;
                        setMap[set1].push(grid[i][randomJoinIndex - 2]);

                        setMap[set2] = setMap[set2].filter(item => item.row !== i && item.col !== randomJoinIndex - 2);

                    } else if (setMap[set1].length < setMap[set2].length) {
                        setList[i][randomJoinIndex] = set2;
                        setMap[set2].push(grid[i][randomJoinIndex]);

                        setMap[set1] = setMap[set1].filter(item => item.row !== i && item.col !== randomJoinIndex);
                    } else {
                        if (Math.random() <= 0.5) {
                            setList[i][randomJoinIndex - 2] = set1;
                            setMap[set1].push(grid[i][randomJoinIndex - 2]);

                            setMap[set2] = setMap[set2].filter(item => item.row !== i && item.col !== randomJoinIndex - 2);
                        } else {
                            setList[i][randomJoinIndex] = set2;
                            setMap[set2].push(grid[i][randomJoinIndex]);

                            setMap[set1] = setMap[set1].filter(item => item.row !== i && item.col !== randomJoinIndex);
                        }
                    }

                    if (grid[i][randomJoinIndex - 1].nodeType !== NodeType.START_NODE && grid[i][randomJoinIndex - 1].nodeType !== NodeType.FINISH_NODE) {
                        grid[i][randomJoinIndex - 1].nodeType = NodeType.EMPTY_NODE;
                        visitedNodesInOrder.push(grid[i][randomJoinIndex - 1]);
                    }
                    grid[i][randomJoinIndex - 2].Visited = true;
                }
            }
        }


        if (i + 2 < n) {
            for (let j = 0; j < setNumber; j++) {
                if (setMap[j].length > 0) {
                    let randomVerticalIndex = getRandomInt(setMap[j][0].col, setMap[j][setMap[j].length - 1].col);

                    if (randomVerticalIndex % 2 !== 0) {
                        if (Math.random() <= 0.5) {
                            if (setList[i][randomVerticalIndex - 1] === j) {
                                randomVerticalIndex = randomVerticalIndex - 1;
                            } else {
                                randomVerticalIndex = randomVerticalIndex + 1;
                            }
                        } else {
                            if (setList[i][randomVerticalIndex + 1] === j) {
                                randomVerticalIndex = randomVerticalIndex + 1;
                            } else {
                                randomVerticalIndex = randomVerticalIndex - 1;
                            }
                        }

                    }

                    if (grid[i + 1][randomVerticalIndex].nodeType !== NodeType.START_NODE && grid[i + 1][randomVerticalIndex].nodeType !== NodeType.FINISH_NODE) {
                        setList[i + 1][randomVerticalIndex] = j;
                        grid[i + 1][randomVerticalIndex].nodeType = NodeType.EMPTY_NODE;
                        visitedNodesInOrder.push(grid[i + 1][randomVerticalIndex]);
                    }
                    if (grid[i + 2][randomVerticalIndex].nodeType !== NodeType.START_NODE && grid[i + 2][randomVerticalIndex].nodeType !== NodeType.FINISH_NODE) {
                        setList[i + 2][randomVerticalIndex] = j;
                        grid[i + 2][randomVerticalIndex].nodeType = NodeType.EMPTY_NODE;
                        visitedNodesInOrder.push(grid[i + 2][randomVerticalIndex]);
                    }


                }
            }
        }
        if (i === n - 1) {
            if(Math.random() <= 0.33){
                for (let j = 0; j < m; j++) {
                    if (grid[i][j].nodeType !== NodeType.START_NODE && grid[i][j].nodeType !== NodeType.FINISH_NODE) {
                        grid[i][j].nodeType = NodeType.EMPTY_NODE;
                        visitedNodesInOrder.push(grid[i][j]);
                    }
                }
            }
            else if(Math.random() <= 0.66){
                for (let j = 0; j < m; j++) {
                    if (grid[0][j].nodeType !== NodeType.START_NODE && grid[i][j].nodeType !== NodeType.FINISH_NODE) {
                        grid[0][j].nodeType = NodeType.EMPTY_NODE;
                        visitedNodesInOrder.push(grid[0][j]);
                    }
                }
            }else{
                for (let j = 0; j < Math.floor(m / 2); j++) {
                    if (grid[i][j].nodeType !== NodeType.START_NODE && grid[i][j].nodeType !== NodeType.FINISH_NODE) {
                        grid[i][j].nodeType = NodeType.EMPTY_NODE;
                        visitedNodesInOrder.push(grid[i][j]);
                    }
                }
                for (let j = Math.floor(m / 2); j < m; j++) {
                    if (grid[0][j].nodeType !== NodeType.START_NODE && grid[i][j].nodeType !== NodeType.FINISH_NODE) {
                        grid[0][j].nodeType = NodeType.EMPTY_NODE;
                        visitedNodesInOrder.push(grid[0][j]);
                    }
                }
            }


        }
    }
};


const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


export default ellersAlgorithm;


