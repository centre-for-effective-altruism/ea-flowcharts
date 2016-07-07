/**
*
* FlowchartStart
*
*/

import React from 'react';

import Markdown from 'react-markdown';
import { Button } from 'react-bootstrap';
import styles from './styles.css';
import { contentfulObjShape } from 'api/contentful';


function FlowchartStart(props) {
    return (
        <section className={styles.flowchartStart} id={props.id}>
            <Markdown className={styles.flowchartStartDescription} source={props.node.fields.description} />
            {(() => {
                if (props.isLastPathwayNode) {
                    return (
                        <Button
                          className={`btn btn-default ${styles.flowchartStartButton}`}
                          onClick={() => props.addStep(props.node.fields.nodeLink.fields.flowchartNode.sys.id)}
                        >
                            {props.node.fields.nodeLink.fields.response}
                        </Button>
                    );
                }
                return null;
            })()}
        </section>
    );
}

FlowchartStart.propTypes = {
    currentFlowchart: React.PropTypes.string,
    node: React.PropTypes.shape(contentfulObjShape),
    addStep: React.PropTypes.func,
    isLastPathwayNode: React.PropTypes.bool,
};

export default FlowchartStart;
