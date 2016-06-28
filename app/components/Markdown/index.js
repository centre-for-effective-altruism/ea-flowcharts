/**
*
* Markdown
*
*/

import React from 'react';

import markdown from 'markdown-to-jsx';

function Markdown(props) {
    return <div className={props.className}>{markdown(props.markdown)}</div>;
}
Markdown.propTypes = {
    className: React.PropTypes.string,
    markdown: React.PropTypes.string,
};
Markdown.defaultProps = {
    markdown: '',
};

export default Markdown;
