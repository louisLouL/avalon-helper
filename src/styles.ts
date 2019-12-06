import {makeStyles} from "@material-ui/core";


export const useStyles = makeStyles({
    nav: {
        position: "fixed",
        bottom: "0px",
        width: "100%",
        height: "60px"
    },
    voteEditorContainer: {
        flexGrow: 1,
    },
    addVoteButton: {
        position: "fixed",
        right: "20px",
        bottom: "80px"
    },
    deleteConfirmWindow: {
        width: "160px",
        height: "100px"
    },
    historyRow: {
        marginBottom: "5px"
    },
    playerViewFilter: {
        position: "fixed",
        right: "20px",
        bottom: "120px"
    }
});
