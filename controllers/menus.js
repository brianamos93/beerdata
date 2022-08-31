const menusRouter = require('express').Router()
const Menu = require('../modles/menu')

menusRouter.get('/', (req, res) => {
	Menu
		.find({})
		.then(menus => {
			res.json(menus)
		})
})

menusRouter.get('/:id', async (req, res) => {
	const menu = await Menu.findById(req.params.id)

	if (menu) {
		res.json(menu.toJSON())
	} else {
		res.status(404).end()
	}
})

menusRouter.post('/', (req, res) => {
	const menu = new Menu(req.body)

	menu
		.save()
		.then(result => {
			res.status(201).json(result)
		})
})

menusRouter.delete('/:id', async (req, res) => {
	await Menu.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = menusRouter