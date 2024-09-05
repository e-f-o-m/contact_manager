import db from '../config/db.js';
import groupModel from '../models/group.model.js';
import tagModel from '../models/tag.model.js';

async function getAllByUser(userId) {
    try {
        const [ rows ] = await db.query(`SELECT * FROM Contact WHERE user_id = ${userId}`);
        return {isError: false, res: rows }
    } catch (error) {
        return {isError: true, res: error.message }
    }
}

async function deleteContact(userId) {
    try {
        const [ rows ] = await db.query(`DELETE FROM Contact WHERE contact_id = ${userId}`);
        return {isError: false, res: rows }
    } catch (error) {
        return {isError: true, res: error.message }
    }
}

async function create(contact) {
    try {
        const res = await db.query(`
            INSERT INTO Contact (
                first_name,
                last_name,
                phone_number,
                email,
                address,
                notes,
                created_at,
                updated_at,
                user_id
            )
            VALUES (
                '${contact.first_name}',
                '${contact.last_name}',
                '${contact.phone_number}',
                '${contact.email}',
                '${contact.address}',
                '${contact.notes}',
                '${contact.created_at}',
                '${contact.updated_at}',
                ${contact.user_id}
            );`)

            for (const element of contact.groups) {         
                await groupModel.create({
                    group_name: element,
                    created_at: contact.created_at,
                    updated_at: contact.updated_at,
                    user_id: contact.user_id,
                });
            }

            for (const element of contact.tags) {         
                await tagModel.create({
                    tag_name: element,
                    created_at: contact.created_at,
                    updated_at: contact.updated_at,
                });
            }
        
        return {isError: false, res: res }
    } catch (error) {
        return {isError: true, res: error.message }
    }
}


async function update(contact) {
    try {
        // Actualizar el contacto existente
        const res = await db.query(`
            UPDATE Contact
            SET
                first_name = '${contact.first_name}',
                last_name = '${contact.last_name}',
                phone_number = '${contact.phone_number}',
                email = '${contact.email}',
                address = '${contact.address}',
                notes = '${contact.notes}',
                updated_at = '${contact.updated_at}',
                user_id = ${contact.user_id}
            WHERE contact_id = ${contact.contact_id};
        `);

        // Actualizar los grupos asociados al contacto (puede ser necesario eliminar los existentes antes de agregar nuevos)
        /* for (const element of contact.groups) {
            await groupModel.update({
                group_name: element,
                updated_at: contact.updated_at,
                user_id: contact.user_id,
            }, { where: { contact_id: contact.contact_id } });
        }

        // Actualizar las etiquetas asociadas al contacto (puede ser necesario eliminar las existentes antes de agregar nuevas)
        for (const element of contact.tags) {
            await tagModel.update({
                tag_name: element,
                updated_at: contact.updated_at,
            }, { where: { contact_id: contact.contact_id } });
        } */

        return { isError: false, res: res };
    } catch (error) {
        return { isError: true, res: error.message };
    }
}


export default {
    getAllByUser,create, deleteContact, update
}
