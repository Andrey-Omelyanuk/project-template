import React from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PageComponent from '../page.component'
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import SignIn from 'src/components/auth/sign-in'


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
class AuthPage extends PageComponent {
  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
        <Switch>
          <Route path="/sign-in">
            <SignIn></SignIn>
          </Route>
          <Route path="/sign-up">
            <SignIn></SignIn>
          </Route>
        </Switch>
      </Container>
    )
  }
}

export default withStyles(styles)(AuthPage)
