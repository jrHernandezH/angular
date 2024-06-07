import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageService } from '../../services/image.service';
import { UsersService } from '../../services/users.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  constructor(private title:Title, private imgS:ImageService, private userS:UsersService, private msg:MessageService){
    title.setTitle('Register')
  }

  //!Datos a recoger y enviar
  datosForm = new FormGroup({
    cuenta: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    apellidos: new FormControl('',[Validators.required]),
    rfc: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    calle: new FormControl('',[Validators.required]),
    colonia: new FormControl('', [Validators.required]),
    codigo_postal: new FormControl('', [Validators.required]),
    ciudad: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    avatar: new FormControl(null, Validators.required),
    activo: new FormControl('activo'),
    rol: new FormControl('cliente')
  })

  onFileSelected(event:any) {
    const file = event.target.files[0];
    this.datosForm.patchValue({
      avatar: file
    });
  }


  getData() {
    this.setImageAndSendUser();
  }

  private setImageAndSendUser() {
    if (this.datosForm.valid) {
      const avatarFile: File | null = this.datosForm.value.avatar || null;
      if (avatarFile) {
        this.imgS.uploadImage(avatarFile).subscribe(
          response => {
            console.log('Imagen subida exitosamente:', response);
            this.datosForm.patchValue({
              avatar: response.url
            });
            this.sendUserData();
          },
          error => {
            console.error('Error al subir imagen:', error);
          }
        );
      } else {
        this.msg.add({ severity: 'warn', summary: 'Avatar no subid', detail: 'Por favor ingresa la imagen' });

      }
      } else {
        this.msg.add({ severity: 'warn', summary: 'Formulario Inválido', detail: 'Por favor completa todos los campos' });

      }
  }

  private sendUserData() {
    this.userS.setUserRegister(this.datosForm.value??'').subscribe(
      response => {
        this.msg.add({ severity: 'success', summary: 'Bienvenido', detail: 'Usuario registrado correctamente'});
      },
      error => {
        console.error(error);
        this.msg.add({ severity: 'error', summary: 'Error', detail: `Error en el registro` });
      }
    );
  }
  
}
