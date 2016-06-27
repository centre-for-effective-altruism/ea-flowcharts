import { createSelector } from 'reselect';


/**
 * Direct selector to the flowchart state domain
 */
const selectFlowchartDomain = () => state => state.get('flowchart');

/**
 * Other specific selectors
 */
const selectLoading = () => createSelector(
  selectFlowchartDomain(),
  (flowchartState) => flowchartState.get('loading')
);

const selectFlowcharts = () => createSelector(
  selectFlowchartDomain(),
  (flowchartState) => flowchartState.get('flowcharts')
);

const selectFlowchartNode = () => createSelector(
  selectFlowchartDomain(),
  (flowchartState) => flowchartState.get('flowchart_node')
);

/**
 * Default selector used by Flowchart
 */

const selectFlowchart = () => createSelector(
  selectFlowchartDomain(),
  (substate) => substate.toJS()
);

export default selectFlowchart;
export {
  	selectFlowchartDomain,
	selectFlowchart,
  	selectFlowcharts,
  	selectLoading,
	selectFlowchartNode
};
