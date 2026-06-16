# Staff Monitoring System 

An intelligent, multi-tier automated platform designed to simplify workplace administration, track worker logs, and fairly distribute workloads using dynamic random assignment algorithms. Built as a B.Tech mini-project using the MERN stack.

---

##  Key Features

*   **Dynamic Work Assignment:** Automates operational workflows by taking admin enrollment inputs and pairing them with eligible workers using random-distribution backend logic.
*   **Comprehensive Staff Logs:** Enables persistent, real-time monitoring of active tasks, completed shifts, and unassigned staff.
*   **Intuitive Admin Panel:** A unified dashboard built with React for adding staff profiles, tracking daily operations, and triggering algorithmic task workflows.
*   **Robust Data Architecture:** Relational-like constraints mapped out across flexible MongoDB schemas to secure transactional logs without data leakage.

---

##  Tech Stack

*   **Frontend:** React.js, HTML5, CSS3, Modern JavaScript (ES6+)
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (using Mongoose ODM for structured modeling)
*   **Data Persistence:** Secured local tokenization / Session handling

---

##  Project Architecture

```text
Department_mini_project/
├── backend/
│   ├── config/          # Database configuration and environment settings
│   ├── controllers/     # Task generation algorithms and business logic
│   ├── models/          # MongoDB schemas (Staff, Admin, Task Logs)
│   ├── routes/          # Express API endpoints
│   └── server.js        # Server entry point
└── frontend/
    ├── public/          # Static assets
    └── src/
        ├── components/  # Reusable UI components (Navbar, Forms, Cards)
        ├── pages/       # Dashboard, Enrollment Views, Analytics
        ├── App.js       # React root routing configuration
        └── index.js     # React virtual DOM mount point
