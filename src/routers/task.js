const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id
    })

    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/tasks', auth, async (req, res) => {
  const match = {}

  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  try {
    // get the tasks relationship by the authenticated user
    // customize the populate with an object to further filter the relationship data
    await req.user.populate({
      path: 'tasks',
      match
    }).execPopulate()
    res.status(200).send(req.user.tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id, owner: req.user._id
    })

    if (!task) {
      return res.status(404).send({ error: 'task not found' })
    }

    res.status(200).send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates'})
  }

  try {
    // changing below method into more traditional way because it skips the middleware
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    const task = await Task.findOne({
      _id: req.params.id, owner: req.user._id
    })

    if (!task) {
      return res.status(404).send({ error: 'task not found' })
    }

    updates.forEach(update => task[update] = req.body[update])
    await task.save()

    res.status(200).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id, owner: req.user._id
    })

    if (!task) {
      return res.status(404).send({ error: 'task not found' })
    }

    res.status(200).send(task)
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
