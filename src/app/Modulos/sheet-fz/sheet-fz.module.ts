import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheetFzComponent } from './sheet-fz/sheet-fz.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
    declarations: [SheetFzComponent],
    imports: [
        CommonModule,
        MatListModule, MatIconModule,
    ]
})
export class SheetFzModule { }
