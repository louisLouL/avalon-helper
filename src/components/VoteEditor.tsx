import React, {useState} from "react";
import {State, VoteRecord} from "../store/models";
import {useDispatch, useSelector} from "react-redux";
import {allTrue, countTrue} from "../utils";
import {addVoteRecord, setNewVoteEditor, setUpdateVoteEditor, updateVoteRecord} from "../store/actions";
import {useStyles} from "../styles";
import {Button, Checkbox, Grid, Switch, TextField} from "@material-ui/core";



export function VoteEditor(props: VoteRecord) {
    const players = useSelector((state: State) => state.players);
    const dispatch = useDispatch();
    const classes = useStyles();

    const backup = Object.assign({}, props);

    const [candidate, setCandidate] = useState(props.candidates);
    const [votedYes, setVotedYes] = useState(props.votedYes);
    const [quest, setQuest] = useState(props.isQuest);
    const [success, setSuccess] = useState(props.isSuccessful);
    const [note, setNote] = useState(props.note);
    const [candidateCheckedAll, setCandidateCheckedAll] = useState(allTrue(props.candidates));
    const [votedYesCheckedAll, setVotedYesCheckedAll] = useState(allTrue(props.votedYes));


    function handleSubmit() {
        const id = props.id;
        const payload: VoteRecord = {
            id: id,
            candidates: candidate,
            isQuest: quest,
            isSuccessful: success,
            note: note,
            votedYes: votedYes,
        };
        if (id < 0) {
            dispatch(addVoteRecord(payload))
        } else {
            dispatch(updateVoteRecord(payload))
        }
    }

    function handleReset() {
        setCandidate(backup.candidates);
        setVotedYes(backup.votedYes);
        setQuest(backup.isQuest);
        setSuccess(backup.isSuccessful);
        setNote(backup.note);
        setCandidateCheckedAll(allTrue(backup.candidates));
        setVotedYesCheckedAll(allTrue(backup.votedYes));
    }

    return (
        <div>
            <div className={classes.voteEditorContainer}>
                <Grid container spacing={3}>
                    <Grid item xs={8}/>
                    <Grid item xs={4}>
                        <Button
                            onClick={() => {
                            dispatch(setNewVoteEditor(false));
                            dispatch(setUpdateVoteEditor(false));
                        }} variant="contained"
                            style={{float: "right"}}
                            color="secondary"
                        >X</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <h4>Candidates</h4>
                        {players.map((p, idx) =>
                            <div key={idx}>
                                <Checkbox
                                    key={idx}
                                    checked={candidate[idx]}
                                    onChange={(e) => {
                                        const newState = [
                                            ...candidate.slice(0, idx),
                                            (e.target.checked),
                                            ...candidate.slice(idx + 1, candidate.length)
                                        ];
                                        setCandidate(newState);
                                        if (allTrue(newState)) {
                                            setCandidateCheckedAll(true)
                                        } else {
                                            setCandidateCheckedAll(false)
                                        }
                                    }}
                                    color="primary"
                                />{p}</div>)}
                        <div>
                            <Checkbox
                                checked={candidateCheckedAll}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setCandidate(candidate.map(() => true));
                                        setCandidateCheckedAll(true)
                                    } else {
                                        setCandidate(candidate.map(() => false));
                                        setCandidateCheckedAll(false)
                                    }
                                }}
                                color="primary"
                            /> Check All
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <h4>Agreed</h4>
                        {players.map((p, idx) =>
                            <div key={idx}>
                                <Checkbox
                                    checked={votedYes[idx]}
                                    onChange={(e) => {
                                        const newState = [
                                            ...votedYes.slice(0, idx),
                                            (e.target.checked),
                                            ...votedYes.slice(idx + 1, votedYes.length)
                                        ];
                                        setVotedYes(newState);
                                        if (countTrue(newState) > newState.length / 2) {
                                            setQuest(true)
                                        } else {
                                            setQuest(false)
                                        }
                                        if (allTrue(newState)) {
                                            setVotedYesCheckedAll(true)
                                        } else {
                                            setVotedYesCheckedAll(false)
                                        }
                                    }}
                                    color="primary"
                                /> {p}</div>)}
                        <div>
                            <Checkbox
                                checked={votedYesCheckedAll}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setVotedYes(candidate.map(() => true));
                                        setQuest(true);
                                        setVotedYesCheckedAll(true)
                                    } else {
                                        setVotedYes(candidate.map(() => false));
                                        setQuest(false);
                                        setVotedYesCheckedAll(false)
                                    }
                                }}
                                color="primary"
                            /> Check All
                        </div>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div>
                            <Switch
                                checked={quest}
                                onChange={(e) => setQuest((e.target.checked))}
                                color="primary"
                            />
                            Quest
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div>
                            <Switch
                                checked={success}
                                disabled={!quest}
                                onChange={(e) => setSuccess((e.target.checked))}
                                color="primary"
                            />
                            Success
                        </div>
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth={true}
                            placeholder="Note(Optional)"
                            defaultValue={note}
                            onChange={(event: any) => {
                                setNote(event.target.value);
                            }}>Note</TextField>
                    </Grid>
                    <Grid item xs={4}/>
                    <Grid item xs={4}><Button color="primary" onClick={handleSubmit}
                                              variant="contained">Submit</Button></Grid>
                    <Grid item xs={4}><Button color="secondary" onClick={handleReset}
                                              variant="contained">Reset</Button></Grid>


                </Grid>
            </div>
        </div>
    )
}
