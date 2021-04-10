import React from 'react'
import { RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles';
import RegisterForm from 'src/components/auth/register.form';


const styles = (theme) => ({
    root: {
    }
});


@observer
class RegisterPage extends React.Component<RouteComponentProps> {
  render() {
    const { classes } = this.props;
    return (
        <RegisterForm></RegisterForm>
    )
  }
}

export default withStyles(styles)(RegisterPage)
