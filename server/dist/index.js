"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
/* Middlewares */
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "*" }));
/* Test route */
app.get("/", (req, res) => {
    res.send("Backend is working ✅");
});
/* Static images */
app.use("/images", express_1.default.static(path_1.default.resolve("public/images")));
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
