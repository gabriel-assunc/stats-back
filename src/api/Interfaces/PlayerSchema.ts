import { z } from "zod";

export const PlayerSchema = z.object({
    id: z.string().uuid().optional(),
    teamId: z.string().uuid(),
    name: z.string(),
})

export type PlayerType = z.infer<typeof PlayerSchema>