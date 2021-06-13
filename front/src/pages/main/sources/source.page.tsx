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



const styles = (theme) => ({
});

@observer
class SourcePage extends React.Component<RouteComponentProps> {

    render() {
        const source_id = parseInt(this.props.match.params["source_id"])
        const { classes } = this.props;
        const { path, url } = this.props.match;
        const state = this.props.state

        let site: Site
        for(let s of state.sites.items) {
            if (s.id === source_id) {
                site = s 
                break
            }
        }

        return (
            <React.Fragment>
                <div style={{margin: '10px'}}>
                    <p>Url        : {site ? site.url : ''}</p>
                    <p>Desc       : {site ? site.desc: ''}</p>
                    <p>Total pages: {site ? site.pages.length : 0} </p>
                </div>

                <div className={classes.root} style={{margin: '10px'}}>
                    {site.tag_counts
                    .filter(site_tag => site_tag.count)
                    .map(function(site_tag){
                        return <Chip key={site_tag.tag.id} style={{margin: '5px'}} 
                        label={`${site_tag.tag.title} (${site_tag.count})`}/>
                    })}
                </div>
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
                        {site.pages.map((page: Page) => (
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
