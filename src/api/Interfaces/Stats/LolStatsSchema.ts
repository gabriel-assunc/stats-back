import { z } from "zod";

const lolStatSchema = z.object({
    id: z.string().uuid(),
    teamId: z.string().uuid(),
    version: z.string(),
    win: z.boolean(),
    kills: z.number(),
    dragons: z.number(),
    baron: z.number(),
    towers: z.number(),
    gold: z.number(),
    voids: z.number(),
    time: z.string(),
    firstBlood: z.boolean(),
    firstBrick: z.boolean(),
    blueSide: z.boolean(),
    game: z.string(),
    date: z.string()
})

export type LolStatsType = z.infer<typeof lolStatSchema>