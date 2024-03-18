import Member from '../models/Member.js';
import Membership from '../models/Membership.js';
import Package from '../models/Package.js';
import Payment from '../models/Payment.js';

Member.hasMany(Membership); // A member can have multiple memberships
Membership.belongsTo(Package); // A membership belongs to a package
Membership.hasMany(Payment); // A membership can have multiple payments
Payment.belongsTo(Membership); // A payment belongs to a membership


const MemberController = {
    getAllMembers: async (req, res) => {
        const members = await Member.findAll({
            include: [
                {
                    model: Membership,
                    include: [
                        {
                            model: Package,
                        },
                        {
                            model: Payment,
                        }
                    ]
                }
            ],
            limit: 10,
            offset: 0
        });
        res.json(members);
    },
    
    getMemberById: async (req, res) => {
        const member = await Member.findByPk(req.params.id);
        res.json(member);
    },

    getMemberByMembership: async (req, res) => {
        try {
            const member = await Member.findOne({
                include: [
                    {
                        model: Membership,
                        where: { id: req.params.id },
                        include: [
                            {
                                model: Package,
                            }
                        ]
                    }
                ]
            });
            if (!member) {
                return res.status(404).json({ error: 'Member not found' });
            }
            res.json(member);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    addMember: async (req, res) => {
        try {
            const member = await Member.create(req.body);
            res.json(member);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    updateMember: async (req, res) => {
        try {
            const member = await Member.findByPk(req.params.id);
            if(!member) {
                return res.status(404).json({ error: 'Member not found' });
            }
            await member.update(req.body);
            res.json(member);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    deleteMember: async (req, res) => {
        const member = await Member.findByPk(req.params.id);
        await member.destroy();
        res.json({ message: "Member deleted" });
    },
};

export default MemberController;
