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
    selectPreviousFlowchartNode
} from './selectors';
import { createStructuredSelector } from 'reselect';
import { loadFlowcharts,loadFlowchartNode,setCurrentFlowchart } from './actions';
// components
import {Link} from 'react-router';
import {Grid,Row,Col,Button} from 'react-bootstrap';
import Header from 'components/Header';
import Loading from 'components/Loading';
import FlowchartList from 'components/FlowchartList';
import FlowchartItem from 'components/FlowchartItem';

import styles from './styles.css';
import {contentfulObjShape} from 'api/contentful';


export class Flowchart extends React.Component { // eslint-disable-line react/prefer-stateless-function
    
    constructor(props){
        super(props);
        // bind functions
    }

    static propTypes = {
        // "history",
        // "location",
        // "params",
        // "route",
        // "routeParams",
        // "routes",
        // "children",
        // "loading",
        // "dispatch"
        "flowcharts": React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.arrayOf(React.PropTypes.shape(contentfulObjShape))
        ]),
        "currentFlowchart": React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.shape(contentfulObjShape)
        ]),
        "currentNode": React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.shape(contentfulObjShape)
        ]),
    }

    loadContent(prevProps){
        // wait for any current loading to finish before moving on
        if(this.props.loading){
            return;
        }

        // if we don't have any flowcharts loaded, we need them, so load them...
        if(!this.props.flowcharts){
            this.props.dispatch(loadFlowcharts());
        }

        // we've got flowcharts and a flowchart ID but we haven't set one in the State...
        if(this.props.flowcharts && this.props.params.flowchartId && !this.props.currentFlowchart){
            let targetId = this.props.params.flowchartId
            let currentFlowchart = this.props.flowcharts.find(function(flowchart){
                return flowchart.sys.id === targetId;
            })
            if(currentFlowchart){
                this.props.dispatch(setCurrentFlowchart(currentFlowchart));
            } else {
                this.props.dispatch(push('/flowchart'));
            }
        }

        // we've got a flowchart set in state, but we don't have a URL var — unset the state var
        if(!this.props.params.flowchartId && this.props.currentFlowchart){
            this.props.dispatch(setCurrentFlowchart(false));
        }

        // we've got a current flowchart, but 
        if(this.props.currentFlowchart && this.props.params.flowchartId && !this.props.params.nodeId){
            this.props.dispatch(push('/'+[
                'flowchart',
                this.props.currentFlowchart.sys.id,
                this.props.currentFlowchart.sys.id
            ].join('/')))
        }

        if(this.props.params.nodeId) {
            let currentId = this.props.currentNode ? this.props.currentNode.sys.id : false
            let newId = this.props.params.nodeId
            if(currentId !== newId){
                this.props.dispatch(loadFlowchartNode(newId));
            }
        }
    }

    componentWillMount(){
        this.loadContent();
    }

    componentDidUpdate(prevProps){
        this.loadContent(prevProps);
        
    }
    


    displayCurrentNode(node){
        console.log('Node',this.props.currentNode);
        

    }

    mainContent(){
        if(this.props.loading){
            return <Loading key={'loading'} />
        } else {
            if(this.props.currentFlowchart && this.props.currentNode){
                return <FlowchartItem key={this.props.currentFlowchart.sys.id} {...this.props} />
            } else if(this.props.flowcharts) {
                return <FlowchartList key={'flowchart-list'} flowcharts={this.props.flowcharts} />
            } else {
                return <p>Error loading flowcharts...</p>
            }
            
        }
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
