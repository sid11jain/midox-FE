import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MsgDialogComponent } from 'src/app/shared/msg-dialog/msg-dialog.component';

@Component({
  selector: 'app-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.scss']
})
export class BundleComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(MsgDialogComponent, {
      data: {
        title: 'Data',
        message: 'saved successfully!',
      },
      width: '30%',
      height: '30%',
      panelClass: 'msg-dialog'
    });
  }
}
