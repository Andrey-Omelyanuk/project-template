import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import FaceIcon from '@material-ui/icons/Face'
import DoneIcon from '@material-ui/icons/Done'
import Grid from '@material-ui/core/Grid'
import Badge from '@material-ui/core/Badge'
import { LineChart, AreaChart, Area, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';

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

    render() {
        const { classes } = this.props;

        const tags = [
            { id: 1, title: 'Якобы', is_active: true, total_count: 2},
            { id: 2, title: 'Куку', is_active: true, total_count: 20},
            { id: 3, title: 'Hero', is_active: false, total_count: 31},
            { id: 4, title: 'Путин', is_active: false, total_count: 22},
            { id: 5, title: 'Перамога', is_active: false, total_count: 20},
            { id: 6, title: 'Наверное', is_active: false, total_count: 10},
            { id: 7, title: 'Неизвестные', is_active: true, total_count: 200},
        ]
        const data = [
            { time: '00:00', amount: 10},
            { time: '03:00', amount: 20},
            { time: '06:00', amount: 40},
            { time: '09:00', amount: 10},
        ];
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h3>Trends</h3>
                        <Paper className={classes.root}>
                            {tags.map(function(tag){
                                return <Chip key={tag.id} label={`${tag.title} (${tag.total_count})`} clickable color={tag.is_active ? "primary":"default"} />
                            })}
                        </Paper>
                        <Paper className={classes.chart_wrapper}>
                            <ResponsiveContainer>
                                <AreaChart data={data} margin={{ top: 16, right: 16, bottom: 0, left: 24, }}>
                                    <XAxis dataKey="time" stroke="#ff7300"/>
                                    <YAxis stroke="#ff7300">
                                        <Label angle={270} position="left" style={{ textAnchor: 'middle' }}> Sales ($) </Label>
                                    </YAxis>
                                    {/* <Line type="monotone" dataKey="amount" stroke="#ff7300" /> */}
                                    <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
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
