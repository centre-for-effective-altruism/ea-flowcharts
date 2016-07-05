/**
*
* FlowchartPathway
*
*/

import React from 'react';

import FlowchartStart from 'components/FlowchartStart';
import FlowchartNode from 'components/FlowchartNode';
import FlowchartEndpoint from 'components/FlowchartEndpoint';
import NodeLink from 'components/NodeLink';
import { contentfulObjShape } from 'api/contentful';

// import styles from './styles.css';

export class FlowchartPathway extends React.Component {
    constructor(props) {
        super(props);

        this.getStep = this.getStep.bind(this);
        this.getPathway = this.getPathway.bind(this);
    }

    getStep(item) {
        const itemProps = {
            currentFlowchart: this.props.currentFlowchart,
            node: item,
            addStep: this.props.addStep,
            truncatePathwayToStep: this.props.truncatePathwayToStep,
            isLastPathwayNode: item.sys.id === this.props.pathway[this.props.pathway.length - 1],
        };

        switch (item.sys.contentType.sys.id) {
        case 'flowchart':
            return <FlowchartStart key={item.sys.id} {...itemProps} />;
        case 'flowchartNode':
            return <FlowchartNode key={item.sys.id} {...itemProps} />;
        case 'flowchartEndpoint':
            return <FlowchartEndpoint key={item.sys.id} {...itemProps} />;
        case 'nodeLink':
            return <NodeLink key={item.sys.id} {...itemProps} />;
        default:
            return <p>Unknown content type</p>;
        }
    }

    getPathway() {
        const getStep = this.getStep;
        const props = this.props;
        return this.props.pathway.map((step, index) => getStep(props.entries[step], index));
    }

    render() {
        return (
            <div>
                {this.getPathway()}
            </div>
        );
    }
}

FlowchartPathway.propTypes = {
    currentFlowchart: React.PropTypes.string.isRequired,
    pathway: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    entries: React.PropTypes.objectOf(React.PropTypes.shape(contentfulObjShape)).isRequired,
    addStep: React.PropTypes.func.isRequired,
    truncatePathwayToStep: React.PropTypes.func.isRequired,
};

export default FlowchartPathway;
