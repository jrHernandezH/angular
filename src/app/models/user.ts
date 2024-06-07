// src/app/models/user.model.ts

export class User {
    cuenta?: string;
    password?: string;
    activo?: string;
    apellidos?: string;
    avatar?: string;
    calle?: string;
    ciudad?: string;
    codigo_postal?: string;
    colonia?: string;
    direccion?: string;
    estado?: string;
    fecha_registro?: string;
    nombre?: string;
    rfc?: string;
    rol?: string;
    telefono?: string;

    constructor(data: any) {
        this.cuenta = data.cuenta;
        this.password = data.password;
        this.activo = data.activo;
        this.apellidos = data.apellidos;
        this.avatar = data.avatar;
        this.calle = data.calle;
        this.ciudad = data.ciudad;
        this.codigo_postal = data.codigo_postal;
        this.colonia = data.colonia;
        this.direccion = data.direccion;
        this.estado = data.estado;
        this.fecha_registro = data.fecha_registro;
        this.nombre = data.nombre;
        this.rfc = data.rfc;
        this.rol = data.rol;
        this.telefono = data.telefono;
    }
}
