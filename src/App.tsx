import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import {Setup} from "./pages/setup/setup";
import {History} from "./pages/history/history";
import {Player} from "./pages/player/player";
import {Help} from "./pages/help/help";

import {useDispatch, useSelector} from "react-redux";
import {setCurrentLocation, setNewVoteEditor} from "./store/actions";
import {defaultVote, State} from "./store/models";
import {VoteEditor} from "./components/VoteEditor";
import {useStyles} from "./styles";
import {AppBar, BottomNavigation, BottomNavigationAction, Drawer, Grid} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import HistoryIcon from '@material-ui/icons/History';
import GroupIcon from '@material-ui/icons/Group';
import HelpIcon from '@material-ui/icons/Help';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const Nav = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useSelector((state: State) => state.currentLocation);
    const dispatch = useDispatch();
    const handleClick = (event: any, value: string) => {
        history.push(value);
        dispatch(setCurrentLocation(value));
    };
    return (
        <BottomNavigation
            showLabels
            className={classes.nav}
            onChange={handleClick}
            value={location}
        >
            <BottomNavigationAction label="Setup" value="/setup" icon={<PlayArrowIcon/>}/>
            <BottomNavigationAction label="History" value="/history" icon={<HistoryIcon/>}/>
            <BottomNavigationAction label="Players" value="/players" icon={<GroupIcon/>}/>
            <BottomNavigationAction label="Help" value="/help" icon={<HelpIcon/>}/>
        </BottomNavigation>
    )
};

const App: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const players = useSelector((state: State) => state.players);
    const showNewVoteInput = useSelector((state: State) => state.showNewVoteEditor);

    return (
        <div>
            <AppBar>
                <div style={{flexGrow: 1}}>
                    <Grid container>
                        <Grid item xs={4}/>
                        <Grid item xs={4}>
                            <h3>Avalon Helper</h3>
                        </Grid>
                        <Grid item xs={4}/>
                    </Grid>
                </div>
            </AppBar>
            <Router>
                <div style={{height: "650px", marginBottom: "60px", marginTop: "60px"}}>
                    <Switch>
                        <Route path="/setup">
                            <Setup/>
                        </Route>
                        <Route path="/history">
                            <History/>
                        </Route>
                        <Route path="/players">
                            <Player/>
                        </Route>
                        <Route path="/help">
                            <Help/>
                        </Route>
                        <Route path="/">
                            <Help/>
                        </Route>
                    </Switch>
                </div>
                <Nav/>
            </Router>
            <AddCircleIcon className={classes.addVoteButton} fontSize="large" color="primary"
                           onClick={() => dispatch(setNewVoteEditor(true))}/>
            <Drawer anchor={"bottom"} open={showNewVoteInput}>
                <VoteEditor {...defaultVote(players)}/>
            </Drawer>
        </div>
    );
};

export default App;
