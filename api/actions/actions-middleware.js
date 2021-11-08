// add middlewares here related to actions

const _ = require("lodash");

const validateBody = function (req, res, next) {
  if (
    _.isNil(req.body.description) ||
    _.isNil(req.body.notes) ||
    _.isNil(req.body.project_id) ||
    _.isNil(req.body.completed)
  ) {
    return res.sendStatus(400);
  }

  next();
};

module.exports.validateBody = validateBody;