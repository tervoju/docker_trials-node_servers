const Sequelize = require('sequelize')

module.exports = (sequelize, DataType) => {
    const User = sequelize.define('package', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        binary: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: { notEmpty: true }
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        publisher: {
            type: DataType.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    }, {
            timestamps: false
        })
    return Package
}