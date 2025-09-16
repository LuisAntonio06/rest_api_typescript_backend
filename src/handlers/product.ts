import { Request, Response } from 'express';
import Product from '../models/Product.model';

/* Obtener productos */
export const getProducts = async (req : Request ,res : Response) => {
    try {
        /* Traer todos los productos */
        const products = await Product.findAll({

            /* Establecer un orden */
            order: [
                ['price' ,'DESC']
            ],
        });

        /* Retornar todos los productos */
        res.json({data: products})
    } catch (error) {
        console.log(error);
    }
};

/* Obtener producto por Id */
export const getProductById = async (req : Request ,res : Response) => {
    try {

        /* Obtener parametros del a URL */
        const { id } = req.params;
        /* Buscar producto por Id */
        const product = await Product.findByPk(id)

        /* Situación: Id no encontrada */
        if (!product) {
            return res.status(400).json({
                error: 'Producto no encontrado'
            })
        }

        /* Retornar producto */
        res.json({data: product})
    } catch (error) {
        console.log(error);
    }
};

/* Crear producto */
export const createProduct = async (req : Request ,res : Response) => {
    try {
        /* Crear producto en base al modelo */
        const product =  await Product.create(req.body);
        res.status(201).json({data : product})
    } catch (error) {
        console.log(error);
    }
};

/* Actualizar Productos */
export const updateProduct = async (req: Request, res: Response) => {
    /* Obtener parametros del a url */
    const { id } = req.params;
    /* Obtener producto por la Id */
    const product = await Product.findByPk(id)

    /* Situación: Id no encontrada */
    if (!product) {
        res.status(400).json({
            error: 'Producto no encontrado'
        })
    };

    /* Actualizar Producto */
    await product.update(req.body);
    await product.save();
    
    res.json({data : product})
};

export const updatedAvailability = async (req: Request , res : Response) =>{
    /* Obtener parametros del a url */
    const { id } = req.params;
    /* Obtener producto por la Id */
    const product = await Product.findByPk(id)

    /* Situación: Id no encontrada */
    if (!product) {
        return res.status(400).json({
            error: 'Producto no encontrado'
        })
    };

    /* Actualizar Producto */
    product.availability = !product.dataValues.availability
    await product.save();
    
    res.json({data : product})
}

export const deleteProduct = async (req: Request , res: Response) => {
    /* Obtener parametros del a url */
    const { id } = req.params;
    /* Obtener producto por la Id */
    const product = await Product.findByPk(id)

    /* Situación: Id no encontrada */
    if (!product) {
        return res.status(400).json({
            error: 'Producto no encontrado'
        })
    };

    /* Actualizar Producto */

    await product.destroy();
    
    res.json({data : 'Producto Elminado'})
};