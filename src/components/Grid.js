import React from 'react';
import Node from './Node';
import bfs from '../algorithms/BreadthFirstSearch';
import dfs from '../algorithms/DepthFirstSearch';
import dijkstra from '../algorithms/DijkstrasAlgorithm';
import aStar from '../algorithms/AStarAlgorithm';
import randomSearchAlgorithm from '../algorithms/RandomSearchAlgorithm';
import Select from 'react-select';
import recursiveDivsion from '../algorithms/maze/RecursiveDivision';
import primsAlgorithm from '../algorithms/maze/PrimsAlgorithm';
import ellersAlgorithm from '../algorithms/maze/EllersAlgorithm';

export const NodeType = {
    START_NODE: 'START_NODE',
    FINISH_NODE: 'FINISH_NODE',
    WALL_NODE: 'WALL_NODE',
    VISITED_NODE: 'VISITED_NODE',
    EMPTY_NODE: 'EMPTY_NODE'
};

const Algorithms = {
    BFS: 'Breadth First Search',
    DFS: 'Depth First Search',
    DIJKSTRA: 'Dijkstra\'s Algorithm',
    ASTAR: 'A* Search Algorithm',
    RANDOM: 'Random Search Algorithm',
};

const Maze = {
    RANDOM: 'RANDOM',
    RECURSIVE_DIVISION: 'RECURSIVE_DIVISION',
    PRIMS_ALGORITHM: 'PRIMS_ALGORITHM',
    ELLERS_ALGORITHM: 'ELLERS_ALGORITHM',
};

/*
Grid Component responsible for displaying the grid
 */
class Grid extends React.Component {

    state = {
        gridHeight: 21,
        gridWidth: this.props.multiGrid ? 21 : 39,
        isMouseDown: false,
        grid: [],
        startNode: this.props.multiGrid ? {row: 10, col: 4} : {row: 10, col: 4},
        finishNode: this.props.multiGrid ? {row: 10, col: 16} : {row: 10, col: 34},
        refNodes: [],
        selectedAlgorithm: '',
        error: '',
        isItemBeingDragged: false,
        nodeTypeDragged: '',
        displaySpeed: this.props.displaySpeed,
        performance: 0,
        nodesExplored: 0,
        timeoutArr: [],
        wallList: [],
        gridActive: false,
    };

