import express from "express"
import cors from "cors"
import memberRoutes from './member/memberRoutes.js'

const app = express()
const port = process.env.PORT

app.use(cors())
app.use("/members", memberRoutes)

app.get("/", async (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});