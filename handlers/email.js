const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const { fromString } = require('html-to-text');
const util = require('util');
require('dotenv').config();

let transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const generarHTML = (archivo, opciones = {}) => {
    const html = pug.renderFile(`${ __dirname }/../views/emails/${ archivo }.pug`, opciones);
    return juice(html);
};

exports.enviar = async ({ subject, archivo, usuario, url }) => {

    const html = generarHTML(archivo, { subject, archivo, usuario, url });
    const text = fromString(html);

    const enviarEmail = util.promisify(transport.sendMail, transport);

    return enviarEmail.call(transport, {
        from: 'UpTask <no-reply@uptask.com>',
        to: usuario.email,
        subject,
        text,
        html
    });
};