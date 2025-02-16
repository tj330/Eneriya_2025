# ![PANIC App Logo](./assets/logo.png)

# PANIC App

**PANIC** is an emergency response app designed to help people in distress by instantly connecting them with nearby users who can assist. With a single tap on the **SOS button**, users can send an emergency alert along with their real-time location to nearby users.

## 🚀 Features

- **🚨 SOS Button:** Sends an emergency alert with the user’s live location to nearby users.
- **📢 Push Notifications:** Alerts users when a distress signal is received in their area.
- **📍 Location Tracking:** Automatically shares the user's location upon activating the SOS feature.
- **🔊 Audio Alert:** Plays an emergency sound when a distress signal is received to grab attention.

---

## 📥 Installation

Follow these steps to set up the app on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/panic-app.git
   cd panic-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

---

## 🛠️ Usage Guide

1. **Home Screen:**
   - Features the **SOS button**.
   - Pressing the button sends a distress signal with the user’s current location.

2. **Location Screen:**
   - Displays the user's real-time location.
   
3. **Info Screen:**
   - Provides weather details based on the user's location.

---

## 🏗️ Code Structure

### 📁 `/services/Notification.js`
Handles push notifications, including:
- Requesting permissions.
- Registering for push notifications.
- Displaying notifications to users.

### 📁 `/Pages/Home.jsx`
- Contains the **main screen** with the SOS button.
- Handles sending distress signals and displaying notifications.

### 📁 `/Components/Body.jsx`
- Contains the UI for the SOS button.
- Manages playing and stopping the emergency alert sound.

### 📁 `/App.jsx`
- Sets up navigation between screens.
- Manages incoming distress signals and notifications.
- Controls the alert sound when an emergency signal is received.

---

## 🤝 Contributing

We welcome contributions! If you’d like to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add feature'`).
4. Push the branch (`git push origin feature-branch`).
5. Open a Pull Request.

For major changes, please open an issue first to discuss what you'd like to modify.

---

## 📜 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

🌟 **If you find this project useful, please consider giving it a star! ⭐**
