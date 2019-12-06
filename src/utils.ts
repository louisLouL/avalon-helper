import {VoteRecord} from "./store/models";

export function playerApproveCount(playerId: number, history: VoteRecord[]) {
    return countTrue(history.map(p => p.votedYes[playerId]));
}

export function playerRejectionCount(playerId: number, history: VoteRecord[]) {
    return countFalse(history.map(p => p.votedYes[playerId]));
}

export function countTrue(x: boolean[]) {
    return x.reduce((prev, curr) => curr? prev + 1: prev, 0)
}

export function countFalse(x: boolean[]) {
    return x.reduce((prev, curr) => curr? prev: prev + 1, 0)
}

export function allTrue(x: boolean[]) {
    return x.reduce((prev, curr) => prev && curr, true)
}

export function allFalse(x: boolean[]) {
    return allTrue(x.map(i => !i))
}

export function existTrue(x: boolean[]) {
    return x.reduce((prev, curr) => prev || curr, false)
}

export function existFalse(x: boolean[]) {
    return existTrue(x.map(i => !i))
}

export function muskSelection<A>(musk: boolean[], arr: A[]) {
    if(musk.length !== arr.length){
        throw new Error('musk and arr should have the same length');
    }
    return musk.flatMap((val, idx) => val? [arr[idx]]: [])
}
