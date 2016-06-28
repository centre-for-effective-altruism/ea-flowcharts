/**
*
* FlowchartNode
*
*/

import React from 'react';
import { Link } from 'react-router';
import Markdown from 'components/Markdown';

import { Row, Col, Glyphicon } from 'react-bootstrap';

import styles from './styles.css';
import itemStyles from '../FlowchartItem/styles.css';
import { contentfulObjShape } from 'api/contentful';


Object.assign(styles, itemStyles);

function FlowchartNode(props) {
    const node = props.node;
    let c = 12 / node.fields.nodeLinks.length;
    c = c >= 3 ? c : 3;
    return (
        <div className={styles.flowchartNode}>
            <div className={styles.flowchartItemTitleWrapper}>
                <h3 className={styles.flowchartItemTitle}>Q: {node.fields.question}</h3>
            </div>
            <Markdown className={styles.flowchartItemExplanation} markdown={node.fields.explanation} />
            <Row>
            {node.fields.nodeLinks.map(nodeLink => (
                <Col key={nodeLink.sys.id} sm={c}>
                    <div className={styles.flowchartItemResponse}>
                        <Link
                          className={styles.flowchartItemResponseButton}
                          to={`/flowchart/${props.currentFlowchart.sys.id}/${nodeLink.fields.flowchartNode.sys.id}`}
                        >
                            <h4 className={styles.flowchartItemResponseTitle}>{nodeLink.fields.response}</h4>
                            <Glyphicon glyph="arrow-down" className={styles.flowchartItemResponseButtonIcon} />
                        </Link>
                        <Markdown className={styles.flowchartItemResponseExplanation} markdown={nodeLink.fields.explanation} />
                    </div>
                </Col>
            ))}
            </Row>

        </div>
    );
}
FlowchartNode.propTypes = {
    currentFlowchart: React.PropTypes.shape(contentfulObjShape),
    node: React.PropTypes.shape(contentfulObjShape),
};

export default FlowchartNode;
