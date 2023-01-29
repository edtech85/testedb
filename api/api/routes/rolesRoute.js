const { Router } = require('express')
const RoleController = require('../controllers/RoleController')

const router = Router()

router.get('/roles', RoleController.selectAllRoles)
router.get('/roles/:id', RoleController.selectOneRole)
router.post('/roles', RoleController.createRole)
router.put('/roles/:id', RoleController.updateRole)
router.delete('/roles/:id', RoleController.deleteRole)

// router.get('/roles/:estudanteId/matricula/:matriculaId',  RoleController.pegaUmaMatricula)
// router.post('/roles/:estudanteId/matricula', RoleController.criaMatricula)
// router.put('/roles/:estudanteId/matricula/:matriculaId',  RoleController.atualizaMatricula)
// router.delete('/roles/:estudanteId/matricula/:matriculaId',  RoleController.apagaMatricula)

module.exports = router