const express = require('express');
var router = express.Router();
const droitsController = require('../controllers/droits.controller');
const roleMiddleware = require('../middlewares/role.middleware');

/**
 * @swagger
 * /api/droits/get:
 *   get:
 *     summary: Retrieves all rights
 *     tags: [Droits]
 *     responses:
 *       '200':
 *         description: List of all rights
 *       '500':
 *         description: Internal server error
 */
router.get("/get", droitsController.getDroits);

/**
 * @swagger
 * /api/droits/getByIdRole/{idRole}:
 *   get:
 *     summary: Retrieves rights by role ID
 *     tags: [Droits]
 *     parameters:
 *       - in: path
 *         name: idRole
 *         required: true
 *         description: ID of the role to get rights for
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: List of rights for the specified role
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.get("/getByIdRole/:idRole", roleMiddleware.checkRoleExists, droitsController.getDroitsByIdRole);

module.exports = router;