import portfolioImg from '../assets/images/portfolio.jpg';

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
      "Portfólio",
      portfolioImg,
      "Este próprio site...",
      ['react',"javascript", "css3"],
      "#",
      "https://github.com/gabrielhrp31/portfolio-react",
      "admin",
      "sysclin2019"
    ),
]

export default about