import { DataTypes } from "sequelize";
import sequelize from './seq.js';

const Member = sequelize.define('Member', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDay: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    tableName: 'members',
    createdAt: false,
    updatedAt: false
})

export default Member;
