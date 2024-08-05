import { Competition } from "../Entities/Competition";

export interface CompetitionRepository {
    addCompetition(categoryUrl: string, competitions: Competition): Promise<void>
    listCompetition(categoryUrl: string): Promise<Competition[] | []>
    getCompetitionById(id: string): Promise<Competition | null>
    getSeasons(categoryUrl: string): Promise<string[] | []>
    getCompetitionBySeason(season: string, categoryUrl: string): Promise<Competition[] | []>
}