import { db } from '../../src/config/db.server'
import { Category } from '../../src/api/Entities/Category'

async function seed() {
    const haveCategoryInDB = (categoryUrl: string) =>
        !!db.category.findFirst({
            where: {
                url: categoryUrl
            }
        })

    if (!haveCategoryInDB('/lol')) {
        const lolCategory = new Category({ name: 'League Of Legends', url: '/lol' })
        const basketCategory = new Category({ name: 'Basquete', url: '/basket' })

        await db.category.createMany({
            data: [lolCategory.toObject(), basketCategory.toObject()]
        })
    }

}
seed()
    .then(async () => {
        await db.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await db.$disconnect()
        process.exit(1)
    })