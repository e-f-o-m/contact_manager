import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogaAlertComponent } from '../../components/dialog-alert/dialog-alert.component';
import { DialogLoadingComponent } from '../../components/dialog-loading/dialog-loading.component';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/dialog-alert.component';

export type FuseAlertAppearance =
    | 'border'
    | 'fill'
    | 'outline'
    | 'soft';

export type FuseAlertType =
    | 'primary'
    | 'accent'
    | 'warn'
    | 'basic'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';


@Injectable({ providedIn: 'root' })
export class DialogsService {
  private _matDialog: MatDialog = inject(MatDialog);

  constructor() {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  openConfirmation(data: { type?: FuseAlertType, title: string, message?: string }): MatDialogRef<ConfirmationDialogComponent> {
    return this._matDialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      disableClose: false,
      data: {
        title: data.title,
        message: data.message,
        icon: {
          show: true,
          name: 'heroicons_outline:exclamation-triangle',
          color: data.type??'primary',
        },
        actions: {
          confirm: {
            show: true,
            label: 'Confirmar',
            color: data.type??'primary',
          },
          cancel: {
            show: true,
            label: 'Cancelar',
          },
        },
        dismissible: false,
      },
      panelClass: 'fuse-confirmation-dialog-panel',
    });
  }
  openAlert(data: { type: FuseAlertType, title: string, message?: string }): MatDialogRef<DialogaAlertComponent> {
    return this._matDialog.open(DialogaAlertComponent, {
      minWidth: '300px',
      maxWidth: '65vw',
      autoFocus: false,
      hasBackdrop: false,
      data: data,
    });
  }
  openLoading(data: { type?: FuseAlertType, title: string, message?: string }): MatDialogRef<DialogLoadingComponent> {
    const loading = this._matDialog.open(DialogLoadingComponent, {
      minWidth: '300px',
      maxWidth: '65vw',
      autoFocus: false,
      data: data,
      disableClose: true
    });
    return loading;
  }
}
