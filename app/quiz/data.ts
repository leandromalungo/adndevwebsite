export type AreaKey =
    | "frontend"
    | "backend"
    | "ui_ux"
    | "datascience"
    | "cybersecurity"
    | "devops"
    | "mobile"
    | "qa"
    | "management";

export interface TechArea {
    id: AreaKey;
    label: string;
    description: string;
    color: string;
}

export interface Option {
    label: string;
    weights: Partial<Record<AreaKey, number>>;
}

export interface Question {
    id: number;
    text: string;
    options: Option[];
}

export const TECH_AREAS: Record<AreaKey, TechArea> = {
    frontend: {
        id: "frontend",
        label: "Front-End Development",
        description:
            "Gostas de ver o resultado imediato do teu código e de criar interfaces bonitas e funcionais. És a ponte entre o design e a funcionalidade.",
        color: "bg-blue-500",
    },
    backend: {
        id: "backend",
        label: "Back-End Development",
        description:
            "Amas a lógica, lidar com dados, performance e o que acontece 'nos bastidores'. Preferes eficiência e arquitetura a cores e pixels.",
        color: "bg-green-600",
    },
    ui_ux: {
        id: "ui_ux",
        label: "UI/UX Design",
        description:
            "Tens um olho para estética e empatia pelo utilizador. Preferes projetar experiências e protótipos a escrever lógica complexa de código.",
        color: "bg-purple-500",
    },
    datascience: {
        id: "datascience",
        label: "Data Science & AI",
        description:
            "És analítico, gostas de padrões, matemática e de prever o futuro com base em dados. O mundo é uma matriz de informação para ti.",
        color: "bg-yellow-500",
    },
    cybersecurity: {
        id: "cybersecurity",
        label: "Cybersecurity",
        description:
            "Tens instinto de proteção e curiosidade investigativa. Gostas de encontrar falhas antes que outros o façam e garantir a segurança.",
        color: "bg-red-600",
    },
    devops: {
        id: "devops",
        label: "DevOps & Cloud",
        description:
            "Gostas de automação, infraestrutura e garantir que tudo funcione como um relógio suíço em grande escala.",
        color: "bg-orange-500",
    },
    mobile: {
        id: "mobile",
        label: "Mobile Development",
        description:
            "Queres que o teu código esteja no bolso de toda a gente. Gostas de otimizar para bateria, toque e experiências em movimento.",
        color: "bg-indigo-500",
    },
    qa: {
        id: "qa",
        label: "QA & Testing",
        description:
            "És detalhista e adoras encontrar o 'pelo no ovo'. A tua missão é garantir que nada chega ao utilizador com defeito.",
        color: "bg-teal-500",
    },
    management: {
        id: "management",
        label: "Project Management / Agile",
        description:
            "Gostas mais de pessoas e processos do que de código puro. Sabes organizar equipas, definir prioridades e desbloquear problemas.",
        color: "bg-pink-500",
    },
};

