class PortfolioItem{
    name="";
    description="";
    technologies=[];
    image="";
    user="";
    password="";
    roles="";
    urlDemo="";
    urlGithub="";

    constructor(name,image, description, technologies, urlDemo, urlGithub="",user="", password="",roles="") {
        this.name=name;
        this.image=image;
        this.description=description;
        this.technologies=technologies;
        this.user=user;
        this.password=password;
        this.urlDemo=urlDemo;
        this.urlGithub=urlGithub;
        this.roles=roles;
    }
}


const about = [
    new PortfolioItem(
      "Sysclin",
      "https://gabrielhrp31.com/imgs/sysclin.png",
      "Sistema para gerenciamento clínico com controle financeiro simples, que pode ser bem util para pequenos consultórios.",
      ['django',"bootstrap","postgresql", "heroku"],
      "https://sysclin.herokuapp.com/",
      "https://github.com/gabrielhrp31/sisclin",
      "admin",
      "sysclin2019"
    ),
    new PortfolioItem(
      "SOCIAL+",
      "https://gabrielhrp31.com/imgs/socialplus.png",
      "Rede Social criada no curso de SPA Laravel+Vue, o diferencial é que procurei aprimorar a minha interface!",
      ["laravel","vuejs","mysql"],
      "http://socialplus.gabrielhrp31.com/",
      "https://github.com/gabrielhrp31/socialplus"
    ),
    new PortfolioItem(
      "Picfolio Wordpress",
      "https://gabrielhrp31.com/imgs/picfolio.png",
      "Tema Wordpress para utilizar como blog e portfólio de fotografias, o mesmo conta as visualizações de cada imagem!",
      ["wordpress","bootstrap","jquery","mysql"],
      "http://picfolio-wordpress.gabrielhrp31.com/",
      "https://github.com/gabrielhrp31/picfolio-wordpress"
    ),
    new PortfolioItem(
      "Ecommerce",
      "https://gabrielhrp31.com/imgs/ecommerce.png",
      "Sistema modelo do E-commerce criado durante meus trabalhos como desenvolvedor autonomo!",
      ["laravel","vuejs","bootstrap","mysql"],
      "https://sysclin.herokuapp.com/",
      "https://github.com/gabrielhrp31/Ecommerce",
        "[cargo]@gmail.com",
        "12345678",
    "admin | gerente | cliente | funcionario"
    ),
    new PortfolioItem(
      "Skynet",
      "https://gabrielhrp31.com/imgs/skynet.png",
      "Sistema desenvolvido para a materia de engenharia de software com o intuito de gerenciar serviços e clientes!",
      ['django',"bootstrap","postgresql", "heroku"],
      "https://skynet-project.herokuapp.com/",
      "https://github.com/gabrielhrp31/skynet",
      "[cargo]@gmail.com",
      "12345678"
    ),

]

export default about