const { transporter } = require('../middleware/email-otp');
const { companies, users, tbl_user_companies } = require('../models');
const log = require('../utils/logger');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const createCompany = async (body) => {
  try {
    if (!body.password) {
      return {
        status: 400,
        message: 'Password is required',
      };
    }

    if (!body.name || !body.email) {
      return {
        status: 400,
        message: 'Company name and email are required',
      };
    }

    console.log('body : ', body);

    const password = await bcrypt.hash(body.password, 10);
    body.password = password;

    const createdCompany = await companies.create(body);
    return {
      status: 200,
      message: 'Company created successfully',
      company: createdCompany,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};

const getAllCompanies = async (page = 1, sortBy = undefined, showing = 10) => {
  try {
    const company = await (sortBy
      ? companies.findAll({
          limit: showing,
          offset: page * showing,
          order: JSON.parse(sortBy),
          attributes: ['id', 'name', 'logo', 'phone', 'address'],
        })
      : companies.findAll({
          attributes: ['id', 'name', 'logo'],
        }));

    for (let index = 0; index < company.length; index++) {
      const elem = company[index];
      const companyManagerInfo = await users.findByPk(elem.id);

      company[index].dataValues['Manager First Name'] =
        companyManagerInfo.dataValues.firstname;
      company[index].dataValues['Manager Last Name'] =
        companyManagerInfo.dataValues.lastname;
      company[index].dataValues.email = companyManagerInfo.dataValues.email;
      // company[index].dataValues.password =
      //   companyManagerInfo.dataValues.password;
    }

    const mappedData = company.map((elem) => {
      return {
        id: elem.id,
        email: elem.email,
        'Company Name': elem.name,
        'Company Logo': elem.logo,
        'Company Phone': elem.phone,
        'Company Address': elem.address,
        'Manager First Name': elem.dataValues['Manager First Name'],
        'Manager Last Name': elem.dataValues['Manager Last Name'],
        // password: elem.password,
      };
    });

    if (!company.length) {
      return {
        status: 200,
        message: 'No companies found',
      };
    } else {
      return {
        status: 200,
        message: 'Companies Found',
        companies: mappedData,
      };
    }
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};

const getCompanyByUserId = async (id) => {
  try {
    const userData = await users.findByPk(id);
    if (!userData) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    const company = await companies.findAll({ where: { managerId: id } });
    if (!company) {
      return {
        status: 200,
        message: 'No company found',
      };
    } else {
      return {
        status: 200,
        message: 'Company found',
        company: company,
      };
    }
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};

const updateCompany = async (id, body, file) => {
  try {
    // const password = await bcrypt.hash(body.password, 10);
    const userUpdatedBody = {
      firstname: body['Manager First Name'],
      lastname: body['Manager Last Name'],
      email: body.email,
      // password: password,
    };
    if (file) {
      userUpdatedBody.logo = file.path;
    }
    await users.update(userUpdatedBody, {
      where: { id: id },
    });

    const updatedCompanyBody = {
      name: body['Company Name'],
      phone: body['Company Phone'],
      address: body['Company Address'],
    };

    if (file) {
      updatedCompanyBody.logo = file.path;
    }

    const updatedCompany = await companies.update(updatedCompanyBody, {
      where: { id: id },
    });

    return {
      status: 200,
      message: 'Company updated successfully',
      company: updatedCompany,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};

const deleteCompany = async (id) => {
  try {
    const deletedCompany = await companies.destroy({ where: { id: id } });

    if (!deletedCompany) {
      return {
        status: 400,
        message: 'Company not found',
      };
    } else {
      return {
        status: 200,
        message: 'Company deleted successfully',
      };
    }
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};

const getCompaniesInfo = async () => {
  try {
    let companiesCount = await companies.count();

    if (!companiesCount) {
      return {
        status: 400,
        message: 'No Companies found',
      };
    } else {
      return {
        status: 200,
        message: 'Companies found',
        count: companiesCount,
        page: Math.ceil(companiesCount / 10),
      };
    }
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};

const createCompanyWithManager = async (file, body) => {
  try {
    const existingcompany = await companies.findOne({
      where: { email: body['email'] },
    });

    if (existingcompany) {
      return {
        status: 400,
        message: 'Company already exists',
      };
    }

    const existinguser = await users.findOne({
      where: { email: body.email },
    });

    if (existinguser) {
      return {
        status: 400,
        message: 'User already exists',
      };
    }

    const password = await bcrypt.hash(body.password, 10);

    if (!body['Company Name'] || !body['email']) {
      return {
        status: 400,
        message: 'Company name and email are required',
      };
    }
    if (
      !body['Manager First Name'] ||
      !body['Manager Last Name'] ||
      !body.email ||
      !body.password
    ) {
      return {
        status: 400,
        message: 'Manager name, email and password are required',
      };
    }

    if (existinguser) {
      return {
        status: 400,
        message: 'User already exists',
      };
    }

    body.password = password;

    const user = await users.create({
      firstname: body['Manager First Name'],
      lastname: body['Manager Last Name'],
      email: body.email,
      password: password,
      userType: 'manager',
      roleid: 1,
      logo: file ? file.path : null,
    });

    const createdCompany = await companies.create({
      name: body['Company Name'],
      // email: body['Company Email'],
      // email: body['email'],
      phone: body['Company Phone'],
      address: body['Company Address'],
      managerId: user.id,
      logo: file ? file.path : null,
    });

    tbl_user_companies.create({
      companyId: createdCompany.id,
      user_id: user.id,
    });

    createdCompany.user = user;

    let htmlTemplate = await fs.readFile(
      './templates/email-verification.html',
      'utf8'
    );
    htmlTemplate = htmlTemplate.replace(
      '{{message}}',
      `Your company has been registered Successfully.
             Here are the Credentials of your Manager.
             email: ${user.email},
             password: ${body.password}
             Note: Do not share these credentials with anyone.
            `
    );
    const mailOptions = {
      from: 'thomas@shiftyy.com', // sender address
      to: `${createdCompany.email}`, // list of receivers
      subject: `Company with name ${createdCompany.name} has been Registered`, // Subject line
      html: htmlTemplate,
    };

    if (!createdCompany) {
      return {
        status: 400,
        message: 'Company not created',
      };
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('transporter Error =======>>> ', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return {
      status: 200,
      message: 'Company created successfully',
      company: createdCompany,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};

module.exports = {
  createCompanyWithManager,
  createCompany,
  getAllCompanies,
  getCompanyByUserId,
  updateCompany,
  deleteCompany,
  getCompaniesInfo,
};
