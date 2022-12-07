const _ = require("lodash");

const sendErrorResp = (error, req, resp) => {
  console.error(error);
  if (!_.isUndefined(error.response)) {
    const { status } = error.response;
    const { message } = error.response.data;
    resp.status(status).send({ message, status });
  } else {
    if (!_.isUndefined(error.status) && !_.isUndefined(error.message)) {
      return resp.status(error.status).send(error);
    } else if (!_.isUndefined(error.message)) {
      return resp.status(500).send(error.message);
    }
    resp.status(error.status).send({
      message: "Some Internal Server Error Occurred.",
      status: error.status,
      error,
    });
  }
};

module.exports = { sendErrorResp };
