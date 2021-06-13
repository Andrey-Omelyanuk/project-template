import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Switch, Route, NavLink } from "react-router-dom"
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ScannerPage from './scanner.page'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Query } from 'mobx-orm'
import { Spider } from 'src/models/spiders'
import { makeAutoObservable } from 'mobx'


const styles = (theme) => ({
    active: {
        backgroundColor: theme.palette.action.selected
    },
});


@observer
class ScannersPage extends React.Component<RouteComponentProps> {

    render() {
        const { classes } = this.props;
        const { path, url } = this.props.match;
        const state = this.props.state

        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Paper>
                            <List>
                                {state.spiders.items.map(function(spider: Spider){
                                    return  <ListItem button key={spider.id} component={NavLink} to={`${url}/${spider.id}`} activeClassName={classes.active} >
                                                <ListItemText primary={spider.name} />
                                            </ListItem>
                                })}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <Switch>
                                <Route exact path={url}><p>Choose a spider</p></Route>
                                <Route path={`${url}/:scanner_id`}><ScannerPage state={state}/></Route>
                            </Switch>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(ScannersPage))
