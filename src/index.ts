import app from "./app";

// app.get("/", (req, res) => {
// 	res.send("Hi");
// });

const PORT = 9001;

app.listen(PORT, () => console.log(`Server init at http://localhost: ${PORT}`));