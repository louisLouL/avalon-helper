import {AbnormalBehaviors} from "./AbnormalBehaviors";

export interface PlayerProfile {
    id: number,
    name: string,
    questParticipated: number[],
    beVotedHistory: boolean[][],
    voteHistory: boolean[][],
    abnormalBehaviors: AbnormalBehaviors[]
}

export interface VoteRecord {
    id: number,
    candidates: boolean[],
    votedYes: boolean[],
    isQuest: boolean,
    isSuccessful: boolean,
    note: string
}

export function defaultVote(players: string[]): VoteRecord {
    return {
        id: -1,
        candidates: players.map(i => false),
        isQuest: false,
        isSuccessful: false,
        note: "",
        votedYes: players.map(i => false)
    }
}

export interface Action {
    type: string,
    payload: any
}

export interface State {
    players: string[],
    showNewVoteEditor: boolean,
    showUpdateVoteEditor: boolean,
    currentLocation: string,
    voteHistory: VoteRecord[],
    playerProfiles: PlayerProfile[]
}

