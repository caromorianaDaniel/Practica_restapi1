import {Request, Response } from 'express'
import { Autos, iAuto, iTT } from '../model/autos'
import { db } from '../database/database'

export let mandarAutos = async (req: Request, res: Response) =>{
    const { matricula,tipoObjeto,precioBase,potenciaMotor,traccion } = req.body
    await db.conectarBD()
    if(tipoObjeto == 'T'){
        let dSchema: iTT = {
            _matricula: matricula,
            _tipoObjeto: tipoObjeto,
            _precioBase: Number(precioBase),
            _potenciaMotor: Number(potenciaMotor),
            _traccion: traccion,
        }
        const oSchema = new Autos(dSchema)
        await oSchema.save()
        .then( (mensaje:any) => {
            console.log('Salvado Correctamente: '+ mensaje)
            res.json(mensaje)
        })
        .catch( (mensaje:any) => {
            console.log('Este es el req.body '+ req.body)
            console.log('Este es el dSchema '+ dSchema)
            console.log('Error: '+ mensaje)
            res.send('Error: '+ mensaje)
        }) 
    } else if(tipoObjeto == 'A'){
        let dSchema: iAuto = {
            _matricula: matricula,
            _tipoObjeto: tipoObjeto,
            _precioBase: Number(precioBase),
            _potenciaMotor: Number(potenciaMotor)
        }
        const oSchema = new Autos(dSchema)
        await oSchema.save()
        .then( (mensaje:any) => {
            console.log('Salvado Correctamente: '+ mensaje)
            res.json(mensaje)
        })
        .catch( (mensaje:any) => {
            console.log('Este es el req.body '+ req.body)
            console.log('Este es el dSchema '+ dSchema)
            console.log('Error: '+ mensaje)
            res.send('Error: '+ mensaje)
        }) 
    }
    await db.desconectarBD()
} 