import IdentityDescription from "../components/IdentityDescription";
import Tecnologies from "../components/Tecnologies";

const calculateCurrentDiff= (dateStr, roundTo = 0)=>{
    let date1 = new Date(dateStr);
    let date2 = new Date();
    let Difference_In_Time = date2.getTime() - date1.getTime();
    return ((Difference_In_Time / (1000 * 3600 * 24)) / 30 / 12).toFixed(roundTo);

}

const about =  {
    name: "Gabriel Henrique Rodrigues Pinto",
    xp:calculateCurrentDiff("06/30/2018",1),
    english:"Inglês Intermediário",
    city:"Arcos",
    state:"MG",
    age:calculateCurrentDiff("01/31/2000"),
    topics:[
        {
            title:"Sobre Mim",
            text: "Elit et mattis velit potenti tempor quam lacinia luctus, quisque aliquam mi gravida sapien " +
                "cras est nec, sagittis vulputate lobortis molestie urna porttitor suspendisse. ultricies sed leo " +
                "at orci sit curabitur pulvinar dictum, semper curae nibh tempor mi cras mollis, commodo nulla" +
                " adipiscing blandit metus amet leo. venenatis inceptos eget habitant dictum cubilia curabitur " +
                "tellus massa nullam conubia sagittis vulputate etiam at, suscipit fermentum nisi dapibus elementum " +
                "volutpat porttitor sapien torquent rutrum curae adipiscing vehicula. maecenas amet curae ut quisque " +
                "sapien commodo dui massa, sed himenaeos tempor tortor interdum volutpat commodo nam amet, dictumst " +
                "tempus libero scelerisque mi purus ante."
        },
        {
            title:"Minha \"Marca\"",
            text: "Todo o trabalho da logo foi desenvolvido pelo designer Breno Ribeiro após uma breve conversa "+
            "sobre gostos e a imagem que eu queria passar aos clientes com a mesma, foram discutidas"+
            "semelhanças com logos de grandes empresas e minhas inspirações.",
            after:<IdentityDescription />
        },
        {
            title:"Tecnologias",
            after:<Tecnologies size={80} padding={25} icons={['react','vuejs','spring','laravel','django','html5','css3','javascript']}/>
        }
    ]
}

export default about