import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ribbon from '../../Images/ribbon.svg'
import MobileStepper from '@material-ui/core/MobileStepper';
import Countdown from 'react-countdown';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// const ENDPOINT = 'https://qr-go.herokuapp.com/';
const ENDPOINT = 'http://localhost:3000/';
let socket;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    height: '100%',
    margin: '0px auto',
  },
  container: {
    marginTop: '20px',
    width: '85vw',
    minHeight: '400px'
  },
  time: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#303030',
  },
  ribbon: {
    position: 'relative',
    backgroundImage:`url(${ribbon})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '280px',
    height: '120px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '20px',
  },
  groupName: {
    position: 'absolute',
    textAlign: 'center',
    marginTop: '15px',
    color: 'white',
    left: '90px',
    top: '12px',
    fontSize: '25px',
    fontWeight: 'bold',
  },
  clue: {
    textAlign: 'center',
    fontSize: '25px',
    fontWeight: 'bold',
    color: '#303030',
    width: '80%',
    minHeight: '150px',
    margin: '0px auto',
    marginTop: '-20px',
    wordWrap: 'break-word', 
  },
  stepperContainer: {
    marginTop: '20px',
    marginBottom: '10px'

  },
  stepper: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '300px',
    backgroundColor: 'white',
  },
  linearProgress: {
    width: '100%',
  },
  challengesCounter: {
    textAlign: 'center',
    marginTop: '5px',
    color: '#3f51b5',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  
}));


const PlayGame = (props) => {
    const [open, setOpen] = useState(false);
    
    const [gameData, setGameData] = useState({ groupName: "", clue: "", currentChallenge: null, challenges: null , endTime: null});

    console.log(gameData);

    useEffect(() => { 

      socket = io(ENDPOINT);

      socket.emit('playerJoinGame', { id: props.user._id }, (error) => {
        if (error) {
          setOpen(true);
        }
      });   
      
      return () => {
        socket.emit('disconnect');
        socket.off();
      }
    }, []);


    useEffect(() => {
      socket.on("gameData", ({ data }) => {
        setGameData(data)
      });
      
    }, []);

    const classes = useStyles();

    // Random component
    const Completionist = () => <Typography className={classes.time}>TIME'S UP</Typography>;
    
    // 

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
        return <Typography className={classes.time}>Remaining Time: {hours}:{minutes}:{seconds}</Typography>;
      }
    };

    const play = () => {
      return (
      <div className={classes.wrapper}>
        <Paper elevation={3} className={classes.container}>
            <div className={classes.ribbon}>
                <Typography className={classes.groupName}> {gameData.groupName} </Typography>
            </div>
            <Typography className={classes.clue}> {gameData.clue} </Typography>

            <div className={classes.stepperContainer}>
                <MobileStepper className={classes.stepper} steps={gameData.challenges} variant="progress" activeStep={gameData.currentChallenge - 1} position="static" backButton={null} nextButton={null}
                LinearProgressProps={{ className: classes.linearProgress }}/>
                <Typography className={classes.challengesCounter}> {gameData.currentChallenge} / {gameData.challenges}</Typography>
            </div>
        </Paper>
        
        <Countdown date={moment(gameData.endTime).format('YYYY/MM/DD')} renderer={renderer}/>
      </div>);   
    }

    const errorPlay = () => {
      return (
        <>
         <Dialog
         open={open}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description">
         <DialogTitle id="alert-dialog-title">{"Uh-oh! Something went wrong"}</DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">
             {"Unfortunately, QR GO has stopped working because of an unexpected error. We're sorry for the inconvenience!"}
           </DialogContentText>
         </DialogContent>
       </Dialog>   
       </> 
      );
    }

    return open ? errorPlay() : play();
  }
  export default PlayGame;