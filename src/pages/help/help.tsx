import React, {useState} from "react";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Chip, Popover, Step, StepContent, StepLabel, Stepper} from "@material-ui/core";
import {PlaceHolder} from "../../components/PlaceHolder";


export const Help = () => {
    const statisticsDefinitions = [
        {
            name: "#inProposal",
            description: "How many times this player is included in a proposal."
        },
        {
            name: "#inQuests",
            description: "How many times this player is included in a quest."
        },
        {
            name: "SuccessRate",
            description: "The rate of successful quests over all the quests this player attended."
        },
        {
            name: "ApproveRate",
            description: "The rate of voting yes over all the vote this player attended."
        },
        {
            name: "GoodApprove",
            description: "Among all the \"approve\" this player voted and later on turns into a quest, how many of them are successful quests"
        },
        {
            name: "GoodReject",
            description: "Among all the \"reject this player voted and later on turns into a quest, how many of them are failed quests."
        },

    ];
    const [showDetails, setShowDetails] = useState(statisticsDefinitions.map(() => false));
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClose = (idx: number) => () => {
        setShowDetails(showDetails.map(() => false));
        setAnchorEl(null);
    };
    const handleClick = (idx: number) => (event: any) => {
        setShowDetails([
            ...showDetails.slice(0, idx),
            true,
            ...showDetails.slice(idx + 1, showDetails.length)
        ]);
        setAnchorEl(event.currentTarget);
    };


    return (
        <div style={{marginTop: "90px", marginBottom: "100px", marginLeft: "20px", marginRight: "20px"}}>
            <p>
                This application will guide you through the game process and help you make informed decisions. Here are
                the brief instructions.
            </p>
            <Stepper orientation="vertical">
                <Step active={true}>
                    <StepLabel>Setup</StepLabel>
                    <StepContent>
                        The helper starts by clicking <span style={{fontWeight: "bold"}}>Setup</span> button. In the
                        setup page,
                        you can select player count and enter player names. <span style={{fontWeight: "bold"}}>Quick Fill</span> can
                        help you fill player names from Player1 to PlayerN quickly. You can click <span
                        style={{fontWeight: "bold"}}>Start</span> to
                        start the helper once everything is filled out.
                    </StepContent>
                </Step>
                <Step active={true}>
                    <StepLabel>Input Vote Event</StepLabel>
                    <StepContent>
                        <span style={{fontWeight: "bold"}}> During the game </span>, you can click the <AddCircleIcon
                        color="primary"/> in the bottom right
                        to record new vote event. If the vote turns into a quest, you can also mark it.
                    </StepContent>
                </Step>
                <Step active={true}>
                    <StepLabel>View Vote History</StepLabel>
                    <StepContent>
                        <span style={{fontWeight: "bold"}}>History</span> panel will show you the timeline of all the
                        events. You can also modify or delete any
                        event here.
                    </StepContent>
                </Step>
                <Step active={true}>
                    <StepLabel>Check Player Behaviors</StepLabel>
                    <StepContent>
                        <span style={{fontWeight: "bold"}}>Players</span> will calculate core statistics of all the
                        players. Those statistics include
                        (click to view detail explanation)
                        {statisticsDefinitions.map((stat, idx) => <div key={idx} style={{display: "inline"}}>
                            <Chip color="default" label={stat.name} onClick={handleClick(idx)}/>
                            <Popover open={showDetails[idx]} id={stat.name} anchorEl={anchorEl}
                                     onClose={handleClose(idx)}>
                                {stat.description}
                            </Popover>
                        </div>)}
                    </StepContent>
                </Step>
                <Step active={true}>
                    <StepLabel>Report Bugs</StepLabel>
                    <StepContent>
                        To report a bug, please go to <a href="https://github.com/louisLouL/avalon-helper/issues"
                                                         target="_blank" rel="noopener noreferrer"> github issue
                        page</a>.
                        <p>Also if you like this project, please star /
                            fork it in <a href="https://github.com/louisLouL/avalon-helper"
                                                                    target="_blank" rel="noopener noreferrer">GitHub.</a> Hope you enjoy the game.</p>
                        <p>To contact Author: workstationforlou@gmail.com </p>
                    </StepContent>
                </Step>
            </Stepper>
            <PlaceHolder/>
        </div>
    )
};
