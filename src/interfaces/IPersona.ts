export interface IPersona {
    id : number
    apellido : string
    nombre : string
    nroDoc : string
    fechaNacimiento : Date
    direccion : string
    localidad : string
    provincia : string
    telefono : string
    carnet: number
    email: string
    observaciones: string
    accion: string
    deBase: boolean
    foto: string
    readonly value: string
    readonly label: string
    equipo_id?: number
    valueEquipo?: string
    labelEquipo?: string
    username?: string
    fechamodif?: Date

}