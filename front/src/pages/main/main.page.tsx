import React from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PageComponent from '../page.component'
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import SignIn from 'src/components/auth/sign-in'
import settings from 'src/services/settings'

const styles = (theme) => ({
    // all auth things should be in the center 
    root: {
    }
});


@observer
class MainPage extends PageComponent {
  render() {
    const { classes } = this.props;
    return (
      <Container className={classes.root}>
          <div>This is the main page</div>
          <div>{`DEBUG: ${settings.DEBUG}`}</div>
          <div>{`API: ${settings.API}`}</div>
      </Container>
    )
  }
}

export default withStyles(styles)(MainPage)
