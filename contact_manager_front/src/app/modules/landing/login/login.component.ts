import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from './login.service';
import { DialogsService } from '../../../shared/services/dialogs/dialogs.service';
import { User } from '../../../core/models/types';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin: FormGroup<{
    email: FormControl,
    password: FormControl
  }>
  formSignup: FormGroup<{
    username: FormControl,
    email: FormControl,
    password: FormControl
  }>
  isLogin = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _router: Router, private _dialog: MatDialog, private _formBuilder: FormBuilder, private _loginService: LoginService, private _dialogsService: DialogsService) {
    this.formLogin = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
    this.formSignup = this._formBuilder.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }
  
  toggleForm() {
    this.isLogin = !this.isLogin
  }
  onSubmit() {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
    this._dialogsService.openLoading({ title: 'Cargando...' });
    
    if (  (this.formLogin.invalid && this.isLogin )  || (this.formSignup.invalid && !this.isLogin) ) {
      this._dialog.closeAll();
      this._dialogsService.openAlert({ type: 'warning', title: 'Error', message: 'El formulario no es válido.' });
      this.formLogin.markAllAsTouched();
      return;
    }
    
    const user: User = {
      username: !this.isLogin? this.formSignup.controls.username.getRawValue():undefined,
      email: this.isLogin? this.formLogin.controls.email.getRawValue(): this.formSignup.controls.email.getRawValue(),
      password: this.isLogin? this.formLogin.controls.password.getRawValue(): this.formSignup.controls.password.getRawValue(),
      created_at: now,
      updated_at: now,
    }
    
    
    const observable = this.isLogin ? this._loginService.login(user) : this._loginService.signup(user);
    
    observable.pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (resp: any) => {
        if (!resp.isError) {
          this._dialog.closeAll();
          this._dialogsService.openAlert({ type: 'success', title: 'Exitoso', message: 'Exitoso!' })
          this.reset();
          if(this.isLogin){
            localStorage.setItem('user_id', resp.res[0].user_id)
            this._router.navigate(['/']);
          }else{
            this.toggleForm()
          }
        } else {
          this._dialog.closeAll();
          this._dialogsService.openAlert({ type: 'error', title: 'Error', message: 'Error en la petición, por favor comunicarse con el administrador' });
        }
      },
      error: (err: any) => {
        console.error('>> >>  error envío:', err);
        this._dialog.closeAll();
        this.reset();
        this._dialogsService.openAlert({ type: 'error', title: 'Error', message: 'Se ha presentado un error, por favor comunicarse con el administrador' });
      }
    })
  }

  reset(){
    this.formLogin.controls.email.setValue(null) 
    this.formLogin.controls.password.setValue(null)
    this.formSignup.controls.username.setValue(null)
    this.formSignup.controls.email.setValue(null)
    this.formSignup.controls.email.setValue(null)
  }


}
