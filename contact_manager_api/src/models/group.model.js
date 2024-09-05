import db from '../config/db.js';

async function getAll() {
    try {
        const [ rows ] = await db.query('SELECT * FROM Group');
        return {isError: false, res: rows }
    } catch (error) {
        return {isError: true, res: error.message }
    }
}

async function create(group) {
    try {
        const res = await db.query(`
            INSERT INTO contact_manager.group (
                group_name,
                created_at,
                updated_at,
                user_id
            )
            VALUES (
                '${group.group_name}',
                '${group.created_at}',
                '${group.updated_at}',
                ${group.user_id}
            );`);
        
        return {isError: false, res: res }
    } catch (error) {
        return {isError: true, res: error.message }
    }
}

export default {
    getAll,create
}

