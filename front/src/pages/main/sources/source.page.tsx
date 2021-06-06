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
    }

    destroy() {
        if (this.pages) this.pages.destroy(); this.pages= null
    }

    mock() {
        this.tags = { is_ready: true, items: [
            { id: 1, title: 'Якобы', is_active: true, total_count: 2},
            { id: 2, title: 'Куку', is_active: true, total_count: 20},
            { id: 3, title: 'Hero', is_active: false, total_count: 31},
            { id: 4, title: 'Путин', is_active: false, total_count: 22},
            { id: 5, title: 'Перамога', is_active: false, total_count: 20},
            { id: 6, title: 'Наверное', is_active: false, total_count: 10},
            { id: 7, title: 'Неизвестные', is_active: true, total_count: 200},
        ]} as any
    }
}

let state = new SourcePageState()
state.mock()

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
        return (
            <React.Fragment>
                <p>Source {source_id}</p>
                <p>Url: google.com</p>
                <p>Desc: the most popular source of news for all countries.</p>
                <p>Total pages: 22222</p>

                <Paper className={classes.root}>
                    {state.tags.items.map(function(tag){
                        return <Chip key={tag.id} label={`${tag.title} (${tag.total_count})`} clickable color={tag.is_active ? "primary":"default"} />
                    })}
                </Paper>
                <Paper className={classes.root}>
                    <div>There is should be a chart of trends</div>
                </Paper>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Site</TableCell>
                            <TableCell align="right">URL</TableCell>
                            <TableCell align="right">Last Visit</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {state.pages.items.map((page: Page) => (
                            <TableRow key={page.id}>
                            <TableCell component="th" scope="row">{page.id}</TableCell>
                            <TableCell align="right">{page.site_id}</TableCell>
                            <TableCell align="right">{page.url}</TableCell>
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
