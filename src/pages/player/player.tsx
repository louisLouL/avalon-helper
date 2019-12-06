import React, {useState} from "react";
import {useSelector} from "react-redux";
import {PlayerProfile, State} from "../../store/models";
import {
    Checkbox,
    Chip,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@material-ui/core";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import {allTrue, countTrue} from "../../utils";
import {
    AbnormalBehaviors,
    AlwaysVoteYes,
    ChangedIdea,
    HighApproveRate,
    HighFailureRate
} from "../../store/models/AbnormalBehaviors";
import {useStyles} from "../../styles";
import SearchIcon from '@material-ui/icons/Search';
import {Button} from '@material-ui/core';
import {PlaceHolder} from "../../components/PlaceHolder";


export const PlayerRowItem = (props: PlayerProfile) => {
    const players = useSelector((state: State) => state.players);
    const boolToIcon = (x: boolean[]) => x.map(i => i ? <ThumbUpIcon color="primary"/> :
        <ThumbDownIcon color="secondary"/>);
    const voteTo = props.voteHistory.map(i => boolToIcon(i));
    const received = props.beVotedHistory.map(i => boolToIcon(i));
    const history = useSelector((state: State) => state.voteHistory);
    const inCandidates = history.filter(hist => hist.candidates[props.id]);
    const inQuests = inCandidates.filter(hist => hist.isQuest);
    const successfulQuests = inQuests.filter(hist => hist.isSuccessful);

    const quests = history.filter(h => h.isQuest);
    const votedYesQuest = quests.filter(hist => hist.votedYes[props.id]);
    const votedYesAndSucceedQuest = votedYesQuest.filter(hist => hist.isSuccessful);

    const votedNoQuest = quests.filter(hist => !hist.votedYes[props.id]);
    const votedNoAndFailedQuest = votedNoQuest.filter(q => !q.isSuccessful);

    const yesCount = countTrue(history.map(h => h.votedYes[props.id]));

    const abnormalBehaviorColorMapping = (b: AbnormalBehaviors) => {
        switch (b.behaviorType) {
            case ChangedIdea:
            case HighFailureRate:
            case AlwaysVoteYes:
            case HighApproveRate: {
                return "secondary"
            }
            default:
                return "primary"
        }
    };

    return (
        <div style={{marginTop: "10px"}}>
            <h4>{props.name}</h4>
            <div style={{flexGrow: 1}}>
                <Grid container>
                    <Grid item xs={6}>
                        <List>
                            <ListItem>
                                <ListItemText primary="#inProposal" secondary={inCandidates.length}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="#inQuests" secondary={inQuests.length}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="SuccessRate"
                                              secondary={`${successfulQuests.length} / ${inQuests.length}`}/>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={6}>
                        <List>
                            <ListItem>
                                <ListItemText primary="ApproveRate" secondary={`${yesCount} / ${history.length}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="GoodApprove"
                                              secondary={`${votedYesAndSucceedQuest.length} / ${votedYesQuest.length}`}/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="GoodReject"
                                              secondary={`${votedNoAndFailedQuest.length} / ${votedNoQuest.length}`}/>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </div>

            <Table>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Received</TableCell>
                    <TableCell>Vote To</TableCell>
                </TableRow>
                <TableBody>
                    {players.map((p, id) => <TableRow key={id}>
                        <TableCell>{players[id]}</TableCell>
                        <TableCell>{received[id]}</TableCell>
                        <TableCell>{voteTo[id]}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
            <div>
                {props.abnormalBehaviors.map((behavior, idx) =>
                    <Chip key={idx} label={behavior.note} color={abnormalBehaviorColorMapping(behavior)}/>
                )}
            </div>
        </div>
    )
};

export const Player = () => {
    const profiles = useSelector((state: State) => state.playerProfiles);
    const classes = useStyles();
    const [showFilter, setShowFilter] = useState(false);
    const [displayPlayer, setDisplayPlayer] = useState(new Array(10).fill(true));
    return (
        <div style={{marginTop: "90px"}}>
            {profiles.filter(p => displayPlayer[p.id]).map((p, id) => <PlayerRowItem key={id} {...p}/>)}
            <SearchIcon className={classes.playerViewFilter} fontSize="large" color="primary"
                        onClick={() => setShowFilter(true)}/>
            <PlaceHolder/>
            <PlaceHolder/>
            <Drawer
                anchor="right"
                open={showFilter}
            >
                <div style={{display: "block"}}><Button onClick={() => setShowFilter(false)}
                                                        color="secondary"
                                                        variant="contained"
                                                        size="small"
                >X</Button></div>
                {displayPlayer.slice(0, profiles.length).map((val, idx) =>
                    <div>
                        <Checkbox
                            checked={displayPlayer[idx]}
                            onChange={(e: any) => setDisplayPlayer([
                                ...displayPlayer.slice(0, idx),
                                e.target.checked,
                                ...displayPlayer.slice(idx + 1, displayPlayer.length)
                            ])}
                            color="primary"
                        />{profiles[idx].name}
                    </div>
                )}

                <div>
                    <Checkbox
                        checked={allTrue(displayPlayer.slice(0, profiles.length))}
                        onChange={(e: any) => e.target.checked ? setDisplayPlayer(displayPlayer.map(() => true)) : setDisplayPlayer(displayPlayer.map(() => false))}
                        color="primary"
                    />
                    Select All
                </div>
            </Drawer>
        </div>)
};

