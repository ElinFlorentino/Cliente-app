import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
/*import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';*/
import { Cliente } from 'src/app/models/cliente.interface';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };
  @ViewChild('clienteForm') clienteForm: NgForm;
  @ViewChild('btnCerrar') btnCerrar: ElementRef;

  //clienteForm: FormGroup;
  //private isEmail = /\S+@\S+\.\S+/;

  constructor(
    private clienteService: ClienteService,
    private fm: FlashMessagesService //private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
    //this.formulario();
  }

  getSaldoTotal() {
    let saldoTotal: number = 0;
    if (this.clientes) {
      this.clientes.forEach((cliente) => {
        saldoTotal += cliente.saldo;
      });
    }
    return saldoTotal;
  }

  /*
  private formulario() {
    this.clienteForm = this.fb.group({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.isEmail),
      ]),
      saldo: new FormControl('', [Validators.required]),
    });

  }*/

  guardarCliente(form: NgForm) {
    if (!form.valid) {
      this.fm.show('llenar el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      this.clienteService.agregarCliente(form.value);
      this.btnCerrar.nativeElement.click();
      this.clienteForm.resetForm();
    }
  }
}
