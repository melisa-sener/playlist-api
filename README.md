# SE4458 – Assignment 2: Playlist REST API  

### Project Overview
- This project is a simple REST API developed using **Node.js** and **Express**.  
- It provides basic CRUD operations for managing playlists.  
- All data is stored in memory (no database).  
- The API is publicly available with a **Swagger documentation page**.


### Links
- **Code Repository:** [https://github.com/melisasener/playlist-api](https://github.com/melisasener/playlist-api)  
- **Live Website (API):** [https://playlist-api-v60k.onrender.com/playlists](https://playlist-api-v60k.onrender.com/playlists)  
- **Swagger Page:** [https://playlist-api-v60k.onrender.com/docs](https://playlist-api-v60k.onrender.com/docs)


### Design & Implementation
- **Framework:** Node.js (Express)  
- **Data:** Stored in a simple in-memory JavaScript array  
- **Endpoints:**
  - `GET /playlists` – List all playlists  
  - `POST /playlists` – Create a new playlist  
  - `PUT /playlists/:id` – Update an existing playlist  
  - `DELETE /playlists/:id` – Delete a playlist  
- Redirects `/` to `/docs` for easy access to Swagger.


### Assumptions
- No authentication or database connection required.  
- Data is reset every time the server restarts.  
- The focus is on demonstrating REST API structure and deployment.


### Issues Encountered
- Azure Student Plan (Turkey) blocked web app creation due to region restrictions (`RequestDisallowedByAzure` error).  
- As a solution, I deployed the project on **Render**, which supports Node.js apps and provides a public URL.  
- Swagger UI shows “No operations defined” because endpoints were kept simple for the assignment.
