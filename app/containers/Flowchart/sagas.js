import { delay } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';

// constants
import { LOAD_FLOWCHARTS,LOAD_FLOWCHART_NODE } from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';

// actions
import { loadedFlowcharts,loadedFlowchartNode,loadingError } from './actions';
import contentful from 'api/contentful'



// All sagas to be loaded


// Individual exports for testing
export function* getFlowcharts() {
	console.log('Called getFlowcharts()');
	let entries = yield contentful.getEntries({
		'content_type': 'flowchart'
	})
	if(entries.errors){
		yield put( loadingError(entries.errors) )
	} else {
		yield put( loadedFlowcharts(entries.items) )
	}
}
export function* getFlowchartNode(nodeId) {
	console.log('Called getFlowchartNode()');
	let entries = yield contentful.getEntries({
		'sys.id': nodeId
	})
	if(entries.errors){
		yield put( loadingError(entries.errors) )
	} else {
		yield put( loadedFlowchartNode(entries.items[0]) )
	}
}

// Watch
export function* getFlowchartsWatcher() {
  while (yield take(LOAD_FLOWCHARTS)) {
    yield call(getFlowcharts);
  }

  while (nodeId = yield take(LOAD_FLOWCHART_NODE)) {

  	console.log('nodeId',nodeId);
    yield call(getFlowchartNode);
  }
}

// Main function
export function* getFlowchartData(){
  // Fork watcher so we can continue execution
  // yield fork(getFlowchartsWatcher);
  const watcher = yield fork(getFlowchartsWatcher);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// Bootstrap sagas
export default [
	getFlowchartData
];