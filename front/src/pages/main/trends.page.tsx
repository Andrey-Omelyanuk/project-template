import React from 'react'
import { makeAutoObservable } from 'mobx'
import { Query } from 'mobx-orm'
import { withRouter, RouteComponentProps } from 'react-router'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import FaceIcon from '@material-ui/icons/Face'
import DoneIcon from '@material-ui/icons/Done'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Badge from '@material-ui/core/Badge'
import { LineChart, AreaChart, Area, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';
import { Page, Session, Site, Article } from 'src/models/spiders'
import { Tag, TagHistory } from 'src/models/tags'


class TrendsPageState {
    site        : Site
    articles    : Query<Article>
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
        if (!this.articles) this.articles = Article.load() as any
        if (!this.pages) this.pages = Page.load() as any
        if (!this.tags) this.tags = Tag.load() as any
        if (!this.tags_history) this.tags_history = TagHistory.load() as any
    }

    destroy() {
        if (this.pages) this.pages.destroy(); this.pages= null
    }
}
let state = new TrendsPageState()


const styles = (theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
        margin: '10px'
    },
    chart_wrapper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 400,
    }
});


@observer
class TrendsPage extends React.Component<RouteComponentProps> {

    @computed is_ready() {
    }

    componentDidMount() {
        state.init()
    }

    componentWillUnmount() {
        // state.destroy()
    }

    render() {
        if (!state.is_ready) {
            return (
                <React.Fragment>
                    <CircularProgress color="secondary" />
                </React.Fragment>
            )
        }
        const { classes } = this.props;

        let _data: any = {};
        for(let tag of state.tags.items) {
            if (tag.is_active) {
                for (let history of tag.histories) {
                    if (!_data[history.article.publish_date])  
                        _data[history.article.publish_date] = {} 
                    _data[history.article.publish_date][tag.title] = history.count 
                }
            }
        }
        let data = []
        for(let x in _data) {
            _data[x].time = x
            data.push(_data[x])
        }

        function selectTag(tag) {
            tag.is_active = !tag.is_active
        }
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h3>Trends</h3>
                        <Paper className={classes.root}>
                            {state.tags.items
                            .filter(tag => tag.total_count)
                            .map(function(tag){
                                return <Chip key={tag.id} label={`${tag.title} (${tag.total_count})`} 
                                onClick={(e) => selectTag(tag) } clickable color={tag.is_active ? "primary":"default"} />
                            })}
                        </Paper>
                        <Paper className={classes.chart_wrapper}>
                            <ResponsiveContainer>
                                <AreaChart data={data} margin={{ top: 16, right: 16, bottom: 0, left: 24, }}>
                                    <XAxis dataKey="time" stroke="#ff7300"/>
                                    <YAxis stroke="#ff7300">
                                        <Label angle={270} position="left" style={{ textAnchor: 'middle' }}> Count </Label>
                                    </YAxis>
                                    {/* <Line type="monotone" dataKey="amount" stroke="#ff7300" /> */}
                                    {state.tags.items
                                    .filter(tag => tag.is_active)
                                    .map(function(tag){
                                        return <Area type="monotone" dataKey={tag.title} stroke={tag.color} fill={tag.color} />
                                    })}
                                    <Tooltip/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default withStyles(styles as any)(withRouter(TrendsPage))
