const express = require('express');
var router = express.Router();
const rolesController = require('../controllers/roles.controller');
const rolesMiddleware = require('../middlewares/role.middleware')
const rightMiddleware = require('../middlewares/droits.middleware')

/**
 * @swagger
 * /api/roles/get:
 *   get:
 *     summary: Retrieves all roles
 *     tags: [Roles]
 *     responses:
 *       '200':
 *         description: List of all roles
 *       '500':
 *         description: Internal server error
 */
router.get("/get" ,rolesController.getRoles);

/**
 * @swagger
 * /api/roles/update:
 *   patch:
 *     summary: Updates a role
 *     tags: [Roles]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_role
 *         required: true
 *         description: ID of the role to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - libelle
 *             properties:
 *               libelle:
 *                 type: string
 *                 description: New label of the role
 *     responses:
 *       '200':
 *         description: Role updated successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Non trouvé
 *       '500':
 *         description: Internal server error
 */
router.patch("/update",rightMiddleware.checkRight, rolesMiddleware.checkRoleExists, rolesController.updateRole);

/**
 * @swagger
 * /api/roles/add:
 *   post:
 *     summary: Creates a new role
 *     tags: [Roles]
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
 *               - libelle
 *             properties:
 *               libelle:
 *                 type: string
 *                 description: Label of the role
 *     responses:
 *       '201':
 *         description: Role created successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '500':
 *         description: Internal server error
 */
router.post("/add",rightMiddleware.checkRight, rolesController.createRole);

/**
 * @swagger
 * /api/roles/delete:
 *   delete:
 *     summary: Deletes a role
 *     tags: [Roles]
 *     parameters:
 *       - in: query
 *         name: session_id
 *         required: true
 *         description: Session ID for authentication
 *         schema:
 *           type: string
 *       - in: query
 *         name: id_role
 *         required: true
 *         description: ID of the role to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Role deleted successfully
 *       '400':
 *         description: Invalid request
 *       '403':
 *         description: Interdiction
 *       '404':
 *         description: Role not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/delete",rightMiddleware.checkRight, rolesMiddleware.checkRoleExists, rolesController.deleteRole);

module.exports = router;