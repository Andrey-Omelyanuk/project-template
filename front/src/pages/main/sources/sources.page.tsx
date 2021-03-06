import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Switch, Route, NavLink } from "react-router-dom"
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'
import { Query } from 'mobx-orm'
import { Site } from 'src/models/spiders'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import SourcePage from './source.page'


const styles = (theme) => ({
});


@observer
class SourcesPage extends React.Component<RouteComponentProps> {

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
                                {state.sites.items.map(function(site: Site){
                                    return  <ListItem button key={site.id} component={NavLink} to={`${url}/${site.id}`} activeClassName={classes.active} >
                                                <ListItemText primary={site.url} />
                                            </ListItem>
                                })}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <Switch>
                                <Route exact path={url}><p>Choose a source</p></Route>
                                <Route path={`${url}/:source_id`}><SourcePage state={this.props.state}/></Route>
                            </Switch>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(SourcesPage))
