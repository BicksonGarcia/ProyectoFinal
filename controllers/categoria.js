const { response, request } = require('express');

//Modelos

const Categoria = require('../models/categoria');

//Get categorias
const getCategoria = async (req = request, res = response) => {

    const listaCategorias = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find()
    ])

    res.json({
        msg: 'GET API DE CATEGORIAS',
        listaCategorias
    })

}

const getCategoriaById = async (req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('categoria', 'nombre');
    res.json({
        msg: 'Categoria encontrada',
        categoria
    })
}
const postCategoria = async (req = request, res = response) => {

    const { categoria, descripcion } = req.body;
    const categoriaDB = new Categoria({ categoria, descripcion });

    await categoriaDB.save();
    res.status(201).json({
        msg: 'POST API CATEGORIA',
        categoriaDB
    })

}
const putCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, ...resto } = req.body;

    const categoriaEditada = await Categoria.findByIdAndUpdate(id, resto, { new: true });

    res.status(201).json({
        msg: 'PUT API CATEGORIA',
        categoriaEditada

    })
    

}
const deleteCategoria = async (req = request, res = response) => {

    const { id } = req.params;

    const categoriaEliminada = await Categoria.findByIdAndDelete(id);
    res.json({
        msg: 'DELETE API DE CATEGORIAS',
        categoriaEliminada
    })

}

module.exports = {
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria,
    getCategoriaById
}