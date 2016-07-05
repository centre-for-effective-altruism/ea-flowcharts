/**
*
* NodeLink
*
*/

import React from 'react';
import Markdown from 'react-markdown';

import { contentfulObjShape } from 'api/contentful';

import styles from './styles.css';

function NodeLink(props) {
    const node = props.node;
    return (
        <section className={styles.nodeLink}>
            <header className={styles.nodeLinkResponseWrapper}>
                <h3 className={styles.nodeLinkResponse}>
                    A. {node.fields.response}
                </h3>
            </header>
            <Markdown className={styles.nodeLinkResponseExplanation} source={node.fields.responseExplanation} />
        </section>
    );
}

NodeLink.propTypes = {
    node: React.PropTypes.shape(contentfulObjShape),
};

export default NodeLink;
