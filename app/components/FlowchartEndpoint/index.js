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
        <section className={styles.flowchartEndpoint} id={props.id}>
            <div className={styles.flowchartItemTitleWrapper}>
                <h3 className={styles.flowchartItemTitle}>
                    <small>You should consider working on:</small><br />
                    {props.node.fields.title}
                </h3>
            </div>
            <div className={styles.flowchartItemExplanation}>
                <Markdown source={props.node.fields.explanation} />
                {(() => {
                    if (typeof props.node.fields.nextSteps === 'string' && props.node.fields.nextSteps.length>0){
                        return (
                            <div>
                                <hr />
                                <h4>Want to take action on {props.node.fields.title}?</h4>
                                <Markdown source={props.node.fields.nextSteps} />
                            </div>
                        );
                    }
                })()}
            </div>
        </section>
    );
}

FlowchartEndpoint.propTypes = {
    node: React.PropTypes.shape(contentfulObjShape),
};

export default FlowchartEndpoint;
