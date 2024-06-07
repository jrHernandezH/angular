import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  
  constructor(private title: Title, private msg:MessageService, private userS:UsersService, private router:Router){
    title.setTitle('Login');
  }

  datosForm = new FormGroup({
    cuenta: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  getData() {
    if (this.datosForm.valid) {
      const cuenta = this.datosForm.value.cuenta ?? '';
      const password = this.datosForm.value.password ?? '';
      this.userS.getUserByCuentaAndPassword(cuenta, password).subscribe(
        user => {
          this.userS.setUser(user);
          this.msg.add({ severity: 'success', summary: 'Bienvenido', detail: `Hola, ${user.nombre} ${user.apellidos}` });
          setTimeout(()=>{
            if(user.rol === 'administrador'){
              this.router.navigate(['/admin']);
            }else{
              this.router.navigate(['/client']);
            }
          }, 3000)
        },
        error => {
          console.error(error);
          this.msg.add({ severity: 'error', summary: 'Error', detail: 'Credenciales inválidas' });
        }
      );
    } else {
      this.msg.add({ severity: 'warn', summary: 'Formulario Inválido', detail: 'Por favor completa todos los campos' });
    }
  }
}
