import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {State, VoteRecord} from "../../store/models";
import {VoteEditor} from "../../components/VoteEditor";

import {deleteVoteRecord, setUpdateVoteEditor} from "../../store/actions";
import {
    Button,
    Drawer, IconButton,
    Popover,
    Step,
    StepContent,
    StepLabel,
    Stepper
} from "@material-ui/core";
import {useStyles} from "../../styles";

import {muskSelection} from "../../utils";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import PeopleIcon from '@material-ui/icons/People';
import NoteIcon from '@material-ui/icons/Note';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import {PlaceHolder} from "../../components/PlaceHolder";

const HistoryItem = (props: VoteRecord) => {
    const playersList = useSelector((state: State) => state.players);
    const votedYes = muskSelection(props.votedYes, playersList);
    const votedNo = muskSelection(props.votedYes.map(i => !i), playersList);
    const classes = useStyles();
    return (
        <React.Fragment>
            <div>
                <div className={classes.historyRow}><PeopleIcon color="primary"/>: {muskSelection(props.candidates, playersList).join(", ")} </div>
                <div className={classes.historyRow}><ThumbUpIcon color="primary"/>: {votedYes.join(", ")} </div>
                <div className={classes.historyRow}><ThumbDownIcon color="secondary"/>: {votedNo.join(", ")} </div>
                {props.note ? <div><NoteIcon color="primary"/>: {props.note}</div> : null}
            </div>
        </React.Fragment>
    )
};

export const History = () => {
    const all = useSelector((state: State) => state.voteHistory);
    const displayEditingWindow = useSelector((state: State) => state.showUpdateVoteEditor);
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(-1);
    const eventType = (x: VoteRecord) => x.isQuest ? (x.isSuccessful ? "Good Quest" :
        "Bad Quest") :
        "Vote";
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleDeleteClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDeleteClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Stepper orientation="vertical">
                {all.map((hist, idx) =>
                    <Step key={idx} active={true}>
                        <StepLabel>
                            <div style={{float: "left"}}>
                                <h4>{eventType(hist)}</h4>
                            </div>
                            <div style={{float: "right"}}>
                                <IconButton onClick={() => {
                                    dispatch(setUpdateVoteEditor(true));
                                    setEditing(idx)
                                }}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton onClick={handleDeleteClick}>
                                    <ClearIcon/>
                                </IconButton>
                            </div>
                        </StepLabel>
                        <StepContent>
                            <HistoryItem {...hist} />

                        </StepContent>
                        <Drawer anchor={"top"} open={editing === idx && displayEditingWindow}
                                onClose={() => setEditing(-1)}
                        >
                            <VoteEditor {...hist}/>
                        </Drawer>
                        <Popover
                            open={open}
                            id={id}
                            anchorEl={anchorEl}
                            onClose={handleDeleteClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <div className={classes.deleteConfirmWindow}>
                                <h4 style={{marginLeft: "30px"}}>Are you sure?</h4>
                                <Button onClick={() => {
                                    dispatch(deleteVoteRecord(hist.id));
                                    setAnchorEl(null);
                                }}
                                        color="secondary"
                                        variant="contained"
                                        style={{margin: "10px"}}
                                >Yes</Button>
                                <Button onClick={handleDeleteClose} color="primary" variant="contained">No</Button>
                            </div>
                        </Popover>
                    </Step>
                )}
            </Stepper>
            <PlaceHolder/>
        </div>
    )
};
