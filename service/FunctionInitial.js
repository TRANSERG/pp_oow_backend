const mongoose = require('mongoose');
const Role = require('../models/role');
const Constant = require('./Constant');

const FunctionInital = async () => {
  try {
    const adminRole = await Role.findOne({ name: Constant.admin });
    if (!adminRole) {
      const newRole = new Role({ name: Constant.admin });
      await newRole.save();
      console.log("added 'Admin' to roles collection");
    }

    const managerRole = await Role.findOne({ name: Constant.manager });
    if (!managerRole) {
      const newRole = new Role({ name: Constant.manager  });
      await newRole.save();
      console.log("added 'Manager' to roles collection");
    }
  } catch (err) {
    console.error('Error:', err);
  }
};

module.exports = FunctionInital;
