import db from '../config/db.js';

async function getAll() {
    try {
        const [ rows ] = await db.query('SELECT * FROM Tag');
        return {isError: false, res: rows }
    } catch (error) {
        return {isError: true, res: error.message }
    }
}

async function create(tag) {
    try {
        const res = await db.query(`
            INSERT INTO Tag (
                tag_name,
                created_at,
                updated_at
            )
            VALUES (
                '${tag.tag_name}',
                '${tag.created_at}',
                '${tag.updated_at}'
            );`);
        
        return {isError: false, res: res }
    } catch (error) {
        return {isError: true, res: error.message }
    }
}

export default {
    getAll,create
}