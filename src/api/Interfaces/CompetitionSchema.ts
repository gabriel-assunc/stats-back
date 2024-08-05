import { z } from "zod";

export const CompetitionSchema = z.object({
    id: z.string().uuid().nullable(),
    name: z.string().min(2),
    region: z.string().min(2),
    season: z.string().min(2),
    categoryId: z.string().uuid(),
    teamsId: z.string().array().nullable()
})

export type CompetitionType = z.infer<typeof CompetitionSchema>;