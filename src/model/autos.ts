import {Schema, model } from 'mongoose'
// Definimos el Schema
const automovilSchema = new Schema({
    _tipoObjeto: {
        type: String  //Valores "A, "T"...
    },
    _precioBase: {
        type: Number
    },
    _potenciaMotor: {
        type: Number
    },
    _traccion: {
        type: String
    },
    _matricula: {
        type: String,
        unique: true
    },
})

export type iAuto = {
    _matricula: string | null,
    _tipoObjeto: string | null,
    _precioBase: number | null,
    _potenciaMotor: number | null,
}

export type iTT = {
    _matricula: string | null,
    _tipoObjeto: string | null,
    _precioBase: number | null,
    _potenciaMotor: number | null,
    _traccion: string | null,
}


// La colecciรณn de la BD (Plural siempre)
export const Autos = model('automoviles', automovilSchema)