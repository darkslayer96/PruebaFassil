export interface IRepositorios {
    id: number;
    name: string;
    html_url: string;
    description: string;
    stargazers_count: number;
    checked: boolean;

    
  }

  export class Repositorios {
    id!: number;
    name!: string;
    html_url!: string;
    description!: string;
    stargazers_count!: number;
    checked: boolean;

    constructor(repo: IRepositorios){
      this.id = repo.id;
      this.name = repo.name;
      this.html_url = repo.html_url;
      this.description = repo.description;
      this.stargazers_count = repo.stargazers_count;
      this.checked = repo.checked 
    }

  }


  
  
