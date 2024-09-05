const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
/* const key = 'IjdlNjVmM2ZiODIzZjdlMzVlMTY0MjVh' //crypto.randomBytes(32); // Clave de 256 bits
const iv = crypto.randomBytes(16); // Vector de inicialización */
const key = Buffer.from('956bab9af1496f4fe1426a269c2f7fc895fbac9ef14a6f4f01428a26cc2f7faf', 'hex')
const iv = Buffer.from('a1f96fcf01b2aa26a1a96faf0cb2a92a', 'hex')

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
function objectToBase64(obj) {
    const jsonString = JSON.stringify(obj);
    const buffer = Buffer.from(jsonString, 'utf-8');
    const base64String = buffer.toString('base64');
    return base64String;
}

function base64ToObject(base64String) {
    const buffer = Buffer.from(base64String, 'base64');
    const jsonString = buffer.toString('utf-8');
    try {
        const obj = JSON.parse(jsonString);
        return obj;
    } catch (error) {
        return
    }
}

module.exports = { encrypt, decrypt, objectToBase64, base64ToObject};