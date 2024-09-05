import { encrypt, objectToBase64, base64ToObject, decrypt } from '../utils/utils.crypto.js';
import { getByUserAndPassword, create } from '../models/user.model.js';

const login = async (req, res) => {
    if (!req.body) return

    getByUserAndPassword(req.body.email, req.body.password).then(dataModel => {
        if (dataModel.isError) {
            return res.status(500).json({ client: 'Error inesperado, por favor comunicarse con el administrador', dev: dataModel.res });
        } else if (!dataModel.res) {
            return res.status(401).send('Unauthorized');
        }
        
        const roles = {
            "admin": 1,
            "professional": 2,
            "parent": 3,
            "patient": 4
        }

        let role = roles[req.body.role];
        if (!role) {
            return res.status(401).send('Unauthorized');
        }
        
        
        if (dataModel.res.length > 0 ) {
             //Si es un admin no importa por donde ingresa
            if(dataModel.res[0].role_id === 1){
                role = 1
            }
        } else {
            return res.status(401).send('Unauthorized');
        }
        
        req.body['user_id'] = dataModel.res[0].user_id
        const token = encrypt(JSON.stringify(req.body))
        if (!token) {
            return res.status(401).send('Unauthorized');
        }
        res.json({ token: objectToBase64(token), role: role });

    })
}

const validate = (req, res) => {
    validateUserBayToken(req.body.token).then(objectToken => {
        if (!objectToken) return res.status(401).send('Unauthorized');
        return res.send({ role: objectToken.role })
    }).catch(error => {
        return res.status(500).json({ client: 'Error inesperado, por favor comunicarse con el administrador', dev: error });
    })
}

const validateUserBayToken = async (token) => {
    const objectToken = base64ToObject(token)
    if (!objectToken) return false
    const dataStr = decrypt(objectToken)
    if (!dataStr) return false
    const data = JSON.parse(dataStr)

    return getByUserAndPassword(data.email, data.password).then(dataModel => {
        if (dataModel.isError || !dataModel.res) {
            return false;
        }
        return data;
    })
}

const signup = async (req, res) => {
    const data = req.body
    create(data).then(dataModel => {
        if (dataModel.isError) {
            return res.status(500).json({
                client: 'Error inesperado, por favor comunicarse con el administrador',
                dev: dataModel.res
            });
        }
        res.send(dataModel)
    })
};

export default {
    validate, login, signup, validateUserBayToken
};