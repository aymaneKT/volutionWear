# Volution Wear

🚀 Volution Wear is an innovative, fully responsive e-commerce platform for buying and selling clothes, accessible from any device—desktop, tablet, or smartphone.

Volution Wear allows users to register as either buyers or sellers, providing tailored experiences for each:
- Sellers: Manage orders, products, and sales with an intuitive, role-specific dashboard.
- Buyers: Browse products, place orders, leave reviews, and track purchases seamlessly.

The project is structured as a full-stack application with two main folders:
- client — Frontend built with React, Vite, and TypeScript
- server — Backend built with Node.js and Express.js

# ✨ Key Features
- 🔐 Secure authentication with JWT
- ⚡ RESTful APIs built with Express.js
- 📡 Axios for HTTP requests
- 🖼️ Image uploads with Multer
- ✉️ Email notifications with Nodemailer
- 📦 MySQL database
- 🎨 Responsive UI using Tailwind CSS, Material UI, and Shadcn components
- 📣 Real-time feedback with React-Toastify
- 🔗 Navigation with React Router DOM
- 💬 React Icons for enhanced visuals

# 🚀 Tech Stack
Frontend (client):
- React (TypeScript)
- Vite
- Tailwind CSS
- Material UI & Shadcn
- React Router DOM
- Axios
- React-Toastify
- React Icons

Backend (server):
- Node.js
- Express.js (MVC architecture)
- MySQL
- Multer
- Nodemailer
- JWT

# 🛠️ Getting Started

1. Clone the repository:
git clone https://github.com/aymaneKT/volutionWear.git
cd volution-wear

2. Install dependencies for both client and server:
cd client
npm install
cd ../server
npm install

3. Set up environment variables:
In the server folder, create a `.env` file with:
user=your_db_user <br/>
password=your_db_password <br/>
database=volution_wear<br/>
KEY=gLXAqTgTfljZl7Dg5MP95dkB4RlYOq<br/>
port=8080<br/>
host=localhost<br/>
GOOGLE_APP_PASSWORD=your_google_app_password<br/>

4. Run the backend:
cd server
npm run dev

5. Run the frontend:
cd ../client
npm run dev

6. Open the app at:
http://localhost:5173

# 🎯 Future Improvements
- Refactor the project and integrate Redux for better state management
- Add a Coupons section for sellers to create and manage discount codes

# 🤝 Contributing
Contributions are welcome! Feel free to fork this repository and submit pull requests. For questions or suggestions, please open an issue or contact me.

# 📫 Contact
If you're interested in e-commerce tech, full-stack development, or would like to discuss this project, feel free to reach out!

Thank you for checking out Volution Wear! 🚀
