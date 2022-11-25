// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  limitRepos: 2,
  emailSubject: "Nueva Inscripción al Hackathon Virtual 2022",
  destinatario: "mauriciosalazarbarrero@gmail.com",
  nroWhatsappDestino: "59177031960",
  whatsappLinkBase: "https://wa.me/",
  mapbox: {
    accessToken: "pk.eyJ1IjoicmFzbXVzMTY5NiIsImEiOiJjbGF3OXJqYzkwMmdvM29temMwZ3l3ajVsIn0.5GHGYanRjNXuRfsEMNY4eQ"
  }
};

export const WhatsappParameter ={
  mensajeSaludo:"Hola! Quisiera inscribirme al Hackathon Virtual 2022",
  nroWhatsappDestino: "59177031960",
  whatsappLinkBase: "https://wa.me/"
}

export const WhatsappEnvio = {
  URL : WhatsappParameter.whatsappLinkBase + WhatsappParameter.nroWhatsappDestino + "?text="
}


export const URI_PARAMETERS = {
  SHEMA: 'https://',
  HOST: 'api.github.com',
  PORT: ''
};

export const Base_Uri = {
  URL: URI_PARAMETERS.SHEMA + URI_PARAMETERS.HOST + URI_PARAMETERS.PORT
};

export const USERS = {
  BASE_URL : Base_Uri.URL + '/users/',
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
