import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidacionesPropias } from './validaciones-propias';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  provincias : string [] = ['',
    "Álava", "Albacete", "Alicante", "Almería", "Ávila", "Badajoz", "Baleares",
    "Barcelona", "Burgos", "Cáceres", "Cádiz", "Castellón", "Ciudad Real", "Córdoba",
    "La Coruña", "Cuenca", "Gerona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva",
    "Huesca", "Jaén", "León", "Lérida", "La Rioja", "Lugo", "Madrid", "Málaga", "Murcia",
    "Navarra", "Orense", "Asturias", "Palencia", "Las Palmas", "Pontevedra", 
    "Salamanca", "Santa Cruz de Tenerife", "Cantabria", "Segovia", "Sevilla", "Soria",
    "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", 
    "Zaragoza", "Ceuta", "Melilla"
]  
  formularioRegistro = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(8)]),
    dni: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{8}[a-zA-Z]$/), ValidacionesPropias.dni]),
    email: new FormControl('', [Validators.required, Validators.email]),
    fecha: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/) , ValidacionesPropias.fechaNacimiento]),
    cp: new FormControl('', [Validators.required, Validators.pattern(/^(50|51|52|[1-4][0-9]|0[1-9])[0-9]{3}$/)]),
    sexo: new FormControl('', [Validators.required]),
    subirDNI: new FormControl('', [Validators.required, ValidacionesPropias.extension]),
    intereses: new FormControl('', [Validators.required]),
    situacionActual: new FormControl('-', [Validators.pattern(/(estudiante|enparo|trabajador)/)]),
    condiciones: new FormControl('', [Validators.requiredTrue])
  });

  provincia?: string;

  actualizarProvincia(){
    let codigoPostal: number = this.formularioRegistro.value.cp?.length == 5 ? Number(this.formularioRegistro.value.cp?.substring(0,2)) : 0;
    this.provincia = codigoPostal != 0 ? this.provincias[codigoPostal] : "Codigo Postal Invalido";
  }

  resetear(){
      this.formularioRegistro.get('nombre')?.setValue('');
      this.formularioRegistro.get('apellidos')?.setValue('');
      this.formularioRegistro.get('dni')?.setValue('');
      this.formularioRegistro.get('email')?.setValue('');
      this.formularioRegistro.get('fecha')?.setValue('');
      this.formularioRegistro.get('cp')?.setValue('');
      this.formularioRegistro.get('sexo')?.setValue('');
      this.formularioRegistro.get('subirDNI')?.setValue('');
      this.formularioRegistro.get('intereses')?.setValue('');
      this.formularioRegistro.get('situacionActual')?.setValue('-');
      this.formularioRegistro.get('condiciones')?.setValue("");
      this.provincia = "";
  }

  submit(){
    let mens : string = "";
    if(this.formularioRegistro.valid){
      mens += `Nombre: ${this.formularioRegistro.value.nombre}\n`
      mens += `Apellidos: ${this.formularioRegistro.value.apellidos}\n`
      mens += `DNI: ${this.formularioRegistro.value.dni}\n`
      mens += `Email: ${this.formularioRegistro.value.email}\n`
      mens += `Fecha Nacimiento: ${this.formularioRegistro.value.fecha}\n`
      mens += `Sexo: ${this.formularioRegistro.value.sexo}\n`
      mens += `Imagen DNI: ${this.formularioRegistro.value.subirDNI}\n`
      mens += `Intereses: ${this.formularioRegistro.value.intereses}\n`
      mens += `Codigo postal: ${this.formularioRegistro.value.intereses}\n`
      mens += `Provincia: ${this.provincia}\n`
      mens += `Situacion actual: ${this.formularioRegistro.value.situacionActual}\n`
      mens += `Condiciones: Aceptadas`
      alert(mens)
    } else {
      alert("Hay datos invalidos en el formulario")
    }
  }
}
