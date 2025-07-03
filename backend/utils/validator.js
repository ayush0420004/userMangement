const Joi = require("joi");

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const schema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone_number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  pan_number: Joi.string().pattern(panRegex).required()
});

exports.validateUser = (data) => schema.validate(data);
exports.validateExcelRow = (row) =>
  schema.validate({
    first_name: row["First Name"],
    last_name: row["Last Name"],
    email: row["Email"],
    phone_number: row["Phone Number"],
    pan_number: row["PAN Number"]
  });
