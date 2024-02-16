const log = require('../utils/logger');
const { fromPairs } = require('lodash');
const { hashPassword, isLoggedIn } = require('../middleware/isLoggedIn.js');
const {
  users,
  user_roles,
  tbl_user_companies,
  companies,
} = require('../models');
const { returnJWT } = require('../middleware/jwt-service');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

const signUp = async (userData) => {
  try {
    // 1. Validate user data
    if (
      !userData.email ||
      !userData.password ||
      !userData.firstname ||
      !userData.lastname
    ) {
      return {
        status: 400,
        message: 'Email, password, firstname, and lastname are required',
      };
    }

    // 2. Check if user already exists
    const existingUser = await users.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      return {
        status: 400,
        message: 'Email already registered',
      };
    }

    // 3. Hash the password
    const hashedPass = await hashPassword(userData.password);

    // 4. Save the new user to the database
    const newUser = await users.create({
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      password: hashedPass,
      roleid: 3, // Set roleId to 3 as a user
    });

    return {
      status: 201, // 201 means resource created
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
      },
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};

const createUser = async (body, user, companyID) => {
  try {
  
    let hashedPass = await hashPassword(body.password);
    let roleId;
    if(body.userType == 'manager'){
      roleId = 1
    }
    if(body.userType == 'driver'){
      roleId = 3
    }
    let createdUser = await users.create({
      ...body,
      password: hashedPass,
      roleId: roleId,
      childOf: user.childOf || user.id,
    });
    
    let company = await companies.findOne({
      where: { id: companyID },
    });
    if (company) {
      await tbl_user_companies.create({
        companyId: company.id,
        user_id: createdUser.id,
      });
    }

    return {
      status: 200,
      message: 'User created successfully',
      station: createdUser,
    };
  } catch (error) {
    console.log("_________error", error)
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};

const getAllUsers = async (
  page = 1,
  sortBy = [['id', 'ASC']],
  showing = 10,
  user,
  companyquery
) => {
  // console.log("__________user", user)
  // let company = await tbl_user_companies.findOne({
  //   where: { user_id: user.id },
  // });

//   if (user.userType == 'manager') {
//     const companydata = await companies.findOne({
//       where: { id: company.companyId },
//       include: [
//         {
//           model: users,
//           as: 'users',
//         },
//       ],
//     });

//     if (!companydata) {
//       return {
//         status: 400,
//         message: 'No Company found',
//       };
//     }

//     let allUsers = companydata.users;

//     if (!allUsers) {
//       return {
//         status: 400,
//         message: 'No User found',
//       };
//     }
// console.log("___________start", users)
//    console.log("______________________", allUsers.length)
//     return {
//       status: 200,
//       message: 'User found',
//       users: allUsers,
//     };
//   }

  try {
    // let allUsers = await users.findAll({
    //   where : {
    //     isAdmin : { [Op.not] : true },
    //   },
    //   limit: showing,
    //   offset: page * showing,
    //   order: sortBy
    // });

    if(!companyquery){
      return {
        status : 403,
        message : "Company is required"
      }
    }
    let allUsers = await companies.findOne({
      where: {
        id: companyquery,
      },
      include: [
        {
          model: users,
          as: 'users',
        },
      ],
    });

    allUsers = allUsers.users;

    if (!allUsers) {
      return {
        status: 400,
        message: 'No User found',
      };
    } else {
    
      return {
        status: 200,
        message: 'User found',
        users: allUsers,
      };
    }
  } catch (error) {
    console.log("___________error", error)
    // log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};
const getUsersInfo = async () => {
  try {
    let userCount = await users.count({
      where: {
        isAdmin: { [Op.not]: true },
      },
    });

    if (!userCount) {
      return {
        status: 400,
        message: 'No User found',
      };
    } else {
      return {
        status: 200,
        message: 'User found',
        count: userCount,
        page: Math.ceil(userCount / 10),
      };
    }
  } catch (error) {
    console.log("___________________", error)
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};

const userLogin = async (credentials) => {
  try {
    credentials.email = credentials.email.toLowerCase();
    let user = await users.findOne({
      where: { email: credentials.email },
    });
    if (!user) {
      return {
        status: 401,
        message: 'Invalid email',
      };
    }

    console.log("___________credentials", credentials)
    const isMatch = await bcrypt.compare(credentials.password, user.password);
    console.log("_______isMatch", isMatch)
    if (!isMatch) {
      return {
        status: 401,
        message: 'Invalid password!',
      };
    }
    console.log(isMatch);
    // if (!user.isAdmin) {
    //   return {
    //     status: 404,
    //     message: "You do not have the permission to access this resource",
    //   };
    // }

    const jwtExpirey = 60 * 60 * 1000 * 30;
    let userData = user.dataValues;
    delete userData.password;
    delete userData.oldPassword;
    delete userData.repassword;
    const jwt = await returnJWT(userData, jwtExpirey);
    //   let session = await createSession(user.id);
    return {
      status: 200,
      message: 'User login is valid.',
      firstName: user.firstname,
      roleId: user.roleid,
      lastName: user.lastname,
      email: user.email,
      jwt: jwt,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};
const userLogout = async (credentials) => {
  try {
  } catch (error) {
    log.info(error);
  }
};
const updateUser = async (id, body) => {
  try {
    const updatedUser = await users.update(body, {
      where: { id },
      returning: true,
    });
    return {
      status: 200,
      message: `User updated successfully`,
      user: updatedUser,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};

const updateUserData = async (body , id , userId) => {
  try {
    console.log("_____it's coming here")
    console.log("_________body", body )
    console.log("____________id ", id )
    console.log("____________userid ", userId)
    const userData = await users.findOne({where:{id: userId}});
    if(userData.roleid == 3){
      return {
        status: 403,
        message: "You are not authorized to access this resource"
      }
    }
     if(body.password){
      body.password = await hashPassword(body.password);
     }
    const updatedUser = await users.update(body, {
      where: { id },
      returning: true,
    });
    console.log("_______", updatedUser)
    return {
      status: 200,
      message: `User updated successfully`,
      user: updatedUser,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};

const deleteUser = async (id, user) => {
  try {
    const userData = await users.findOne({where:{id: user.id}});
    if(userData.roleid == 3){
      return {
        status: 403,
        message: "You are not authorized to access this resource"
      }
    }
    const deletedUser = await users.destroy({
      where: {
        [Op.and]: [
          { id: id },
          {
            childOf: {
              [Op.not]: null,
            },
          },
        ],
      },
    });
    if (deletedUser == 0) {
      return {
        status: 400,
        message: 'User Cannot be deleted',
      };
    } else {
      return {
        status: 200,
        message: 'User deleted successfully',
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

const getAllDrivers = async (user) => {
  console.log(user.userType);
  if (user.userType == 'manager') {
    let companyAdmin = await users.findOne({
      where: {
        id: user.id,
      },
    });
    if (!companyAdmin)
      return {
        status: 400,
        message: 'No routes found',
      };
    if (companyAdmin.dataValues.childOf) {
      user.id = companyAdmin.dataValues.childOf;
    }
  }
  try {
    let allDrivers = await users.findAll({
      where: {
        userType: 'driver',
        [user.userType == 'manager' ? 'childOf' : 'activestatus']:
          user.userType == 'manager' ? user.id : null,
      },
    });

    if (!allDrivers) {
      return {
        status: 400,
        message: 'No Driver found',
      };
    } else {
      return {
        status: 200,
        message: 'Driver found',
        drivers: allDrivers,
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

// add user to role
const addUserToRole = async (userId, roleId) => {
  try {
    let user = await users.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return {
        status: 400,
        message: 'User not found',
      };
    }

    let userRole = await user_roles.create({
      userId: userId,
      roleId: roleId,
    });
    return {
      status: 200,
      message: 'User added to role successfully',
      userRole: userRole,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: 'Something went wrong',
    };
  }
};
const getUserById = async (id) => {
  try {
    if (!id || id == null) {
      return {
        status: 409,
        message: 'Please Provide User Id',
      };
    }
    console.log('TESTTTTTTTTT', id);
    const userInfo = await users.findOne({
      where: { id },
      include: [
        {
          model: companies,
          as: 'companies',
          through: { attributes: [] }, // This ensures only the company data is returned, not the junction table data
        },
      ],
    });
    // const companies = await tbl_user_companies.findAll({
    //   where: { user_id: id },
    // });
    // console.log('COMPANY', companies);
    if (!userInfo) {
      return {
        status: 404,
        message: 'User Not Found',
      };
    }
    return {
      status: 200,
      message: 'User Found Successfully',
      data: userInfo,
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
  signUp,
  createUser,
  getAllUsers,
  getUsersInfo,
  updateUser,
  deleteUser,
  userLogin,
  userLogout,
  getAllDrivers,
  updateUserData,
  getUserById,
};
