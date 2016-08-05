import { createSelector } from 'reselect';


/**
 * Direct selector to the flowchart state domain
 */
const selectFlowchartDomain = () => state => state.get('flowchart');

/**
 * Other specific selectors
 */
export const selectLoading = () => createSelector(
    selectFlowchartDomain(),
    (flowchartState) => flowchartState.get('loading')
);

export const selectEntries = () => createSelector(
    selectFlowchartDomain(),
    (flowchartState) => flowchartState.get('entries')
);

export const selectPathway = () => createSelector(
    selectFlowchartDomain(),
    (flowchartState) => flowchartState.get('pathway').toJS()
);

export const selectFlowcharts = () => createSelector(
    selectFlowchartDomain(),
    (flowchartState) => flowchartState.get('flowcharts')
);

export const selectCurrentFlowchart = () => createSelector(
    selectFlowchartDomain(),
    (flowchartState) => flowchartState.get('currentFlowchart')
);

export const selectShowFeedbackModal = () => createSelector(
    selectFlowchartDomain(),
    (flowchartState) => flowchartState.get('showFeedbackModal')
);
export const selectError = () => createSelector(
    selectFlowchartDomain(),
    (flowchartState) => flowchartState.get('error')
);

/**
 * Default selector used by Flowchart
 */

const selectFlowchart = () => createSelector(
    selectFlowchartDomain(),
    (substate) => substate.toJS()
);

export default selectFlowchart;

