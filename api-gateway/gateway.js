const express = require('express');
const proxy = require('express-http-proxy');
const cors=require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

// Routes to respective services
app.all('/users', proxy('http://localhost:3002'));
app.all('/bookings', proxy('http://localhost:3003'));
app.all('/movies', proxy('http://localhost:3004'));
app.all('/snacks', proxy('http://localhost:3005'));
app.all('/payments', proxy('http://localhost:3006'));

app.listen(3001, () => console.log('API Gateway running on port 3001'));
