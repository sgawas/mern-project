const express = require('express');
const mongoose = require('mongoose');

const HttpError = require('./models/http-error');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(express.json());
app.use("/api/places", placesRoutes); // forwards only if path is /api/places
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find the route.', 404);
    throw error;
})

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }

    res.status(error.code || 500).send({ message : error.message || 'Something went wrong.'});

})

mongoose.connect('mongodb+srv://sgawas:Suraj@grapnel-cluster.nzzgn.mongodb.net/places?retryWrites=true&w=majority')
    .then(()=> {
        app.listen(5000, ()=> {
            console.log('listening on port 5000');
        });
    })
    .catch(err=> {
        console.log(err)
    })

// 

