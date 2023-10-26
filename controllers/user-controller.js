const log = require("../utils/logger");
const { fromPairs } = require("lodash");
const { hashPassword, isLoggedIn } = require("../middleware/isLoggedIn.js");
const { users } = require("../models");
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

const createUser = async (body,userId) => {
  try {
    let hashedPass = await hashPassword(body.password);
    let createdUser = await users.create({ ...body, password: hashedPass, childOf: userId });
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

const getAllUsers = async (page=1,sortBy=[['id',"ASC"]],showing=10) => {
  try {
    let allUsers = await users.findAll({
      where : {
        isAdmin : { [Op.not] : true }
      },
      limit: showing,
      offset: page * showing,
      order: sortBy 
    });
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
    const jwt = await returnJWT(user, jwtExpirey);
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

const deleteUser = async (id) => {
  try {
    const deletedUser = await users.destroy({ where: { id: id } });
    if (deletedUser == 0) {
      return {
        status: 400,
        message: "Vehicle not found",
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

const getAllDrivers = async () => {
  try {
    let allDrivers = await users.findAll({
      where : {
        userType : 'driver'
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
