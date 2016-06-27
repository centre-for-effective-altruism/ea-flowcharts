/*
 *
 * Flowchart actions
 *
 */

import {
  LOAD_FLOWCHARTS,
  LOADED_FLOWCHARTS,
  LOAD_FLOWCHART_NODE,
  LOADED_FLOWCHART_NODE,
  LOADING_ERROR
} from './constants';



export function loadFlowcharts() {
	return {
    	type: LOAD_FLOWCHARTS
	};
}

export function loadedFlowcharts(flowcharts) {
	return {
    	type: LOADED_FLOWCHARTS,
    	flowcharts
	};
}

export function loadFlowchartNode(nodeId) {
  console.log('Load requested for node ID',nodeId)
  return {
      type: LOAD_FLOWCHART_NODE,
      nodeId
  };
}
export function loadedFlowchartNode(node) {
  console.log('loaded',node)
  return {
      type: LOADED_FLOWCHART_NODE,
      node
  };
}

export function loadingError(errors) {
	return {
    	type: LOADING_ERROR,
    	errors
	};
}