const express = require("express");
const autos = require("./data/autos");

const app = express();
// Render asigna el puerto en la variable PORT; en local usamos 3000.
const PORT = process.env.PORT || 3000;

// Ruta raíz: describe el servicio y sus rutas disponibles.
app.get("/", (req, res) => {
  res.json({
    servicio: "Catálogo de Autos API",
    version: "1.0.0",
    autor: "Alejandro Medina Martínez",
    rutas: {
      "GET /api/autos": "Lista todos los autos (filtros opcionales: ?marca=, ?color=, ?anio=)",
      "GET /api/autos/:id": "Obtiene un auto por su id",
      "GET /health": "Revisa que el servicio esté funcionando"
    }
  });
});

// Estado del servicio.
app.get("/health", (req, res) => {
  res.json({ estado: "OK", fecha: new Date().toISOString() });
});

// Catálogo completo, con filtros opcionales por marca, color y año.
app.get("/api/autos", (req, res) => {
  const { marca, color, anio } = req.query;
  let resultado = autos;

  if (marca) {
    resultado = resultado.filter(a => a.marca.toLowerCase() === marca.toLowerCase());
  }
  if (color) {
    resultado = resultado.filter(a => a.color.toLowerCase() === color.toLowerCase());
  }
  if (anio) {
    resultado = resultado.filter(a => a.anio === Number(anio));
  }

  res.json({ total: resultado.length, autos: resultado });
});

// Un solo auto por id.
app.get("/api/autos/:id", (req, res) => {
  const auto = autos.find(a => a.id === Number(req.params.id));
  if (!auto) {
    return res.status(404).json({ error: `No existe un auto con id ${req.params.id}` });
  }
  res.json(auto);
});

// Cualquier otra ruta.
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servicio de autos escuchando en el puerto ${PORT}`);
});
