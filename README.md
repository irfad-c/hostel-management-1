# Hostel Management System

A RESTful backend application for managing hostel administration, wardens, and hostel assignments. The system provides role-based access control, authentication, and audit logging to ensure secure and organized hostel management.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Token)
- **Password Hashing:** bcrypt
- **ODM:** Mongoose

## Features

- **Authentication & Authorization:** Secure login using JWT and role-based access control (RBAC).
- **Role Management:** Supports Super Admin, Admin, and Warden roles.
- **Hostel Management:** Create and retrieve hostels with hostel type and capacity information.
- **Warden Management:** Create warden accounts with securely hashed passwords.
- **Warden Assignment:** Assign wardens to hostels with validation to prevent multiple active assignments.
- **Audit Logging:** Track hostel creation and warden assignment activities, including the actor, action, entity, and timestamp.
- **Super Admin Seeding:** Initialize the Super Admin account using environment variables through a seed script.



## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/irfad-c/hostel-management-1
   ```

2. Navigate to the project directory:

   ```bash
   cd hostel-management
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory using `.env.example` as a reference.

5. Configure your environment variables, including MongoDB connection details, JWT secret, and Super Admin credentials.

6. Run the Super Admin seed script:

   ```bash
   npm run seed
   ```

7. Start the development server:

   ```bash
   npm run dev
   ```

## Environment Variables

Refer to `.env.example` for the required environment variable configuration.

Example Super Admin credentials:

```env
SUPER_ADMIN_NAME=Super Admin
SUPER_ADMIN_EMAIL=superadmin@example.com
SUPER_ADMIN_PASSWORD=ChangeMe@123
```

**Note:** The Super Admin account is created through the seed script. Public Super Admin registration is not provided.

## Security

- Passwords are hashed using bcrypt before being stored.
- JWT-based authentication protects secured endpoints.
- Role-based middleware restricts access according to user permissions.
- Environment variables are used for sensitive configuration.
- Duplicate email addresses and hostel codes are prevented.



