import Membership from '../models/Membership.js';
import Payment from '../models/Payment.js';
import Package from '../models/Package.js';

const MembershipController = {
    getAllMemberships: async (req, res) => {
        const memberships = await Membership.findAll();
        res.json(memberships);
    },

    getByUser: async (req, res) => {
        const memberId = req.params.id;
        const memberships = await Membership.findAll({ where: { memberId } });
        res.json(memberships);
    },

    getMembershipById: async (req, res) => {
        const membership = await Membership.findByPk(req.params.id);
        res.json(membership);
    },

    addMembership: async (req, res) => {
        try {
            const membership = await Membership.create(req.body);
            await Payment.create({ paymentDate: new Date(), membershipId: req.body.id });

            res.json(membership);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },


    updateMembership: async (req, res) => {
        try {
            const membership = await Membership.findByPk(req.params.id);
            if(!membership) {
                return res.status(404).json({ error: 'Membership not found' });
            }
            await membership.update(req.body);
            res.json(membership);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteMembership: async (req, res) => {
        const membership = await Membership.findByPk(req.params.id);
        await membership.destroy();
        res.json({ message: "Membership deleted" });
    },

    extendMembership: async (req, res) => {
        try {
            const membership = await Membership.findOne({ where: { id: req.params.id } });
            const _package = await Package.findByPk(membership.packageId);
            
            if (!membership) {
                return res.status(404).json({ error: 'Membership not found' });
            }

            const currentDate = new Date();
            const endDate = new Date(membership.endDate);

            if (endDate < currentDate || membership.numberOfSessions == 0) {
                if(_package.timeUnit == 'Months') {
                    const newEndDate = new Date()
                    newEndDate.setDate(newEndDate.getDate() + 30)

                    if(membership.numberOfSessions == 0) {
                        await membership.update({ endDate: newEndDate, startDate: currentDate, numberOfSessions: _package.numberOfSessions });
                    } else {
                        await membership.update({ endDate: newEndDate, startDate: currentDate });
                    }

                    Payment.create({ paymentDate: new Date(), membershipId: req.params.id, visible: false });

                    res.status(200).json({ message: 'Membership extended' });
                } else {
                    const newEndDate = new Date()
                    newEndDate.setDate(newEndDate.getDate() + 7)

                    if(membership.numberOfSessions == 0) {
                        await membership.update({ endDate: newEndDate, startDate: currentDate, numberOfSessions: _package.numberOfSessions });
                    } else {
                        await membership.update({ endDate: newEndDate, startDate: currentDate });
                    }

                    Payment.create({ paymentDate: new Date(), membershipId: req.params.id, visible: false });

                    res.status(200).json({ message: 'Membership extended' });
                }
            } else {
                res.status(400).json({ message: 'Membership cannot be extended' });
            }
        } catch (error) {
            console.error('Error extending membership:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    checkIn: async (req, res) => {
        try {
            const membership = await Membership.findOne({ where: { id: req.params.id } });
            if (!membership) {
                return res.status(404).json({ error: 'Membership not found' });
            }
            const currentDate = new Date();
            const startDate = new Date(membership.startDate);
            const endDate = new Date(membership.endDate);

            if(membership.present) {
                await membership.update({ present: false });
                return res.status(200).json({ message: 'Check-out successful' });
            } else {
                if(membership.numberOfSessions > 0 || membership.numberOfSessions < 0) {
                    if (startDate <= currentDate && currentDate <= endDate) {
                        if(membership.numberOfSessions > 0) {
                            await membership.update({ numberOfSessions: membership.numberOfSessions - 1});
                        }
                        await membership.update({ present: true });
                        return res.status(200).json({ message: 'Check-in successful' });
                    } else {
                        return res.status(400).json({ message: 'Check-in failed' });
                    }
                } else {
                    return res.status(400).json({ message: 'Check-in failed' });
                }
            }
        } catch (error) {
            console.error('Error checking in:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }



};

export default MembershipController;