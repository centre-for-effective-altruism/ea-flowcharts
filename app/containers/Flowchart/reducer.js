/*
 *
 * Flowchart reducer
 *
 */
import { fromJS } from 'immutable';
import {
  LOAD_ENTRIES,
  LOADED_ENTRIES,
  ADD_PATHWAY_STEP,
  CLEAR_PATHWAY,
  TRUNCATE_PATHWAY_TO_STEP,
  SET_CURRENT_FLOWCHART,
  LOADING_ERROR,
  SET_SHOW_FEEDBACK_MODAL,
} from './constants';

const initialState = fromJS({
    loading: false,
    entries: false,
    flowcharts: false,
    currentFlowchart: false,
    pathway: [],
    showFeedbackModal: false,
});

function flowchartReducer(state = initialState, action) {
    switch (action.type) {
    case LOAD_ENTRIES: {
        return state
        .set('loading', true);
    }
    case LOADED_ENTRIES: {
        const entries = {};
        const flowcharts = [];
        action.entries.forEach((entry) => {
            switch (entry.sys.contentType.sys.id) {
            case 'flowchart':
                flowcharts.push(entry);
                break;
            default:
                // do nothing
            }
            entries[entry.sys.id] = entry;
        });

        return state
        .set('loading', false)
        .set('entries', entries)
        .set('flowcharts', flowcharts);
    }
    case SET_CURRENT_FLOWCHART: {
        return state
        .set('currentFlowchart', action.flowchartId);
    }
    case ADD_PATHWAY_STEP: {
        return state
        .set('pathway', state.get('pathway').push(action.entryId));
    }
    case CLEAR_PATHWAY: {
        return state
        .set('pathway', state.get('pathway').clear());
    }
    case TRUNCATE_PATHWAY_TO_STEP: {
        // if we have an id, roll back to it
        if (typeof action.entryId === 'string') {
            return state
            .set('pathway', state.get('pathway').slice(0, state.get('pathway').lastIndexOf(action.entryId) + 1 - action.extraSteps));
        }
        // no ID, so go back one step — remove both the last question and the nodeLink
        return state
        .set('pathway', state.get('pathway').pop().pop());
    }
    case LOADING_ERROR: {
        return state
        .set('loading', false)
        .set('error', action.error)
        .set('flowcharts', false);
    }
    case SET_SHOW_FEEDBACK_MODAL: {
        return state
        .set('showFeedbackModal', action.show);
    }
    default: {
        return state;
    }
    }
}

export default flowchartReducer;
