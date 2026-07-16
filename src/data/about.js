const calculateCurrentDiff = (dateStr, roundTo = 0) => {
  const date1 = new Date(dateStr);
  const date2 = new Date();
  const Difference_In_Time = date2.getTime() - date1.getTime();
  return ((Difference_In_Time / (1000 * 3600 * 24)) / 30 / 12).toFixed(roundTo);
};

const about = {
  name: "Gabriel Henrique Rodrigues Pinto",
  xp: calculateCurrentDiff("06/30/2018", 1),
  english: "Inglês Intermediário",
  city: "Arcos",
  state: "MG",
  age: calculateCurrentDiff("01/31/2000"),
  topics: [
    {
      title: "Sobre Mim",
      text:
        "Olá! Meu nome é Gabriel e, além do meu trabalho como Desenvolvedor Java Sênior, estou focado em expandir meu lado criativo através de projetos pessoais. Minha jornada na tecnologia começou cedo, quando ingressei como estagiário, impulsionado pela curiosidade e pela vontade constante de aprender. Desde então, venho aprimorando minhas habilidades e adquirindo experiências valiosas ao longo da minha trajetória. Neste novo ano, tenho como meta conquistar certificações internacionais e finalizar meu curso de inglês para agregar ainda mais à minha carreira. Além do desenvolvimento de software, gosto de explorar o universo da música tocando alguns instrumentos, assistir sitcoms e estudar temas variados, desde história até assuntos técnicos da minha área. Se quiser trocar ideias sobre tecnologia, certificações ou qualquer outro assunto, será um prazer conversar!",
    },
    {
      title: 'Minha "Marca"',
      text:
        "Todo o trabalho da logo foi desenvolvido pelo designer Breno Ribeiro após uma breve conversa " +
        "sobre gostos e a imagem que eu queria passar aos clientes com a mesma, foram discutidas " +
        "semelhanças com logos de grandes empresas e minhas inspirações.",
      showIdentity: true,
    },
    {
      title: "Tecnologias",
      showTechnologies: true,
    },
  ],
};

export default about;
