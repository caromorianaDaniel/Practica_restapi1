import {Request, Response, Router } from 'express'
import { Autos, iAuto, iTT } from '../model/autos'
import { db } from '../database/database'

class DatoRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getAutos = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query  = await Autos.find({})
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        db.desconectarBD()
    }

    private getAuto = async (req: Request, res: Response) => {
        const { matricula } = req.params
        console.log(req.params)
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query  = await Autos.findOne({_matricula: matricula})
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })

        db.desconectarBD()
    }

    private postAuto = async (req: Request, res: Response) => {
        const { matricula,tipoObjeto,precioBase,potenciaMotor,traccion } = req.body
        await db.conectarBD()
        const dSchema: iTT = {
            _tipoObjeto: tipoObjeto,
            _precioBase: Number(precioBase),
            _potenciaMotor: Number(potenciaMotor),
            _traccion: traccion,
            _matricula: matricula
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
        await db.desconectarBD()
    }

    private putAuto = async (req:Request, res:Response) => {
        let {matricula,traccion} = req.body
        await db.conectarBD()
        const query = await Autos.findOneAndUpdate({_matricula: matricula},{_traccion: traccion })
        .then( (mensaje:any) => {
            console.log('Modificado Correctamente: '+ mensaje)
            res.json(mensaje)
        })
        .catch( (mensaje:any) => {
            console.log('Este es el req.body '+ req.body)
            console.log('Error: '+ mensaje)
            res.send('Error: '+ mensaje)
        }) 
        await db.desconectarBD()
    }

    private delAuto = async (req:Request, res:Response) => {
        let {matricula} = req.body
        await db.conectarBD()
        const query = await Autos.findOneAndDelete({_matricula: matricula})
        .then( (mensaje:any) => {
            console.log('Modificado Correctamente: '+ mensaje)
            res.json(mensaje)
        })
        .catch( (mensaje:any) => {
            console.log('Este es el req.body '+ req.body)
            console.log('Error: '+ mensaje)
            res.send('Error: '+ mensaje)
        }) 
        await db.desconectarBD()
    }

    misRutas(){
        this._router.get('/autos', this.getAutos)//Ver todos los autos
        this._router.get('/autos/:matricula', this.getAuto)//Filtrar por matricula
        this._router.post('/autos/nuevo', this.postAuto)//Crear nuevo auto
        this._router.put('/autos/modificar', this.putAuto)//Modificar autos
        this._router.delete('/autos/eliminar', this.delAuto)//eliminar autos
    }
}

const obj = new DatoRoutes()
obj.misRutas()
export const routes = obj.router
