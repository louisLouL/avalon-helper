import {countFalse, countTrue, playerApproveCount, playerRejectionCount} from "../../utils";
import {PlayerProfile, VoteRecord} from "../models";
import {
    AbnormalBehaviors, AccurateRejection,
    AlwaysVoteNo,
    AlwaysVoteYes,
    ChangedIdea, HighApproveRate,
    HighFailureRate
} from "../models/AbnormalBehaviors";



function boolToString(b: boolean): string {
    return b ? "yes" : "no"
}

export function abnormalBehaviorGenerator(players: string[], playerId: number, profile: PlayerProfile, history: VoteRecord[]): AbnormalBehaviors[] {
    // players: state.players
    // profile: this player's profile
    // history: state.voteHistory

    function changeIdea(playerId: number, profile: PlayerProfile): AbnormalBehaviors[] {
        return profile.voteHistory.flatMap((vote, toIdx) => {
            if (vote.length < 3) {
                return []
            } else {
                return vote[vote.length - 1] !== vote[vote.length - 2] ? [
                    new AbnormalBehaviors(playerId,
                        ChangedIdea,
                        `Changed idea for ${players[toIdx]} from ${boolToString(vote[vote.length - 2])} to ${boolToString(vote[vote.length - 1])}`)
                ]: []
            }
        })
    }

    function alwaysVoteYes(playerId: number, profile: PlayerProfile) {
        return profile.voteHistory.flatMap((vote, toIdx) => {
            if (vote.length < 3) {
                return []
            } else {
                const yesCount = countTrue(vote);
                const total = vote.length;
                return yesCount >= total - 1 ? [
                    new AbnormalBehaviors(playerId,
                        AlwaysVoteYes,
                        `Always vote yes to ${players[toIdx]} (${yesCount} / ${total})`)
                ] : [];
            }
        })
    }

    function alwaysVoteNo(playerId: number, profile: PlayerProfile) {
        return profile.voteHistory.flatMap((vote, toIdx) => {
            if (vote.length < 3) {
                return []
            } else {
                const noCount = countFalse(vote);
                const total = vote.length;
                return noCount >= total - 1 ? [
                    new AbnormalBehaviors(playerId,
                        AlwaysVoteNo,
                        `Always vote no to ${players[toIdx]} (${noCount} / ${total})`)
                ] : [];
            }

        })
    }

    function highFailureRate(playerId: number, profile: PlayerProfile) {
        const failedQuestCount = countFalse(profile.questParticipated.map(q => history[q - 1].isSuccessful));
        if (profile.questParticipated.length > 2 && failedQuestCount > 1) {
            return [
                new AbnormalBehaviors(playerId,
                    HighFailureRate,
                    `Have high failure rate(${failedQuestCount} / ${profile.questParticipated.length})`)
            ]
        } else {
            return []
        }
    }

    function highApproveRate(playerId: number, profile: PlayerProfile) {
        if (history.length < 5) {
            return []
        } else {
            const total = history.length;
            const approveCount = playerApproveCount(playerId, history);
            if (approveCount >= total - 2) {
                return [new AbnormalBehaviors(playerId, HighApproveRate, `Have high approve rate (${approveCount} / ${total} )`)]
            } else {
                return []
            }
        }
    }

    function accurateRejection(playerId: number, profile: PlayerProfile) {
        const quest = history.filter(h => h.isQuest);
        if (quest.length < 3) {
            return []
        } else {
            const failedQuest = quest.filter(q => !q.isSuccessful);
            const failedQuestCount = failedQuest.length;
            if (failedQuestCount < 2) {
                return []
            } else {
                const rejectCount = playerRejectionCount(playerId, failedQuest);
                return rejectCount >= failedQuestCount - 1 ? [
                    new AbnormalBehaviors(playerId,
                        AccurateRejection,
                        `Have accurate rejection decision (${rejectCount} / ${failedQuestCount} )`)
                ]: [];
            }
        }
    }

    const allDetector = [
        changeIdea,
        alwaysVoteYes,
        alwaysVoteNo,
        highFailureRate,
        highApproveRate,
        accurateRejection
    ];

    if (history.length < 3) {
        return [];
    } else {
        return allDetector.flatMap(f => f(playerId, profile)).sort((a, b) => a.playerId - b.playerId)
    }

}
