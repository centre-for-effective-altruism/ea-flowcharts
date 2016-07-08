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
import { Button, Glyphicon } from 'react-bootstrap';
import { contentfulObjShape } from 'api/contentful';

function FlowchartEndpoint(props) {
    const image = props.node.fields.image;
    return (
        <section className={styles.flowchartEndpoint} id={props.id}>
            <div className={styles.flowchartItemTitleWrapper}>
                <h3 className={styles.flowchartItemTitle}>
                    <small>You should consider working on:</small><br />
                    {props.node.fields.title}
                </h3>
            </div>
            <div>
            {(() => {
                if(image){
                    return <img className={ `img-responsive ${styles.flowchartEndpointImage}`} src={`https://${image.fields.file.url}`} />
                } 
            })()}
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
            <div className={styles.giveFeedback}>
                <p>Thanks for using the Flowchart. The app is still in beta, and we'd love to get your feedback on it.</p>
                <Button onClick={() => props.setShowFeedbackModal(true)} className="btn btn-success" bsSize="lg">
                    Give Feedback&nbsp;
                    <Glyphicon glyph='bullhorn' />
                </Button>
            </div>
        </section>
    );
}

FlowchartEndpoint.propTypes = {
    node: React.PropTypes.shape(contentfulObjShape),
    setShowFeedbackModal: React.PropTypes.func,
};

export default FlowchartEndpoint;
