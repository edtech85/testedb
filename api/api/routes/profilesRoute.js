const { Router } = require('express')
const PofileController = require('../controllers/ProfileController')

const router = Router()

router.get('/profiles', PofileController.selectAllPeople)
router.get('/profiles/:id', PofileController.selectOnePerson)
router.post('/profiles', PofileController.createPerson)
// router.put('/profiles/:id', PofileController.updatePerson)
// router.put('/profiles/:id', PofileController.inativatePerson)
// router.delete('/profiles/:id', PofileController.deletePerson)

module.exports = router