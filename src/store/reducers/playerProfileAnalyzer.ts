import {abnormalBehaviorGenerator} from "./abnormalBehaviorAnalyzer";
import {PlayerProfile, VoteRecord} from "../models";


export function defaultPlayerProfile(players: string[]): PlayerProfile[] {
    return players.map((p, idx) => {
        return {
            id: idx,
            name: p,
            questParticipated: [],
            beVotedHistory: players.map(p => []),
            voteHistory: players.map(p => []),
            abnormalBehaviors: []
        }
    })
}


export function fullRecomputePlayerState(voteHistory: VoteRecord[], players: string[]): PlayerProfile[] {
    const playerProfiles = defaultPlayerProfile(players);
    voteHistory.forEach(voteRecord => {
        // update candidate profiles
        voteRecord.candidates.forEach((val, candidate) => {
            if (val) {
                const originalProfile = playerProfiles[candidate];
                const questParticipated = voteRecord.isQuest ? [...originalProfile.questParticipated, voteRecord.id] : originalProfile.questParticipated;
                const beVotedHistory = playerProfiles.map(p => {
                    if (voteRecord.votedYes[p.id]) {
                        return [...playerProfiles[candidate].beVotedHistory[p.id], true]
                    } else {
                        return [...playerProfiles[candidate].beVotedHistory[p.id], false]
                    }
                });
                playerProfiles[candidate] = {
                    ...playerProfiles[candidate],
                    questParticipated: questParticipated,
                    beVotedHistory: beVotedHistory
                }
            }
        });
        // update voter profiles
        voteRecord.votedYes.forEach((val, idx) => {
            const originalProfile = playerProfiles[idx];
            const voteHist = originalProfile.voteHistory.map((voteHist, candidateId) => {
                if (voteRecord.candidates[candidateId]) {
                    return [...voteHist, val]
                } else {
                    return voteHist
                }
            });
            playerProfiles[idx] = {
                ...originalProfile,
                voteHistory: voteHist
            }
        });
    });
    return playerProfiles.map(profile => {
        return {
            ...profile,
            abnormalBehaviors: abnormalBehaviorGenerator(players, profile.id, profile, voteHistory)
        }
    })
}

