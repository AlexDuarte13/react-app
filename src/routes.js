import React from 'react';
import { isAuthenticated } from './auth';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import routesConfig from './routesConfig';

const PrivateRoute = ({ component: Component, ...rest}) => (
    
    <Route {...rest} render={props => (
        isAuthenticated(rest) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: '/', state: {from: props.location}}} />
        )
    )} />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            { 
                routesConfig.map((value, key) => {

                    if(value.role) {
                        return <PrivateRoute
                            key={key}
                            path={value.path}
                            component={value.component}
                            exact={value.exact}
                            role= {value.role}
                        ></PrivateRoute>
                    } else {
                        return <Route 
                            key={key}
                            path={value.path}
                            component={value.component}
                            exact={value.exact}
                        ></Route>
                    }
                })
            }
        </Switch>
    </BrowserRouter>
);

export default Routes;