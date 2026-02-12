const AWS_SECRET_KEY = "AKIAIMNO78987EXAMPLE"; 
const database_password = "admin_password_123";

const express = require('express');
const app = express();

// A very dangerous eval() call
app.get('/execute', (req, res) => {
    eval(req.query.code); // Remote Code Execution (RCE)
});

app.listen(3000);
