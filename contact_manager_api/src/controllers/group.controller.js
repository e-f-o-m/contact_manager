import groupModel from '../models/group.model.js';

const getAll = async (req, res) => {
    const dataModel = await groupModel.getAll()
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

    const dataModel = await groupModel.create(data)
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