const { Router } = require('express')
const TodoListItem = require('../../models/TodoListItem')
const router = Router()

router.get('/', async(req, res) => {
    try {
        const todoListItems = await TodoListItem.find()
        if (!todoListItems) throw new Error('No todoListItems')
        const sorted = todoListItems.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async(req, res) => {
    const newTodoListItem = new TodoListItem(req.body)
    try {
        const todoListItem = await newTodoListItem.save()
        if (!todoListItem) throw new Error('Something went wrong saving the todoListItem')
        res.status(200).json(todoListItem)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async(req, res) => {
    const { id } = req.params

    try {
        const response = await TodoListItem.findByIdAndUpdate(id, req.body)
        if (!response) throw Error('Something went wrong')
        const updated = {...response._doc, ...req.body }
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
})

router.delete('/:id', async(req, res) => {
    const { id } = req.params

    try {
        const removed = await TodoListItem.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router