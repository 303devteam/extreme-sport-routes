import Package from '../models/Package.js';

const PackageController = {
   
    getAllPackages: async (req, res) => {
        try {
            const packages = await Package.findAll();
            res.json(packages);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    
    getPackageById: async (req, res) => {
        try {
            const pkg = await Package.findByPk(req.params.id);
            if (!pkg) {
                return res.status(404).json({ error: 'Package not found' });
            }
            res.json(pkg);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    
    addPackage: async (req, res) => {
        try {
            const pkg = await Package.create(req.body);
            res.status(201).json(pkg);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

   
    updatePackage: async (req, res) => {
        try {
            const pkg = await Package.findByPk(req.params.id);
            if (!pkg) {
                return res.status(404).json({ error: 'Package not found' });
            }
            await pkg.update(req.body);
            res.json(pkg);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

   
    deletePackage: async (req, res) => {
        try {
            const pkg = await Package.findByPk(req.params.id);
            if (!pkg) {
                return res.status(404).json({ error: 'Package not found' });
            }
            await pkg.destroy();
            res.json({ message: 'Package deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

export default PackageController;
