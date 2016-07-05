/**
*
* FlowchartEndpoint
*
*/

import React from 'react';

import styles from './styles.css';
import itemStyles from '../FlowchartPathway/styles.css';
Object.assign(styles, itemStyles);
import Markdown from 'react-markdown';
import { contentfulObjShape } from 'api/contentful';

function FlowchartEndpoint(props) {
    return (
        <div className={styles.flowchartEndpoint}>
            <div className={styles.flowchartItemTitleWrapper}>
                <h3 className={styles.flowchartItemTitle}>
                    <small>You should consider working on:</small><br />
                    {props.node.fields.title}
                </h3>
            </div>
            <Markdown className={styles.flowchartItemExplanation} source={props.node.fields.explanation} />
        </div>
    );
}

FlowchartEndpoint.propTypes = {
    node: React.PropTypes.shape(contentfulObjShape),
};

export default FlowchartEndpoint;
