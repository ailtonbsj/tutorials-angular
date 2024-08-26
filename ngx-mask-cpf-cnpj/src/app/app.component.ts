import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public cellphone = signal('8899567853500');
  myForm : FormGroup = <FormGroup>{};
  output = '';

  constructor(private fb: FormBuilder){

    this.myForm = this.fb.group({
      cpf: [''],
      cnpj: [''],
      cpfCnpj: ['']
    });

  }

  onSubmit(){
    console.log(this.myForm.value);
    this.output = this.myForm.value;
  }

}
