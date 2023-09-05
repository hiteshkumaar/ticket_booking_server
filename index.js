const express = require("express")
const mongoose = require('mongoose')
const router = express.Router()
const cors = require("cors")
const UserModel = require('./models/User')
const MovieModel = require('./models/movie')
const movie = require('./models/movie')
const csv = require("csv-parser");
const bodyParser = require("body-parser")
const BookingModel = require("./models/bookings")
const mailer = require('nodemailer');

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const smtpProtocol = mailer.createTransport({
    service: "Gmail",
    secure:false,
    auth: {
        user: "hiteshselvarajan@gmail.com",
        pass: "4252229044"
    }
});
mongoose.connect("mongodb+srv://hiteshselvarajan:ASDntFYV6INEMl0I@cluster0.5m5yvuz.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: true })

const db = mongoose.connection;

// Listen for the MongoDB connection event
db.on("connected", () => {
    console.log("Connected to MongoDB successfully.");
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("the password is incorrect")
                }
            } else {
                res.json("No record existed")
            }
        })
})
app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))

})
app.get('/movies', async (req, res) => {
    try {
        const movies = await MovieModel.find()
        res.json(movies)
    }
    catch (e) {
        console.log(e)

    }
})
app.get('/movies/:id', async (req, res) => {
    try {
        const movies = await MovieModel.findById(req.params.id)
        res.json(movies)
    }
    catch (e) {
        console.log(e)
    }
})
app.post('/booking', async (req, res) => {
    try {
        console.log(req.body)
      const booking = await BookingModel.create(req.body);
      res.json(booking);
      const mailoption = {
        from: "hiteshselvarajan@gmail.com",
        to: req.body['bookedUsingMail'],
        subject: "Test Mail",
        html: 'Good Morning!'
    }
    
smtpProtocol.sendMail(mailoption, function(err, response){
    if(err) {
        console.log(err);
    } 
    console.log('Message Sent' + response.message);
    smtpProtocol.close();
});
    } catch (err) {
      res.status(500).json({ error: 'Error creating booking', details: err.message });
    }
  });
  
app.listen(3001, () => {
    console.log("server is running")
}
)
