/**
*
* FlowchartNavigation
*
*/

import React from 'react';
import { Link } from 'react-router';
import { Button, ButtonToolbar, ButtonGroup, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';
import styles from './styles.css';
import { contentfulObjShape } from 'api/contentful';

function FlowchartNavigation(props) {
    let tooltipPlacement = 'bottom';
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
                        <Button onClick={() => props.clearPathway()} className="btn btn-default">
                            <Glyphicon glyph="fast-backward" />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement={tooltipPlacement} overlay={tooltip('Previous step')}>
                        <Button onClick={() => props.truncatePathwayToStep()} className="btn btn-default">
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
    truncatePathwayToStep: React.PropTypes.func,
};

export default FlowchartNavigation;
