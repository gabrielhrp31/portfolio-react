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
            text: "Olá como dito acima me chamo Gabriel e pretendo no próximo ano além do meu trabalho desenvolver" +
                " meu lado criativo em projetos pessoais, atualmente colaboro como desenvolvedor fullstack na R2DA Tecnologia " +
                " porém trago comigo uma experiência que agrega muito valor devido a minha curiosidade e meu ingresso prematuro" +
                " como estagiário, desde então não parei de aprender. Atualmente faço pós graduação em Inteligência Artifical e " +
								" Aprendizado de Máquina pela PUC. Nas horas vagas gosto de me aventurar com alguns instrumentos musicais, assistir "+
								" sitcoms e tambem estudar assuntos aleatórios sobre história e sobre minha àrea. Inicialmente esse novo portfólio traz minha identidade " +
								" visual criada por um terceiro e o design todo criado por mim e está estático mas em breve todos os dados dessa página" +
								" virá de uma base de dados através de uma api criada por mim mesmo."
        },
        {
            title:"Minha \"Marca\"",
            text: "Todo o trabalho da logo foi desenvolvido pelo designer Breno Ribeiro após uma breve conversa "+
            "sobre gostos e a imagem que eu queria passar aos clientes com a mesma, foram discutidas "+
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