const express = require('express');
const proxy = require('express-http-proxy');
const cors=require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

// Routes to respective services
app.all('/users/*', proxy('http://user-service:3002'));
app.all('/bookings/*', proxy('http://booking-service:3003'));
app.all('/movies/*', proxy('http://movie-service:3004'));
app.all('/snacks/*', proxy('http://snack-service:3005'));
app.all('/payments/*', proxy('http://payment-service:3006'));
app.all('/theaters/*', proxy('http://theater-service:3007'));

app.listen(3001, () => console.log('API Gateway running on port 3001'));
