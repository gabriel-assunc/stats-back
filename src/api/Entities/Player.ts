import { PlayerType } from "../Interfaces/PlayerSchema";

type PlayerProps<T> = {
    stats?: T[]
} & PlayerType

export class Player<T> {

    private props: PlayerProps<T>

    constructor(player: PlayerType, stats: T[]) {
        this.props = { ...player, stats: stats }
    }

    get id() {
        return this.props.id
    }

    get teamId() {
        return this.props.teamId
    }

    get name() {
        return this.props.name
    }

    get stats() {
        return this.props.stats
    }

    set stats(stats: T[]) {
        this.props.stats = stats
    }

    toObject() {
        return {
            id: this.id,
            teamId: this.teamId,
            name: this.name,
            stats: this.stats
        }
    }
}