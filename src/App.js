import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import NavBar from "./hoc/NavBar/NavBar";
import Main from './pages/main/Main';
import {pagesList} from "./pagesList";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Main}/>
                <React.Suspense fallback={<p>ЗАГРУЗКА</p>}>
                    <NavBar>
                        {
                            pagesList.map(item => <Route
                                path={item.link}
                                component={item.comp}
                                key={item.id}
                            />)
                        }
                    </NavBar>
                </React.Suspense>
            </Switch>
            <Redirect to='/' component={Main}/>
        </BrowserRouter>
    );
};

export default App;