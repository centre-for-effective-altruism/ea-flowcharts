/**
*
* FlowchartNavigation
*
*/

import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Button, ButtonToolbar, ButtonGroup, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import styles from './styles.css';
import { contentfulObjShape } from 'api/contentful';

function FlowchartNavigation(props) {
    let tooltipPlacement = 'bottom';
    function back() {
        browserHistory.goBack();
    }
    function tooltip(message) {
        return <Tooltip id="tooltip">{message}</Tooltip>;
    }
    return (
        <div className={styles.flowchartNavigation}>
            <ButtonToolbar className={styles.flowchartNavigationToolbar}>
                <OverlayTrigger placement={tooltipPlacement} overlay={tooltip('View all flowcharts')}>
                    <Link to="/flowchart" className={`btn btn-default ${styles.flowchartNavigationHomeButton}`}>
                        <Glyphicon glyph="home" />
                    </Link>
                </OverlayTrigger>
                <ButtonGroup>
                    <OverlayTrigger placement={tooltipPlacement} overlay={tooltip('Start over')}>
                        <Link to={`/flowchart/${props.currentFlowchart.sys.id}`} className="btn btn-default">
                            <Glyphicon glyph="fast-backward" />
                        </Link>
                    </OverlayTrigger>
                    <OverlayTrigger placement={tooltipPlacement} overlay={tooltip('Previous step')}>
                        <Button onClick={back} className="btn btn-default">
                            <Glyphicon glyph="step-backward" />
                        </Button>
                    </OverlayTrigger>
                </ButtonGroup>
            </ButtonToolbar>
        </div>
    );
}

FlowchartNavigation.propTypes = {
    currentFlowchart: React.PropTypes.shape(contentfulObjShape),
};

export default FlowchartNavigation;
