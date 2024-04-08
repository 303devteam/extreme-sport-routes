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
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    numberOfSessions: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    present: {
        type: DataTypes.BOOLEAN
    },
    lastCheckin: {
        type: DataTypes.DATEONLY
    }
},{
    tableName: 'memberships',
    createdAt: false,
    updatedAt: false
}
);

export default Membership;