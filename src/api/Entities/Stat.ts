import { StatsType } from "../Interfaces/Stats/BasketStatsSchema"

export class Stat {
    private prop: StatsType

    constructor(stat: String[], id?: string) {
        const swapStats = stat.map((v, i) => i === 0 ? v.replace('\n', ' ') : new Number(v))

        this.prop = {
            id,
            score: swapStats[0].toString(),
            min: swapStats[1]?.valueOf() as number | 0,
            pts: swapStats[2]?.valueOf() as number | 0,
            reb: swapStats[3]?.valueOf() as number | 0,
            ast: swapStats[4]?.valueOf() as number | 0,
            stl: swapStats[5]?.valueOf() as number | 0,
            blk: swapStats[6]?.valueOf() as number | 0,
            fgm: swapStats[7]?.valueOf() as number | 0,
            fga: swapStats[8]?.valueOf() as number | 0,
            fg: swapStats[9]?.valueOf() as number | 0,
            three_pointers: swapStats[10]?.valueOf() as number | 0,
            three_attempted: swapStats[11]?.valueOf() as number | 0,
            three_porcentage: swapStats[12]?.valueOf() as number | 0,
            ftm: swapStats[13]?.valueOf() as number | 0,
            fta: swapStats[14]?.valueOf() as number | 0,
            ft_porcentage: swapStats[15]?.valueOf() as number | 0,
            ts_porcentage: swapStats[16]?.valueOf() as number | 0,
            oreb: swapStats[17]?.valueOf() as number | 0,
            dreb: swapStats[18]?.valueOf() as number | 0,
            tov: swapStats[19]?.valueOf() as number | 0,
            pf: swapStats[20]?.valueOf() as number | 0,
            plus_minus: swapStats[21]?.valueOf() as number | 0,
        }
    }

    toObject() {
        return this.prop
    }
}
