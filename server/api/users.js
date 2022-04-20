const router = require('express').Router()
const { models: { User, Order }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      },
      include: [Order],
      attributes: ["username", "email"]
    })
    res.send(user);
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
    })
    res.send(user);

  } catch (err) {
    next(err)
  }
})

//Admin Privledge to add other admins
router.post('/admin', async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType
      }
    })
    res.send(user);

  } catch (err) {
    next(err)
  }
})

router.delete('/admin/delete/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send("destroyed user");
  } catch (err) {
    next(err);
  }
})
