import { takeLatest } from 'redux-saga';
import { take, put, fork, cancel } from 'redux-saga/effects';

// constants
import { LOAD_ENTRIES } from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';

// actions
import { loadedEntries, loadingError } from './actions';
import contentful from 'api/contentful';

// All sagas to be loaded

// Individual exports for testing
export function* getEntries() {
    const entries = yield contentful.getEntries({
        limit: 1000,
        include: 1
    });
    if (entries.errors) {
        const badErrors = [];
        entries.errors.forEach(function(error){
            if(error.sys.id === 'notResolvable'){
                console.warn(`Warning: asset ${error.details.id} could not be resolved`);
            } else {
                badErrors.push(error);
            }
        })
        if(badErrors.length > 0){
            yield put(loadingError(badErrors));
            return;
        }
    }
    yield put(loadedEntries(entries.items));
}

// Watch
export function* getFlowchartsWatcher() {
    yield [
        takeLatest(LOAD_ENTRIES, getEntries),
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
