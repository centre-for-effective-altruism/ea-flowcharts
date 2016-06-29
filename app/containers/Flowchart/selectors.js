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

export const selectFlowcharts = () => createSelector(
    selectFlowchartDomain(),
    (flowchartState) => flowchartState.get('flowcharts')
);

export const selectCurrentFlowchart = () => createSelector(
    selectFlowchartDomain(),
    (flowchartState) => flowchartState.get('currentFlowchart')
);

export const selectCurrentFlowchartNode = () => createSelector(
    selectFlowchartDomain(),
    (flowchartState) => flowchartState.get('currentNode')
);

export const selectPreviousFlowchartNode = () => createSelector(
    selectFlowchartDomain(),
    (flowchartState) => flowchartState.get('previousNode')
);

/**
 * Default selector used by Flowchart
 */

const selectFlowchart = () => createSelector(
    selectFlowchartDomain(),
    (substate) => substate.toJS()
);

export default selectFlowchart;

