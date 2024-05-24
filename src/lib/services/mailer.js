import nodemailer from "nodemailer"
import Handlebars from "handlebars";
import path from 'path';
import base from "./templates/base";
import logo from "./templates/logo";
import { macroButton, macroText, preHeader } from "./templates/macros";
import cssStyle from "./templates/cssStyle";


const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
});

export const sendNow = async (to, subject, html) => {
    try {
        let info = await transporter.sendMail({
            from: process.env.MAILER_FROM,
            to,
            subject,
            html
        });
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.log(error);
    }
}


export const renderHtml = (template, data) => {
    try {

        Handlebars.registerPartial({
            'macroPreHeader': preHeader,
            'macroButton': macroButton,
            'macroText': macroText,
            '@cssStyle': cssStyle,
            '@logo': logo,
            '@partial-block': template
        });
        const templateHB = Handlebars.compile(base)
        const htmlBody = templateHB(data)
        return htmlBody
    } catch (error) {
        throw error;
    }
}
