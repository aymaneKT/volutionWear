import { generateToken } from "../middleware/token.js";
import { login } from "../models/login.js";
import bcrypt from "bcrypt";
export const Login = async (req, res) => {
  try {
    const userCredential = req.body;
    const { email, password } = userCredential;
    const user = await login(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user.id, email);
    return res.status(200).json({
      token: token,
      user: {
        id: user.id,
        username: user.username,
        nome: user.nome,
        cognome: user.cognome,
        email: user.email,
        is_seller: user.is_seller,
      },
    });
  } catch (error) {
    // res.status(500).json({ message: "Server error", error: error });
    throw error;
  }
};
