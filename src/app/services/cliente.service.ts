import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;

  constructor(private db: AngularFirestore) {
    this.clientesColeccion = db.collection<Cliente>('clientes', (ref) =>
      ref.orderBy('nombre', 'asc')
    );
    this.getClientes();
  }

  /*getClientes(){
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map(acciones => acciones.map(a => a.payload.doc.data()as Cliente))
    )
   };*/
  getClientes() {
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((acciones) => {
          const datos = acciones.payload.doc.data() as Cliente;
          datos.id = acciones.payload.doc.id;
          return datos;
        });
      })
    );
    return this.clientes;
  }

  agregarCliente(cliente: Cliente) {
    this.clientesColeccion.add(cliente);
  }

  getCliente(id: string) {
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map((accion) => {
        const datos = accion.payload.data() as Cliente;
        datos.id = accion.payload.id;
        return datos;
      })
    );
    return this.cliente;
  }

  modificar(cliente:Cliente){
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);

  }

  eliminar(cliente:Cliente){
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${cliente.id}`);
    this.clienteDoc.delete();
  }
}
