import { DataTypes } from "sequelize";
import sequelize from './seq.js';

const Payment = sequelize.define('Payment', {
    paymentDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'payments',
    createdAt: false,
    updatedAt: false
});

export default Payment;