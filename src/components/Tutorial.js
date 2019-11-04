import React, {useState} from 'react';
import {IoIosClose} from 'react-icons/io';

const typeAlgorithms = require('../assets/typeAlgorithms.png');
const mazeAlgorithms = require('../assets/typeMazeAlgorithm.png');
const addCell = require('../assets/addCell.gif');
const speedDropdown = require('../assets/speedDropdown.png');
const compareAlgorithms = require('../assets/compareAlgorithms.png');
const singleMaze = require('../assets/singleMaze.png');
const startNodeMove = require('../assets/moveStartNode.gif');

/*
Tutorial component for Tutorial Modal
 */
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
            <p>Press Next To Learn About Maze Generation!</p>
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
            <p>You can learn more about these algorithms on my <a style={{color: 'white'}} target="_blank"
                                                                  href={'https://github.com/Waqas-Abbasi/shortestpathvisualiser'}>Github</a>
            </p>
        </div>),
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
            <p>You can also choose to move the Starting Position and/or the End Destination.</p>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '5px'}}>
                <img src={startNodeMove} style={{height: '170px', width: '300px'}}/>
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
