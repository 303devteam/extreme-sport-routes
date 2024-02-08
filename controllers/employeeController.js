import Employee from '../models/Employee.js';
import CryptoJS from 'crypto-js';

const EmployeeController = {
    
    getAllEmployees: async (req, res) => {
        try {
            const employees = await Employee.findAll();
            res.json(employees);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    
    getEmployeeById: async (req, res) => {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.json(employee);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    
    addEmployee: async (req, res) => {
        try {
            req.body.passwordHash = CryptoJS.SHA256(req.body.passwordHash).toString()
            const employee = await Employee.create(req.body);
            res.status(201).json(employee);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    
    updateEmployee: async (req, res) => {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            req.body.passwordHash = CryptoJS.SHA256(req.body.passwordHash).toString()
            await employee.update(req.body);
            res.json(employee);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    
    deleteEmployee: async (req, res) => {
        try {
            const employee = await Employee.findByPk(req.params.id);
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            await employee.destroy();
            res.json({ message: 'Employee deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    login: async (req, res) => {
        try {
            const employee = await Employee.findOne({
                where: {
                    email: req.body.email,
                    passwordHash: CryptoJS.SHA256(req.body.password).toString()
                }
            })

            if(!employee){
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            res.json(employee);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

};

export default EmployeeController;
