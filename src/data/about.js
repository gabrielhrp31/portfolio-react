/** Parse MM/DD/YYYY as a local calendar date (avoids UTC timezone shifts). */
function parseLocalDate(dateStr) {
  const [month, day, year] = String(dateStr)
    .split("/")
    .map((part) => Number(part));
  return { year, month, day, date: new Date(year, month - 1, day) };
}

/** Whole years since a date (e.g. age from birthdate). */
function calculateAge(dateStr) {
  const { year, month, day } = parseLocalDate(dateStr);
  const today = new Date();
  let age = today.getFullYear() - year;
  const monthNow = today.getMonth() + 1;
  const dayNow = today.getDate();
  const birthdayPassed =
    monthNow > month || (monthNow === month && dayNow >= day);
  if (!birthdayPassed) age -= 1;
  return age;
}

/** Fractional years since a date (e.g. experience), using average year length. */
function calculateYearsSince(dateStr, decimals = 0) {
  const { date } = parseLocalDate(dateStr);
  const msPerYear = 1000 * 60 * 60 * 24 * 365.25;
  const years = (Date.now() - date.getTime()) / msPerYear;
  return Number(years.toFixed(decimals));
}

const BIRTHDATE = "01/31/2000";
const CAREER_START = "06/30/2018";

const about = {
  name: "Gabriel Henrique Rodrigues Pinto",
  birthdate: BIRTHDATE,
  xp: calculateYearsSince(CAREER_START, 1),
  english: "Inglês Intermediário",
  city: "Arcos",
  state: "MG",
  age: calculateAge(BIRTHDATE),
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
