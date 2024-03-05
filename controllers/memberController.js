import Member from '../models/Member.js';

const MemberController = {
    getAllMembers: async (req, res) => {
        const members = await Member.findAll();
        res.json(members);
    },
    
    getMemberById: async (req, res) => {
        const member = await Member.findByPk(req.params.id);
        res.json(member);
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
