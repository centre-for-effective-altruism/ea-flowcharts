/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Header from 'components/Header';
import { Grid } from 'react-bootstrap';
import styles from './styles.css';


export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

    static propTypes = {
        children: React.PropTypes.node,
        routes: React.PropTypes.array,
    };

    constructor(props) {
        super(props);
        this.embed = props.routes[props.routes.length-1].name === 'embedFlowchart';
    }

    render() {
        return (
            <div>
                {((embed) => {
                    if (!embed) {
                        return <Header />;
                    }
                    return false;
                })(this.embed)}
                <Grid>
                    <div className={styles.mainContent}>
                        {this.props.children}
                    </div>
                </Grid>
            </div>
        );
    }
}
