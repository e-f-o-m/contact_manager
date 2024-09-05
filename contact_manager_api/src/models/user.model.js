import db from '../config/db.js';

async function getAll() {
    try {
        const [ rows ] = await db.query('SELECT * FROM User');
        return {isError: false, res: rows }
    } catch (error) {
        return {isError: true, res: error.message }
    }
}

async function getById(user_id) {
    try {
        const rows = await db.query(`SELECT * FROM User where user_id = ${user_id};`); 
        return {isError: false, res: rows }
    } catch (error) {
        return {isError: true, res: error.message }
    }
}

async function create(user) {
    try {
        const res = await db.query(`
            INSERT INTO User (
                username,
                email,
                password,
                created_at,
                updated_at 
            )
            VALUES (
                '${user.username}',
                '${user.email}',
                '${user.password}',
                '${user.created_at}',
                '${user.updated_at}'
            );`);
            return {isError: false, res: res }
        } catch (error) {
        return {isError: true, res: error.message }
    }
}

async function update(user) {
    try {
        const res = await db.query(`
        UPDATE User
        SET
            username = ${user.username},
            email = ${user.email},
            password = ${user.password},
            created_at = ${user.created_at},
            updated_at = ${user.updated_at}
        WHERE
            id = ${user.id};`);

        return {isError: false, res: res }
    } catch (error) {
        return {isError: true, res: error.message }
    }
}

//private
async function getByUserAndPassword(user, password) {
    try {
        const [rows] = await db.query(`SELECT * FROM User where email = '${user}' AND password = '${password}'`); 
        return {isError: false, res: rows }
    } catch (error) {
        return {isError: true, res: error.message }
    }
}

export default {
    getAll,getById,create,update,getByUserAndPassword
}
