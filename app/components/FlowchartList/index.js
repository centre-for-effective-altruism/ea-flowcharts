/**
*
* FlowchartList
*
*/

import React from 'react';

import { Link } from 'react-router';

import styles from './styles.css';
import classnames from 'classnames';

import { Row, Col } from 'react-bootstrap';
import { contentfulObjShape } from 'api/contentful';

function FlowchartList(props) {
    let linkClasses = classnames('btn btn-primary', styles.flowchartListButton);
    return (
        <div className={styles.flowchartList}>
            <h3>Start by choosing a flowchart:</h3>
            <Row>
            {props.flowcharts.map((flowchart) => {
                let linkURI = `/${['flowchart', flowchart.sys.id, flowchart.sys.id].join('/')}`;
                return (
                    <Col key={flowchart.sys.id} sm={6}>
                        <h4>{flowchart.fields.title}</h4>
                        <Link className={linkClasses} to={linkURI}>Start this flowchart</Link>
                    </Col>
                );
            })}
            </Row>
        </div>
    );
}
FlowchartList.propTypes = {
    flowcharts: React.PropTypes.arrayOf(React.PropTypes.shape(contentfulObjShape)),
};

export default FlowchartList;
