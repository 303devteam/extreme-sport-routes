import { DataTypes } from "sequelize";
import sequelize from './seq.js';

const Package = sequelize.define('Package', {
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timeUnit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    numberOfSessions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    periodOfDay: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'packages',
    createdAt: false,
    updatedAt: false
})

export default Package;