import React from 'react'
import { observer } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';


const styles = (theme) => ({
    root: {
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    }
});


@observer
class SignIn extends React.Component<any> {
  render() {
    const { classes } = this.props;
    return (
        <div>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"> Sign in </Typography>

          <form className={classes.form} noValidate>
            <TextField 
                name="email" id="email" label="Email Address" required 
                variant="outlined" margin="normal" fullWidth autoComplete="email" autoFocus />

            <TextField  
                name="password" id="password" label="Password" required 
                variant="outlined" margin="normal" fullWidth  autoComplete="current-password" type="password" />

            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />

            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
              Sign Up 
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
    )
  }
}

export default withStyles(styles)(SignIn)
