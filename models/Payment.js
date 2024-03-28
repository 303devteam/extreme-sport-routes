import { DataTypes } from "sequelize";
import sequelize from './seq.js';

const Payment = sequelize.define('Payment', {
    paymentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    membershipId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'payments',
    createdAt: false,
    updatedAt: false
});

export default Payment;
