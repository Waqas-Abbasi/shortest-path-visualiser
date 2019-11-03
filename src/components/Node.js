import React from 'react';
import {NodeType} from './App';


class Node extends React.Component {

    constructor(props) {
        super(props);

        this.nodeRef = React.createRef();
        this.props.updateRef(this.nodeRef, this.props.row, this.props.col);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.nodeType === NodeType.START_NODE || this.props.nodeType === NodeType.FINISH_NODE) {
            return false;
        }
        if (this.props.nodeType !== nextProps.nodeType) {
            return true;
        } else {
            return false;
        }
        return true;
    }

    render() {
        const {
            col,
            row,
            nodeType
        } = this.props;

        let className = '';

        switch (nodeType) {
            case NodeType.START_NODE:
                className = 'node-start';
                break;
            case NodeType.FINISH_NODE:
                className = 'node-finish';
                break;
            default:
                className = '';
                break;
        }

        return <div
            ref={this.nodeRef}
            onMouseUp={() => this.props.onMouseUp(nodeType)}
            onMouseDown={() => this.props.onMouseDown(nodeType)}
            onMouseLeave={() => this.props.onMouseLeave(row, col)}
            onMouseEnter={() => this.props.onMouseEnter(row, col)}
            onClick={() => this.props.onClick(row, col, nodeType)}
            id={`node-${row}-${col}`}
            className={this.props.multiGrid ? `nodeMultiGrid ${className}` : `node ${className}`}>
        </div>
    }

}

export default Node;
