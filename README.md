# Clinic Desk 🏥

A lightweight desktop application for managing patient records in a clinic or small practice.  
Built with **Tauri v2**, **React**, and **SQLite**, focusing on speed, offline-first usage, and data ownership.

---

## ✨ Features

- 📋 Patient management (add, edit, delete)
- 📞 Phone number validation
- 🗓 Follow-up date tracking
- 📝 Clinical notes / medications
- 🔍 Clean, polished UI
- 💾 Local SQLite database
- ☁️ Google Drive backup
- 🔔 Toast notifications
- 🔐 Secure local storage via Tauri plugins

---

## 🧱 Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- React Hot Toast
- React DatePicker

### Backend
- Tauri v2
- Rust
- SQLite
- Tauri Plugin Store

---

## 📂 Project Structure

```
src/
 ├─ components/
 │   ├─ layout
 │   ├─ child components
 │
 ├─ pages/
 │   ├─ Home, Manage, New Patient, Patients
 │
 ├─ services/
 │   ├─ tauriInvoke.ts
 │   ├─ patients.ts
 │
 └─ App.tsx

src-tauri/
 ├─ src/
 │   ├─ main.rs
 │   ├─ db.rs
 │   ├─ backup.rs
 │
 └─ Cargo.toml
```

---

## 🚀 Getting Started

# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

### Prerequisites

- Node.js (18+ recommended)
- Rust (latest stable)
- Tauri CLI

```bash
cargo install tauri-cli
```

---

### Install dependencies

```bash
npm install
```

---

### Run in development

```bash
npm run tauri dev
```

---

## 🗄 Database

- Uses **SQLite**
- Stored locally on the user’s machine
- Automatically initialized on app startup
- Offline-first (no internet required)

---

## ☁️ Google Drive Backup

- Manual backup from **Manage → Backup**
- Uses Google account authentication
- Tokens stored securely using `tauri-plugin-store`
- Designed for end-of-day (EOD) backups

> Restore support and auto-backup are planned.

---

## 🔐 Security & Privacy

- No cloud dependency by default
- Data stays on the user’s device
- Google access tokens stored securely
- No analytics or tracking

---

## 🛠 Available Scripts

```bash
npm run dev         # Frontend dev
npm run build       # Frontend build
npm run tauri dev   # Full desktop app (recommended)
npm run tauri build # Production build
```

---

## 🧭 Roadmap

- [ ] Google OAuth connect/disconnect
- [ ] Auto backup scheduling
- [ ] Restore from Drive
- [ ] CSV export
- [ ] Patient search & filters
- [ ] Role-based access (optional)

---

## 📄 License

MIT License

---

## 🙌 Author

Built with ❤️ for small clinics and independent practitioners.
