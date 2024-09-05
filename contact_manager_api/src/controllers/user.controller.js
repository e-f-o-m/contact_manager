import userModel from '../models/user.model.js';

const getAll = async (req, res) => {
    const dataModel = await userModel.getAll()
    if (dataModel.isError) {
        return res.status(500).json({
            client: 'Error inesperado, por favor comunicarse con el administrador',
            dev: dataModel.res
        });
    }
    res.send(dataModel)
}

const validate = async (req, res) => {
    const user = req.body
    
    userModel.getByUserAndPassword(user.email, user.password).then(dataModel => {
        if (dataModel.isError) {
            return res.status(500).json({
                client: 'Error inesperado, por favor comunicarse con el administrador',
                dev: dataModel.res
            });
        }
        res.send(dataModel)
    })
};

const getById = async (req, res) => {
    userModel.getById().then(dataModel => {
        if (dataModel.isError) {
            return res.status(500).json({
                client: 'Error inesperado, por favor comunicarse con el administrador',
                dev: dataModel.res
            });
        }
        res.send(dataModel)
    })
};

const create = async (req, res) => {
    const data = req.body
    userModel.create(data).then(dataModel => {
        if (dataModel.isError) {
            return res.status(500).json({
                client: 'Error inesperado, por favor comunicarse con el administrador',
                dev: dataModel.res
            });
        }
        res.send(dataModel)
    })
}

const update = async (req, res) => {
    const data = req.body

    userModel.update(data).then(dataModel => {
        if (dataModel.isError) {
            return res.status(500).json({
                client: 'Error inesperado, por favor comunicarse con el administrador',
                dev: dataModel.res
            });
        }
        res.send(dataModel)
    })
}

export default {
    getAll,getById,create,update,validate
}