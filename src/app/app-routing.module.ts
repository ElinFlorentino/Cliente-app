import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"cliente/editar/:id",component:EditarClienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
