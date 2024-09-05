import contactModel from '../models/contact.model.js';

const getAllByUser = async (req, res) => {
    const userId = req.query.user_id
    const dataModel = await contactModel.getAllByUser(userId)
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

    const dataModel = await contactModel.create(data)
    if (dataModel.isError) {
        return res.status(500).json({
            client: 'Error inesperado, por favor comunicarse con el administrador',
            dev: dataModel.res
        });
    }
    res.send(dataModel)
};

const update = async (req, res) => {
    const data = req.body

    const dataModel = await contactModel.update(data)
    if (dataModel.isError) {
        return res.status(500).json({
            client: 'Error inesperado, por favor comunicarse con el administrador',
            dev: dataModel.res
        });
    }
    res.send(dataModel)
};

const deleteContact = async (req, res) => {
    const contact_id = req.query.contact_id

    const dataModel = await contactModel.deleteContact(contact_id)
    if (dataModel.isError) {
        return res.status(500).json({
            client: 'Error inesperado, por favor comunicarse con el administrador',
            dev: dataModel.res
        });
    }
    res.send(dataModel)
};

export default {
    getAllByUser,create, deleteContact, update
}