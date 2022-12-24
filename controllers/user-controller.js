const log = require("../utils/logger");
const { fromPairs } = require("lodash");
const { hashPassword, isLoggedIn } = require("../middleware/isLoggedIn.js");
const { users } = require("../models");
const { returnJWT } = require("../middleware/jwt-service");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const createUser = async (body) => {
  try {
    let hashedPass = await hashPassword(body.password);
    let createdUser = await users.create({ ...body, password: hashedPass });
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
        message: "Invalid email or password!",
      };
    }
    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) {
      return {
        status: 401,
        message: "Invalid email or password!",
      };
    }
    if (!user.isAdmin) {
      return {
        status: 404,
        message: "You do not have the permission to access this resource",
      };
    }

    const jwtExpirey = 60 * 60 * 1000 * 30;
    const jwt = await returnJWT(user, jwtExpirey);
    //   let session = await createSession(user.id);
    return {
      status: 200,
      message: "User login is valid.",
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

module.exports = {
  createUser,
  getAllUsers,
  getUsersInfo,
  updateUser,
  deleteUser,
  userLogin,
  userLogout,
};
