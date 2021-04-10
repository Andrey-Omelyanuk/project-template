import React from 'react'
import { RouteComponentProps, Redirect } from 'react-router'
import { observer } from 'mobx-react'
import { Switch, Route, withRouter } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import LoginPage from './login.page'
import RegisterPage from './register.page'
import auth from 'src/services/auth'


const styles = (theme) => ({
    // all auth things should be in the center 
    root: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }
});


@observer
class AuthPage extends React.Component<RouteComponentProps> {
    render() {
        if (auth.is_authenticated)
            return (<Redirect to="/"/>)

        const path = this.props.match.path 
        const { classes } = this.props;
        return (

            <Container className={classes.root}>
                <Switch>
                    <Route path={`${path}/login`}>
                        <LoginPage/>
                    </Route>
                    <Route path={`${path}/register`}>
                        <RegisterPage/>
                    </Route>
                </Switch>
            </Container>
        )
    }
}

export default withRouter(withStyles(styles)(AuthPage))
