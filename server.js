const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());

// In-memory data store
let playlists = [
  { id: 1, name: "Chill Vibes", songs: ["Song A", "Song B"] },
  { id: 2, name: "Workout Mix", songs: ["Song C", "Song D"] },
  { id: 3, name: "Top Hits", songs: ["Song E", "Song F"] },
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Playlist:
 *       type: object
 *       required:
 *         - name
 *         - songs
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: Chill Vibes
 *         songs:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Song A","Song B"]
 */

/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: Playlist management API
 */

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Playlist API",
      version: "1.0.0",
      description: "A simple Playlist API built with Node.js and Express",
    },
    servers: [{ url: "/" }],
  },
  apis: ["./server.js"],
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check
 *     description: Verifies the API is running.
 *     responses:
 *       200:
 *         description: OK
 */
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Playlist API is running" });
});

/**
 * @swagger
 * /playlists:
 *   get:
 *     tags: [Playlists]
 *     summary: Get all playlists
 *     responses:
 *       200:
 *         description: List of playlists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 */
app.get("/playlists", (req, res) => {
  res.json(playlists);
});

/**
 * @swagger
 * /playlists/{id}:
 *   get:
 *     tags: [Playlists]
 *     summary: Get a playlist by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Playlist found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Playlist'
 *       404:
 *         description: Playlist not found
 */
app.get("/playlists/:id", (req, res) => {
  const id = Number(req.params.id);
  const playlist = playlists.find((p) => p.id === id);
  if (!playlist) return res.status(404).json({ error: "Playlist not found" });
  res.json(playlist);
});

/**
 * @swagger
 * /playlists:
 *   post:
 *     tags: [Playlists]
 *     summary: Create a new playlist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, songs]
 *             properties:
 *               name:
 *                 type: string
 *               songs:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Playlist created
 *       400:
 *         description: Invalid input
 */
app.post("/playlists", (req, res) => {
  const { name, songs } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required (string)" });
  }
  if (!Array.isArray(songs) || songs.some((s) => typeof s !== "string")) {
    return res
      .status(400)
      .json({ error: "songs is required (array of strings)" });
  }

  const newPlaylist = {
    id: playlists.length ? Math.max(...playlists.map((p) => p.id)) + 1 : 1,
    name,
    songs,
  };

  playlists.push(newPlaylist);
  res.status(201).json(newPlaylist);
});

/**
 * @swagger
 * /playlists/{id}:
 *   put:
 *     tags: [Playlists]
 *     summary: Update a playlist by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               songs:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Playlist updated
 *       404:
 *         description: Playlist not found
 */
app.put("/playlists/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = playlists.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Playlist not found" });

  const { name, songs } = req.body;

  if (name !== undefined && typeof name !== "string") {
    return res.status(400).json({ error: "name must be a string" });
  }
  if (songs !== undefined) {
    if (!Array.isArray(songs) || songs.some((s) => typeof s !== "string")) {
      return res
        .status(400)
        .json({ error: "songs must be an array of strings" });
    }
  }

  playlists[index] = {
    ...playlists[index],
    ...(name !== undefined ? { name } : {}),
    ...(songs !== undefined ? { songs } : {}),
  };

  res.json(playlists[index]);
});

/**
 * @swagger
 * /playlists/{id}:
 *   delete:
 *     tags: [Playlists]
 *     summary: Delete a playlist by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Playlist deleted
 *       404:
 *         description: Playlist not found
 */
app.delete("/playlists/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = playlists.length;
  playlists = playlists.filter((p) => p.id !== id);

  if (playlists.length === before) {
    return res.status(404).json({ error: "Playlist not found" });
  }

  res.json({ message: "Playlist deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Playlist API running on port ${PORT}`);
});