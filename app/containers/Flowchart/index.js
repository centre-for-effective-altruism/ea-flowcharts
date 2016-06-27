/*
 *
 * Flowchart
 *
 */

 import React from 'react';
 // state handling
 import { connect } from 'react-redux';
 import {selectLoading,selectFlowcharts} from './selectors';
 import { createStructuredSelector } from 'reselect';
 import { loadFlowcharts,loadFlowchartNode } from './actions';
// components
 import {Link} from 'react-router';
 import {Grid,Row,Col,Button} from 'react-bootstrap';
 import styles from './styles.css';

export class Flowchart extends React.Component { // eslint-disable-line react/prefer-stateless-function
    
    constructor(props){
        super(props);
        // bind functions
        this.listFlowcharts = this.listFlowcharts.bind(this);
    }

    componentWillMount(){
        if(!this.props.params.nodeId){
            this.props.dispatch(loadFlowcharts());
        } else {
            this.props.dispatch(loadFlowchartNode(this.props.params.nodeId));
        }
    }
    
    listFlowcharts(){
        if(this.props.flowcharts && this.props.flowcharts.length > 0){
            return (
                <Row>
                    <Col xs={12}>
                        <ul>
                        {this.props.flowcharts.map(function(flowchart){
                            return (
                                <li key={flowchart.sys.id}>
                                    <Link to={'/flowchart/'+flowchart.sys.id}>{flowchart.fields.title}</Link>
                                </li>
                            )
                        })}
                        </ul>
                    </Col>
                </Row>
            )
        } else {
            return (
                <Row>
                    <Col xs={12}>
                        <em>No flowcharts loaded yet...</em>
                    </Col>
                </Row>
            )
        }
    }

    mainContent(){
        if(this.props.params.nodeId){
            console.log('Displaying current node');
            if(this.props.currentNode){
                return this.displayCurrentNode(this.props.currentNode)
            } else {
                return <p>No current node...</p>
            }
        } else {
            console.log('Displaying all flowcharts');
            return this.listFlowcharts();
        }
    }

    displayCurrentNode(node){
        return (
            <p>The current node is {node}</p>
        )
    }


    render() {
        return (
              <div className={styles.flowchart}>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <p>Loading: {this.props.loading ? 'true':'false'}</p>
                        </Col>
                    </Row>
                    {this.mainContent()}
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
  flowcharts: selectFlowcharts()
});

export default connect(mapStateToProps, mapDispatchToProps)(Flowchart);
