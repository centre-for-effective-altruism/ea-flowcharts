/**
*
* FlowchartItem
*
*/

import React from 'react';

import FlowchartHeader from 'components/FlowchartHeader';
import FlowchartStart from 'components/FlowchartStart';
import FlowchartNode from 'components/FlowchartNode';
import FlowchartEndpoint from 'components/FlowchartEndpoint';
import { contentfulObjShape } from 'api/contentful';

// import styles from './styles.css';

export class FlowchartItem extends React.Component {
    constructor(props) {
        super(props);
        this.getItem = this.getItem.bind(this);
        this.getItem = this.getItem.bind(this);
    }

    getItem() {
        const itemProps = {
            currentFlowchart: this.props.currentFlowchart,
            node: this.props.currentNode,
        };
        switch (this.props.currentNode.sys.contentType.sys.id) {
        case 'flowchart':
            return <FlowchartStart {...itemProps} />;
        case 'flowchartNode':
            return <FlowchartNode {...itemProps} />;
        case 'flowchartEndpoint':
            return <FlowchartEndpoint {...itemProps} />;
        default:
            return false;
        }
    }
    render() {
        return (
            <div>
                <FlowchartHeader currentFlowchart={this.props.currentFlowchart} />
                {this.getItem()}
            </div>
        );
    }
}

FlowchartItem.propTypes = {
    currentFlowchart: React.PropTypes.shape(contentfulObjShape),
    currentNode: React.PropTypes.shape(contentfulObjShape),
};

export default FlowchartItem;
