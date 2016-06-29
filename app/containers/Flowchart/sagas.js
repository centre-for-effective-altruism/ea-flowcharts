import { takeLatest } from 'redux-saga';
import { take, put, fork, cancel } from 'redux-saga/effects';

// constants
import { LOAD_FLOWCHARTS, LOAD_FLOWCHART_NODE } from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';

// actions
import { loadedFlowcharts, loadedFlowchartNode, loadingError } from './actions';
import contentful from 'api/contentful';

// All sagas to be loaded

// Individual exports for testing
export function* getFlowcharts() {
    const entries = yield contentful.getEntries({
        content_type: 'flowchart',
    });
    if (entries.errors) {
        yield put(loadingError(entries.errors));
    } else {
        yield put(loadedFlowcharts(entries.items));
    }
}
export function* getFlowchartNode(action) {
    const entries = yield contentful.getEntries({
        'sys.id': action.nodeId,
    });
    if (entries.errors) {
        yield put(loadingError(entries.errors));
    } else {
        yield put(loadedFlowchartNode(entries.items[0]));
    }
}

// Watch
export function* getFlowchartsWatcher() {
    yield [
        takeLatest(LOAD_FLOWCHARTS, getFlowcharts),
        takeLatest(LOAD_FLOWCHART_NODE, getFlowchartNode),
    ];
}

// Main function
export function* getFlowchartData() {
    // Fork watcher so we can continue execution
    // yield fork(getFlowchartsWatcher);
    const watcher = yield fork(getFlowchartsWatcher);

    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}


// Bootstrap sagas
export default [
    getFlowchartData,
];
