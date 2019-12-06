import {Action, State} from "../models";
import {
    ADD_VOTE_RECORD,
    DELETE_VOTE_RECORD,
    GAME_INITIALIZATION, SET_CURRENT_LOCATION,
    SET_NEW_VOTE_EDITOR, SET_UPDATE_VOTE_EDITOR,
    UPDATE_VOTE_RECORD
} from "../actions";
import {defaultPlayerProfile, fullRecomputePlayerState} from "./playerProfileAnalyzer";

export const initialState: State = {
    players: [],
    showNewVoteEditor: false,
    showUpdateVoteEditor: false,
    voteHistory: [],
    playerProfiles: [],
    currentLocation: "/help"
};

export function rootReducer(state: State = initialState, action: Action) {
    switch (action.type) {
        case GAME_INITIALIZATION: {
            const players = action.payload.players;
            return {
                currentLocation: "/history",
                players: players,
                showNewVoteEditor: false,
                showUpdateVoteEditor: false,
                voteHistory: [],
                playerProfiles: defaultPlayerProfile(players)
            }
        }
        case ADD_VOTE_RECORD: {
            const vote = {
                ...action.payload.vote,
                id: state.voteHistory.length > 0 ? state.voteHistory[state.voteHistory.length - 1].id + 1 : 1
            };
            const allRecord = [...state.voteHistory, vote];
            const players = state.players;
            const profiles = fullRecomputePlayerState(allRecord, players);
            return {
                ...state,
                showNewVoteEditor: false,
                playerProfiles: profiles,
                voteHistory: [...state.voteHistory, vote]
            }
        }
        case UPDATE_VOTE_RECORD: {
            const vote = action.payload.vote;
            const location = state.voteHistory.findIndex(v => v.id === vote.id);
            const allRecord = [
                ...state.voteHistory.slice(0, location),
                vote,
                ...state.voteHistory.slice(location + 1, state.voteHistory.length)
            ];
            const profiles = fullRecomputePlayerState(allRecord, state.players);
            return {
                ...state,
                showUpdateVoteEditor: false,
                playerProfiles: profiles,
                voteHistory: allRecord
            }
        }
        case DELETE_VOTE_RECORD: {
            const voteId = action.payload.voteId;
            const allRecord = state.voteHistory.filter(v => v.id !== voteId);
            const profiles = fullRecomputePlayerState(allRecord, state.players);
            return {
                ...state,
                playerProfiles: profiles,
                voteHistory: allRecord
            }
        }
        case SET_NEW_VOTE_EDITOR: {
            return {
                ...state,
                showNewVoteEditor: action.payload.show
            }
        }
        case SET_UPDATE_VOTE_EDITOR: {
            return {
                ...state,
                showUpdateVoteEditor: action.payload.show
            }
        }
        case SET_CURRENT_LOCATION: {
            return {
                ...state,
                currentLocation: action.payload.location
            }
        }
        default:
            return state
    }
}
