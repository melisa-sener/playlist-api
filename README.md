# SE4458 – Assignment 2: Playlist REST API

## Project Overview
This project is a simple REST API developed using **Node.js** and **Express**.  
It provides basic CRUD operations for managing playlists.  
All data is stored in memory (no database).  
The API is publicly available with an interactive **Swagger documentation page**.

---

## Live Links
- **Code Repository:** https://github.com/melisa-sener/playlist-api
- **Live API:** https://simple-playlist-api.onrender.com/playlists
- **Swagger UI:** https://simple-playlist-api.onrender.com/docs

---

## Design & Implementation
- **Framework:** Node.js with Express  
- **Data Storage:** In-memory JavaScript array  
- **Deployment:** Render (Web Service)
- **Documentation:** Swagger (OpenAPI)

### Available Endpoints
- `GET /` – Health check  
- `GET /playlists` – List all playlists  
- `GET /playlists/:id` – Get playlist by ID  
- `POST /playlists` – Create a new playlist  
- `PUT /playlists/:id` – Update an existing playlist  
- `DELETE /playlists/:id` – Delete a playlist  

Swagger UI is available at `/docs` and allows testing all endpoints directly from the browser.

---

## Assumptions
- No authentication is required.  
- No database is used; data resets when the server restarts.  
- The goal is to demonstrate REST API design, Swagger documentation, and cloud deployment.

---

## Issues Encountered & Resolution
- An earlier deployment became unreachable due to a Node.js version mismatch on the hosting platform.
- The issue was resolved by enforcing **Node.js 18 (LTS)** and redeploying the application on Render.
- The API and Swagger documentation are now fully accessible via the links above.