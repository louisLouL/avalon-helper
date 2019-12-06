import {VoteRecord} from "../models";

export const ADD_VOTE_RECORD = "ADD_VOTE_RECORD";
export const DELETE_VOTE_RECORD = "DELETE_VOTE_RECORD";
export const UPDATE_VOTE_RECORD = "UPDATE_VOTE_RECORD";
export const GAME_INITIALIZATION = "GAME_INITIALIZATION";
export const SET_NEW_VOTE_EDITOR = "SET_NEW_VOTE_EDITOR";
export const SET_UPDATE_VOTE_EDITOR = "SET_UPDATE_VOTE_EDITOR";
export const SET_LATEST_VOTE = "SET_LATEST_VOTE";
export const SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION";

export function gameInitialization(players: string[]) {
    return {
        type: GAME_INITIALIZATION,
        payload: {
            players
        }
    }
}

export function setNewVoteEditor(show: boolean) {
    return {
        type: SET_NEW_VOTE_EDITOR,
        payload: {
            show
        }
    }
}

export function setUpdateVoteEditor(show: boolean) {
    return {
        type: SET_UPDATE_VOTE_EDITOR,
        payload: {
            show
        }
    }
}

export function setLatestVote(voteId: number) {
    return {
        type: SET_LATEST_VOTE,
        payload: {
            voteId
        }
    }
}

export function addVoteRecord(vote: VoteRecord) {
    return {
        type: ADD_VOTE_RECORD,
        payload: {vote}
    }
}

export function deleteVoteRecord(voteId: number) {
    return {
        type: DELETE_VOTE_RECORD,
        payload: {voteId}
    }
}

export function updateVoteRecord(vote: VoteRecord) {
    return {
        type: UPDATE_VOTE_RECORD,
        payload: {vote}
    }
}

export function setCurrentLocation(location: string) {
    return {
        type: SET_CURRENT_LOCATION,
        payload: {location}
    }
}
