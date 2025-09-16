import { Router } from "express";
import { body , param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updatedAvailability, updateProduct } from "./handlers/product";
import { handleInputErros } from "./middleware";

/* Funciones del rotuer */
const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The Product id
 *         name:
 *           type: string
 *           description: The Product Name
 *         price:
 *           type: number
 *           description: The Product Price 
 *         availability:
 *           type: boolean
 *           description: The Producto Availability
 *       example:
 *         id: 1
 *         name: "Laptop"
 *         price: 1200
 *         availability: true
 */

/**
 * @swagger
 * /api/products:
 *      get: 
 *          summary: Get a list of products
 *          tags:
 *              - Products    
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successfull response        
 *                  content:
 *                      application/json: 
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

/* Routing */

/* Obtener todos los productos */
router.get('/' , getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID    
 *      tags:
 *          - Products    
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of the product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not Found
 *          400:
 *              description: Bad Request - Invalid ID
 */         

/* Obtener producto por Id */
router.get('/:id' , 
    param('id').isInt().withMessage('ID No válido'),
    handleInputErros,
    getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Creates a new product
 *     tags:
 *       - Products
 *     description: Returns a new record in the database 
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               name:
 *                 type: string
 *                 example: "Monitor curvo 40 pulgadas"
 *               price:
 *                 type: number
 *                 example: 399 
 *     responses:
 *       201:
 *         description: Product Create Successfull
 *         content:
 *              application/json: 
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid Input Data 
 */



/* Crear Producto */
router.post('/' ,
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacío'),
    body('price')
        .notEmpty().withMessage('El precio no puede ir vacío')
        .isNumeric().withMessage('Valor no Válido')
        .custom(value => value > 0).withMessage('Precio no válido'),
        handleInputErros,
    createProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Updates a Product with User Input
 *     tags:
 *       - Products
 *     description: Returns the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The id of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody: 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: 
 *               name:
 *                 type: string
 *                 example: "Monitor curvo 50 pulgadas"
 *               price:
 *                 type: number
 *                 example: 399
 *               availability:
 *                  type: boolean
 *                  example: true
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid Input
 *       404:
 *         description: Product Not Found
 */


/* Editar Producto */
router.put('/:id' , 
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacío'),
    body('price')
        .notEmpty().withMessage('El precio no puede ir vacío')
        .isNumeric().withMessage('Valor no Válido')
        .custom(value => value > 0).withMessage('Precio no válido'),
        handleInputErros,
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),
    handleInputErros,
    
    updateProduct
);

/**
 * @swagger 
 *  /api/products/{id}:
 *   patch:
 *      summary: Updated Products availability 
 *      tags: 
 *          - Products
 *      description: Returns the updateda availability 
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the Product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successfull response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400: 
 *              description: Bad Request - Invalid ID
 *          404: 
 *              description: Product Not Found
 * 
 */

router.patch('/:id',
    param('id').isInt().withMessage('Id no válido'),
    handleInputErros,
    updatedAvailability
);

/**
 * @swagger 
 *  /api/products/{id}:
 *   delete: 
 *      summary: Delete Product
 *      tags: 
 *           - Products
 *      description: Delete product from his ID
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: The ID of the Product to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:  
 *          200: 
 *              description: Successfull Response 
 *              content: 
 *                  text/plain: 
 *                      schema:
 *                      example: "Product deleted successfully"
 *          400:
 *              description: Bad Request - Invalid ID
 *          404:
 *              description: Product not Found
 */

router.delete('/:id' ,  
    param('id').isInt().withMessage('Id no válido'),
    handleInputErros,
    deleteProduct
);

export default router;