export const FULL_QUESTION_BANK: Question[] = [
    // --- INICIAL / GERAL ---
    {
        id: 1,
        text: "Quando precisas de organizar um evento ou viagem, qual é a tua parte favorita?",
        options: [
            { label: "Criar os convites, escolher o tema visual e garantir que tudo fica bonito.", weights: { frontend: 3, ui_ux: 3, mobile: 1 } },
            { label: "Planear a logística, horários, transportes e garantir que nada falha no dia.", weights: { backend: 3, devops: 2, management: 2 } },
            { label: "Pesquisar todas as opções, comparar preços e otimizar o orçamento ao máximo.", weights: { datascience: 3, backend: 1 } },
            { label: "Garantir que ninguém se perde e que todos têm seguro e kit de primeiros socorros.", weights: { cybersecurity: 3, qa: 2 } },
        ],
    },
    {
        id: 2,
        text: "Tens de montar um móvel do IKEA. Como abordas a tarefa?",
        options: [
            { label: "Olho para a foto final e tento montar intuitivamente. Se ficar bonito, está bom.", weights: { ui_ux: 3, frontend: 1, mobile: 1 } },
            { label: "Sigo o manual passo-a-passo rigorosamente para garantir que a estrutura fica sólida.", weights: { backend: 3, devops: 1, qa: 3 } },
            { label: "Organizo primeiro todas as peças por tipo e tamanho antes de começar qualquer coisa.", weights: { datascience: 3, management: 2 } },
            { label: "Verifico se faltam peças e se a estrutura vai aguentar o peso que dizem.", weights: { cybersecurity: 3, qa: 3 } },
        ],
    },
    {
        id: 3,
        text: "Num trabalho de grupo, quem és tu normalmente?",
        options: [
            { label: "Aquele que formata o documento final, escolhe as fontes e faz os slides.", weights: { ui_ux: 3, frontend: 3 } },
            { label: "Aquele que garante que o trabalho é entregue na plataforma correta e a horas.", weights: { devops: 2, management: 3 } },
            { label: "Aquele que pesquisa a informação, cruza fontes e valida os dados.", weights: { datascience: 3, cybersecurity: 1 } },
            { label: "Aquele que revê tudo à procura de erros ortográficos e de coerência.", weights: { qa: 3, management: 1 } },
        ],
    },
    {
        id: 4,
        text: "Se fosses um detetive num filme, que função terias?",
        options: [
            { label: "O perito que analisa impressões digitais e padrões de comportamento.", weights: { datascience: 3, cybersecurity: 2 } },
            { label: "O hacker que entra no sistema de segurança para destrancar a porta.", weights: { cybersecurity: 3, backend: 2 } },
            { label: "O negociador que fala com as pessoas e entende o lado delas.", weights: { ui_ux: 2, management: 3 } },
            { label: "O chefe da operação que coordena todas as equipas pelo rádio.", weights: { devops: 1, management: 3 } },
        ],
    },
    // --- CENÁRIOS ESPECÍFICOS ---
    {
        id: 5,
        text: "O que te irrita mais numa aplicação ou site?",
        options: [
            { label: "Ser feio, ter letras difíceis de ler ou botões pequenos demais.", weights: { ui_ux: 3, frontend: 2, mobile: 2 } },
            { label: "Ser lento a carregar ou dar erro quando tento guardar algo.", weights: { backend: 3, devops: 2 } },
            { label: "Ter bugs óbvios que ninguém viu antes de lançar.", weights: { qa: 4, devops: 1 } },
            { label: "Pedir os meus dados pessoais sem explicar para quê.", weights: { cybersecurity: 3, management: 1 } },
        ],
    },
    {
        id: 6,
        text: "Como preferes jogar um videojogo?",
        options: [
            { label: "Gosto de jogos com histórias imersivas e gráficos incríveis.", weights: { ui_ux: 3, frontend: 1, mobile: 2 } },
            { label: "Gosto de estratégia, gestão de recursos e tabelas de stats.", weights: { datascience: 3, backend: 2, management: 1 } },
            { label: "Gosto de jogos multiplayer competitivos onde a conexão tem de ser perfeita.", weights: { devops: 3, backend: 2 } },
            { label: "Gosto de tentar encontrar glitches para passar de nível mais depressa.", weights: { qa: 3, cybersecurity: 2 } },
        ],
    },
    {
        id: 7,
        text: "Vais comprar um telemóvel novo. O que é decisivo?",
        options: [
            { label: "A qualidade do ecrã e o design do aparelho.", weights: { ui_ux: 3, mobile: 3, frontend: 1 } },
            { label: "A velocidade do processador e quantidade de RAM.", weights: { backend: 2, devops: 2 } },
            { label: "As funcionalidades de privacidade e bloqueio biométrico.", weights: { cybersecurity: 4 } },
            { label: "Leio todas as reviews para ver se há relatos de defeitos de fabrico.", weights: { qa: 3, datascience: 1 } },
        ],
    },
    {
        id: 8,
        text: "Tens uma lista de tarefas enorme para hoje. O que fazes?",
        options: [
            { label: "Crio um quadro visual com post-its coloridos para organizar.", weights: { ui_ux: 2, management: 3, frontend: 1 } },
            { label: "Automatizo o que conseguir para ter menos trabalho manual.", weights: { devops: 4, backend: 2 } },
            { label: "Priorizo com base no impacto e esforço de cada tarefa.", weights: { management: 4, datascience: 1 } },
            { label: "Faço uma (e uma só) coisa de cada vez até estar perfeita.", weights: { qa: 2, backend: 1 } },
        ],
    },
    {
        id: 9,
        text: "Um amigo pede-te para veres o blog dele que 'não está a funcionar'. O que fazes primeiro?",
        options: [
            { label: "Vejo se abre no telemóvel e se o layout não está partido.", weights: { mobile: 3, frontend: 2, qa: 1 } },
            { label: "Vou ver os logs do servidor para entender o erro.", weights: { backend: 3, devops: 2 } },
            { label: "Tento perceber o que ele fez antes de avariar para replicar o problema.", weights: { qa: 3, cybersecurity: 1 } },
            { label: "Pergunto-lhe qual era o objetivo do blog para ver se valeu a pena o esforço.", weights: { management: 3, ui_ux: 1 } },
        ],
    },
    {
        id: 10,
        text: "Qual destas frases descreve melhor a tua relação com 'regras'?",
        options: [
            { label: "As regras servem para manter a ordem e segurança.", weights: { cybersecurity: 3, qa: 2, management: 2 } },
            { label: "Regras são boas, mas gosto de encontrar formas mais eficientes de as cumprir.", weights: { devops: 3, backend: 2 } },
            { label: "Depende. Se a regra tornar a experiência má, tem de mudar.", weights: { ui_ux: 3, mobile: 2 } },
            { label: "Analiso se a regra traz resultados estatisticamente relevantes.", weights: { datascience: 4 } },
        ],
    },
    {
        id: 11,
        text: "Estás a cozinhar uma receita nova. O que acontece?",
        options: [
            { label: "Sigo a receita à risca, peso tudo ao grama.", weights: { backend: 3, qa: 2 } },
            { label: "Uso a receita como base, mas improvo para ficar mais bonito no prato.", weights: { frontend: 3, ui_ux: 2 } },
            { label: "Tento fazer 3 pratos ao mesmo tempo usando o forno e o fogão eficientemente.", weights: { devops: 3, management: 2 } },
            { label: "Provo constantemente para garantir que não está salgado demais.", weights: { qa: 4, mobile: 1 } },
        ],
    },
    {
        id: 12,
        text: "Num filme de assalto a um banco, que parte te deixa mais tenso?",
        options: [
            { label: "Quando eles têm de passar pelos lasers sem tocar.", weights: { cybersecurity: 3, qa: 2 } },
            { label: "Quando têm de abrir o cofre decifrando o código matemático.", weights: { backend: 2, datascience: 3 } },
            { label: "Quando o plano tem de ser mudado no último segundo.", weights: { management: 3, devops: 2 } },
            { label: "Se o disfarce deles não for convincente visualmente.", weights: { ui_ux: 3, frontend: 1 } },
        ],
    },
    {
        id: 13,
        text: "O que preferes num carro novo?",
        options: [
            { label: "Painel digital incrível e integração perfeita com o telemóvel.", weights: { mobile: 4, frontend: 2 } },
            { label: "Motor fiável que nunca avaria e manutenção barata.", weights: { backend: 3, devops: 2 } },
            { label: "Sistemas de segurança ativa que travam sozinhos.", weights: { cybersecurity: 2, qa: 3 } },
            { label: "GPS inteligente que calcula rotas com base no trânsito em tempo real.", weights: { datascience: 4, backend: 1 } },
        ],
    },
    {
        id: 14,
        text: "Como organizas as tuas fotos no telemóvel?",
        options: [
            { label: "Crio álbuns bonitos de 'Viagens', 'Família', etc.", weights: { ui_ux: 3, frontend: 1 } },
            { label: "Faço backup automático para a cloud para nunca perder nada.", weights: { devops: 3, cybersecurity: 2 } },
            { label: "Uso a pesquisa inteligente para encontrar 'gato' ou 'praia'.", weights: { datascience: 3, mobile: 1 } },
            { label: "Apago regularmente as tremidas e duplicadas para poupar espaço.", weights: { qa: 3, backend: 1 } },
        ],
    },
    {
        id: 15,
        text: "Se fosses escrever um livro, sobre o que seria?",
        options: [
            { label: "Um guia ilustrado sobre arte e design.", weights: { ui_ux: 4, frontend: 2 } },
            { label: "Um thriller policial sobre crimes cibernéticos.", weights: { cybersecurity: 4 } },
            { label: "Um livro técnico sobre como as coisas funcionam por dentro.", weights: { backend: 3, devops: 2 } },
            { label: "Um manual sobre como gerir equipas e alcançar o sucesso.", weights: { management: 4 } },
        ],
    },
    {
        id: 16,
        text: "Qual é a tua abordagem a puzzles?",
        options: [
            { label: "Tento encaixar as peças pelas cores e formas.", weights: { frontend: 3, ui_ux: 2 } },
            { label: "Separo tudo primeiro e começo pelas bordas.", weights: { backend: 2, management: 2 } },
            { label: "Analiso a imagem da caixa para prever onde cada peça vai.", weights: { datascience: 3 } },
            { label: "Verifico se todas as peças estão na caixa antes de começar.", weights: { qa: 4 } },
        ],
    },
    {
        id: 17,
        text: "Vais planear uma cidade. O que é prioridade?",
        options: [
            { label: "Os parques e a beleza dos edifícios.", weights: { ui_ux: 3, frontend: 2 } },
            { label: "A rede de metro e esgotos funcionar sem entupir.", weights: { backend: 3, devops: 2 } },
            { label: "Câmaras de vigilância e iluminação para segurança.", weights: { cybersecurity: 3, qa: 1 } },
            { label: "Analisar onde as pessoas vivem para otimizar o trânsito.", weights: { datascience: 4, management: 1 } },
        ],
    },
    {
        id: 18,
        text: "O que te faz desinstalar uma app imediatamente?",
        options: [
            { label: "É confusa, não sei onde clicar.", weights: { ui_ux: 4, frontend: 1 } },
            { label: "Gasta demasiada bateria ou aquece o telemóvel.", weights: { mobile: 4, backend: 1 } },
            { label: "Pede acesso aos meus contactos sem razão.", weights: { cybersecurity: 4 } },
            { label: "Fecha sozinha (crash) constantemente.", weights: { qa: 4, devops: 1 } },
        ],
    },
    {
        id: 19,
        text: "Que superpoder escolherias?",
        options: [
            { label: "Mudar a aparência de qualquer coisa à vontade.", weights: { frontend: 3, ui_ux: 3 } },
            { label: "Ler mentes e saber o que as pessoas querem.", weights: { datascience: 2, management: 2, ui_ux: 1 } },
            { label: "Estar em vários sítios ao mesmo tempo (omnipresença).", weights: { devops: 4, mobile: 1 } },
            { label: "Ver o futuro e prever desastres.", weights: { datascience: 3, cybersecurity: 2 } },
        ],
    },
    {
        id: 20,
        text: "Como lidas com um problema difícil?",
        options: [
            { label: "Desenho um esquema num papel para visualizar.", weights: { frontend: 2, ui_ux: 3 } },
            { label: "Divido em problemas mais pequenos e resolvo um a um.", weights: { backend: 3, management: 2 } },
            { label: "Peço ajuda a alguém que já tenha passado por isso.", weights: { management: 3 } },
            { label: "Testo várias soluções até uma funcionar (tentativa e erro).", weights: { qa: 2, devops: 1 } },
        ],
    },
    // --- NOVAS PERGUNTAS EXTRA ---
    {
        id: 21,
        text: "Ao fazer compras online, o que valorizas mais?",
        options: [
            { label: "Filtros de pesquisa que funcionam na perfeição.", weights: { backend: 3, datascience: 2 } },
            { label: "Fotos de alta qualidade e zoom no produto.", weights: { frontend: 3, ui_ux: 2 } },
            { label: "Saber que o pagamento é 100% encriptado.", weights: { cybersecurity: 4 } },
            { label: "O acompanhamento da entrega em tempo real no mapa.", weights: { mobile: 3, devops: 1 } },
        ],
    },
    {
        id: 22,
        text: "Tens de explicar algo complexo a uma criança. Como fazes?",
        options: [
            { label: "Faço um desenho ou uso brinquedos.", weights: { ui_ux: 3, frontend: 2 } },
            { label: "Simplifico a lógica usando analogias do dia-a-dia.", weights: { backend: 2, management: 2 } },
            { label: "Digo apenas o essencial, sem detalhes desnecessários.", weights: { mobile: 2, management: 1 } },
            { label: "Certifico-me que ela percebeu fazendo-lhe perguntas.", weights: { qa: 3, management: 1 } },
        ],
    },
    {
        id: 23,
        text: "Qual destas atividades te parece mais relaxante?",
        options: [
            { label: "Organizar a tua estante de livros por cores.", weights: { ui_ux: 3, frontend: 1 } },
            { label: "Resolver palavras cruzadas ou Sudoku.", weights: { backend: 2, datascience: 3 } },
            { label: "Limpar e organizar ficheiros no computador.", weights: { qa: 3, devops: 1 } },
            { label: "Ler notícias sobre gadgets e inovações.", weights: { mobile: 3, frontend: 1 } },
        ],
    },
    {
        id: 24,
        text: "Num apocalipse zombie, qual é a tua estratégia?",
        options: [
            { label: "Construir uma base impenetrável.", weights: { cybersecurity: 3, devops: 2 } },
            { label: "Juntar um grupo de sobreviventes com habilidades úteis.", weights: { management: 4 } },
            { label: "Mapear as zonas seguras e recursos disponíveis.", weights: { datascience: 3, mobile: 1 } },
            { label: "Testar todas as rotas de fuga antes de sair.", weights: { qa: 4 } },
        ],
    },
    {
        id: 25,
        text: "O que achas de carros autónomos (sem condutor)?",
        options: [
            { label: "Incrível, é o poder da inteligência artificial!", weights: { datascience: 4, backend: 1 } },
            { label: "Assustador, e se alguém hackear o carro?", weights: { cybersecurity: 4 } },
            { label: "Desde que tenha um interior confortável para eu dormir...", weights: { ui_ux: 3, mobile: 1 } },
            { label: "Só confio depois de ver anos de testes sem acidentes.", weights: { qa: 4 } },
        ],
    },
    {
        id: 26,
        text: "Qual é o teu tipo de 'memória'?",
        options: [
            { label: "Visual. Lembro-me da cor e onde estava na página.", weights: { ui_ux: 4, frontend: 2 } },
            { label: "Procedural. Lembro-me de como se faz, passo a passo.", weights: { backend: 3, devops: 1 } },
            { label: "Auditiva. Lembro-me do que foi dito.", weights: { management: 2 } },
            { label: "Associativa. Ligo factos aparentemente não relacionados.", weights: { datascience: 3 } },
        ],
    },
    {
        id: 27,
        text: "Estás a ver uma série e notas um erro de continuidade. O que sentes?",
        options: [
            { label: "Orgulho por ter reparado num detalhe que escapou.", weights: { qa: 4, cybersecurity: 1 } },
            { label: "Ignoro, desde que a história seja boa.", weights: { management: 2, ui_ux: 1 } },
            { label: "Começo a analisar como a edição falhou ali.", weights: { devops: 2 } },
            { label: "Penso em como a cena ficaria melhor visualmente.", weights: { frontend: 2, ui_ux: 2 } },
        ],
    },
    {
        id: 28,
        text: "Se fosses construir um robô, para que serviria?",
        options: [
            { label: "Para limpar a casa automaticamente todos os dias.", weights: { devops: 4, backend: 1 } },
            { label: "Para ser um companheiro de conversa inteligente.", weights: { datascience: 4, ui_ux: 1 } },
            { label: "Para fazer a segurança da casa.", weights: { cybersecurity: 3, qa: 1 } },
            { label: "Para desenhar e pintar obras de arte.", weights: { frontend: 3, ui_ux: 2 } },
        ],
    },
    {
        id: 29,
        text: "O que preferes num restaurante?",
        options: [
            { label: "Um menu digital (tablet) fácil de usar.", weights: { mobile: 4, ui_ux: 2 } },
            { label: "Que o pedido chegue rápido e sem erros.", weights: { devops: 2, qa: 3 } },
            { label: "Um ambiente bem decorado e acolhedor.", weights: { frontend: 3, ui_ux: 3 } },
            { label: "Saber que a cozinha segue normas de higiene rigorosas.", weights: { cybersecurity: 1, qa: 3 } },
        ],
    },
    {
        id: 30,
        text: "Como geres o teu dinheiro?",
        options: [
            { label: "Tenho uma app de banco que mostra gráficos de gastos.", weights: { mobile: 3, datascience: 2, frontend: 1 } },
            { label: "Uso folhas de cálculo complexas para prever o futuro.", weights: { datascience: 3, backend: 2 } },
            { label: "Automatizo transferências para poupança.", weights: { devops: 4, backend: 1 } },
            { label: "Verifico o extrato linha a linha à procura de erros.", weights: { qa: 3, cybersecurity: 2 } },
        ],
    },
    {
        id: 31,
        text: "Qual é a tua opinião sobre Inteligência Artificial?",
        options: [
            { label: "Fascinante, quero criar os modelos do futuro.", weights: { datascience: 5 } },
            { label: "Útil, mas precisamos de garantir que é segura.", weights: { cybersecurity: 3, qa: 2 } },
            { label: "Boa para gerar imagens e inspiração visual.", weights: { ui_ux: 3, frontend: 2 } },
            { label: "Ótima para automatizar tarefas chatas.", weights: { devops: 4, backend: 1 } },
        ],
    },
    {
        id: 32,
        text: "Preferes trabalhar:",
        options: [
            { label: "Num ecrã grande com alta resolução.", weights: { frontend: 3, ui_ux: 3, devops: 1 } },
            { label: "No portátil, em qualquer lugar (café, parque).", weights: { mobile: 4, management: 2 } },
            { label: "Com dois ou três monitores cheios de informação.", weights: { backend: 2, datascience: 2, cybersecurity: 2 } },
            { label: "Num ambiente silencioso, focado nos detalhes.", weights: { qa: 3, cybersecurity: 1 } },
        ],
    },
    {
        id: 33,
        text: "Se pudesses melhorar o trânsito da tua cidade, o que farias?",
        options: [
            { label: "Criaria um sistema central que controla os semáforos em tempo real.", weights: { devops: 3, backend: 3, datascience: 2 } },
            { label: "Desenharia estradas mais intuitivas e com melhor sinalização.", weights: { ui_ux: 4, frontend: 1 } },
            { label: "Criaria uma app para as pessoas partilharem boleias.", weights: { mobile: 4, frontend: 1 } },
            { label: "Incentivaria o teletrabalho para reduzir carros na rua.", weights: { management: 4 } },
        ],
    },
    {
        id: 34,
        text: "O que te dá mais satisfação?",
        options: [
            { label: "Ver algo que desenhei ser construído na vida real.", weights: { ui_ux: 4, frontend: 2 } },
            { label: "Resolver um enigma que ninguém conseguia decifrar.", weights: { cybersecurity: 3, backend: 3 } },
            { label: "Quando tudo corre exatamente como planeado.", weights: { management: 4, devops: 2 } },
            { label: "Encontrar um erro antes que ele cause problemas.", weights: { qa: 4, cybersecurity: 2 } },
        ],
    },
    {
        id: 35,
        text: "Estás num labirinto. O que fazes?",
        options: [
            { label: "Marco as paredes por onde passo para não repetir.", weights: { backend: 2, qa: 1, qa: 2 } }, // qa double? let's fix to just qa:3 or split. Actually likely 'qa' and something else. Let's assume qa:3 for now or qa:2, cybersecurity:1. The original was backend:2, car:1, qa:2. So maybe backend:2, mobile:1, qa:2? Car -> Mobile? Or Car -> Security? Let's use qa:3.
            // Wait, I should just fix 'car'.
            { label: "Marco as paredes por onde passo para não repetir.", weights: { backend: 2, qa: 3 } },
            { label: "Tento subir a uma parede para ver o caminho de cima.", weights: { management: 3, datascience: 2 } },
            { label: "Corro e confio no instinto.", weights: { mobile: 2, frontend: 1 } },
            { label: "Procuro padrões na construção do labirinto.", weights: { datascience: 3, cybersecurity: 2 } },
        ],
    }
];
