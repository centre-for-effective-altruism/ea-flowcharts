/**
*
* FlowchartNode
*
*/

import React from 'react';
import Markdown from 'react-markdown';

import { Row, Col, Glyphicon, Button } from 'react-bootstrap';

import styles from './styles.css';
import itemStyles from '../FlowchartPathway/styles.css';
Object.assign(styles, itemStyles);

import { contentfulObjShape } from 'api/contentful';

function FlowchartNode(props) {
    const node = props.node;
    let c = 12 / node.fields.nodeLinks.length;
    c = c >= 3 ? c : 3;
    const classes = [props.isLastPathwayNode ? styles.flowchartItemCurrentNode : styles.flowchartItemPreviousNode].join(' ');
    return (
        <section className={classes} id={props.id}>
            {(() => {
                if (props.isLastPathwayNode) {
                    return (
                        <div>
                            <div className={styles.flowchartItemTitleWrapper}>
                                <h3 className={styles.flowchartItemTitle}>Q: {node.fields.question}</h3>
                            </div>
                            <div>
                                <Markdown className={styles.flowchartItemExplanation} source={node.fields.explanation || ''} />
                                <Row>
                                {node.fields.nodeLinks.map(nodeLink => (
                                    <Col key={nodeLink.sys.id} sm={c}>
                                        <div className={styles.flowchartItemResponse}>
                                            <Button
                                              className={styles.flowchartItemResponseButton}
                                              onClick={() => props.addStep(nodeLink.sys.id)}
                                            >
                                                <h4 className={styles.flowchartItemResponseTitle}>{nodeLink.fields.response}</h4>
                                                <Glyphicon glyph="arrow-down" className={styles.flowchartItemResponseButtonIcon} />
                                            </Button>
                                            <Markdown className={styles.flowchartItemResponseExplanation} source={nodeLink.fields.explanation} />
                                        </div>
                                    </Col>
                                ))}
                                </Row>
                            </div>
                        </div>
                    );
                }
                return null;
            })()}
        </section>
    );
}
FlowchartNode.propTypes = {
    node: React.PropTypes.shape(contentfulObjShape),
    isLastPathwayNode: React.PropTypes.bool,
    addStep: React.PropTypes.func,
};

export default FlowchartNode;
