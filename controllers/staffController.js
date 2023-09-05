const Staff = require("../models/staff.model");

exports.addStaff = async(req, res) => {
  // const { name ,email, role, kitchen_access } = req.body;
  console.log(req.body)
  try {
    const newStaffWorkingHours = await Staff.create(req.body);
    res.status(201).json(newStaffWorkingHours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   Staff.findOne({
//     where: { email },
//   })
//     .then((user) => {
//       console.log("user", user);

//       // If user not found, return error message
//       if (!user) {
//         return res.status(401).json({ error: "Invalid credentials." });
//       }

//       // Check if password is correct
//       return bcrypt.compare(password, user.password).then((passwordMatches) => {
//         console.log(user.password, password, passwordMatches);

//         if (!passwordMatches) {
//           return res.status(401).json({ error: "Invalid credentials." });
//         }

//         // Generate JWT token and return success message
//         const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

//         return Promise.all([user]).then(
//           ([user]) => {
//             return res.status(200).json({
//               message: "Logged in successfully.",
//               user: {
//                 id: user.id,
//                 email: user.email,
//                 name: user?.name,
//                 role: user?.role
//               },
//               token,
//             });
//           }
//         );
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//       return res.status(500).json({ error: "Internal server error." });
//     });
// };

exports.getStaff = async(req, res) => {
  try {
    const staff = await Staff.findAll();
    res.status(200).json(staff)
  } catch (error) {
    res.status(500).json({error});
  }
}

exports.getStaffById = (req, res) => {
  const staffId = req.params.id;

  Staff.findByPk(staffId)
    .then((staff) => {
      if (!staff) {
        res.status(404).send('Staff member not found');
      } else {
        res.status(200).json(staff);
      }
    })
    .catch((error) => {
      res.status(500).send('Error fetching staff member: ' + error.message);
      console.log({ error });
    });
};

exports.updateStaff = (req, res) => {
  const staffId = req.params.id;
  const updatedData = req.body;

  Staff.findByPk(staffId)
    .then((staff) => {
      if (!staff) {
        res.status(404).send('Staff member not found');
      } else {
        return staff.update(updatedData);
      }
    })
    .then((updatedStaff) => {
      res.status(200).json(updatedStaff);
    })
    .catch((error) => {
      res.status(500).send('Error updating staff member: ' + error.message);
      console.log({ error });
    });
};

exports.deleteStaff = (req, res) => {
  const staffId = req.params.id;

  Staff.findByPk(staffId)
    .then((staff) => {
      if (!staff) {
        res.status(404).send('Staff member not found');
      } else {
        return staff.destroy();
      }
    })
    .then(() => {
      res.status(200).send('Staff member deleted successfully');
    })
    .catch((error) => {
      res.status(500).send('Error deleting staff member: ' + error.message);
      console.log({ error });
    });
};
