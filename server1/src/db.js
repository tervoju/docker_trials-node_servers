const Sequelize = require('sequelize')
const fs = require('fs')
const path = require('path')
const config = require('./libs/config.js')
let db = null


module.exports = app => {
    console.log('+ [Loading Database]')
    if (!db) {
        console.log(config.params.dialect);
        const sequelize = new Sequelize(`{storage:${config.params.storage}, dialect: ${config.params.dialect}`)
        db = { sequelize, Sequelize, models: {} }
        const dir = path.join(__dirname, 'models')
        fs.readdirSync(dir).forEach(filename => {
            const modelDir = path.join(dir, filename)
            const model = sequelize.import(modelDir)
            db.models[model.name] = model
            console.log(`+ Model Loaded: ${filename}`)
        })
        Object.keys(db.models).forEach(key => { db.models[key].associate(db.models) })
    }
    return db
}