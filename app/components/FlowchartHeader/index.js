/**
*
* FlowchartHeader
*
*/

import React from 'react';

import FlowchartNavigation from 'components/FlowchartNavigation';
import { Row, Col } from 'react-bootstrap';
import styles from './styles.css';
import { contentfulObjShape } from 'api/contentful';

function FlowchartHeader(props) {
    return (
        <div className={styles.flowchartHeader}>
            <Row>
                <Col sm={6}>
                    <h2>
                        {((embed) => {
                            if (!embed) {
                                return (
                                    <small>Current flowchart:</small>
                                );
                            }
                            return false;
                        })(props.embed)}
                        <br />
                        {props.currentFlowchart.fields.title}
                    </h2>
                </Col>
                <Col sm={6} className={styles.flowchartHeaderNavigation}>
                    <FlowchartNavigation {...props} />
                </Col>
            </Row>
        </div>
    );
}

FlowchartHeader.propTypes = {
    currentFlowchart: React.PropTypes.shape(contentfulObjShape),
    embed: React.PropTypes.bool,
};

export default FlowchartHeader;
