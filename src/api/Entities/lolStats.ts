import { LolStatsType } from "../Interfaces/Stats/LolStatsSchema";

export class lolStat {
    private prop: LolStatsType

    constructor(prop: LolStatsType) {
        this.prop = prop
    }

    get id() {
        return this.prop.id
    }

    get teamId() {
        return this.prop.teamId
    }

    get version() {
        return this.prop.version
    }

    get win() {
        return this.prop.win
    }

    get kills() {
        return this.prop.kills
    }

    get dragons() {
        return this.prop.dragons
    }

    get baron() {
        return this.prop.baron
    }

    get towers() {
        return this.prop.towers
    }

    get gold() {
        return this.prop.gold
    }

    get voids() {
        return this.prop.voids
    }

    get time() {
        return this.prop.time
    }

    get firstBlood() {
        return this.prop.firstBlood
    }

    get firstBrick() {
        return this.prop.firstBrick
    }

    get blueSide() {
        return this.prop.blueSide
    }

    get game() {
        return this.prop.game
    }

    get date() {
        return this.prop.date
    }

    get playedAgainst() {
        return this.prop.playedAgainst
    }

    toObject() {
        return {
            id: this.id,
            teamId: this.teamId,
            version: this.version,
            win: this.win,
            kills: this.kills,
            dragons: this.dragons,
            baron: this.baron,
            towers: this.towers,
            gold: this.gold,
            voids: this.voids,
            time: this.time,
            firstBlood: this.firstBlood,
            firstBrick: this.firstBrick,
            blueSide: this.blueSide,
            game: this.game,
            playedAgainst: this.playedAgainst,
            date: this.date
        }
    }
}