# Minecraft Bot Dashboard

## Setup Instructions

### Frontend (React)
1. Navigate to the `frontend` folder.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in `frontend` with:
```
REACT_APP_DISCORD_CLIENT_ID=your_client_id
REACT_APP_DISCORD_REDIRECT_URI=http://localhost:3000
```
4. Run `npm start` to launch the frontend.

### Backend (Express)
1. Navigate to the `backend` folder.
2. Run `npm install express cors dotenv jsonwebtoken` to install dependencies.
3. Create a `.env` file in `backend` with:
```
WEB_PORT=3000
SECRET_KEY=your_secret_key
ADMIN_USER=admin
ADMIN_PASS=adminpass
```
4. Run `node server.js` to start the backend server.

Both frontend and backend must be running for full functionality.
