import React from 'react';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import JsonPlaceholder from "./components/JsonPlaceholder";
import jsonReducer from "./jsonReducer";

const jsonStore = configureStore({
    reducer: {
        main: jsonReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

const App = () => {
    return (
        <Provider store={jsonStore}>
            <JsonPlaceholder/>
        </Provider>
    );
};

export default App;