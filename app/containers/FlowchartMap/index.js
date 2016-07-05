/*
 *
 * FlowchartMap
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import ReactFauxDOM from 'react-faux-dom';
// var Snap = require('snapsvg');



export class FlowchartMap extends React.Component { // eslint-disable-line react/prefer-stateless-function
    
    static propTypes = {
        children: React.PropTypes.node,
    };



    getContent(){
        // return <p>Hi there</p>;
        // Create your element.
        var el = ReactFauxDOM.createElement('div')

        // Change stuff using actual DOM functions.
        // Even perform CSS selections.
        el.style.setProperty('background-color', 'red')
        el.style.setProperty('height', '400px')
        el.setAttribute('class', 'box')

        // Render it to React elements.
        return el.toReact()
    }

    render() {
        return (
            <div className={styles.flowchartMap}>
                {this.getContent()}
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapDispatchToProps)(FlowchartMap);
