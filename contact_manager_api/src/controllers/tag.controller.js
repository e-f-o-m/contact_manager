import tagModel from '../models/tag.model.js';

const getAll = async (req, res) => {
    const dataModel = await tagModel.getAll()
    if (dataModel.isError) {
        return res.status(500).json({
            client: 'Error inesperado, por favor comunicarse con el administrador',
            dev: dataModel.res
        });
    }
    res.send(dataModel)
}

const create = async (req, res) => {
    const data = req.body
    
    const dataModel = await tagModel.create(data)
    if (dataModel.isError) {
        return res.status(500).json({
            client: 'Error inesperado, por favor comunicarse con el administrador',
            dev: dataModel.res
        });
    }
    res.send(dataModel)
};

export default {
    getAll,create
}