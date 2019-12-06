export class AbnormalBehaviors {
    playerId: number;
    behaviorType: AbnormalBehaviorTypes;
    note: string;

    constructor(playerId: number, behaviorType: AbnormalBehaviorTypes, note: string) {
        this.playerId = playerId;
        this.behaviorType = behaviorType;
        this.note = note
    }
}

export class AbnormalBehaviorTypes {
    type: string;

    constructor(type: string) {
        this.type = type
    }
}

export const ChangedIdea = new AbnormalBehaviorTypes("ChangedIdea");
export const AlwaysVoteYes = new AbnormalBehaviorTypes("AlwaysVoteYes");
export const AlwaysVoteNo = new AbnormalBehaviorTypes("AlwaysVoteNo");
export const HighFailureRate = new AbnormalBehaviorTypes("HighFailureRate");
export const HighApproveRate = new AbnormalBehaviorTypes("HighApproveRate");
export const AccurateRejection = new AbnormalBehaviorTypes("AccurateRejection");
