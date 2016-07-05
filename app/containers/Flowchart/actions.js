/*
 *
 * Flowchart actions
 *
 */
import {
  LOAD_ENTRIES,
  LOADED_ENTRIES,
  ADD_PATHWAY_STEP,
  CLEAR_PATHWAY,
  TRUNCATE_PATHWAY_TO_STEP,
  SET_CURRENT_FLOWCHART,
  LOADING_ERROR,
} from './constants';


export function loadEntries() {
    return {
        type: LOAD_ENTRIES,
    };
}

export function loadedEntries(entries) {
    return {
        type: LOADED_ENTRIES,
        entries,
    };
}

export function setCurrentFlowchart(flowchartId) {
    return {
        type: SET_CURRENT_FLOWCHART,
        flowchartId,
    };
}

export function addPathwayStep(entryId) {
    return {
        type: ADD_PATHWAY_STEP,
        entryId,
    };
}

export function clearPathway(entryId) {
    return {
        type: CLEAR_PATHWAY,
        entryId,
    };
}

export function truncatePathwayToStep(entryId, extraSteps) {
    return {
        type: TRUNCATE_PATHWAY_TO_STEP,
        entryId,
        extraSteps
    };
}

export function loadingError(errors) {
    return {
        type: LOADING_ERROR,
        errors,
    };
}
