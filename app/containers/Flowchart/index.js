/*
 *
 * Flowchart
 *
 */
import React from 'react';
// state handling
import { connect } from 'react-redux';
import {
   selectLoading,
   selectEntries,
   selectPathway,
   selectFlowcharts,
   selectCurrentFlowchart,
   selectShowFeedbackModal,
} from './selectors';
import { createStructuredSelector } from 'reselect';
import { 
    loadEntries, 
    addPathwayStep, 
    clearPathway, 
    truncatePathwayToStep, 
    setCurrentFlowchart,
    setShowFeedbackModal,
} from './actions';
// components
import Loading from 'components/Loading';
import FlowchartList from 'components/FlowchartList';
import FlowchartHeader from 'components/FlowchartHeader';
import FlowchartPathway from 'components/FlowchartPathway';
import styles from './styles.css';
import { contentfulObjShape } from 'api/contentful';


export class Flowchart extends React.Component { // eslint-disable-line react/prefer-stateless-function

    static propTypes = {
        entries: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.objectOf(React.PropTypes.shape(contentfulObjShape)),
        ]).isRequired,
        flowcharts: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.arrayOf(React.PropTypes.shape(contentfulObjShape)),
        ]).isRequired,
        pathway: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        currentFlowchart: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.string,
        ]).isRequired,
        loading: React.PropTypes.bool.isRequired,
        showFeedbackModal: React.PropTypes.bool.isRequired,
        dispatch: React.PropTypes.func,
        params: React.PropTypes.shape({
            flowchartId: React.PropTypes.string,
            pathway: React.PropTypes.string,
        }),
        // "history",
        // "location",
        // "route",
        // "routeParams",
        // "routes",
        // "children",
    }

    constructor(props) {
        super(props);
        this.addStep = this.addStep.bind(this);
        this.truncatePathwayToStep = this.truncatePathwayToStep.bind(this);
        this.clearPathway = this.clearPathway.bind(this);
        this.setShowFeedbackModal = this.setShowFeedbackModal.bind(this);
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
        if (!this.props.entries) {
            this.props.dispatch(loadEntries());
            return;
        }

        // everything is loaded, and we've navigated to a flowchart page, but we haven't set a flowchart ID yet
        if (!this.props.currentFlowchart && this.props.params.flowchartId) {
            this.props.dispatch(setCurrentFlowchart(this.props.params.flowchartId));
        }

        // we've got a flowchart, so load the first step
        if (this.props.currentFlowchart && this.props.pathway.length === 0) {
            this.addStep(this.props.currentFlowchart);
        }

        // we've got a flowchart set, but our URL doesn't have a param
        // clear the current flowchart and remove any pathway info
        if (this.props.currentFlowchart && !this.props.params.flowchartId) {
            this.props.dispatch(setCurrentFlowchart(false));
            this.clearPathway();
        }
    }

    addStep(entryId) {
        this.props.dispatch(addPathwayStep(entryId));
        // if we're adding a nodeLink, also load the next step
        if (this.props.entries[entryId].sys.contentType.sys.id === 'nodeLink') {
            const nextEntry = this.props.entries[entryId].fields.flowchartNode || this.props.entries[entryId].fields.flowchartEndpoint;
            this.props.dispatch(addPathwayStep(nextEntry.sys.id));
            return;
        }
    }

    truncatePathwayToStep(entryId, extraSteps = 0) {
        this.props.dispatch(truncatePathwayToStep(entryId, extraSteps));
    }

    clearPathway() {
        this.props.dispatch(clearPathway());
    }

    setShowFeedbackModal(show) {
        if (typeof show === 'undefined') show = !this.props.showFeedbackModal;
        this.props.dispatch(setShowFeedbackModal(show))
    }

    mainContent() {
        if (this.props.loading) {
            return <Loading key={'loading'} />;
        }
        if (this.props.pathway.length > 0) {
            return (
                <div>
                    <FlowchartHeader 
                      clearPathway={this.clearPathway}
                      truncatePathwayToStep={this.truncatePathwayToStep}
                      currentFlowchart={this.props.entries[this.props.currentFlowchart]}
                      setShowFeedbackModal={this.setShowFeedbackModal}
                      showFeedbackModal={this.props.showFeedbackModal}
                    />
                    <FlowchartPathway
                      addStep={this.addStep}
                      truncatePathwayToStep={this.truncatePathwayToStep}
                      entries={this.props.entries}
                      pathway={this.props.pathway}
                      currentFlowchart={this.props.currentFlowchart}
                      setShowFeedbackModal={this.setShowFeedbackModal}
                      showFeedbackModal={this.props.showFeedbackModal}
                    />
                </div>
            );
        }
        if (this.props.flowcharts) {
            return <FlowchartList key={'flowchart-list'} flowcharts={this.props.flowcharts} />;
        }
        return <p>Error loading flowcharts...</p>;
    }

    render() {
        return (
            <div className={styles.flowchart}>
                {this.mainContent()}
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
    entries: selectEntries(),
    flowcharts: selectFlowcharts(),
    pathway: selectPathway(),
    currentFlowchart: selectCurrentFlowchart(),
    showFeedbackModal: selectShowFeedbackModal(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flowchart);
