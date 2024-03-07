import Membership from '../models/Membership.js';

const MembershipController = {
    getAllMemberships: async (req, res) => {
        const memberships = await Membership.findAll();
        res.json(memberships);
    },

    getMembershipById: async (req, res) => {
        const membership = await Membership.findByPk(req.params.id);
        res.json(membership);
    },

    addMembership: async (req, res) => {
        try {
            const membership = await Membership.create(req.body);
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


    checkMembershipValidity: async (req, res) => {
        try {
            
            const memberId = req.params.id; 
            const membership = await Membership.findOne({ where: { memberId } });

            if (!membership) {
                return res.status(404).json({ error: 'Membership not found' });
            }
            const currentDate = new Date();
            const endDate = new Date(membership.endDate);
            if (endDate < currentDate) {
                return res.json({ isValid: false, message: 'Membership is expired', currentDate, endDate: membership.endDate});
                
            }
            res.json({ isValid: true, message: 'Membership is valid', currentDate, endDate: membership.endDate});
            
        } catch (error) {
            console.error('Error checking membership validity:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    extendMembership: async (req, res) => {
        try {
            const memberId = req.params.id;
            const membership = await Membership.findOne({ where: { memberId } });
            
            if (!membership) {
                return res.status(404).json({ error: 'Membership not found' });
            }

            const currentDate = new Date();
            const endDate = new Date(membership.endDate);

            if (endDate < currentDate) {
               
                const newEndDate = new Date(endDate);
                newEndDate.setDate(newEndDate.getDate() + membership.numberOfSessions);
                await membership.update({ endDate: newEndDate });
                return res.json({ message: 'Membership extended', newEndDate });
            }
          

         
        } catch (error) {
            console.error('Error extending membership:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }



};

export default MembershipController;