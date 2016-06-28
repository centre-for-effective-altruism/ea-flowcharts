/**
*
* FlowchartStart
*
*/

import React from 'react';

import Markdown from 'components/Markdown';
import { Link } from 'react-router';

import styles from './styles.css';
import { contentfulObjShape } from 'api/contentful';


function FlowchartStart(props) {
    return (
        <div className={styles.flowchartStart}>
            <Markdown className={styles.flowchartStartDescription} markdown={props.node.fields.description} />
            <Link
              className={`btn btn-default ${styles.flowchartStartButton}`}
              to={`/flowchart/${props.currentFlowchart.sys.id}/${props.node.fields.nodeLink.fields.flowchartNode.sys.id}`}
            >
                {props.node.fields.nodeLink.fields.response}
            </Link>
        </div>
    );
}

FlowchartStart.propTypes = {
    currentFlowchart: React.PropTypes.shape(contentfulObjShape),
    node: React.PropTypes.shape(contentfulObjShape),
};

export default FlowchartStart;
