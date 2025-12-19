import express from "express";
import cors from "cors";
import path from "path";

const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors({ origin: "*" }));

/* Test route */
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

/* Static images */
app.use(
  "/images",
  express.static(path.resolve("public/images"))
);

/* API route */
app.get("/api/foods", (req, res) => {
  res.json([
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