    //To ensure when there is change in certain props, trigger certain functions
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.mazeAlgorithm !== this.props.mazeAlgorithm) {
            if (this.props.mazeAlgorithm) {
                this.generateMaze(this.props.mazeAlgorithm);
            }
        }

        if (prevProps.selectedAlgorithm !== this.props.selectedAlgorithm) {
            this.setState({
                selectedAlgorithm: '',
            });
        }

        if (prevProps.visualiseAlgorithm !== this.props.visualiseAlgorithm) {
            if (this.props.visualiseAlgorithm) {
                this.visualiseAlgorithm();
            }
        }

        if (prevProps.clearWalls !== this.props.clearWalls) {
            if (this.props.clearWalls) {
                this.clearWalls();
            }
        }

        if (prevProps.clearBoard !== this.props.clearBoard) {
            if (this.props.clearBoard) {
                this.clearBoard();
            }
        }

        if (prevProps.displaySpeed !== this.props.displaySpeed) {
            this.setState({
                displaySpeed: this.props.displaySpeed,
            });
        }
    }

    //Create grid before mounting
    componentWillMount() {
        const grid = [];
        for (let row = 0; row < this.state.gridHeight; row++) {
            const currentRow = [];
            for (let col = 0; col < this.state.gridWidth; col++) {
                const currentCol = {
                    row,
                    col,
                    nodeType: (row === this.state.startNode.row && col === this.state.startNode.col) ? NodeType.START_NODE : (row === this.state.finishNode.row && col === this.state.finishNode.col) ? NodeType.FINISH_NODE : NodeType.EMPTY_NODE
                };
                currentRow.push(currentCol);
            }

            grid.push(currentRow);
        }
        this.setState({grid: [...grid], refNodes: grid.map(row => row.map(() => React.createRef()))});
    }

    //Responsible for animating, recieves array of nodes visited. Animates nodes based on their index in the array
    animate(visitedNodesInOrder) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length - 1) {
                const animatePathTimer = setTimeout(() => {
                    if (visitedNodesInOrder[visitedNodesInOrder.length - 1].row !== this.state.finishNode.row && visitedNodesInOrder[visitedNodesInOrder.length - 1].col !== this.state.finishNode.col) {
                        this.setState({
                            error: 'No Path Found!',
                            gridActive: false,
                        });
                    } else {
                        this.animateShortestPath(visitedNodesInOrder);
                    }

                }, 5 * i * this.state.displaySpeed);

                this.state.timeoutArr.push(animatePathTimer);
                return;
            }

            const timeout = setTimeout(() => {
                const node = visitedNodesInOrder[i];
                this.state.refNodes[node.row][node.col].current.classList.add('node-visited');

            }, 5 * i * this.state.displaySpeed);

            this.state.timeoutArr.push(timeout);
        }

    }

    //Make a call to the path finding algorithm Function and visualising the result
    visualiseAlgorithm = () => {
        this.clearBoard();
        this.setState({
            error: '',
            gridActive: true,
        });

        let visitedNodesInOrder;
        //Variables to keep track of Algorithm runtime.
        let v0, v1;

        const algorithm = this.state.selectedAlgorithm ? this.state.selectedAlgorithm : this.props.selectedAlgorithm;

        //Switch statement to determine which Algorithm is selected
        switch (algorithm) {
            case Algorithms.BFS:
                v0 = performance.now();
                visitedNodesInOrder = bfs(this.state.grid, this.state.startNode);
                v1 = performance.now();
                break;
            case Algorithms.DFS :
                v0 = performance.now();
                visitedNodesInOrder = dfs(this.state.grid, this.state.startNode);
                v1 = performance.now();
                break;
            case Algorithms.DIJKSTRA:
                v0 = performance.now();
                visitedNodesInOrder = dijkstra(this.state.grid, this.state.startNode);
                v1 = performance.now();
                break;
            case Algorithms.ASTAR:
                v0 = performance.now();
                visitedNodesInOrder = aStar(this.state.grid, this.state.startNode, this.state.finishNode);
                v1 = performance.now();
                break;
            case Algorithms.RANDOM:
                v0 = performance.now();
                visitedNodesInOrder = randomSearchAlgorithm(this.state.grid, this.state.startNode);
                v1 = performance.now();
                break;
        }
        //Update metric info
        this.setState({
            performance: v1 - v0,
            nodesVisited: visitedNodesInOrder.length,
        });

        //If path is not found or starting node is obstructed then display error message
        if (visitedNodesInOrder.length == 0
            || (visitedNodesInOrder[visitedNodesInOrder.length - 1].row !== this.state.finishNode.row && visitedNodesInOrder[visitedNodesInOrder.length - 1].col !== this.state.finishNode.col)) {
            this.setState({
                error: 'No Path Found!',
                gridActive: false,
            });
        }

        //Call animate array after calling the path finding algorithms
        this.animate(visitedNodesInOrder);
    };

    //animates the shortest path by backtracing from final node with parent property
    animateShortestPath = (visitedNodesInOrder) => {
        visitedNodesInOrder = visitedNodesInOrder.reverse();
        let node = visitedNodesInOrder[0];

        let shortestPathNodesInOrder = [];

        let parentNode = node.parent;

        while (parentNode.parent !== null) {
            shortestPathNodesInOrder.push(parentNode);
            parentNode = visitedNodesInOrder.find(item => item.row === parentNode.row && item.col === parentNode.col);
            if (!parentNode) {
                break;
            }
            parentNode = parentNode.parent;
        }


        shortestPathNodesInOrder = shortestPathNodesInOrder.reverse();

        for (let j = 1; j < shortestPathNodesInOrder.length; j++) {

            const timeout = setTimeout(() => {
                node = shortestPathNodesInOrder[j];
                this.state.refNodes[node.row][node.col].current.classList.add('node-shortest-path');

                if (j == shortestPathNodesInOrder.length - 1) {
                    this.setState({
                        gridActive: false,
                    });
                }

            }, 20 * j * this.state.displaySpeed);

            this.state.timeoutArr.push(timeout);
        }


    };

    //Generates maze based on selected maze algorithm, makes call to maze generation algorithms
    generateMaze = (val) => {
        this.clearBoard();
        this.clearWalls();
        let animateMazeArray = new Array();

        let grid, counter;
        grid = this.state.grid;

        switch (val) {
            case Maze.RANDOM:
                for (let i = 0; i < grid.length; i++) {
                    for (let j = 0; j < grid[i].length; j++) {
                        if (grid[i][j].nodeType !== NodeType.START_NODE && grid[i][j].nodeType !== NodeType.FINISH_NODE) {
                            if (Math.random() <= 0.30) {
                                animateMazeArray.push(grid[i][j]);
                            }
                        }
                    }
                }
                this.animateMazeOrder(grid, animateMazeArray);
                break;
            case Maze.RECURSIVE_DIVISION:

                for (let i = 0; i < grid.length; i++) {
                    animateMazeArray.push(grid[i][grid[0].length - 1]);
                    animateMazeArray.push(grid[i][0]);
                }

                for (let i = 0; i < grid[0].length; i++) {
                    animateMazeArray.push(grid[0][i]);
                    animateMazeArray.push(grid[grid.length - 1][i]);
                }

                recursiveDivsion(grid, 1, grid.length - 2, 1, grid[0].length - 2, true, animateMazeArray);
                this.animateMazeOrder(grid, animateMazeArray);
                break;
            case Maze.PRIMS_ALGORITHM:
                for (let i = 0; i < grid.length; i++) {
                    for (let j = 0; j < grid[0].length; j++) {
                        if (grid[i][j].nodeType !== NodeType.START_NODE && grid[i][j].nodeType !== NodeType.FINISH_NODE) {
                            grid[i][j].nodeType = NodeType.WALL_NODE;
                            animateMazeArray.push(grid[i][j]);
                        }
                    }
                }

                counter = animateMazeArray.length;

                this.animateMazeOrder(grid, animateMazeArray);

                primsAlgorithm(grid, animateMazeArray);

                this.animateMazeOrderReverse(grid, animateMazeArray, counter);
                break;
            case Maze.ELLERS_ALGORITHM:
                for (let i = 0; i < grid.length; i++) {
                    for (let j = 0; j < grid[0].length; j++) {
                        if (grid[i][j].nodeType !== NodeType.START_NODE && grid[i][j].nodeType !== NodeType.FINISH_NODE) {
                            grid[i][j].nodeType = NodeType.WALL_NODE;
                            grid[i][j].Visited = false;
                            animateMazeArray.push(grid[i][j]);
                        }
                    }
                }

                counter = animateMazeArray.length;

                this.animateMazeOrder(grid, animateMazeArray);

                ellersAlgorithm(grid, animateMazeArray);

                this.animateMazeOrderReverse(grid, animateMazeArray, counter);

                break;
        }

        this.setState({grid: [...grid]});
    };

    //Helper function for rendering and animating maze generation algorithms which have an initial state covered with walls.
    animateMazeOrderReverse = (grid, mazeArray, counter) => {
        this.setState({
            gridActive: true,
        });

        for (let i = counter; i < mazeArray.length; i++) {
            const timeout = setTimeout(() => {

                const row = mazeArray[i].row;
                const col = mazeArray[i].col;

                grid[row][col].nodeType = NodeType.EMPTY_NODE;
                this.state.refNodes[row][col].current.classList.remove('node-wall');

                if (i == mazeArray.length - 1) {
                    this.setState({
                        gridActive: false,
                    });
                }
            }, 20 * i * this.state.displaySpeed);

            this.state.timeoutArr.push(timeout);
        }
    };

    //Helper function to display and animate the walls
    animateMazeOrder = (grid, mazeArray) => {
        this.setState({
            gridActive: true,
        });

        for (let i = 0; i < mazeArray.length; i++) {
            const timeout = setTimeout(() => {

                const row = mazeArray[i].row;
                const col = mazeArray[i].col;

                grid[row][col].nodeType = NodeType.WALL_NODE;
                this.state.refNodes[row][col].current.classList.add('node-wall');

                if (i == mazeArray.length - 1) {
                    this.setState(
                        {
                            gridActive: false,
                        });
                }
            }, 20 * i * this.state.displaySpeed);

            this.state.timeoutArr.push(timeout);
        }
    };

    clearBoard = () => {
        this.setState({
            error: '',
            gridActive: false,
        });
        this.state.timeoutArr.forEach(timer => clearTimeout(timer));
        this.state.timeoutArr = [];

        const grid = this.state.grid;
        for (let i = 0; i < this.state.gridHeight; i++) {
            for (let j = 0; j < this.state.gridWidth; j++) {
                if (grid[i][j].nodeType !== NodeType.START_NODE && grid[i][j].nodeType !== NodeType.FINISH_NODE && grid[i][j].nodeType !== NodeType.WALL_NODE) {
                    grid[i][j].nodeType = NodeType.EMPTY_NODE;
                }
                this.state.refNodes[i][j].current.classList.remove('node-visited');
                this.state.refNodes[i][j].current.classList.remove('node-shortest-path');
            }
        }
        this.setState({
            grid: [...grid],
        });

    };

    clearWalls = () => {
        this.setState({
            error: '',
            gridActive: false,
        });
        const grid = this.state.grid;
        this.state.timeoutArr.forEach(timer => clearTimeout(timer));
        this.state.timeoutArr = [];

        for (let row = 0; row < this.state.gridHeight; row++) {
            for (let col = 0; col < this.state.gridWidth; col++) {
                if (grid[row][col].nodeType === NodeType.WALL_NODE) {
                    grid[row][col].nodeType = NodeType.EMPTY_NODE;
                }
                this.state.refNodes[row][col].current.classList.remove('node-wall');
            }
        }
        this.setState({
            grid: [...grid],
        });
    };

    //Mouse events to detect if the mouse is pressed down and if so create a wall in that area.
    //Mouse events to determine if the start/end node is being moved.

    onMouseLeave = (row, col) => {
        if (this.state.isItemBeingDragged) {
            if (this.state.nodeTypeDragged == NodeType.START_NODE) {
                this.state.refNodes[row][col].current.classList.remove('node-start');
            }

            if (this.state.nodeTypeDragged == NodeType.FINISH_NODE) {
                this.state.refNodes[row][col].current.classList.remove('node-finish');
            }

            const grid = this.state.grid;
            grid[row][col].nodeType = NodeType.EMPTY_NODE;
            this.setState({grid: [...grid]});
        }
    };

    onMouseEnter = (row, col) => {
        if (this.state.gridActive) return;

        if (this.state.isItemBeingDragged) {
            if (this.state.nodeTypeDragged == NodeType.START_NODE) {
                this.state.refNodes[row][col].current.classList.add('node-start');
                const grid = this.state.grid;
                grid[row][col].nodeType = NodeType.START_NODE;
                this.setState({grid: [...grid], startNode: {row, col}});
            }

            if (this.state.nodeTypeDragged == NodeType.FINISH_NODE) {
                this.state.refNodes[row][col].current.classList.add('node-finish');
                const grid = this.state.grid;
                grid[row][col].nodeType = NodeType.FINISH_NODE;
                this.setState({grid: [...grid], finishNode: {row, col}});
            }
        } else {

            if (!this.state.isMouseDown) return;

            if (this.state.grid[row][col].nodeType === NodeType.START_NODE || this.state.grid[row][col].nodeType === NodeType.FINISH_NODE) {
                return;
            }

            if (this.state.refNodes[row][col].current.classList.value.includes('node-wall')) {
                this.state.refNodes[row][col].current.classList.remove('node-wall');
            } else {
                this.state.refNodes[row][col].current.classList.value = this.props.multiGrid ? 'nodeMultiGrid node-wall' : 'node node-wall';
            }

            this.setState({
                grid: [...this.getNewGridWithWallToggled(this.state.grid, row, col)]
            });

        }
    };

    onClick = (row, col, nodeType) => {
        if (this.state.gridActive) return;

        if (nodeType == NodeType.START_NODE || nodeType == NodeType.FINISH_NODE) {
            return;
        } else {
            if (this.state.refNodes[row][col].current.classList.value.includes('node-wall')) {
                this.state.refNodes[row][col].current.classList.remove('node-wall');
            } else {
                this.state.refNodes[row][col].current.classList.value = this.props.multiGrid ? 'nodeMultiGrid node-wall' : 'node node-wall';
            }

            this.setState({
                grid: [...this.getNewGridWithWallToggled(this.state.grid, row, col)]
            });
        }
    };

    onMouseDown = (nodeType) => {
        if (this.state.gridActive) return;
        if (nodeType == NodeType.START_NODE || nodeType == NodeType.FINISH_NODE) {
            this.setState({
                isItemBeingDragged: true,
                nodeTypeDragged: nodeType,
            });
        } else if (nodeType === NodeType.EMPTY_NODE || nodeType === NodeType.VISITED_NODE || nodeType === NodeType.WALL_NODE) {
            this.setState({
                isMouseDown: true
            });
        }
    };

    onMouseUp = (nodeType) => {
        if (this.state.gridActive) return;
        if (nodeType == NodeType.START_NODE || nodeType == NodeType.FINISH_NODE) {
            this.setState({
                isItemBeingDragged: false,
                nodeTypeDragged: nodeType,
            });
        } else {
            this.setState({
                isMouseDown: false
            });
        }
    };

    getNewGridWithWallToggled = (grid, row, col) => {
        const node = grid[row][col];
        grid[row][col] = {
            ...node,
            nodeType: node.nodeType === NodeType.WALL_NODE ? NodeType.EMPTY_NODE : NodeType.WALL_NODE,
        };
        return [...grid];
    };

    updateRef = (ref, row, col) => {
        const refNodes = this.state.refNodes;

        refNodes[row][col] = ref;
        this.setState({
            refNodes,
        });
    };

    //Updates local state after change in selected algorithm prop
    updateLocalAlgorithm = val => {
        this.setState({
            selectedAlgorithm: val,
        });
    };

    render() {
        let selectedAlgorithm = this.state.selectedAlgorithm ? this.state.selectedAlgorithm : '';

        if (selectedAlgorithm === '') {
            switch (this.props.selectedAlgorithm) {
                case Algorithms.BFS:
                    selectedAlgorithm = 'Breadth First Search';
                    break;
                case Algorithms.DFS :
                    selectedAlgorithm = 'Depth First Search';
                    break;
                case Algorithms.DIJKSTRA:
                    selectedAlgorithm = 'Dijkstra\'s Algorithm';
                    break;
                case Algorithms.ASTAR:
                    selectedAlgorithm = 'A* Search Algorithm';
                    break;
                case Algorithms.RANDOM:
                    selectedAlgorithm = 'Random Search Algorithm';
            }


        }

        const options = [
            {value: Algorithms.BFS, label: 'Breadth First Search'},
            {value: Algorithms.DFS, label: 'Depth First Search'},
            {value: Algorithms.DIJKSTRA, label: 'Dijkstra\'s Algorithm'},
            {value: Algorithms.ASTAR, label: 'A* Search Algorithm'},
            {value: Algorithms.RANDOM, label: 'Random Search Algorithm'},
        ];

        const customStyles = {
            container: base => ({
                ...base,
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
            }),
            option: (provided) => ({
                ...provided,
                width: '100%',
            }),
            control: (provided) => ({
                ...provided,
                width: '100%',
                borderRadius: '5px',
            }),
        };

        const placeholderText = selectedAlgorithm;

        return (
            <div className={this.props.multiGrid ? 'multiGridMain' : 'main'}>
                {this.props.multiGrid ? <h3 style={{textAlign: 'center'}}>{selectedAlgorithm}</h3> :
                    <h1>{selectedAlgorithm}</h1>}
                {this.props.multiGrid &&
                <Select
                    isSearchable={false}
                    placeholder={placeholderText}
                    value={this.state.selectedAlgorithm ? this.state.selectedAlgorithm : this.props.selectedAlgorithm}
                    onChange={val => this.updateLocalAlgorithm(val.value)}
                    options={options}
                    styles={customStyles}
                />}
                <div className={'metrics'}>
                    <div className={'performanceContainer'}>
                        {this.state.performance > 0 && <p>Algorithm Runtime: {this.state.performance} ms</p>}
                    </div>
                    <div className={'performanceContainer'}>
                        {this.state.nodesVisited > 0 && <p>Nodes Explored: {this.state.nodesVisited}</p>}
                    </div>
                </div>
                <div className={'grid'}>
                    {this.state.grid.map((row, mainIndex) => {
                        return (
                            <div className={'row'} key={mainIndex}>
                                {row.map((node, index) => {
                                    const {nodeType} = node;
                                    return <Node
                                        key={index}
                                        row={mainIndex}
                                        col={index}
                                        multiGrid={this.props.multiGrid}
                                        onMouseDown={this.onMouseDown}
                                        onMouseUp={this.onMouseUp}
                                        onMouseLeave={this.onMouseLeave}
                                        updateRef={this.updateRef}
                                        onClick={this.onClick}
                                        onMouseEnter={this.onMouseEnter}
                                        nodeType={nodeType}/>;
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className={'errorBox'}>
                    {this.state.error && <p style={{color: 'red'}}>{this.state.error}</p>}
                </div>
            </div>
        );
    }
};


export default Grid;
