const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

// Ruta principal
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando 🚀");
});

// Ruta login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("Login recibido:", email);

  res.json({
    success: true,
    message: "Login exitoso",
    user: email
  });
});

// Ruta registro
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  console.log("Usuario registrado:", name);

  res.json({
    success: true,
    message: "Usuario registrado correctamente"
  });
});

app.get("/api/rutas", function(req, res) {
  const rutas = [
    {
      id: 1,
      nombre: "Bucaramanga - Floridablanca",
      precio: 3200
    },
    {
      id: 2,
      nombre: "Cabecera - Centro",
      precio: 2800
    }
  ];

  res.json(rutas);
});

// Endpoint buses por ruta
app.get("/api/rutas/:id/buses", (req, res) => {
  const rutaId = req.params.id;

  res.json([
    {
      bus: "BUS-101",
      conductor: "Carlos Pérez",
      asientos_disponibles: 12,
      ruta: rutaId
    },
    {
      bus: "BUS-205",
      conductor: "Ana Gómez",
      asientos_disponibles: 7,
      ruta: rutaId
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});