import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ContatoService } from '../contato.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;

  contatos: Contato[] = [];

  colunas = ['foto', 'id', 'nome', 'email', 'favorito']

  totalElementos = 0;
  pagina = 0;
  tamanho = 5;
  pageSizeOptions : number[] = [5];


  constructor( private contatoService: ContatoService, private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.montarFormulario();

    this.listarContatos();
  }

  montarFormulario() {
    this.formulario = this.fb.group({
      nome: [ '', Validators.required ],
      email: [ '', [Validators.required, Validators.email] ]
    });
  }


  listarContatos() {
    this.contatoService.list().subscribe(response => {
      this.contatos = response;
    })
  }

  submit() {
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    this.contatoService.save(contato).subscribe( resposta => {
      let lista: Contato[] = [ ...this.contatos, resposta ];
      this.contatos = lista;
      this.formulario.reset();
    });
  }

  uploadFoto(event, contato: Contato) {

  }

  visualizarContato(contato: Contato) {

  }

  favoritar(contato: Contato) {
    this.contatoService.favourite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    });
  }

}
