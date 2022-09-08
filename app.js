const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const path = require('path')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/items', require('./routes/items.routes'))
app.use('/api/orders', require('./routes/orders.routes'))
app.use('/api/count', require('./routes/count.routes'))
app.use('/api/auth', require('./routes/auth.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 4000

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })



        app.listen(PORT, () => console.log(`server has been started on port ${PORT}`))

    } catch (e) {
        console.log('Server error', e.message)
        process.exit(1)
    }
}

start()
