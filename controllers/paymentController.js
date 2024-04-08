import Payment from '../models/Payment.js';
import Member from '../models/Member.js';
import Membership from '../models/Membership.js';
import Package from '../models/Package.js';
import { Op } from 'sequelize';

Member.hasMany(Membership);
Membership.belongsTo(Member);

Package.hasMany(Membership);
Membership.belongsTo(Package);

Membership.hasMany(Payment);
Payment.belongsTo(Membership);

const PaymentController = {
    getAllPayments: async (req, res) => {
        try {
            const payments = await Payment.findAll();
            res.json(payments);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getPaymentById: async (req, res) => {
        try {
            const payment = await Payment.findByPk(req.params.id);
            if (!payment) {
                return res.status(404).json({ error: 'Payment not found' });
            }
            res.json(payment);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getPaymentsByDate: async (req, res) => {
        const startDate = new Date(req.params.startDate);
        const endDate = new Date(req.params.endDate);
        try {
            const payments = await Payment.findAll({
                include: [
                    {
                        model: Membership,
                        include: [
                            {
                                model: Package,
                            },
                            {
                                model: Member,
                            }
                        ]
                    }
                ],
                where: {
                    paymentDate: {
                        [Op.gte]: req.params.startDate,
                        [Op.lte]: req.params.endDate
                    }
                }
            });
            res.json(payments);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    

    addPayment: async (req, res) => {
        try {
            const payment = await Payment.create(req.body);
            res.status(201).json(payment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updatePayment: async (req, res) => {
        try {
            const payment = await Payment.findByPk(req.params.id);
            if (!payment) {
                return res.status(404).json({ error: 'Payment not found' });
            }
            await payment.update(req.body);
            res.json(payment);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    deletePayment: async (req, res) => {
        try {
            const payment = await Payment.findByPk(req.params.id);
            if (!payment) {
                return res.status(404).json({ error: 'Payment not found' });
            }
            await payment.destroy();
            res.json({ message: 'Payment deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export default PaymentController;
