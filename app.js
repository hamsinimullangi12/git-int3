const express = require('express');
const mongoose = require('mongoose');
const Transaction = require('./models/transaction');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/money-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: 'desc' });
        res.render('index', { transactions });
    } catch (err) {
        res.status(500).render('error', { message: 'Server Error' });
    }
});

app.post('/transaction', async (req, res) => {
    try {
        const { type, amount, description } = req.body;
        const transaction = new Transaction({ type, amount, description });
        await transaction.save();
        res.redirect('/');
    } catch (err) {
        res.status(400).render('error', { message: 'Invalid Data' });
    }
});

app.delete('/transaction/:id', async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
