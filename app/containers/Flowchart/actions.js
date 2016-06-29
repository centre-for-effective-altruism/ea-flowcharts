/*
 *
 * Flowchart actions
 *
 */
import {
  LOAD_FLOWCHARTS,
  LOADED_FLOWCHARTS,
  SET_CURRENT_FLOWCHART,
  LOAD_FLOWCHART_NODE,
  LOADED_FLOWCHART_NODE,
  LOADING_ERROR,
} from './constants';


export function loadFlowcharts() {
    return {
        type: LOAD_FLOWCHARTS,
    };
}

export function loadedFlowcharts(flowcharts) {
    return {
        type: LOADED_FLOWCHARTS,
        flowcharts,
    };
}

export function setCurrentFlowchart(flowchart) {
    return {
        type: SET_CURRENT_FLOWCHART,
        flowchart,
    };
}

export function loadFlowchartNode(nodeId) {
    return {
        type: LOAD_FLOWCHART_NODE,
        nodeId,
    };
}
export function loadedFlowchartNode(node) {
    return {
        type: LOADED_FLOWCHART_NODE,
        node,
    };
}

export function loadingError(errors) {
    return {
        type: LOADING_ERROR,
        errors,
    };
}
