import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseAlertType } from '../../services/dialogs/dialogs.service';

@Component({
    selector: 'dialog-alert',
    templateUrl: './dialog-alert.component.html',
    styleUrl: './dialog-alert.component.css',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule,],
    encapsulation: ViewEncapsulation.None
})
export class DialogaAlertComponent {
    constructor(public dialogRef: MatDialogRef<DialogaAlertComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { type: FuseAlertType, title: string, message?: string }) {
        this.dialogRef.disableClose = true;
        this.dialogRef.updatePosition({ right: '24px', bottom: '24px' });
        this.dialogRef.addPanelClass('custom-dialog-alert');
        
        setTimeout(() => {
            this.dialogRef.close()
        }, 2 * 1000);
    }

   
    color: {
        success: { color: string, icon: string },
        info: { color: string, icon: string },
        warning: { color: string, icon: string },
        primary?: { color: string, icon: string },
        accent?: { color: string, icon: string },
        warn?: { color: string, icon: string },
        basic?: { color: string, icon: string },
        error?: { color: string, icon: string },
    } = {
            success: { color: "#2BDE3F", icon: '/success.svg' },
            info: { color: "#1D72F3", icon: '/info.svg' },
            warning: { color: "#FFC007", icon: '/warning.svg' },
        }
}
/* toast?: IToast
this.toast = { type: 's', timeS: 1.8, title: "Exitoso", message: "Datosborrados", end: () => { this.toast = undefined } }
@if (toast) {<toast [data]="toast"></toast>} 
*/


