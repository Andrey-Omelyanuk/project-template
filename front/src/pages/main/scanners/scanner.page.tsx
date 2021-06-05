import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'


const styles = (theme) => ({
});


@observer
class ScannerPage extends React.Component<RouteComponentProps> {
    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <p>Scanners</p>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(withRouter(ScannerPage))
