const { Usuario } = require('../models/');
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
const servToken = require('../services/token')


module.exports = {

    list: async (req, res, next) => {
        try {
            const re = await Usuario.findAll()
            res.status(200).json(re)
        }
        catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }

    },
    add: async (req, res, next) => {

        try {
            req.body.password = await bcrypt.hash(req.body.password, 10)
            const re = await Usuario.create(req.body)
            res.status(200).json(re)
        }

        catch (error) {
            res.status(500).send({ 'error': 'Oops paso algo' })
            next(error)
        }



    },

    login: async (req, res, next) => {

        try {
            const user = await Usuario.findOne({ where: { email: req.body.email } })
            if (user) {
                // Evaluar contraseña 
                const contrasenhaValida = bcrypt.compareSync(req.body.password, user.password)
                if (contrasenhaValida) {
                    const token = await servToken.encode(user.id, user.rol)

                    res.status(200).send({
                        auth: true,
                        tokenReturn: token,
                        //user : user
                    })

                } else {
                    res.status(401).send({
                        auth: false, tokenReturn: null, reason:
                            "Invalid Password!"
                    });

                }

            } else {
                res.status(404).json({ "error": "Usuario / Password invalidas" })
            }

        } catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }


    },
    update: async (req, res, next) => {
        try {
            let actPass = req.body.password
            const consulData = await Usuario.findOne({ where: { id: req.body.id } })

            if (actPass != consulData.password) {
                req.body.password = await bcrypt.hash(actPass, 10)
            }

            const re = await Usuario.update({ nombre: req.body.nombre, password: req.body.password, email: req.body.email, rol: req.body.rol }, { where: { id: req.body.id } })
            res.status(200).json(re)
        }

        catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }
    },



    deactivate: async (req, res, next) => {

        try {
            const re = await Usuario.update({ estado: 0 }, { where: { id: req.body.id } })
            res.status(200).json(re)

        }

        catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next(error)
        }
    },

    activate: async (req, res, next) => {
        try {
            const re = await Usuario.update({ estado: 1 }, { where: { id: req.body.id } })
            res.status(200).json(re)

        }

        catch (error) {
            res.status(500).json({ 'error': 'Oops paso algo' })
            next()
        }

    }


}


