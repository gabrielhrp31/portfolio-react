import portfolioImg from '../assets/images/portfolio.jpg';
import proxyImg from '../assets/images/proxy.jpg';

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
      "",
      ""
    ),
    new PortfolioItem(
      "Proxy",
      proxyImg,
      <>
			Em breve o portfolio da PROXY idealizada pelo meu grande amigo <a href='https://www.instagram.com/yan_maximiano/' target='_blank' rel="noreferrer">@yan_maximiano</a>
			</>,
      ["php","wordpress","html5","javascript", "css3"],
      "https://proxy.gabrielhrp.com",
      "https://github.com/gabrielhrp31/portfolio-react",
      "",
      ""
    ),
]

export default about