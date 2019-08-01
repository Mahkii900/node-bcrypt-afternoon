module.exports = {
    dragonTreasure: async (req, res) => {
        const db = req.app.get('db')
        const dragTreas = await db.get_dragon_treasure(1)
        res.status(200).send(dragTreas)
    },

    getUserTreasure: async (req, res) => {
        const db = req.app.get('db')
        const userTreas = await db.get_user_treasure(req.session.user.id)
        res.status(200).send(userTreas)
    }
}