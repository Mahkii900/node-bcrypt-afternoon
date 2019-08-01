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
    },

    addUserTreasure: async (req, res) => {
        const db = req.app.get('db')
        const {treasureURL} = req.body
        const {id} = req.session.user

        const userTreasure = await db.add_user_treasure([treasureURL, id])

        res.status(200).send(userTreasure)
    },

    getAllTreasure: async (req, res) => {
        const db = req.app.get('db')
        const treas = await db.get_all_treasure()
        
        res.status(200).send(treas)
    }
}