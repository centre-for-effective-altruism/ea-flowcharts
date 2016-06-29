/*
 *
 * Flowchart
 *
 */
import React from 'react';
// state handling
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
   selectLoading,
   selectFlowcharts,
   selectCurrentFlowchart,
   selectCurrentFlowchartNode,
} from './selectors';
import { createStructuredSelector } from 'reselect';
import { loadFlowcharts, loadFlowchartNode, setCurrentFlowchart } from './actions';
// components
import { Grid } from 'react-bootstrap';
import Header from 'components/Header';
import Loading from 'components/Loading';
import FlowchartList from 'components/FlowchartList';
import FlowchartItem from 'components/FlowchartItem';
import styles from './styles.css';
import { contentfulObjShape } from 'api/contentful';


export class Flowchart extends React.Component { // eslint-disable-line react/prefer-stateless-function

    static propTypes = {
        flowcharts: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.arrayOf(React.PropTypes.shape(contentfulObjShape)),
        ]),
        currentFlowchart: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.shape(contentfulObjShape),
        ]),
        currentNode: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.shape(contentfulObjShape),
        ]),
        loading: React.PropTypes.bool,
        dispatch: React.PropTypes.func,
        params: React.PropTypes.shape({
            flowchartId: React.PropTypes.string,
            nodeId: React.PropTypes.string,
        }),
        // "history",
        // "location",
        // "route",
        // "routeParams",
        // "routes",
        // "children",
    }

    componentWillMount() {
        this.loadContent();
    }

    componentDidUpdate() {
        this.loadContent();
    }

    loadContent() {
        // wait for any current loading to finish before moving on
        if (this.props.loading) {
            return;
        }

        // if we don't have any flowcharts loaded, we need them, so load them...
        if (!this.props.flowcharts) {
            this.props.dispatch(loadFlowcharts());
        }

        // we've got flowcharts and a flowchart ID but we haven't set one in the State...
        if (this.props.flowcharts && this.props.params.flowchartId && !this.props.currentFlowchart) {
            const targetId = this.props.params.flowchartId;
            const currentFlowchart = this.props.flowcharts.find((flowchart) => flowchart.sys.id === targetId);
            if (currentFlowchart) {
                this.props.dispatch(setCurrentFlowchart(currentFlowchart));
            } else {
                this.props.dispatch(push('/flowchart'));
            }
        }

        // we've got a flowchart set in state, but we don't have a URL var — unset the state var
        if (!this.props.params.flowchartId && this.props.currentFlowchart) {
            this.props.dispatch(setCurrentFlowchart(false));
        }

        // we've got a current flowchart, but no node ID, so use the flowchart ID as the current node
        if (this.props.currentFlowchart && this.props.params.flowchartId && !this.props.params.nodeId) {
            this.props.dispatch(push(`/flowchart/${this.props.currentFlowchart.sys.id}/${this.props.currentFlowchart.sys.id}`));
        }

        if (this.props.params.nodeId) {
            const currentId = this.props.currentNode ? this.props.currentNode.sys.id : false;
            const newId = this.props.params.nodeId;
            if (currentId !== newId) {
                this.props.dispatch(loadFlowchartNode(newId));
            }
        }
    }

    mainContent() {
        if (this.props.loading) {
            return <Loading key={'loading'} />;
        }
        if (this.props.currentFlowchart && this.props.currentNode) {
            return <FlowchartItem key={this.props.currentFlowchart.sys.id} {...this.props} />;
        }
        if (this.props.flowcharts) {
            return <FlowchartList key={'flowchart-list'} flowcharts={this.props.flowcharts} />;
        }
        return <p>Error loading flowcharts...</p>;
    }

    render() {
        return (
            <div>
                <Header />
                <Grid>
                    <div className={styles.flowchart}>
                        {this.mainContent()}
                    </div>
                </Grid>
            </div>
          );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const mapStateToProps = createStructuredSelector({
    loading: selectLoading(),
    flowcharts: selectFlowcharts(),
    currentFlowchart: selectCurrentFlowchart(),
    currentNode: selectCurrentFlowchartNode(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flowchart);
