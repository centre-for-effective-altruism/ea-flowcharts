/*
 *
 * FlowchartMap
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import ReactFauxDOM from 'react-faux-dom';
import Snap from 'imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js';


export class FlowchartMap extends React.Component { // eslint-disable-line react/prefer-stateless-function
    
    static propTypes = {
        children: React.PropTypes.node,
    };

    constructor(props) {
        super(props);
        this.draw = this.draw.bind(this);
    }

    componentDidMount() {
        this.draw();
    }

    // componentDidUpdate() {
    //     this.draw();
    // }

    // componentWillReceiveProps() {
    //     this.draw();
    // }

    draw() {
        const paper = Snap(this.wrapper);

        const circle = paper.circle(150,150,100);
        circle.attr({
            fill: '#0F0'
        });
        const path = paper.path('M150,150l300,300');
        path.attr({
            strokeWidth: 2,
            stroke: "#333"
        });
        
        // this.wrapper.appendChild(paper);
    }

    render() {
        return (
            <svg className={styles.flowchartMap} ref={(ref) => this.wrapper = ref}></svg>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapDispatchToProps)(FlowchartMap);
