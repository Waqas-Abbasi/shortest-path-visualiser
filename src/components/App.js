import React from 'react';
import '../styles/index.css';
import Sidebar from 'react-sidebar';
import Select from 'react-select';
import Grid from './Grid';
import Tutorial from './Tutorial';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';

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


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            multiGrid: false,
            displaySpeed: 1,
            mazeAlgorithm: null,
            visualiseAlgorithm: false,
            selectedAlgorithm: Algorithms.BFS,
            clearBoard: false,
            clearWalls: false,
            showTutorial: true,
        };

    }

    visualiseAlgorithm = () => {
        this.setState({
            visualiseAlgorithm: true,
        }, () => {
            this.setState({
                visualiseAlgorithm: false,
            });
        });
    };

    updateGrid = (val) => {

        this.setState({
            mazeAlgorithm: null,
        }, () => {
            this.setState({
                mazeAlgorithm: val,
            });
        });
    };


    updateAlgorithm = val => {
        this.setState({
            selectedAlgorithm: val,
        });
    };
    compareAlgorithms = () => {
        this.clearBoard();
        setTimeout(() => {
            this.setState(prevState => ({
                multiGrid: !prevState.multiGrid
            }));
        }, 5);

    };

    updateSpeed = (val) => {
        this.setState({
            displaySpeed: val,
        });
    };

    clearBoard = () => {
        this.setState({
            clearBoard: true,
        }, () => {
            this.setState({
                clearBoard: false,
            });
        });
    };

    clearWalls = () => {
        this.setState({
            clearWalls: true,
        }, () => {
            this.setState({
                clearWalls: false,
            });
        });
    };

    sidebarContent = () => {
        const options = [
            {value: Algorithms.BFS, label: 'Breadth First Search'},
            {value: Algorithms.DFS, label: 'Depth First Search'},
            {value: Algorithms.DIJKSTRA, label: 'Dijkstra\'s Algorithm'},
            {value: Algorithms.ASTAR, label: 'A* Search Algorithm'},
            {value: Algorithms.RANDOM, label: 'Random Search Algorithm'},
        ];

        const speedOptions = [
            {value: 3, label: 'Slow'},
            {value: 1.5, label: 'Medium'},
            {value: 1, label: 'Fast'},
            {value: 0.5, label: 'Very Fast'},
        ];

        const options2 = [
            {value: Maze.RECURSIVE_DIVISION, label: 'Recursive Division'},
            {value: Maze.PRIMS_ALGORITHM, label: 'Prim\'s Algorithm'},
            {value: Maze.ELLERS_ALGORITHM, label: 'Eller\'s Algorithm'},
            {value: Maze.RANDOM, label: 'Random Maze'},

        ];

        const placeholderText = options.find(obj => obj.value === this.state.selectedAlgorithm).label;

        const placeholderTextSpeed = speedOptions.find(obj => obj.value === this.state.displaySpeed).label;

        const customStyles = {
            container: base => ({
                ...base,
                width: '90%',
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

        return (
            <div className={'sidebarContainer'}>
                <h3 className={'sidebarTitle'} style={{textAlign: 'center'}}>Shortest Path Visualiser</h3>
                <div style={{margin: 'auto', width: '90%'}}>
                    <h5>Algorithm</h5>
                </div>
                <Select
                    isSearchable={false}
                    placeholder={placeholderText}
                    value={this.state.selectedAlgorithm}
                    onChange={val => this.updateAlgorithm(val.value)}
                    options={options}
                    styles={customStyles}
                />
                <br/>
                <div style={{margin: 'auto', width: '90%'}}>
                    <h5>Generate Maze</h5>
                </div>
                <Select
                    isSearchable={false}
                    placeholder={'Select Maze Algorithm'}
                    value={null}
                    onChange={val => this.updateGrid(val.value)}
                    options={options2}
                    styles={customStyles}
                />
                <br/>
                <div style={{margin: 'auto', width: '90%'}}>
                    <h5>Speed</h5>
                </div>
                <Select
                    isSearchable={false}
                    placeholder={placeholderTextSpeed}
                    value={this.state.displaySpeed}
                    onChange={val => this.updateSpeed(val.value)}
                    options={speedOptions}
                    styles={customStyles}
                />
                <br/>
                <div className={'buttons'}>
                    <button type='button' onClick={() => this.visualiseAlgorithm()}
                            className={'button'}>Visualise
                    </button>
                    <button type='button' onClick={this.clearWalls} className={'button'}>Clear Walls</button>
                    <button type='button' onClick={() => {
                        this.clearWalls();
                        this.clearBoard();
                    }} className={'button'}>Clear Board
                    </button>
                    <button type='button' onClick={this.compareAlgorithms} className={'button'}>
                        {this.state.multiGrid ? 'Single Maze' : 'Compare Algorithms'}
                    </button>
                </div>
            </div>
        );
    };


    toggleTutorial = () => {
        this.setState(prevState => ({
            showTutorial: !prevState.showTutorial
        }));
    };


    render() {
        return (
            <div>
                <div className={this.state.showTutorial ? 'tutorialView' : 'displayOff'}>
                </div>
                <Sidebar
                    docked={true}
                    sidebar={this.sidebarContent()}
                    sidebarClassName={'sidebar'}>
                    <Tutorial toggleTutorial={this.toggleTutorial} showTutorial={this.state.showTutorial}/>
                    {!this.state.multiGrid ?
                        <Grid
                            multiGrid={false}
                            selectedAlgorithm={this.state.selectedAlgorithm}
                            mazeAlgorithm={this.state.mazeAlgorithm}
                            clearBoard={this.state.clearBoard}
                            clearWalls={this.state.clearWalls}
                            displaySpeed={this.state.displaySpeed}
                            visualiseAlgorithm={this.state.visualiseAlgorithm}/> :
                        <div className={'multiGrid'}>
                            <Grid
                                multiGrid={true}
                                selectedAlgorithm={this.state.selectedAlgorithm}
                                mazeAlgorithm={this.state.mazeAlgorithm}
                                displaySpeed={this.state.displaySpeed}
                                clearBoard={this.state.clearBoard}
                                clearWalls={this.state.clearWalls}
                                visualiseAlgorithm={this.state.visualiseAlgorithm}/>
                            <Grid
                                multiGrid={true}
                                selectedAlgorithm={this.state.selectedAlgorithm}
                                mazeAlgorithm={this.state.mazeAlgorithm}
                                clearBoard={this.state.clearBoard}
                                clearWalls={this.state.clearWalls}
                                displaySpeed={this.state.displaySpeed}
                                visualiseAlgorithm={this.state.visualiseAlgorithm}/>
                        </div>}
                    <div>
                        <p style={{textAlign: 'center'}}>Please keep in mind that the runtime of the visualisation
                            does
                            not reflect the runtime of the algorithm.</p>
                    </div>
                </Sidebar>
            </div>

        );
    }
}

export default App;
