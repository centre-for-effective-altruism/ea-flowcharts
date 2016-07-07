/**
*
* FlowchartPathway
*
*/

import React from 'react';
import Scroll from 'react-scroll';
const Element = Scroll.Element;
const scroller = Scroll.scroller;




import FlowchartStart from 'components/FlowchartStart';
import FlowchartNode from 'components/FlowchartNode';
import FlowchartEndpoint from 'components/FlowchartEndpoint';
import NodeLink from 'components/NodeLink';
import FlowchartLayout from 'components/FlowchartLayout';

import { Row, Col } from 'react-bootstrap';

import styles from './styles.css';
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
            id: item.sys.id,
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

    componentDidUpdate(){
        // Somewhere else, even another file
        const el = this.props.pathway.slice(0,this.props.pathway.length).pop();
        console.log(el)
        try {
            scroller.scrollTo(el, {
              duration: 1200,
              delay: 30,
              smooth: true,
            });
        } catch(e) {
            console.log(e)
            // do nothing
        }
    }

    render() {
        return (
            <div>
                <Row className={styles.flowchartMainRow}>
                    <Col md={6} className={styles.pathwayColumn}>
                        {this.getPathway()}
                    </Col>
                    <Col md={6}  className={styles.flowchartColumn}>
                        <FlowchartLayout
                          currentFlowchart={this.props.currentFlowchart}
                          entries={this.props.entries}
                          pathway={this.props.pathway}
                          truncatePathwayToStep={this.props.truncatePathwayToStep}
                        />
                    </Col>
                </Row>
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
