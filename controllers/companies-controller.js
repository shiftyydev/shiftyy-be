
const { companies, users, tbl_user_companies } = require("../models");
const log = require("../utils/logger");
const bcrypt = require("bcrypt");
const createCompany = async (body) => {
    try {

        if (!body.password) {
            return {
                status: 400,
                message: "Password is required"
            };
        }

        if (!body.name || !body.email) {
            return {
                status: 400,
                message: "Company name and email are required"
            };
        }

        const password = await bcrypt.hash(body.password, 10);
        body.password = password;

        const createdCompany = await companies.create(body);
        return {
            status: 200,
            message: "Company created successfully",
            company: createdCompany
        };
    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong"
        };
    }
};

const getAllCompanies = async (page = 1, sortBy = [['id', "ASC"]], showing = 10) => {
    try {
        const company = await companies.findAll({
            limit: showing,
            offset: page * showing,
            order: sortBy,
            attributes: ['id', 'name', 'email', 'phone', 'address', 'city', 'state', 'country', 'zipcode', 'activestatus']
        });

        if (!company.length) {
            return {
                status: 200,
                message: "No companies found"
            };
        } else {
            return {
                status: 200,
                message: 'Companies Found',
                companies: company
            };
        }
    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong"
        };
    }
};

const getCompany = async (id) => {
    try {
        const company = await companies.findByPk(id);
        if (!company) {
            return {
                status: 200,
                message: "No company found"
            };
        } else {
            return {
                status: 200,
                message: "Company found",
                company: company
            };
        }
    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong"
        };
    }
};

const updateCompany = async (id, body) => {
    try {
        const updatedCompany = await companies.update(body, {
            where: { id: id }
        });

        return {
            status: 200,
            message: "Company updated successfully",
            company: updatedCompany
        };
    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong"
        };
    }
};

const deleteCompany = async (id) => {
    try {
        const deletedCompany = await companies.destroy({ where: { id: id } });

        if (!deletedCompany) {
            return {
                status: 400,
                message: "Company not found"
            };
        } else {
            return {
                status: 200,
                message: "Company deleted successfully"
            };
        }
    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong"
        };
    }
};

const getCompaniesInfo = async () => {
    try {
        let companiesCount = await companies.count();

        if (!companiesCount) {
            return {
                status: 400,
                message: "No Companies found",
            };
        } else {
            return {
                status: 200,
                message: "Companies found",
                count: companiesCount,
                page: Math.ceil(companiesCount / 10)
            };
        }

    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong",
        };
    }
};

const createCompanyWithManager = async (body) => {
    try {


        if (!body['Company Name'] || !body['Company Email']) {
            return {
                status: 400,
                message: "Company name and email are required"
            };
        }

        if (!body['Manager First Name'] || !body['Manager Last Name'] || !body.email || !body.password) {
            return {
                status: 400,
                message: "Manager name, email and password are required"
            };
        }

        // find compnay and user with existing email

        const existingcompany = await companies.findOne({
            where: { email: body['Company Email'] }
        });

        if (existingcompany) {
            return {
                status: 400,
                message: "Company already exists"
            };
        }

        const existinguser = await users.findOne({
            where: { email: body.email }
        });

        if (existinguser) {
            return {
                status: 400,
                message: "User already exists"
            };
        }


        const password = await bcrypt.hash(body.password, 10);
        body.password = password;

        const user = await users.create({
            firstname: body['Manager First Name'],
            lastname: body['Manager Last Name'],
            email: body.email,
            password: password,
            userType: "manager",
            roleid: 1
        });

        const createdCompany = await companies.create({
            name: body['Company Name'], email: body['Company Email'], managerId: user.id
        });


       

        tbl_user_companies.create({
            companyId: createdCompany.id,
            userId: user.id
        });

        createdCompany.user = user;

        if (!createdCompany) return {
            status: 400,
            message: "Company not created"
        };



        return {
            status: 200,
            message: "Company created successfully",
            company: createdCompany
        };
    } catch (error) {
        log.info(error);
        return {
            status: 500,
            message: "Something went wrong"
        };
    }
}


module.exports = {
    createCompanyWithManager,
    createCompany,
    getAllCompanies,
    getCompany,
    updateCompany,
    deleteCompany,
    getCompaniesInfo
};
