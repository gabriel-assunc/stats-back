import { Stat } from "../../Entities/Stat";
import { StatsRepository } from "../../Repositories/BasketStatsRpository";
import { PlayerRepository } from "../../Repositories/PlayerRepository";

export class ListBasketTeamPlayers {
    private repository: PlayerRepository<Stat>;
    private statsRepository: StatsRepository;

    constructor(repository: PlayerRepository<Stat>, statsRepository: StatsRepository) {
        this.repository = repository
        this.statsRepository = statsRepository
    }

    async execute(temaId: string) {
        const players = await this.repository.ListPlayerByTeamId(temaId)
        const teamPlayers = []
        for (let playerIndex in players) {
            const stats = await this.statsRepository.listPlayerStat(players[playerIndex].name, temaId)
            players[playerIndex].stats = stats
            teamPlayers.push({ player: players[playerIndex] })
        }

        return teamPlayers
    }
}