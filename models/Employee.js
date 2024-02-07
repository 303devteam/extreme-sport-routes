import { DataTypes } from "sequelize";
import sequelize from "./seq.js";

const Employee = sequelize.define('Employee', {
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
    userType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'employees',
    createdAt: false,
    updatedAt: false
})

export default Employee;