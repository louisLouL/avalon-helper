import React, {useState} from "react";
import {Button, Divider, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import FlashOnIcon from '@material-ui/icons/FlashOn';
import DoneIcon from '@material-ui/icons/Done';
import {useDispatch} from "react-redux";
import {gameInitialization, setNewVoteEditor} from "../../store/actions";
import {useHistory} from "react-router-dom";

export const Setup = () => {
    const [playerCount, setPlayerCount] = useState(6);
    const [players, setPlayers] = useState(new Array(10).fill(""));
    const dispatch = useDispatch();
    const history = useHistory();
    const handleQuickFill = () => {
        setPlayers(players.map((val, idx) => idx < playerCount? `Player ${idx + 1}`:""))
    };
    const handleSubmit = () => {
        dispatch(gameInitialization(players.slice(0, playerCount)));
        history.push("/history");
        dispatch(setNewVoteEditor(true));
    };

    return (
        <div style={{marginTop: "80px"}}>
            <FormControl style={{width: "100%"}}>
                <InputLabel>Player Count</InputLabel>
                <Select value={playerCount} onChange={(e: any) => setPlayerCount(e.target.value)} style={{width: "100%"}}>
                    {[6, 7, 8, 9, 10].map((val, idx) => <MenuItem value={val} key={idx} style={{width: "100%"}}>{val}</MenuItem>)}
                </Select>
            </FormControl>
            <Divider/>
            <form autoComplete="off">
                {players.map((p, idx) => <TextField key={idx}
                                                    label="Player Name"
                                                    disabled={idx >= playerCount}
                                                    onChange={(e) => setPlayers(
                                                        [...players.slice(0, idx),
                                                            e.target.value,
                                                            ...players.slice(idx + 1, 10)
                                                        ]
                                                    )}
                                                    style={{margin: "10px", width: "150px"}}
                                                    value={players[idx]}
                />)}
            </form>
            <div style={{flexGrow: 1, marginLeft: "40px", marginTop: "40px"}}>
                <Grid container spacing={3}>
                    <Grid xs={6}>
                        <Button color="primary" variant="contained" onClick={handleQuickFill}><FlashOnIcon /> Quick Fill</Button>
                    </Grid>
                    <Grid xs={6}>
                        <Button color="primary" variant="contained" onClick={handleSubmit}><DoneIcon /> Start</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};
