import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'
import { Query } from 'mobx-orm'
import { Page, Session, Site } from 'src/models/spiders'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Tag, TagHistory } from 'src/models/tags'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Pages } from '@material-ui/icons'


class SourcePageState {
    site        : Site
    pages       : Query<Page>
    tags        : Query<Tag>
    tags_history: Query<TagHistory>

    get is_ready() {
        return this.pages && this.pages.is_ready 
    }

    constructor() {
        makeAutoObservable(this)
    }

    init() {
        if (!this.pages) this.pages = Page.load() as any
        if (!this.tags) this.tags = Tag.load() as any
        if (!this.tags_history) this.tags_history = TagHistory.load() as any
    }

    destroy() {
        if (this.pages) this.pages.destroy(); this.pages= null
    }
}

let state = new SourcePageState()

const styles = (theme) => ({
});

@observer
class SourcePage extends React.Component<RouteComponentProps> {

    componentDidMount() {
        state.init()
    }

    componentWillUnmount() {
        // state.destroy()
    }

    render() {
        const source_id = this.props.match.params["source_id"]
        const { classes } = this.props;
        const { path, url } = this.props.match;

        if (!state.is_ready) {
            return (
                <React.Fragment>
                    <CircularProgress color="secondary" />
                </React.Fragment>
            )
        }
        if (state.pages.items.length) {
            state.site = state.pages.items[0].site
        }
        return (
            <React.Fragment>
                <p>Url        : {state.site ? state.site.url : ''}</p>
                <p>Desc       : {state.site ? state.site.desc: ''}</p>
                <p>Total pages: {state.pages? state.pages.items.length : 0}</p>

                <Paper className={classes.root}>
                    {state.tags.items
                    .filter(tag => tag.total_count)
                    .map(function(tag){
                        return <Chip key={tag.id} label={`${tag.title} (${tag.total_count})`} clickable color={tag.is_active ? "primary":"default"} />
                    })}
                </Paper>
                {/* <Paper className={classes.root}>
                    <div>There is should be a chart of trends</div>
                </Paper> */}
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            {/* <TableCell align="right">Site</TableCell> */}
                            <TableCell align="right">URL</TableCell>
                            <TableCell align="right">Last Visit</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {state.pages.items.map((page: Page) => (
                            <TableRow key={page.id}>
                            <TableCell component="th" scope="row">{page.id}</TableCell>
                            {/* <TableCell align="right">{page.site.url}</TableCell> */}
                            <TableCell align="right"><a href={page.full_url} target="blank">{page.url}</a></TableCell>
                            <TableCell align="right">{page.last_visit}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(SourcePage))
