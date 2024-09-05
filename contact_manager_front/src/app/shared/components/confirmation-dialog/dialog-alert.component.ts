import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogaAlertComponent } from '../dialog-alert/dialog-alert.component';
import { FuseAlertType } from '../../services/dialogs/dialogs.service';

@Component({
    selector: 'dialog-alert',
    templateUrl: './dialog-alert.component.html',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule ],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmationDialogComponent {
    constructor( public dialogRef: MatDialogRef<DialogaAlertComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: { type: FuseAlertType, title: string, message?: string}) {
            this.dialogRef.disableClose = true;
            this.dialogRef.updatePosition({ right: '24px', bottom: '24px' });
            this.dialogRef.addPanelClass('custom-dialog-alert');
            
            if(data.type!=='error'){
                setTimeout(() => {
                    this.dialogRef.close();
                }, 2550);
            }
    }
}
