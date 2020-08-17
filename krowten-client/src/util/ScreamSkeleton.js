import React, { Fragment } from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';
//material ui stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  ...theme.toSpread,
  card: {
    display: 'flex',
    marginBottom: 20,
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25,
  },
  cover: {
    minWidth: 200,
    objectFit: 'cover',
  },
  handle: {
    width: 60,
    height: 15,
    backgroundColor: theme.palette.secondary.main,
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginBottom: 10,
  },
  fullLine: {
    height: 15,
    width: '90%',
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  halfLine: {
    height: 15,
    width: '50%',
    marginBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

const ScreamSkeleton = (props) => {
  const { classes } = props;

  //basically a for loop
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScreamSkeleton);
