import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();

/* Fix __dirname for ES module */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ✅ CORS – FINAL FIX */
app.use(cors({
  origin: "*",
}));

/* ✅ Test route (VERY IMPORTANT) */
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});
app.get("/api/foods", (req, res) => {
  res.json([...]);
});

/* Static images */
app.use(
  "/images",
  express.static(path.join(__dirname, "public/images"))
);

/* API route */
app.get("/api/foods", (req, res) => {
  res.status(200).json([
    {
      name: "Boiled Egg",
      price: 10,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image: "/images/egg.png",
      type: "breakfast",
    },
    {
      name: "RAMEN",
      price: 25,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image: "/images/ramen.png",
      type: "lunch",
    },
    {
      name: "GRILLED CHICKEN",
      price: 45,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image: "/images/chicken.png",
      type: "dinner",
    },
  ]);
});

/* Server start */
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
