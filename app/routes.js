// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getHooks } from 'utils/hooks';

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

export default function createRoutes(store) {
    // Create reusable async injectors using getHooks factory
    const { injectReducer, injectSagas } = getHooks(store);

    const flowchartGetComponent = function getComponent(nextState, cb) {
        const importModules = Promise.all([
            System.import('containers/Flowchart/reducer'),
            System.import('containers/Flowchart/sagas'),
            System.import('containers/Flowchart'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
            injectReducer('flowchart', reducer.default);
            injectSagas(sagas.default);
            renderRoute(component);
        });

        importModules.catch(errorLoading);
    };


    return [
        {
            path: '/',
            indexRoute: { onEnter: (nextState, replace) => replace('/flowchart') },
        },
        {
            path: '/flowchart/embed(/:flowchartId)(/:pathway)',
            name: 'embedFlowchart',
            getComponent: flowchartGetComponent,
        },
        {
            path: '/flowchart(/:flowchartId)(/:pathway)',
            name: 'flowchart',
            getComponent: flowchartGetComponent,
        },
        {
            path: '*',

            name: 'notfound',
            getComponent(nextState, cb) {
                System.import('containers/NotFoundPage')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            },
        },
    ];
}
