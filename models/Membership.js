import { DataTypes } from "sequelize";
import sequelize from './seq.js';

const Membership = sequelize.define('Membership', {

    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    packageId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    numberOfSessions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lastCheckin: {
        type: DataTypes.DATE,
    }
},{
    tableName: 'memberships',
    createdAt: false,
    updatedAt: false
}
);

export default Membership;