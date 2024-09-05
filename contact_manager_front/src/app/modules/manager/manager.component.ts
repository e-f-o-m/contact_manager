import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ManagerService } from './manager.service';
import { DialogsService } from '../../shared/services/dialogs/dialogs.service';
import { Contact } from '../../core/models/types';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  contacts: Contact[] = [];

  selectedContact: any;
  isAdd = false
  isEdit = false
  search = ''

  formContact?: FormGroup<{
    first_name: FormControl,
    last_name: FormControl
    phone_number: FormControl
    email: FormControl
    address: FormControl
    notes: FormControl
    groups: FormArray
    tags: FormArray
  }>
  isLogin = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _router: Router, private _dialog: MatDialog, private _formBuilder: FormBuilder, private _managerService: ManagerService, private _dialogsService: DialogsService, private change: ChangeDetectorRef) {

    if (!this._managerService.userId) {
      this._router.navigate(['/home/login']);
    }
    this.refresh()

  }  
  
  refresh(){
    this._managerService.getContactsByUser().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      if (!res.isError) {
        this.contacts = res.res
        this.change.detectChanges()
      } else {
        this._dialog.closeAll();
        this._dialogsService.openAlert({ type: 'error', title: 'Error', message: 'Error en la petición, por favor comunicarse con el administrador' });
      }
    })

  }

  handleSearch(event: any) {
    this.search = event.value
  }

  addContact() {
    this._dialogsService.openAlert({ type: 'info', title: 'Nuevo contacto', message: 'Agregar nuevo contacto.' });
    this.selectContact()
    this.isAdd = true
  }

  get groups() { return this.formContact?.controls.groups as FormArray; }
  get tags() { return this.formContact?.controls.tags as FormArray; }
  createInput(name: string, value?: string): FormGroup {
    return this._formBuilder.group({
      [name]: [value ? value : '', Validators.required],
    });
  }
  addInputGroup() { this.groups.push(this.createInput('group')); }
  addInputTag() { this.tags.push(this.createInput('tag')); }

  removeInputGroup(index: number) { this.groups.removeAt(index); }
  removeInputTag(index: number) { this.tags.removeAt(index); }


  selectContact(contact?: Contact) {
    this.formContact = this._formBuilder.group({
      first_name: [contact?.first_name, Validators.required],
      last_name: [contact?.last_name,],
      phone_number: [contact?.phone_number,],
      email: [contact?.email, Validators.email],
      address: [contact?.address,],
      notes: [contact?.notes,],
      tags: this._formBuilder.array(
        contact?.tags?.map(res => {
          return this.createInput('tag', res.tag_name!)
        }) ?? []
      ),
      groups: this._formBuilder.array(contact?.groups?.map(res => {
        return this.createInput('group', res.group_name!)
      }) ?? []),
    });
    this.selectedContact = contact;
    if (contact) {
      this.isAdd = false;
    }
    this.change.detectChanges()
    this.isEdit = false;

    this.formContact?.events.subscribe(event => {
      this.isEdit = true;
    })
  }

  onSubmit(event: any) {
    event.preventDefault()

  }
  saveContact(contact: Contact) {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
    if (this.formContact?.invalid) {
      this._dialog.closeAll();
      this._dialogsService.openAlert({ type: 'warning', title: 'Error', message: 'El formulario no es válido.' });
      this.formContact.markAllAsTouched();
      return;
    }

    if (this.isAdd) {
      this._managerService.updateContact({
        first_name: this.formContact?.controls.first_name.getRawValue(),
        last_name: this.formContact?.controls.last_name.getRawValue(),
        phone_number: this.formContact?.controls.phone_number.getRawValue(),
        email: this.formContact?.controls.email.getRawValue(),
        address: this.formContact?.controls.address.getRawValue(),
        notes: this.formContact?.controls.notes.getRawValue(),
        created_at: now,
        updated_at: now,
        user_id: -1,
        tags: this.formContact?.controls.tags.controls.map(res => { return res.get('tag')?.getRawValue() }),
        groups: this.formContact?.controls.groups.controls.map(res => { return res.get('group')?.getRawValue() }),
      }).pipe(takeUntil(this._unsubscribeAll)).subscribe({
        next: (resp: any) => {
          if (!resp.isError) {
            this.refresh()
            this._dialog.closeAll();
            this._dialogsService.openAlert({ type: 'success', title: 'Exitoso', message: 'Exitoso!' })
            this.isAdd = false;
          } else {
            this._dialog.closeAll();
            this._dialogsService.openAlert({ type: 'error', title: 'Error', message: 'Error en la petición, por favor comunicarse con el administrador' });
          }
        },
        error: (err: any) => {
          console.error('>> >>  error envío:', err);
          this._dialog.closeAll();
          this._dialogsService.openAlert({ type: 'error', title: 'Error', message: 'Se ha presentado un error, por favor comunicarse con el administrador' });
        }
      })
    }else{
      this._managerService.updateContact({
        contact_id: contact.contact_id,
        first_name: this.formContact?.controls.first_name.getRawValue(),
        last_name: this.formContact?.controls.last_name.getRawValue(),
        phone_number: this.formContact?.controls.phone_number.getRawValue(),
        email: this.formContact?.controls.email.getRawValue(),
        address: this.formContact?.controls.address.getRawValue(),
        notes: this.formContact?.controls.notes.getRawValue(),
        created_at: now,
        updated_at: now,
        user_id: -1,
        tags: this.formContact?.controls.tags.controls.map(res => { return res.get('tag')?.getRawValue() }),
        groups: this.formContact?.controls.groups.controls.map(res => { return res.get('group')?.getRawValue() }),
      }).pipe(takeUntil(this._unsubscribeAll)).subscribe({
        next: (resp: any) => {
          if (!resp.isError) {
            this.refresh()
            this._dialog.closeAll();
            this._dialogsService.openAlert({ type: 'success', title: 'Exitoso', message: 'Exitoso!' })
            this.isAdd = false;
          } else {
            this._dialog.closeAll();
            this._dialogsService.openAlert({ type: 'error', title: 'Error', message: 'Error en la petición, por favor comunicarse con el administrador' });
          }
        },
        error: (err: any) => {
          console.error('>> >>  error envío:', err);
          this._dialog.closeAll();
          this._dialogsService.openAlert({ type: 'error', title: 'Error', message: 'Se ha presentado un error, por favor comunicarse con el administrador' });
        }
      })
    }
  }

  deleteContact(contact: Contact) {
    this._managerService.deleteContact(contact).pipe(takeUntil(this._unsubscribeAll)).subscribe({
      next: (resp: any) => {
        if (!resp.isError) {
          this.refresh()
          this._dialog.closeAll();
          this.selectedContact = undefined;
          this.isAdd = false;
          this._dialogsService.openAlert({ type: 'success', title: 'Exitoso', message: 'Exitoso!' })
        } else {
          this._dialog.closeAll();
          this._dialogsService.openAlert({ type: 'error', title: 'Error', message: 'Error en la petición, por favor comunicarse con el administrador' });
        }
      },
      error: (err: any) => {
        console.error('>> >>  error envío:', err);
        this._dialog.closeAll();
        this._dialogsService.openAlert({ type: 'error', title: 'Error', message: 'Se ha presentado un error, por favor comunicarse con el administrador' });
      }
    })
  }
}