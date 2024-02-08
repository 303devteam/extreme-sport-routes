import express from "express"
import cors from "cors"
import memberRoutes from './member/memberRoutes.js'
import employeeRoutes from './member/employeeRoutes.js'
import packageRoutes from './member/packageRoutes.js'
import sequelize from "./models/seq.js"

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json());


app.use("/members", memberRoutes)
app.use("/employees", employeeRoutes)
app.use("/packages", packageRoutes)

app.get("/", async (req, res) => {
    res.send("Hello World")
})

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.")
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err)
    })

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});