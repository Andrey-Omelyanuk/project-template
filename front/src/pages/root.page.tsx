import React from 'react'
import { RouteComponentProps } from 'react-router'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import AuthPage from './auth/auth.page'
import MainPage from './main/main.page'
import settings from 'src/services/settings'
import auth from 'src/services/auth'

import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
});


@observer
class RootPage extends React.Component<RouteComponentProps> {

    @computed get is_ready(): boolean { return settings.is_ready && auth.is_ready } 

    render() {
        if (this.is_ready) {
            return(
                <Router>
                    <Switch>
                        <Route path="/about">
                            <div>About</div>
                        </Route>
                        <Route path="/auth"> <AuthPage/> </Route>
                        <Route path="/">     <MainPage/> </Route>
                    </Switch>
                </Router>
            )
        }
        else {
            return(
                <CircularProgress color="secondary" />
            )
        }
    }
}
export default withStyles(styles)(RootPage)
