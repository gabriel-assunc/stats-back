import { z } from "zod";

const BasketSchema = z.object({
    id: z.string().optional(),
    score: z.string(),
    min: z.number(),
    fgm: z.number(),
    fga: z.number(),
    fg: z.number(),
    three_pointers: z.number(),
    three_attempted: z.number(),
    three_porcentage: z.number(),
    ftm: z.number(),
    fta: z.number(),
    ft_porcentage: z.number(),
    ts_porcentage: z.number(),
    oreb: z.number(),
    dreb: z.number(),
    reb: z.number(),
    ast: z.number(),
    stl: z.number(),
    blk: z.number(),
    tov: z.number(),
    pf: z.number(),
    pts: z.number(),
    plus_minus: z.number(),
})

export type StatsType = z.infer<typeof BasketSchema>