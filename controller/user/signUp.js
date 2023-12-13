const Users = require("../../model/users");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
      });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    console.log("Added New User");

    // Respond with success and the user data
    res.status(201).json({
      message: "User added successfully.",
      userData: newUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    // Handle other errors and respond with a generic error message
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = addUser;

