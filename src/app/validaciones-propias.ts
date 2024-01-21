import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ValidacionesPropias{

    static dni(control: AbstractControl) : ValidationErrors| null {   
        if(control.value.length == 9){
            let dni: string = control.value;
            const letraDNI = dni.substring(8, 9);
            const numDNI = parseInt(dni.substring(0, 8));
            let letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
            let letraCorrecta = letras[numDNI % 23];
             
            if(letraDNI.toUpperCase() != letraCorrecta){
            return {dni: true}
                }
            else{
                return null;
            }
        } else {
            return null;
        }
       
    }
    
    static fechaNacimiento(control: AbstractControl) : ValidationErrors| null {
        if(control.value){
            let fechaUsuario : string = control.value;
            let campos: string [] = fechaUsuario.split("/");
            const fecha = new Date(Number(campos[2]), Number(campos[1])-1, Number(campos[0]));
            if(!isNaN(fecha.getTime()) && Number(campos[0]) == fecha.getDate() && Number(campos[1]) == fecha.getMonth() + 1 && Number(campos[2]) == fecha.getFullYear()) {
                return null;
            } else {
                return {fechaNacimiento: true}
            }
        } else {
            return null;
        }
        
    }

    static extension(control: AbstractControl) : ValidationErrors| null {   
        if(control.value){
            const extensionesValidas: string [] = [".jpeg", ".gif", ".png", ".jpg"];
            let archivo: string = control.value.toLowerCase();;
            let valido = extensionesValidas.filter(ext => archivo.endsWith(ext));
            if(valido.length > 0){
                return null;
            } else {
                return {extension: true};
            }
        } else {
            return null;
        }
    }
}