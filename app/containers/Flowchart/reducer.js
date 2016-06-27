/*
 *
 * Flowchart reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_FLOWCHARTS,
  LOADED_FLOWCHARTS,
  LOAD_FLOWCHART_NODE,
  LOADED_FLOWCHART_NODE,
  LOADING_ERROR
} from './constants';

const initialState = fromJS({
	loading: false,
	flowcharts: false,
	currentNode: false
});

function flowchartReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FLOWCHARTS:
      return state
      .set('loading',true)
    case LOADED_FLOWCHARTS:
      return state
      .set('loading',false)
      .set('flowcharts',action.flowcharts)
    case LOAD_FLOWCHART_NODE:
      return state
      .set('loading',true)
    case LOADED_FLOWCHART_NODE:
      return state
      .set('loading',false)
      .set('currentNode',action.node)
    case LOADING_ERROR:
      return state
      .set('loading',false)
      .set('error',action.error)
      .set('flowcharts',false)
    default:
      return state;
  }
}

export default flowchartReducer;
