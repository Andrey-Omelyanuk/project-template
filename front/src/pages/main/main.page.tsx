import React from 'react'
import { RouteComponentProps, Redirect } from 'react-router'
import { observer } from 'mobx-react'
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import settings from 'src/services/settings'
import auth from 'src/services/auth'
import PersistentDrawerRight from "./components/panel";

const styles = (theme) => ({
    // all auth things should be in the center 
    root: {
    }
});


@observer
class MainPage extends React.Component<RouteComponentProps> {
    render() {
        if (!auth.is_authenticated)
            return (<Redirect to="/auth/login"/>)

        const { classes } = this.props;
        return (
            <Container className={classes.root}>
               <PersistentDrawerRight/>
            </Container>
        )
    }
}

export default withStyles(styles)(MainPage)
