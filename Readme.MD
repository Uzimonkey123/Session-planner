# Session Planner
## Setup

### Prerequisites
- Node.js 18 or higher
- npm
- Gmail account with 2FA

### Local installation
#### Backend
1. Clone git repository
2. In /backend/ `npm install`
3. .env file creation with the following setup:
```
EMAIL_USER=email@gmail.com
EMAIL_PASS=gmail-app-password (without whitespace)
```
4. To start the server: `npm run dev`

#### Frontend
1. In /Session-planner/ `npm install`
2. To start frontend: `npm run dev`
3. To access frontend: `http://localhost:5173`

### Production deploy (for Ubuntu 24)
#### Server prerequisites
- Node.js
- nginx
- PM2

- `/var/www/` with the cloned repository

#### Server deploy
1. In `/var/www/session-planner/backend`: `npm install`
2. Create production .env `sudo nano .env`
```
EMAIL_USER=email@gmail.com
EMAIL_PASS=gmail-app-password (without whitespace)
PORT=3000
NODE_ENV=production
```
3. `pm2 start "npx tsx server.ts" --name session-planner api`
4. `pm2 save`
5. `pm2 startup`

6. In `/Session-planner/`: `npm install`
7. `npm run build`
8. Configure nginx with `sudo nano /etc/nginx sites-available/session-planner`
9. configuration file should look like this:
```nginx
server {
    listen 80;
    server_name your-server-ip;

    location / {
        root /var/www/session-planner/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    location ~ ^/sessions {
        proxy_pass http://localhost:3000/sessions;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
10. Enable the site:<br>
`sudo ln -s /etc/nginx/sites-available/session-planner /etc/nginx/sites-enabled/` <br>
`sudo nginx -t`<br>
`sudo systemctl restart nginx`
11. The application should be available at `http://server-ip`

## Usage
### Create session
1. Click "create session" from the sidebar
2. Fill the given form
3. Note management code or check email for the management code
4. Note url if session is private, they can be accessed only through `http://web/session/ID?code=(access code)`

### Edit session
1. View the details of the given session (either through main page or private link)
2. Click "manage session" and enter management code
3. If the management code is valid, possibility to edit, delete the session or remove participants

### Attendance
1. Choose a session and click "Attendance"
2. If the session is not full, click "I am going!"
3. Note attendance code for later removal from session, or check email for the code

### Attendance removal
1. Click "remove attendance" instead of "I am going!"
2. Enter attendance code and validate

### Main page sessions
#### Filter
1. On the main page sidebar enter a filter, it can be a date, keyword from title or description
2. Choose from the remaining sessions

#### Past sessions
Past sessions are presented on the bottom of the page

## Repository structure

```
Repository/
├── backend/
│   ├── routes/          # API routes
│   ├── common/          # Utilities and types
│   ├── sessionFuncs/    # Functions related to session management and attendance
│   ├── sessions.json    # JSON file containing all the sessions
│   ├── server.ts        # Express server
│   └── .env             # Environment variables (Create own)
│
├── frontend/
│   └─ src/
│      ├── dialogs/       # Modal dialogs
│      ├── sessions/      # Session-related components
│      ├── management/    # Create and edit for sessions
│      ├── config/        # API and Material Tailwind configuration
│      └── types.ts       # TypeScript types
│   
│
└── README.md
```