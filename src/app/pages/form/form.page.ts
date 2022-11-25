import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { IRepositorios } from '../../models/Repositories';
import { GithubApiService } from '../../services/github-api.service';
import { environment, WhatsappEnvio, WhatsappParameter } from '../../../environments/environment';
import { Extensiones } from '../../models/enums/extensionesCi';
import { AgeValidator } from '../../custom-validators/age-validator';
import { IRegistroRepositories } from 'src/app/models/Registro';


@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  @ViewChild('registroFormEl') registroFormElement:any;
  registroForm!: FormGroup;
  loadingIndicator = false;
  reorderable = true;
  rows: IRepositorios[] | null = [];
  rowsComplete: any = [];
  searchRows:any = [];
  tempRows:any = [];
  persona: any;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  selectedRepos : any[] = [];
  columns :any[] = [];
  limit = environment.limitRepos


  username:string = "";
  fechaNacValue: any;
  public extensionesEnum = Object.keys(Extensiones).map((name) => {
    return {
      name,
      value: Extensiones[name as keyof typeof Extensiones],
    };
  });
  constructor(
    private githubService: GithubApiService, 
    private loadingController: LoadingController, 
    private alertController: AlertController,
    public formBuilder: FormBuilder,) {}

  ngOnInit() {

    this.columns = [
      { prop: 'Checkbox', name: 'Seleccionar' },
      { prop: 'name', name: 'Nombre' },
      { prop: 'description', name: 'Descripción' },
      { prop: 'stargazers_count', name: 'Estrellas' },

    ];

    this.registroForm = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      carnetIdentidad: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      expedicionCi: ['', [Validators.required, Validators.maxLength(2)]],
      telefono: ['', [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.minLength(8), Validators.maxLength(15)]],
      fechaNacimiento: ['',[Validators.required, AgeValidator]],
      direccion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      repoCount: [0, [Validators.required, Validators.min(1), Validators.max(2)]]
    })

  }

  get nombres() { return this.registroForm.get('nombres'); }
  get apellidos() { return this.registroForm.get('apellidos'); }
  get carnetIdentidad() { return this.registroForm.get('carnetIdentidad'); }
  get expedicionCi() { return this.registroForm.get('expedicionCi'); }
  get telefono() { return this.registroForm.get('telefono'); }
  get fechaNacimiento() { return this.registroForm.get('fechaNacimiento'); }
  get direccion() { return this.registroForm.get('direccion'); }
  get repoCount() { return this.registroForm.get('repoCount'); }

 async buscarRepos(username:string){
    this.rows =  [...[]];
    await this.presentLoading()
    try {
      await this.githubService.getReposByUsername(username).subscribe(
        (res: IRepositorios[]) =>{
          this.dismissLoading()
          this.rows = res
         
        },
        error => {
          this.dismissLoading()
          if(error.status === 404){
            this.presentAlert("Oops! Ha ocurrido un error.", "No se encontraron repositorios", "OK")
            throw new Error("No se encontraron repositorios")
          }else{
            this.presentAlert("Oops! Ha ocurrido un error.", "Por favor intentelo más tarde", "OK")
            throw new Error("Por favor intentelo más tarde")
          }
          

        }
      )
    } catch (error:any) {
      this.presentAlert("Oops! Ha ocurrido un error.", error, "OK")
    }


  }

  async presentAlert(titulo :string, mensaje : string, txtBtn: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [txtBtn],
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando..',
      spinner: 'bubbles'
    });
    await loading.present();
  }

 async dismissLoading(){
    await this.loadingController.dismiss();
  }


   async onSubmit(){
    this.registroForm.addControl
  }


  submitForm(): void{
    this.registroFormElement.nativeElement.submit();
  }
  


  onSelect({ selected }:any) {
    
      if(this.selectedRepos.length <= 2){
        this.selectedRepos.splice(0, this.selectedRepos.length);
        this.selectedRepos.push(...selected);
        this.registroForm.get('repoCount')?.setValue(this.selectedRepos.length)
      }

  }

  sendtoWhatsapp(){
    let saludoEncode = encodeURIComponent(WhatsappParameter.mensajeSaludo)
    let url: string | undefined | null = WhatsappEnvio.URL + saludoEncode + "%0a"
    const registro : IRegistroRepositories = {
      Nombre : this.registroForm.value.nombres,
      Apellido : this.registroForm.value.apellidos,
      CarnetIdentidad: this.registroForm.value.carnetIdentidad,
      ExpedicionCi: this.registroForm.value.expedicionCi,
      Telefono: this.registroForm.value.telefono,
      Direccion: this.registroForm.value.direccion,
      Repositorios: this.selectedRepos
    }


      url = url+
      `%0a%2aNOMBRES:%2a%20${encodeURIComponent(registro.Nombre)}
      %0a%2aAPELLIDOS:%2a%20${encodeURIComponent(registro.Apellido)}
      %0a%2aCARNET%20DE%20IDENTIDAD:%2a%20${encodeURIComponent(registro.CarnetIdentidad) + registro.ExpedicionCi}
      %0a%2ATEL%C3%89FONO:%2A%20${encodeURIComponent(registro.Telefono)}
      %0a%2ADIRECCI%C3%93N%3A%2A%20${encodeURIComponent(registro.Direccion)}`

      url = url +
      `%0a%0a%2aREPOSITORIOS%2a`


      registro.Repositorios.map( repo =>{
        url = url +
        `%0a%0a%2a----------------------------%2a
        %0a%2a-${encodeURIComponent(repo.name)}%2a%0a${encodeURIComponent(repo.html_url)}`
      })
      
      window.open(url, '_blank').focus(); 
  }

  sendtoMail(){
    let saludoEncode = encodeURIComponent(WhatsappParameter.mensajeSaludo)
    let url: string | undefined | null = "mailto:"+ encodeURIComponent(environment.destinatario)
    const registro : IRegistroRepositories = {
      Nombre : this.registroForm.value.nombres,
      Apellido : this.registroForm.value.apellidos,
      CarnetIdentidad: this.registroForm.value.carnetIdentidad,
      ExpedicionCi: this.registroForm.value.expedicionCi,
      Telefono: this.registroForm.value.telefono,
      Direccion: this.registroForm.value.direccion,
      Repositorios: this.selectedRepos
    }

    url = url +
    `?subject=${environment.emailSubject}&body=`


    url = url+
    `%0aNOMBRES:%20${encodeURIComponent(registro.Nombre)}
    %0aAPELLIDOS:%20${encodeURIComponent(registro.Apellido)}
    %0aCARNET%20DE%20IDENTIDAD:%20${encodeURIComponent(registro.CarnetIdentidad) + registro.ExpedicionCi}
    %0aTEL%C3%89FONO:%20${encodeURIComponent(registro.Telefono)}
    %0aDIRECCI%C3%93N%3A%20${encodeURIComponent(registro.Direccion)}`

    url = url +
    `%0a%0aREPOSITORIOS`


    registro.Repositorios.map( repo =>{
      url = url +
      `%0a------------------------------------------------------------------
      %0a-${encodeURIComponent(repo.name)}%0a${encodeURIComponent(repo.html_url)}`
    })
    
    window.open(url, '_top').focus(); 
  }

}
