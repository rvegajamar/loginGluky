export interface Usuario {
    uid: string;
    identificacion: number;
    nombres: string;
    apellidos: string;
    correo: string;
    celular: number;
    rol: 'Administrador' | 'Desarrollador' | 'Comercial' | 'Call Center';
    contrasena: string;
}

export const RolesLogin = ['Desarrollador','Comercial','Call Center'];
export const RolesAdmin = ['Administrador','Desarrollador','Comercial','Call Center'];