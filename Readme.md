# 🚀 DevBond - Connect. Collaborate. Grow.

🌐 **Live URL:** [https://devbond.space/](https://devbond.space/)

### 🔑 Demo Account

Use the following demo credentials to explore the platform:

* **Email:** [demo@email.com](mailto:demo@email.com)
* **Password:** Demo@000

DevBond is a modern developer networking platform where developers can connect, chat in real-time, send collaboration requests, and unlock premium features for enhanced networking. It is designed to help developers build meaningful professional relationships and grow together.

---

## ✨ Key Features

### 🔍 Find Developers

* Browse developer profiles
* Send and receive connection requests
* View skills and interests

### 🤝 Connections & Requests

* Accept or reject collaboration requests
* Manage your connections easily

### 💬 Seamless Real‑Time Chat

* One‑to‑one live messaging using Socket.IO
* Instant message delivery
* Smooth animated chat UI

### 👤 Profile Management

* View and update profile information
* Upload profile images

### ⭐ Premium Membership

* Unlock exclusive features
* Razorpay integration for payments
* Secure premium status handling

### 🎨 Modern UI & Animations

* Fully responsive design
* Smooth animations using Framer Motion
* Clean component styling with Tailwind & DaisyUI
* Dark mode support

### 🔐 Authentication & Security

* JWT‑based authentication
* Encrypted passwords using bcrypt
* Protected routes

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* DaisyUI
* Lucide React (icons)
* Framer Motion (animations)
* Redux Toolkit (state management)
* Socket.IO Client

### Backend

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT Authentication
* Multer (file uploads)
* Cloudinary (image storage)
* Bcrypt (password hashing)
* Razorpay (payments)
* Socket.IO (real‑time chat)
* AWS SDK (cloud services)

---

## 📁 Project Structure

```
DEVBOND
│
├── client
│   ├── node_modules
│   ├── public
│   ├── src
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
│
├── server
│   ├── node_modules
│   ├── src
│   ├── .env
│   ├── .envexample
│   ├── .gitignore
│   ├── apiList.md
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── devTinder-secret.pem
├── .gitignore
└── Readme.md
```

---

## ⚙️ Environment Variables

Backend requires environment variables such as:

* MongoDB URI
* JWT Secret
* Cloudinary credentials
* Razorpay keys
* AWS credentials
* Socket configuration

Check `.envexample` file inside server folder for reference.

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone Repository

```bash
git clone <repo-url>
cd devBond
```

### 2️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

### 3️⃣ Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend will run at:

```
http://localhost:7777
```

---

## 🌟 Future Improvements

* Group chats
* Developer matching based on skills
* Notifications system
* Video calling integration
* Project collaboration boards

---

## 👨‍💻 About the Project

DevBond is built with the goal of helping developers find like‑minded people, collaborate on ideas, and build strong professional networks with a smooth and modern user experience.

---

If you like this project, consider giving it a ⭐ and sharing it with fellow developers!




<!-- TODO: Client  -->
<!-- TODO: premium button should also added to the mobile navigation -->
<!-- TODO: add verify batch to the user card -->
<!-- TODO: Seen status on Schema  -->
<!-- TODO: On reciving new chat the chat window should scroll to the latest chat -->
<!-- FIXME: Can we send the messages to the person someone is not connected with- auth in websockets -->
<!-- FIXME: If i'm not friend, then i'll not be able to send message -->
<!-- TODO: in the socket.js userId and targetUserId should be friend to send the message to each other -->
<!-- TODO: feature - Show green symbol when online || last seen 2 hour ago-->
<!-- TODO: on user card add icons of the known languages and tech -->
<!-- TODO: search filter based on lang, tech, name, location -->
<!-- TODO: When entered in chat it should not scroll that much -->
<!-- TODO: Swipe feature -->
<!-- TODO: favicon -->



