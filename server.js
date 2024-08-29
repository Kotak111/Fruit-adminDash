const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const port = 5000
require("./config/db")
const path = require("path")
app.set("view engine", "ejs")
app.use(express.static("views"))
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
const flash = require('express-flash')
const session = require('express-session')
const dotenv=require("dotenv").config()

app.use(express.json())
app.use(cookieParser())
const UserRoute = require("./Route/UserRoute")
const FruitRoute = require("./Route/FruitRoute")
const Fruit = require('./model/FruitModel')
const { verifyUser } = require('./midleware/auth')
const upload = require('./midleware/fileUpload')
app.use('/profile', express.static(path.join(__dirname, 'uploads')))


app.use(session({
    secret: "myharsh",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

//api
app.use("/api/user", UserRoute)

// fruit api
app.use("/api/fruit", FruitRoute)
app.get('/', (req, res) => {
    if (!req.cookies.user) {
        req.flash("info", "please login first");
        return res.redirect("/signin")
    }
    const user = req.cookies.user;
    res.render("index", {
        user: user
    })
})
app.get("/signup", (req, res) => {
    res.render("Signup")
})
app.get("/signin", (req, res) => {
    res.render("Signin",
        { messages: req.flash("info") }
    )
})
app.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.clearCookie("user")
    req.flash("info", "You are loggeed out")
    res.redirect("/signin")
})



// fruit crud opration
app.get("/addfruit", (req, res) => {
    res.render("AdddedFruit")
})
app.get("/view", async (req, res) => {
    try {
        const data = await Fruit.find()
        res.render("ViewFruit", {
            data: data
        })
    } catch (error) {
        console.log(error);
    }
})
app.post("/delete/:id", async (req, res) => {
    try {
        await Fruit.findByIdAndDelete(req.params.id);
        res.redirect("/view")
    } catch (error) {
        console.log(error);
    }
})

app.get("/update/:id", async (req, res) => {
    try {
        const item = await Fruit.findById(req.params.id)
        res.render("UpdateFruit", { item })
    } catch (error) {
        console.log(error);
    }
})
app.post("/update/:id", verifyUser, upload.single("fruit_image"), async (req, res) => {
    try {
        const { fruit_name, fruit_price, fruit_desc } = req.body;
        const fruit_image = req?.file?.filename;
        await Fruit.findByIdAndUpdate(req.params.id, { fruit_name, fruit_price, fruit_desc, fruit_image });
        res.redirect("/view")
    } catch (error) {
        console.log(error);
    }

})



//forgot password
app.get("/forgot", (req, res) => {
    res.render("Forgot")
})
app.get("/change/:email", (req, res) => {
    console.log(req.params);
    const {email}=req.params;
    res.render("ChangePassword",{
        email:email
    })
})
app.get("/newpass", (req, res) => {
    const {email}=req.params;
    res.render("NewPassword",{
        email:email
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))