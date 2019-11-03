import React, {useState} from 'react';
import {IoIosClose} from 'react-icons/io';


const typeAlgorithms = '../../assets/typeAlgorithms.png';
const mazeAlgorithms = '../../assets/typeMazeAlgorithm.png';
const addCell = '../../assets/addCell.gif';
const speedDropdown = '../../assets/speedDropdown.png';
const compareAlgorithms = '../../assets/compareAlgorithms.png';
const singleMaze = '../../assets/singleMaze.png';

const tutorial = props => {

    const [tutorialID, setTutorialID] = useState(0);
    const [slides] = useState([
        (<div>
            <p>This Visualiser is designed to showcase how different Shortest Path Algorithms find the shortest paths to
                the
                End Destination. </p>
            <p>This Tutorial will guide you through and show you what you can do with this Visualiser!</p>
            <p>This Visualiser currently supports 5 Different Algorithms and the Grid - Maze is stored in a 2D Array
                Data Structure</p>
            <p>Press Next To Learn About These Algorithms!</p>
        </div>),
        (<div>
            <p>The Algorithms can be selected from the Algorithms Dropdown.</p>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <img src={typeAlgorithms} style={{height: '200', width: '200px'}}/>
            </div>
            <br/>
            <p>Press Next To Learn About These Algorithms!</p>
        </div>)
        , (<div>
            <p><b>Breadth First Search: </b>Breadth First Search is an Algorithm for Unweighted Problems which explores
                all the neighbours at a certain depth before moving on to the children of those neighbours. It uses a
                Queue to keep track of the next nodes to visit.</p>
            <p><b>Depth First Search: </b>Depth First Search is an Algorithm for Unweighted Problems which explores a
                branch / path as far as possible before moving on to its neighbour. It uses a Stack to keep track of the
                next nodes to visit.</p>
            <p><b>Dijkstra's Algorithm: </b>Dijkstra's Algorithm is an Algorithm for Weighted Problems, Initially all
                nodes have a distance of Infinity, but as nodes are explored, their cost is updated. The algorithm
                prioritises nodes which are unvisited and have a lower cost to explore, next. In doing so, you find the
                shortest path faster and more efficiently. Dijkstra's Algorithm uses a Priority Queue to keep track of
                the
                nodes to visit. A distance from 1 cell to another is 1.</p>
        </div>)
        , (<div>
            <p><b>A* Search Algorithm: </b>A* Search Algorithm is an Algorithm for Weighted Problems. Unlike other
                algorithms, this algorithm is aware of the position of the destination and so is able to calculate the
                cost (distance to destination) for each cell. Similar to Dijkstra's Algorithm,
                A* Search Algorithm uses a Priority Queue, but uses the distance to the destination node as the cost to
                prioritise.</p>
            <p><b>Random Search Algorithm: </b> This Algorithm is an Unweighted Algorithm. Each neighbour has a 50%
                chance of being chosen to be visited. Additionally to prevent cases where no node is selected, one of
                the 4 neighbours of a node is guaranteed to be chosen.</p>
            <p>Press Next to Learn about Maze Generation!</p>
        </div>)
        , (<div>
            <p>There's many different ways to make this Visualiser more Interesting.</p>
            <p>You can Add Walls by clicking on Cells. The Shortest Path Algorithms cannot pass through these
                walls. </p>

            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <img src={addCell} style={{height: '200', width: '200px'}}/>
            </div>
            <br/>
            <p>Click Next To Learn About Auto Maze Generation!</p>
        </div>),
        (<div>
            <p>The Visualiser also includes various Maze Generation Algorithms to help you get Started!</p>
            <p>You can choose the Maze Generation Algorithms by going to the Generate Maze Dropdown</p>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <img src={mazeAlgorithms} style={{height: '200', width: '200px'}}/>
            </div>
            <br/>
            <p>Click Next To Learn The Maze Algorithms!</p>
        </div>),
        (<div>
            <p><b>Recursive Division: </b>Recursive Division Algorithm is based on Fractal Nature. The Idea is to start
                with a room and divide it into parts and then keep recursively dividing those parts until it can no
                longer divide further.</p>
            <p><b>Prim's Algorithm: </b>Prim's Algorithm is a Minimum Spanning Tree algorithm which if randomized can be
                utilised for
                maze generation. It starts at a random point on the maze and then grows outwards. At every given point,
                the neighbours of every visited node that have not yet been visited are kept track of. The algorithm
                chooses one
                of these neighbours to visit next, randomly. Once a neighbour is chosen and visited, the neighbours
                of the
                visited node are added to the neighbours list. This process happens continuously until no more unvisited
                nodes exist. Essentially, the maze extends in a random direction each iteration</p>
        </div>),
        (
            <div>
                <p><b>Ellers's Algorithm: </b>Eller's Algorithm is an Algorithm that works from a row to row basis.
                    Essentially
                    the nature of Set theory enables this algorithm to produce a complete maze. The Algorithm works on
                    one row at a time. In each iteration, if a cell in the row does not belong to a set, it is assigned
                    a set. After every cell in the row belongs to a set, based on the row size, random adjacent sets are
                    conjoined. After random sets are joined with each other (The smaller set becomes part of the bigger
                    set), at least one point of each set must extend downwards. Extending to cells without a set expands
                    the growing set, after each set is extended downwards
                    from at least one point, the iteration is complete and the process repeats.</p>
                <br/>
                <p>Press Next To Learn More!</p>
            </div>
        ),
        (<div>
            <p>You can also adjust the speed at which the algorithm or the maze generation is visualised. Doing so can
                enable you to see how various algorithms work. Speed can be modified from the Speed Dropdown.</p>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '5px'}}>
                <img src={speedDropdown} style={{height: '180px', width: '200px'}}/>
            </div>
            <p>Additionally, you can press the Clear Walls button to remove the Walls. Doing so keeps the visualised
                algorithm and removes the walls.</p>
            <p>You can also instead press the Clear Board button to remove and clear the board. Doing so removes the
                visuals and removes the walls.</p>
        </div>),
        (<div>
            <p>You can press the Compare Algorithms Button to compare algorithms on two grids. Doing so adds another
                grid.</p>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '5px'}}>
                <img src={compareAlgorithms} style={{height: '250px', width: '100%'}}/>
            </div>
            <p>You can choose the algorithm for each grid from the dropdown above the grid. Additionally, if you choose
                a Path finding Algorithm from the sidebar then both Grids receive that chosen Algorithm.</p>
        </div>),
        (<div>
            <p>You can choose to go back to the Single Larger Maze, by pressing the Single Maze Button. This button will
                appear when you choose to compare algorithms.</p>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '5px'}}>
                <img src={singleMaze} style={{height: '100px', width: '300px'}}/>
            </div>
            <br/>
            <p>These are some of the Keys that might be helpful to know!</p>
            <div className={'keyMap'}>
                <div>
                    <div className={'startSquare'}>
                        <div className={'startSquareImg'}>
                        </div>
                        <p>- Start Square</p>
                    </div>
                    <div className={'endSquare'}>
                        <div className={'endSquareImg'}>
                        </div>
                        <p>- End Square</p>
                    </div>
                </div>
                <div>
                    <div>
                        <div className={'shortestPath'}>
                            <div className={'shortestPathImg'}>
                            </div>
                            <p>- Shortest Path Square</p>
                        </div>
                        <div className={'visitedSquare'}>
                            <div className={'visitedSquareImg'}>
                            </div>
                            <p>- Visited Square</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={'wallSquare'}>
                        <div className={'wallSquareImg'}>
                        </div>
                        <p>- Wall Square</p>
                    </div>
                </div>
            </div>
        </div>),
        (<div>
            <p>Please be aware that the visualisations have been slowed significantly and do not reflect the runtime of
                the Algorithms</p>
            <p>This is the end of this Tutorial. I hope you Enjoy and Have Fun using this tool, I certainly had fun
                creating it!</p>
            <p>The source code for this project can be found on my <a style={{color: 'white'}} target="_blank"
                                                                      href={'https://github.com/Waqas-Abbasi/shortestpathvisualiser'}>Github</a>
            </p>
        </div>)
    ]);

    const skipTutorial = () => {
        props.toggleTutorial();
    };

    const slideChange = val => {
        if (val === 1 && tutorialID < slides.length - 1) {
            setTutorialID(tutorialID + val);
        }

        if (val === -1 && tutorialID > 0) {
            setTutorialID(tutorialID + val);
        }
    };

    return (
        <div className={props.showTutorial ? 'tutorialContainer' : 'displayOff'}>
            <div className={'tutorialHeader'}>
                <h5>Tutorial</h5>
                <div className={'closeMarker'} onClick={skipTutorial}>
                    <IoIosClose size={35}/>
                </div>
            </div>
            <div className={'tutorialBody'}>
                {slides[tutorialID]}
            </div>
            <div className={'tutorialFooter'}>
                <button type='button' onClick={skipTutorial} className={'tutorialButton'}>Skip Tutorial</button>
                <p>{tutorialID + 1}/{slides.length}</p>
                <div>
                    <button type='button' onClick={() => slideChange(-1)}
                            className={'tutorialButton floatRight'}>Previous
                    </button>
                    {tutorialID == slides.length - 1 ?
                        <button type='button' onClick={skipTutorial} className={'tutorialButton floatRight'}>Finish
                        </button>
                        :
                        <button type='button' onClick={() => slideChange(1)}
                                className={'tutorialButton floatRight'}>Next
                        </button>}
                </div>
            </div>
        </div>
    );
};


export default tutorial;
