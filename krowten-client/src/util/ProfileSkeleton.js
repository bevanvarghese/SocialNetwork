import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NoImg from '../images/no-img.png';
//material UI stuff
import Paper from '@material-ui/core/Paper';
//icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
  ...theme.toSpread,
  handle: {
    height: 20,
    backgroundColor: theme.palette.secondary.main,
    width: 60,
    margin: '0 auto 7px auto',
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    marginBottom: 10,
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '50%',
    marginBottom: 10,
  },
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          <img src={NoImg} alt='profile' className='profile-image' />
          <hr />
          <div className='profile-details'>
            <div className={classes.handle} />
            <hr />
            <div className={classes.fullLine} />
            <hr />
            <LocationOn color='secondary' />
            <span> Location</span>
            <hr />
            <LinkIcon color='secondary' />
            <span> Website</span>
            <hr />
            <CalendarToday color='secondary' />
            <span> Joined on</span>
          </div>
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileSkeleton);
