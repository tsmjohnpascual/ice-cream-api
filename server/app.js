const express = require("express")
const cors = require("cors")

const data = require("./data")


// Create a an Express app
const app = express()

// Tell the app to listen to JSON bodies on POST requests
app.use(express.json())

//Add 'headers' to each response, saying that we're okay with sharing resources with others
app.use(cors())

// Set up a route
app.get("/", (req, res) => {
    res.send("Welcome to the Ice Cream API!")
})

app.get("/flavours", (req, res) => {

    let flavours = data

    if (req.query.vegan) {
        flavours = flavours.filter(f => f["vegan"])
    }

    res.json({
        flavours: flavours.map(f => f["flavour"])
    })
})

app.get("/flavours/:id", (req, res) => {
    
    // Extract the parameter from the URL
    const id = req.params.id

    // Filter the data for the ice cream with the that id
    const filteredData = data.filter(f => f["id"] == id)

    // Error handling

    if(filteredData.length == 1) {

        // Send the first filtered result
        res.json({
        flavour: filteredData[0]
        })

    } else {

        res.status(404).json({
            error: "No such ice cream"
        })

    }
})

    // Create new iceream

app.post("/flavours", (req, res) => {

    const newFlavour = req.body
    newFlavour["id"] = data.length + 1
    data.push(newFlavour)

    res.status(201).json({
        success: true,
        flavour: newFlavour
    })

})


module.exports = app
