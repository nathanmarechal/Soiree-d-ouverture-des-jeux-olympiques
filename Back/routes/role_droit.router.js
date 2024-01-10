const express = require('express');
var router = express.Router();
const rolesController = require('../controllers/role_droit.controller');
const rightsMiddleware = require('../middlewares/droits.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const RoleDroitMiddleware = require('../middlewares/role-droit.middleware');

/**
 * @swagger
 * /api/role-droit/get:
 *   get:
 *     summary: Retrieves all role-droit associations
 *     tags: [RoleDroit]
 *     responses:
 *       '200':
 *         description: List of role-droit associations
 *       '500':
 *         description: Internal server error
 */
router.get("/get", rolesController.getRoleDroitAssociation);

/**
 * @swagger
 * /api/role-droit/add:
 *   post:
 *     summary: Creates a new role-droit association
 *     tags: [RoleDroit]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_role
 *               - id_droit
 *             properties:
 *               id_role:
 *                 type: integer
 *                 description: ID of the role
 *               id_droit:
 *                 type: integer
 *                 description: ID of the droit
 *     responses:
 *       '201':
 *         description: Role-droit association created successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '409':
 *         description: Déjà existant
 *       '500':
 *         description: Internal server error
 */
router.post("/add", rightsMiddleware.checkRight, roleMiddleware.checkRoleExists, rightsMiddleware.checkDroitExists, RoleDroitMiddleware.checkRoleDroitExists, rolesController.createRoleDroitAssociation);

/**
 * @swagger
 * /api/role-droit/delete:
 *   delete:
 *     summary: Deletes a role-droit association
 *     tags: [RoleDroit]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_role
 *               - id_droit
 *             properties:
 *               id_role:
 *                 type: integer
 *                 description: ID of the role in the association to delete
 *               id_droit:
 *                 type: integer
 *                 description: ID of the droit in the association to delete
 *     responses:
 *       '200':
 *         description: Role-droit association deleted successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.delete("/delete", rightsMiddleware.checkRight, roleMiddleware.checkRoleExists, rightsMiddleware.checkDroitExists, rolesController.deleteRoleDroitAssociation);

/**
 * @swagger
 * /api/role-droit/deleteByIdRole:
 *   delete:
 *     summary: Deletes role-droit association for a specific role
 *     tags: [RoleDroit]
 *     parameters:
 *       - in: query
 *         name: id_role
 *         required: true
 *         description: ID of the role for which to delete the association
 *         schema:
 *           type: integer
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Role-droit association deleted successfully for the specified role
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.delete("/deleteByIdRole", rightsMiddleware.checkRight, roleMiddleware.checkRoleExists, rolesController.deleteRoleDroitAssociationForSpecificRole);

module.exports = router;