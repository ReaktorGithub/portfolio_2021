import React, {Component} from 'react';
import TheImpulse from "./TheImpulse";
import {applyMiddleware, compose, createStore} from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./redux/rootReducer";
import {Provider} from "react-redux";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk),
    // other store enhancers if any
);

const theImpulseStore = createStore(rootReducer, enhancer);

class App extends Component {
    render() {
        return (
            <Provider store={theImpulseStore}>
                <TheImpulse/>
            </Provider>
        )
    }
}

export default App;