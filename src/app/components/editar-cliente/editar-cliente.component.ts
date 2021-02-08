import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, GuardsCheckStart, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Cliente } from 'src/app/models/cliente.interface';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css'],
})
export class EditarClienteComponent implements OnInit {


  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };
  id:string;

  constructor(
    private clienteService: ClienteService,
    private fm: FlashMessagesService,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteService.getCliente(this.id).subscribe(cliente =>{
      this.cliente = cliente;
    })

  }

  guardar(form:NgForm){
    if(!form.valid){
      this.fm.show('llenar el formulario correctamente', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    }
    else{
      this.cliente.id = this.id
      this.clienteService.modificar(this.cliente);
      this.router.navigate(["/"]);
    }

  }

  eliminar(){
    if(confirm("Desea Eliminar este cliente?")){
      this.clienteService.eliminar(this.cliente);
      this.router.navigate(["/"]);
    }
  }
}
