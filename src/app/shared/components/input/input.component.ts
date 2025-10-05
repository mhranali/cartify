import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() control: any;
  @Input() typeInput!: string;
  @Input() element: string = 'input';
  @Input() idInput!: string;
  @Input() labelInput!: string;
  flag: boolean = true;
}
