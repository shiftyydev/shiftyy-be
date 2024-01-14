const log = require("../utils/logger");
const { fromPairs } = require("lodash");
const { hashPassword, isLoggedIn } = require("../middleware/isLoggedIn.js");
const { users,user_roles,tbl_user_companies,companies } = require("../models");
const { returnJWT } = require("../middleware/jwt-service");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const signUp = async (userData) => {
  try {
      // 1. Validate user data
      if (!userData.email || !userData.password || !userData.firstname || !userData.lastname) {
        return {
            status: 400,
            message: "Email, password, firstname, and lastname are required",
        };
    }

      // 2. Check if user already exists
      const existingUser = await users.findOne({
          where: { email: userData.email },
      });

      if (existingUser) {
          return {
              status: 400,
              message: "Email already registered",
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
        roleid: 3,   // Set roleId to 3 as a user
    });

      return {
        status: 201, // 201 means resource created
        message: "User registered successfully",
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
          message: "Something went wrong",
      };
  }
};

const createUser = async (body,user) => {


  try {
    let hashedPass = await hashPassword(body.password);
    let createdUser = await users.create({ ...body, password: hashedPass, childOf: user.childOf || user.id });

    let company = await tbl_user_companies.findOne({
      where: { userId: user.id }
    });

    if (company) {
      await tbl_user_companies.create({
        companyId: company.companyId,
        userId: createdUser.id
      });
    }


    return {
      status: 200,
      message: "User created successfully",
      station: createdUser,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
};

const getAllUsers = async (page=1,sortBy=[['id',"ASC"]],showing=10,user,companyquery) => {

  let company = await tbl_user_companies.findOne({
    where: { userId: user.id }
  });

  if(user.userType == 'manager'){

    const companydata = await companies.findOne({
      where: { id: company.companyId },
      include: [
        {
          model: users,
          as: 'users'
        }
      ],
    });


    if (!companydata) {
      return {
        status: 400,
        message: "No Company found",
      };
    }

    let allUsers = companydata.users;

    if (!allUsers) {
      return {
        status: 400,
        message: "No User found",
      };
    }

    return {
      status: 200,
      message: "User found",
      users: allUsers,
    };
  }

  try {
    // let allUsers = await users.findAll({
    //   where : {
    //     isAdmin : { [Op.not] : true },
    //   },
    //   limit: showing,
    //   offset: page * showing,
    //   order: sortBy 
    // });

    let allUsers = await companies.findOne({
      where: { 
        name : companyquery 
       },
      include: [
        {
          model: users,
          as: 'users',
        }
      ],
    })

    allUsers = allUsers.users;

    if (!allUsers) {
      return {
        status: 400,
        message: "No User found",
      };
    } else {
      return {
        status: 200,
        message: "User found",
        users: allUsers,
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
const getUsersInfo = async () => {
  try {
    let userCount = await users.count(
      {
        where : {
          isAdmin : { [Op.not] : true }
        },
      }
    );

    if (!userCount) {
      return {
        status: 400,
        message: "No User found",
      };
    }else{
      return {
        status: 200,
        message: "User found",
        count: userCount,
        page : Math.ceil(userCount/10)
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

const userLogin = async (credentials) => {
  try {
    credentials.email = credentials.email.toLowerCase();
    let user = await users.findOne({
      where: { email: credentials.email },
    });
    if (!user) {
      return {
        status: 401,
        message: "Invalid email",
      };
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) {
      return {
        status: 401,
        message: "Invalid password!",
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
    delete userData.repassword
    const jwt = await returnJWT(userData, jwtExpirey);
    //   let session = await createSession(user.id);
    return {
      status: 200,
      message: "User login is valid.",
      firstName: user.firstname,
      lastName: user.lastname,
      email: user.email,
      jwt: jwt,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
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
      where: { id: id },
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
      message: "Something went wrong",
    };
  }
};

const deleteUser = async (id,user) => {


  try {
    const deletedUser = await users.destroy({ where: { 
      [Op.and] : [
        { id: id },
        { childOf: {
          [Op.not] : null
        }
      }
      ]
    } });
    if (deletedUser == 0) {
      return {
        status: 400,
        message: "User Cannot be deleted",
      };
    } else {
      return {
        status: 200,
        message: "User deleted successfully",
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

const getAllDrivers = async (user) => {
  console.log(user.userType);
  if(user.userType == "manager"){
    let companyAdmin = await users.findOne({
      where : {
        id : user.id
      }
    });
    if(!companyAdmin) return {
      status: 400,
      message: "No routes found",
    };
    if(companyAdmin.dataValues.childOf){
      user.id = companyAdmin.dataValues.childOf;
    }
  }
  try {
  
    let allDrivers = await users.findAll({
      where : {
        userType : 'driver',
        [user.userType == 'manager' ? 'childOf' : 'activestatus'] : user.userType == 'manager' ? user.id : null
      },
    });

    if (!allDrivers) {
      return {
        status: 400,
        message: "No Driver found",
      };
    } else {
      return {
        status: 200,
        message: "Driver found",
        drivers: allDrivers,
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
        message: "User not found",
      };
    }
    
    let userRole = await user_roles.create({
      userId: userId,
      roleId: roleId,
    });
    return {
      status: 200,
      message: "User added to role successfully",
      userRole: userRole,
    };
  } catch (error) {
    log.info(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
}

module.exports = {
  signUp,
  createUser,
  getAllUsers,
  getUsersInfo,
  updateUser,
  deleteUser,
  userLogin,
  userLogout,
  getAllDrivers
};
