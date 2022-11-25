import { IRepositorios } from "./Repositories";

export interface IRegistro {
    Nombre: string,
    Apellido: string,
    CarnetIdentidad: string,
    ExpedicionCi: string,
    Telefono: string,
    Direccion: string,

}

export class Registro {
    Nombre!: string;
    Apellido!: string;
    CarnetIdentidad!: string;
    ExpedicionCi!: string;
    Telefono!: string;
    Direccion!: string;

}

export interface IRegistroRepositories extends IRegistro {
    Repositorios: IRepositorios[]
}