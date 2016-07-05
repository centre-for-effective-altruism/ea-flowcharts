/**
*
* NodeLink
*
*/

import React from 'react';
import Markdown from 'react-markdown';
import { Button, Glyphicon } from 'react-bootstrap';

import { contentfulObjShape } from 'api/contentful';

import styles from './styles.css';

function NodeLink(props) {
    const node = props.node;
    return (
        <section
          className={styles.nodeLink} 
          onClick={() => { if (!props.isLastPathwayNode) props.truncatePathwayToStep(node.sys.id,1); }}
        >
            <header className={`${styles.nodeLinkResponseWrapper} clearfix`}>
                <h3
                  className={styles.nodeLinkResponse}
                >
                    {node.fields.declarativeResponse}&hellip;
                </h3>
            </header>
            <Markdown className={styles.nodeLinkResponseExplanation} source={node.fields.responseExplanation} />
            <div className={styles.nodeLinkChangedMindWrapper}>
                <div className={styles.nodeLinkChangedMind}>
                    <h5 className={styles.nodeLinkChangedMindTitle}>
                        <Glyphicon glyph='repeat' className={`${styles.nodeLinkResponseIcon}`} />&nbsp;
                        I changed my mind
                    </h5>
                </div>
            </div>
        </section>
    );
}

NodeLink.propTypes = {
    node: React.PropTypes.shape(contentfulObjShape),
};

export default NodeLink;
