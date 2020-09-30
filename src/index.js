const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // automatically

app.post('/users', async (req, res) => {
  // user.save().then(() => {
  //   res.status(201).send(user)
  // }).catch((e) => {
  //   res.status(400).send(e)
  // })

  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.get('/users', async (req, res) => {
  // User.find({}).then((users) => {
  //   res.status(200).send(users)
  // }).catch((e) => {
  //   res.status(500).send(e)
  // })

  try {
    const users = await User.find({})
    res.status(200).send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.get('/users/:id', async (req, res) => {
  // User.findById(req.params.id).then((user) => {
  //   if (!user) {
  //     return res.status(404).send('user not found')
  //   }

  //   res.status(200).send(user)
  // }).catch((e) => {
  //   res.status(500).send(e)
  // })

  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).send('user not found')
    }

    res.status(200).send(user)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.post('/tasks', async (req, res) => {
  // const task = new Task(req.body)

  // task.save().then(() => {
  //   res.status(201).send(task)
  // }).catch((e) => {
  //   res.status(400).send(e)
  // })

  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.get('/tasks', async (req, res) => {
  // Task.find({}).then((tasks) => {
  //   res.status(200).send(tasks)
  // }).catch((e) => {
  //   res.status(500).send(e)
  // })

  try {
    const tasks = await Task.find({})
    res.status(200).send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.get('/tasks/:id', async (req, res) => {
  // Task.findById(req.params.id).then((task) => {
  //   if (!task) {
  //     return res.status(404).send('task not found')
  //   }

  //   res.status(200).send(task)
  // }).catch((e) => {
  //   res.status(500).send(e)
  // })

  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).send('task not found')
    }

    res.status(200).send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
