# Avalon Helper
This is a web application that helps avalon players make informed decision. It mainly
- Calculate core statistics, such as overall approve rate. 
- Detect abnormal behaviors, such as sudden change of idea, low quest successful rate and so on.

Some screen shots:


<img src="https://user-images.githubusercontent.com/32419791/70096823-faf8c680-15f5-11ea-8313-1fc19af464e8.png" width="200"/>
<img src="https://user-images.githubusercontent.com/32419791/70096830-ff24e400-15f5-11ea-8005-cf167976a9aa.png" width="200"/>
<img src="https://user-images.githubusercontent.com/32419791/70096834-00eea780-15f6-11ea-857c-5d69f90fa37d.png" width="200"/>
<img src="https://user-images.githubusercontent.com/32419791/70096839-021fd480-15f6-11ea-83bb-a0b7f5aaf599.png" width="200"/>
<img src="https://user-images.githubusercontent.com/32419791/70096844-03e99800-15f6-11ea-9371-3bb5d76823ba.png" width="200"/>
<img src="https://user-images.githubusercontent.com/32419791/70288717-801fdf00-17a0-11ea-8a09-b3d9ffa8571e.png" width="200"/>

## Quick start
```bash
git clone https://github.com/louisLouL/avalon-helper
cd avalon-helper
npm install
npm start
```
and go to http://localhost:3000 to check it out. 

** If you are viewing it on Chrome(desktop)**, press ```Ctrl + Shift + I``` and then ```Ctrl + Shift + M``` to
switch the view from standard web view to mobile device view for better experience. 

## Technology details
### Overview
This project doesn't require backend, all the state is persisted in Redux and Redux itself is persisted in localstorage.

During the game, the user is required to input any voting events. By doing so, Redux will keep a copy of game statistics which is 
the input of any analytic features.

In anytime, user can check out the analytics result. The overall idea is ```analytics = f(state)``` and this function will be called
each time when there is a new voting event.

The view layer is quite simple, it uses material UI to render everything in state tree.

### State Design

```typescript
export interface State {
    players: string[],
    showNewVoteEditor: boolean,
    showUpdateVoteEditor: boolean,
    currentLocation: string,
    voteHistory: VoteRecord[],
    playerProfiles: PlayerProfile[]
}

export interface VoteRecord {
    id: number,
    candidates: boolean[], // candidates[i] = true means player[i] is one of the candidates of this vote
    votedYes: boolean[],   // votedYes[i] = true means this player votes yes for this candidates set
    isQuest: boolean,      // If the vote turns into a quest
    isSuccessful: boolean, // If this quest is successful
    note: string
}

export interface PlayerProfile {
    id: number,
    name: string,
    questParticipated: number[],
    beVotedHistory: boolean[][], // beVotedHistory[i][j] means in ith vote where this player is a candidate, player[j] voted yes
    voteHistory: boolean[][],    // voteHistory[i][j] means in ith vote, this player votes yes to player[j]
    abnormalBehaviors: AbnormalBehaviors[] // Any abnormal behaviors
}
```

### Core statistics
Since we have everything in the state tree, calculating some statistics becomes trivial. The statistics is calculated directly 
in view layer/ ```src/pages/player/player.tsx```

Note: Embedding calculation in view layer is generally not a good practice. I am doing this only because the so called statistics 
is more like a simple rendering other than actual compute. See the example below.

```typescript jsx
<ListItem>
    <ListItemText primary="ApproveRate" secondary={`${yesCount} / ${history.length}`}/>
</ListItem>
``` 

On the contrary, for abnormal behaviors, because they requires real computation, I am persisting them in state tree.

### Abnormal behaviors
Spotting any abnormal behaviors help the user make informed decisions. To do that, each time a new vote is recorded, a 
set of analyzers will perform a full check in reducer.ts

For example changing altitude towards a player is a behavior needs attention. Thus, we have the changeOfIdeaAnalyzer
```typescript
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

```

The logic is when you have at least 3 votes, if your altitude towards ```player[i]``` is different between ```vote[i]``` and ```vote[i-1]```, 
then there must be some reasons...

All the analyzers are created in ```src/store/reducers/abnormalBehaviorAnalyzer.ts```, feel free to add more.

## Improvement
Since this is a purely static application, I find it might be a good idea to 
convert it into react native. In that case, we don't even need any web servers
to host it.

