import { generateToken } from "../middleware/token.js";
import { transporter } from "../middleware/EmailSender.js";

import {
  getUser,
  login,
  register,
  getUsernameCredential,
  getUserEmailCredential,
  updateProfile,
} from "../models/user.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

export const GetUser = async (req, res) => {
  try {
    const id = req.params.userId;
    const user = await getUser(id);

    if (!user) {
      return res.status(404).json({
        error: "user doesn't exist",
      });
    }
    return res.json({
      data: user,
    });
  } catch (error) {
    throw error;
  }
};

export const Register = async (req, res) => {
  try {
    const { nome, cognome, username, email, password, is_seller } = req.body;
    if (
      !nome ||
      !cognome ||
      !username ||
      !email ||
      !password ||
      is_seller == undefined
    ) {
      return res.status(400).json({
        error: "Not all required fields are filled in",
      });
    }

    const isUserDuplicated = await getUsernameCredential(username);
    if (isUserDuplicated.isUsedUsername) {
      return res.status(400).json({
        error: "Username is already taken",
      });
    }
    const isEmeilDuplicated = await getUserEmailCredential(email);
    if (isEmeilDuplicated.isUsedEmail) {
      return res.status(400).json({
        error: "Email is already taken",
      });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Error hashing password." });
      }

      let userId;
      if (req.file) {
        const invalidFile = !req.file.mimetype.startsWith("image/");
        if (invalidFile) {
          return res.status(403).json({
            success: false,
            message: "file is not a valid image",
          });
        }
        userId = await register(
          nome,
          cognome,
          username,
          email,
          hash,
          is_seller,
          req.file.filename
        );
      } else
        userId = await register(
          nome,
          cognome,
          username,
          email,
          hash,
          is_seller,
          null
        );

      const token = generateToken(userId, email, is_seller);
      const userAdded = await getUser(userId);
      var message = {
        from: "volutionwear@gmail.com",
        to: `${email}`,
        subject: "Welcome to Volution Wear – Your Account is Ready!",
        html: `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <h2>Welcome to Volution Wear – Your Account is Ready!</h2>
    <p>Dear <strong>${username}</strong>,</p>
    <p>Thank you for registering on <strong>Volution Wear</strong>, the perfect marketplace for buying and selling pre-loved clothing! We're thrilled to have you join our community.</p>

    <h4>Your account details:</h4>
    <ul>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Username:</strong> ${username}</li>
    </ul>

    <p>You can now log in to your account and start exploring products, managing your sales, and much more!</p>

    <p>If you have any questions or need assistance, don’t hesitate to contact us at 
      <a href="mailto:volutionwear@gmail.com">volutionwear@gmail.com</a>.
    </p>

    <p>Welcome aboard and enjoy your experience with us!</p>
    <p><strong>The VolutionWear Team</strong></p>
  </body>
</html>
`,
      };

      transporter.sendMail(message, (err) => {
        if (err) {
          console.error(err);
        }
      });
      res.status(200).json({
        token: token,
        user: userAdded,
      });
    });
  } catch (error) {
    throw error;
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        error: "Not all required fields are filled in",
      });
    }

    const user = await login(email);

    if (!user) {
      return res.status(404).json({
        error: "user doesn't exist",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }
    const token = generateToken(user.id, user.email, user.is_seller);
    const userFound = await getUser(user.id);
    const currentDate = new Date();
    const loginTime = `${currentDate.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    })}`;

    const message = {
      from: "volutionwear@gmail.com",
      to: email,
      subject: "Successful Login to Your Volution Wear Account",
      text: `Dear ${user.username},

We wanted to let you know that your account was successfully logged into.

Login details:
- Email: ${email}
- Username: ${user.username}
- Date and Time of Login: ${loginTime}

If this wasn’t you or if you have any concerns, please reach out to us at volutionwear@gmail.com.

Thank you for using Volution Wear!

– The VolutionWear Team`,
      html: `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <h2>Successful Login to Your Volution Wear Account</h2>
    <p>Dear <strong>${user.username}</strong>,</p>
    <p>We wanted to let you know that your account was successfully logged into.</p>

    <h4>Login details:</h4>
    <ul>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Username:</strong> ${user.username}</li>
      <li><strong>Date and Time of Login:</strong> ${loginTime}</li>
    </ul>

    <p>If this wasn’t you or if you have any concerns, please reach out to us at 
      <a href="mailto:volutionwear@gmail.com">volutionwear@gmail.com</a>.
    </p>

    <p>Thank you for using Volution Wear!</p>
    <p><strong>The VolutionWear Team</strong></p>
  </body>
</html>
`,
    };

    transporter.sendMail(message, (err) => {
      if (err) {
        console.error(err);
      }
    });
    return res.status(200).json({
      token: token,
      user: userFound,
    });
  } catch (error) {
    throw error;
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      username,
      email,
      phone,
      surname,
      name,
      address,
      city,
      cap,
      country,
    } = req.body;
    if (req.file) {
      const invalidFile = !req.file.mimetype.startsWith("image/");
      if (invalidFile) {
        return res.status(403).json({
          success: false,
          message: "file is not a valid image",
        });
      }
    }
    const image = req.file ? req.file.filename : null;

    const dataToUpdate = {
      username: username,
      country: country,
      image: image,
      address: address,
      city: city,
      email: email,
      phone_number: phone,
      nome: name,
      cognome: surname,
      cap: cap,
    };

    if (
      Object.keys(dataToUpdate).every((key) => dataToUpdate[key] === undefined)
    ) {
      return res.status(400).json({
        error: "No valid fields provided for update",
      });
    }

    if (dataToUpdate.username) {
      const isUsernameTaken = await getUsernameCredential(
        dataToUpdate.username
      );

      if (isUsernameTaken.isUsedUsername && isUsernameTaken.id !== userId) {
        return res.status(400).json({
          error: "Username is already taken",
        });
      }
    }

    const isEmailTaken = await getUserEmailCredential(dataToUpdate.email);
    if (isEmailTaken.isUsedEmail && isEmailTaken.id !== userId) {
      return res.status(400).json({
        error: "Email is already taken",
      });
    }

    const areChanged = await updateProfile(userId, dataToUpdate);

    if (!areChanged) {
      return res.status(400).json({
        error: "Profile update failed",
      });
    }

    const updatedUser = await getUser(userId);
    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { newPassword, oldPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        error: "Both old and new passwords are required",
      });
    }

    if (oldPassword && newPassword) {
      const user = await getUser(userId);
      const oldPass = user.password;
      
      const isMatch = await bcrypt.compare(oldPassword, oldPass);

      if (!isMatch)
        return res.status(400).json({
          error: "Old password does not match",
        });
      if (newPassword.length < 8) {
        return res
          .status(400)
          .json({ error: "New password must be at least 8 characters long" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      const dataToUpdate = {
        password: hashedPassword,
      };

      const isUpdated = await updateProfile(userId, dataToUpdate);

      if (!isUpdated) {
        return res.status(400).json({
          error: "Password update failed",
        });
      }

      return res.status(200).json({
        message: "Password updated successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
};
