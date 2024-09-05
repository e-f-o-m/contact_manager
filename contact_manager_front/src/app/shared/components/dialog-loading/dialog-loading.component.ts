import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'dialog-loading',
    templateUrl: './dialog-loading.component.html',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatProgressSpinnerModule],
    encapsulation: ViewEncapsulation.None
})
export class DialogLoadingComponent {
    constructor( public dialogRef: MatDialogRef<DialogLoadingComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: { title: string, message?: string, progress?: number }) {
    }
}
