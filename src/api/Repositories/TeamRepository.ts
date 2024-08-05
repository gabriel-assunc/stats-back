
export type BasketTeamType = {
    name: string,
    icon?: string,
    id: string,
    Competition?: { name: string; }
}

export interface TeamRepository {
    listTeam(categoryURL: string, competitionName: string): Promise<BasketTeamType[]>
    addTeamName(categoryURL: string, competitionName: string, teamNames: string[]): Promise<void>
    getTeam(teamId: string): Promise<BasketTeamType | null>
}