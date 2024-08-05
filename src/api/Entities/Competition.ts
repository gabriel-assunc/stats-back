import { CompetitionType } from "../Interfaces/CompetitionSchema";

export class Competition {
    private props: CompetitionType;

    constructor(competition: CompetitionType) {
        this.props = competition
    }

    get id() {
        return this.props.id
    }

    get name() {
        return this.props.name
    }

    get region() {
        return this.props.region
    }

    get season() {
        return this.props.season
    }

    get categoryId() {
        return this.props.categoryId
    }

    get teamsId() {
        return this.props.teamsId
    }

    toObject() {
        return {
            id: this.id,
            name: this.name,
            region: this.region,
            season: this.season,
            categoryId: this.categoryId,
            teamsId: this.teamsId,
        }
    }
}