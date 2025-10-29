const express = require("express");
const app = express();
app.use(express.json());

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Playlist API",
      version: "1.0.0",
      description: "SE4458 – Group 2 Playlist API (in-memory)"
    },
    servers: [{ url: "http://localhost:3000" }]
  },
  apis: []
});

// Swagger UI 
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// redirect root to Swagger
app.get("/", (_req, res) => res.redirect("/docs"));

// in-memory data store for playlists
let playlists = [
  { id: 1, name: "Chill Vibes", songs: ["Sunset Lover", "Ocean Eyes"] },
  { id: 2, name: "Workout Mix", songs: ["Stronger", "Eye of the Tiger"] }
];

// show all playlists
app.get("/playlists", (_req, res) => {
  res.json(playlists);
});

// create a new playlist
app.post("/playlists", (req, res) => {
  const newPlaylist = { id: playlists.length + 1, ...req.body };
  playlists.push(newPlaylist);
  res.status(201).json(newPlaylist);
});

// update a playlist
app.put("/playlists/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = playlists.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).send("Playlist not found");
  playlists[index] = { ...playlists[index], ...req.body };
  res.json(playlists[index]);
});

// delete a playlist
app.delete("/playlists/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const before = playlists.length;
  playlists = playlists.filter(p => p.id !== id);
  if (playlists.length === before) return res.status(404).send("Playlist not found");
  res.status(204).send();
});

// Azure requires using process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}  | Swagger: /docs`);
});