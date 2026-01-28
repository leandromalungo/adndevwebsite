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
            { label: "Marco as paredes por onde passo para não repetir.", weights: { backend: 2, qa: 3 } },
            { label: "Tento subir a uma parede para ver o caminho de cima.", weights: { management: 3, datascience: 2 } },
            { label: "Corro e confio no instinto.", weights: { mobile: 2, frontend: 1 } },
            { label: "Procuro padrões na construção do labirinto.", weights: { datascience: 3, cybersecurity: 2 } },
        ],
    },
    {
        id: 36,
        text: "Como reages a feedback negativo sobre o teu trabalho?",
        options: [
            { label: "Analiso os pontos técnicos e corrijo o que faz sentido.", weights: { backend: 3, devops: 2 } },
            { label: "Defendo as minhas escolhas de design com base na experiência do utilizador.", weights: { ui_ux: 4, frontend: 2 } },
            { label: "Vejo como uma oportunidade de melhorar o processo da equipa.", weights: { management: 3, qa: 2 } },
            { label: "Investigo se o feedback tem base em dados ou é apenas opinião.", weights: { datascience: 3, management: 1 } },
        ],
    },
    {
        id: 37,
        text: "Surgiu uma nova tecnologia revolucionária. O que fazes?",
        options: [
            { label: "Vou logo experimentar e fazer um 'Hello World' bonito.", weights: { frontend: 3, mobile: 2 } },
            { label: "Leio a documentação técnica para entender como funciona 'debaixo do capô'.", weights: { backend: 3, devops: 2 } },
            { label: "Analiso se é segura e se não introduz vulnerabilidades.", weights: { cybersecurity: 4, qa: 1 } },
            { label: "Espero para ver se tem adoção no mercado antes de investir tempo.", weights: { management: 3, datascience: 1 } },
        ],
    },
    {
        id: 38,
        text: "Vais participar num Hackathon. Qual é o teu foco?",
        options: [
            { label: "Fazer o pitch final e vender a ideia aos júris.", weights: { management: 4, ui_ux: 1 } },
            { label: "Garantir que temos um protótipo funcional para mostrar.", weights: { frontend: 3, mobile: 3 } },
            { label: "Montar a infraestrutura e o servidor para aguentar o tráfego.", weights: { devops: 4, backend: 2 } },
            { label: "Limpar os dados que vamos usar na aplicação.", weights: { datascience: 4 } },
        ],
    },
    {
        id: 39,
        text: "Encontras código sem comentários e difícil de ler. O que pensas?",
        options: [
            { label: "Isto é um pesadelo de segurança à espera de acontecer.", weights: { cybersecurity: 3, qa: 2 } },
            { label: "Vou refatorar isto para ficar limpo e legível.", weights: { backend: 3, qa: 2 } },
            { label: "Desde que funcione e a interface não quebre, sigo em frente.", weights: { frontend: 2, mobile: 1 } },
            { label: "Quem geriu este projeto devia ter imposto regras de código.", weights: { management: 3, devops: 1 } },
        ],
    },
    {
        id: 40,
        text: "Preferes usar Terminal (Linha de Comandos) ou Interface Gráfica (GUI)?",
        options: [
            { label: "Terminal sempre. É mais rápido e poderoso.", weights: { devops: 4, backend: 3, cybersecurity: 2 } },
            { label: "Interface Gráfica. Gosto de ver o que estou a fazer.", weights: { ui_ux: 4, frontend: 3 } },
            { label: "Depende. Para dados uso notebooks, para o resto tanto faz.", weights: { datascience: 3 } },
            { label: "Uso o que for mais eficiente para testar o sistema.", weights: { qa: 3, mobile: 1 } },
        ],
    },
    {
        id: 41,
        text: "Dark Mode ou Light Mode?",
        options: [
            { label: "Dark Mode, sempre. É melhor para os olhos e 'hacker style'.", weights: { backend: 2, devops: 2, cybersecurity: 2 } },
            { label: "Light Mode. Gosto de clareza e contraste.", weights: { ui_ux: 2, frontend: 1 } },
            { label: "O que o sistema operativo tiver definido (tema automático).", weights: { mobile: 3, frontend: 2 } },
            { label: "Não ligo, desde que o código compile.", weights: { backend: 1, devops: 1 } },
        ],
    },
    {
        id: 42,
        text: "Tabs ou Spaces?",
        options: [
            { label: "Configuro o linter para forçar o padrão da equipa, seja qual for.", weights: { devops: 3, management: 2, qa: 2 } },
            { label: "Spaces, para garantir alinhamento visual perfeito em todo o lado.", weights: { frontend: 2, ui_ux: 1 } },
            { label: "Tabs, porque ocupam menos bytes e cada um ajusta a largura.", weights: { backend: 2 } },
            { label: "O IDE que trate disso, eu quero é programar.", weights: { mobile: 1, datascience: 1 } },
        ],
    },
    {
        id: 43,
        text: "Qual é o teu Sistema Operativo principal?",
        options: [
            { label: "Linux. Quero controlo total sobre o meu sistema.", weights: { devops: 4, cybersecurity: 3, backend: 2 } },
            { label: "macOS. É bonito, baseado em Unix e funciona bem.", weights: { ui_ux: 3, frontend: 3, mobile: 3 } },
            { label: "Windows. É compatível com tudo e bom para jogar também.", weights: { backend: 1, management: 1 } },
            { label: "Tenho várias máquinas virtuais para testar em todos.", weights: { qa: 4, cybersecurity: 2 } },
        ],
    },
    {
        id: 44,
        text: "Café ou Chá para programar?",
        options: [
            { label: "Café, muito café. Preciso de energia para codar.", weights: { backend: 2, devops: 1 } },
            { label: "Chá, para manter a calma enquanto resolvo bugs.", weights: { qa: 2, management: 1 } },
            { label: "Água. Hidratação é fundamental para o cérebro.", weights: { datascience: 2, mobile: 1 } },
            { label: "Bebidas energéticas, estilo gamer/hacker.", weights: { cybersecurity: 2, frontend: 1 } },
        ],
    },
    {
        id: 45,
        text: "Ouvem música enquanto trabalham?",
        options: [
            { label: "Sim, lo-fi ou instrumental para focar.", weights: { frontend: 2, ui_ux: 2 } },
            { label: "Não, preciso de silêncio absoluto para pensar na lógica.", weights: { backend: 3, datascience: 2 } },
            { label: "Metal ou eletrónica rápida para picar código.", weights: { devops: 2, cybersecurity: 1 } },
            { label: "Ouço podcasts sobre gestão e tecnologia.", weights: { management: 3 } },
        ],
    },
    {
        id: 46,
        text: "Reuniões...",
        options: [
            { label: "São necessárias para alinhar a equipa.", weights: { management: 4, qa: 1 } },
            { label: "Podiam ter sido um email.", weights: { backend: 3, devops: 3 } },
            { label: "Gosto se for para fazer brainstorming visual.", weights: { ui_ux: 3, frontend: 2 } },
            { label: "Aproveito para rever dados enquanto oiço.", weights: { datascience: 2 } },
        ],
    },
    {
        id: 47,
        text: "O que achas de Pair Programming?",
        options: [
            { label: "Ótimo para aprender e partilhar conhecimento.", weights: { frontend: 2, management: 2 } },
            { label: "Bom para rever código crítico e segurança em tempo real.", weights: { cybersecurity: 3, qa: 3 } },
            { label: "Prefiro trabalhar sozinho no meu canto.", weights: { backend: 2, devops: 1 } },
            { label: "Funciona se for para resolver um problema lógico complexo.", weights: { datascience: 2, backend: 1 } },
        ],
    },
    {
        id: 48,
        text: "Tens de fazer uma refatorização grande. Como te sentes?",
        options: [
            { label: "Entusiasmado por limpar a casa e melhorar a estrutura.", weights: { backend: 3, qa: 2 } },
            { label: "Preocupado que vá quebrar o visual da app.", weights: { frontend: 3, ui_ux: 2 } },
            { label: "Focado em garantir que os testes continuam a passar.", weights: { qa: 4, devops: 2 } },
            { label: "Analiso se o custo/benefício vale a pena agora.", weights: { management: 3 } },
        ],
    },
    {
        id: 49,
        text: "Deploy à sexta-feira à tarde. Fazes?",
        options: [
            { label: "Nunca. Regra de ouro.", weights: { devops: 4, management: 3, backend: 2 } },
            { label: "Sim, gosto de viver perigosamente (e tenho backups).", weights: { cybersecurity: 1, mobile: 1 } },
            { label: "Se os testes automáticos passarem, confio no pipeline.", weights: { qa: 2, devops: 2 } },
            { label: "Só se for uma correção visual urgente.", weights: { frontend: 2, ui_ux: 1 } },
        ],
    },
    {
        id: 50,
        text: "Qual a importância dos Testes Unitários?",
        options: [
            { label: "Fundamentais. Não faço commit sem testes.", weights: { qa: 5, backend: 2 } },
            { label: "Faço os essenciais, mas prefiro testes de integração.", weights: { devops: 2, backend: 2 } },
            { label: "Às vezes atrapalham quando estou a prototipar rápido.", weights: { frontend: 2, ui_ux: 2, mobile: 2 } },
            { label: "Importante para garantir que o modelo de dados está correto.", weights: { datascience: 3 } },
        ],
    },
    {
        id: 51,
        text: "Como usas o Stack Overflow?",
        options: [
            { label: "Copio o erro e vejo a primeira solução aceite.", weights: { mobile: 2, frontend: 2 } },
            { label: "Leio a discussão para entender o porquê da solução.", weights: { backend: 3, cybersecurity: 2 } },
            { label: "Procuro snippets para otimizar scripts.", weights: { devops: 2, datascience: 1 } },
            { label: "Verifico se a solução é standard e compatível.", weights: { qa: 2, management: 1 } },
        ],
    },
    {
        id: 52,
        text: "Usas IA (como ChatGPT) para programar?",
        options: [
            { label: "Sim, para gerar boilerplate e explicar conceitos.", weights: { frontend: 2, mobile: 2 } },
            { label: "Sim, para criar queries complexas e regex.", weights: { datascience: 3, backend: 2 } },
            { label: "Com cuidado, verificando sempre se não há falhas de segurança.", weights: { cybersecurity: 4 } },
            { label: "Para escrever documentação e emails.", weights: { management: 3 } },
        ],
    },
    {
        id: 53,
        text: "Séries de TV favoritas?",
        options: [
            { label: "Silicon Valley, Mr. Robot, Black Mirror.", weights: { cybersecurity: 3, backend: 2, frontend: 1 } },
            { label: "Documentários e Biografias.", weights: { datascience: 2, management: 2 } },
            { label: "Anime e Animação.", weights: { ui_ux: 3, mobile: 1 } },
            { label: "Ficção Científica Hardcore.", weights: { devops: 2, datascience: 2 } },
        ],
    },
    {
        id: 54,
        text: "Preferes trabalhar numa Startup ou numa Grande Empresa?",
        options: [
            { label: "Startup: ritmo rápido, faço de tudo um pouco.", weights: { mobile: 3, frontend: 2, devops: 1 } },
            { label: "Grande Empresa: processos definidos e especialização.", weights: { cybersecurity: 2, qa: 2, backend: 2 } },
            { label: "Onde me deixarem inovar e criar coisas bonitas.", weights: { ui_ux: 3, frontend: 1 } },
            { label: "Onde houver dados interessantes para analisar.", weights: { datascience: 3 } },
        ],
    },
    {
        id: 55,
        text: "És mais Especialista ou Generalista?",
        options: [
            { label: "Generalista (Fullstack): gosto de saber o todo.", weights: { management: 2, frontend: 1, backend: 1 } },
            { label: "Especialista: quero saber tudo sobre uma área específica.", weights: { cybersecurity: 3, datascience: 3, devops: 2 } },
            { label: "T-Shaped: Especialista numa coisa, mas arranho nas outras.", weights: { backend: 2, mobile: 2 } },
            { label: "Focado no detalhe e na qualidade.", weights: { qa: 3, ui_ux: 2 } },
        ],
    },
    {
        id: 56,
        text: "Como aprendes melhor?",
        options: [
            { label: "A ver vídeos e tutoriais visuais.", weights: { frontend: 3, ui_ux: 3 } },
            { label: "A ler a documentação oficial.", weights: { backend: 3, devops: 2 } },
            { label: "A partir (e arranjar) coisas na prática.", weights: { cybersecurity: 2, mobile: 2 } },
            { label: "A analisar exemplos e dataset.", weights: { datascience: 3 } },
        ],
    },
    {
        id: 57,
        text: "O que te assusta mais na tecnologia?",
        options: [
            { label: "A perda de privacidade e vigilância em massa.", weights: { cybersecurity: 5, management: 1 } },
            { label: "A dependência excessiva de sistemas que podem falhar.", weights: { devops: 3, backend: 2 } },
            { label: "O impacto social e o isolamento das pessoas.", weights: { ui_ux: 2, management: 2 } },
            { label: "Viés (bias) nos algoritmos de inteligência artificial.", weights: { datascience: 4, qa: 1 } },
        ],
    },
    {
        id: 58,
        text: "A tua secretária está...",
        options: [
            { label: "Impecavelmente arrumada e minimalista.", weights: { ui_ux: 3, qa: 2 } },
            { label: "Cheia de cabos, adaptadores e hardware diverso.", weights: { devops: 3, backend: 2, mobile: 1 } },
            { label: "Tem papéis, cadernos e canecas de café.", weights: { management: 2, backend: 1 } },
            { label: "Tenho post-its com lembretes e passwords (ups!).", weights: { cybersecurity: -2, frontend: 1 } },
        ],
    },
    {
        id: 59,
        text: "Gostarias de ser Mentor?",
        options: [
            { label: "Sim, adoro ensinar e ver os outros crescer.", weights: { management: 5 } },
            { label: "Sim, mas sobre tópicos técnicos específicos.", weights: { backend: 2, datascience: 2 } },
            { label: "Prefiro fazer revisões de código detalhadas.", weights: { qa: 3, cybersecurity: 1 } },
            { label: "Talvez, se for para ensinar design systems.", weights: { ui_ux: 3, frontend: 1 } },
        ],
    },
    {
        id: 60,
        text: "Tens projetos paralelos (side projects)?",
        options: [
            { label: "Sim, várias apps que nunca acabo.", weights: { mobile: 3, frontend: 2 } },
            { label: "Tenho um servidor em casa (Homelab).", weights: { devops: 4, cybersecurity: 2 } },
            { label: "Participo em competições de Kaggle/Dados.", weights: { datascience: 4 } },
            { label: "Não, gosto de separar trabalho e vida pessoal.", weights: { management: 1, qa: 1 } },
        ],
    },
    {
        id: 61,
        text: "Como evitas o Burnout?",
        options: [
            { label: "Desligo as notificações fora de horas.", weights: { management: 2, mobile: 1 } },
            { label: "Automatizo o máximo possível para trabalhar menos.", weights: { devops: 3, backend: 1 } },
            { label: "Pratico hobbies criativos longe do ecrã.", weights: { ui_ux: 2, frontend: 1 } },
            { label: "Garanto que os processos são sustentáveis a longo prazo.", weights: { management: 3, qa: 1 } },
        ],
    },
    {
        id: 62,
        text: "Pedem-te uma estimativa de tempo. O que dizes?",
        options: [
            { label: "Dou um prazo otimista porque acho que consigo.", weights: { frontend: 2, mobile: 2 } },
            { label: "Calculo o pior cenário e multiplico por 2.", weights: { backend: 3, devops: 2 } },
            { label: "Analiso os dados de tarefas anteriores.", weights: { datascience: 3, management: 2 } },
            { label: "Depende de quantos bugs encontrar no caminho.", weights: { qa: 3 } },
        ],
    },
    {
        id: 63,
        text: "Código Legado (antigo). O que fazes?",
        options: [
            { label: "Não toco se não for preciso. 'If it works, don't fix it'.", weights: { devops: 2, management: 2 } },
            { label: "Tento modernizar a interface aos poucos.", weights: { frontend: 3, ui_ux: 2 } },
            { label: "Escrevo testes para garantir que não parto nada ao mexer.", weights: { qa: 4, backend: 2 } },
            { label: "Audito o código à procura de falhas de segurança antigas.", weights: { cybersecurity: 4 } },
        ],
    },
    {
        id: 64,
        text: "O que valorizas mais numa Code Review?",
        options: [
            { label: "Consistência e legibilidade.", weights: { frontend: 2, ui_ux: 1 } },
            { label: "Performance e eficiência.", weights: { backend: 3, datascience: 2 } },
            { label: "Segurança e validação de inputs.", weights: { cybersecurity: 4, qa: 1 } },
            { label: "Se o pipeline de deployment vai passar.", weights: { devops: 3 } },
        ],
    },
    {
        id: 65,
        text: "Monólito ou Microserviços?",
        options: [
            { label: "Microserviços! Escala melhor e isola problemas.", weights: { devops: 4, backend: 2 } },
            { label: "Monólito. É mais simples de desenvolver e testar no início.", weights: { frontend: 2, mobile: 2, management: 1 } },
            { label: "Depende da complexidade dos dados e das transações.", weights: { datascience: 2, backend: 2 } },
            { label: "O que for mais fácil de gerir e monitorizar.", weights: { management: 2, qa: 1 } },
        ],
    },
    {
        id: 66,
        text: "SQL ou NoSQL?",
        options: [
            { label: "SQL. Gosto de estrutura, relações e ACID.", weights: { backend: 4, datascience: 1 } },
            { label: "NoSQL. Flexibilidade e velocidade para documentos JSON.", weights: { frontend: 2, mobile: 2, datascience: 1 } },
            { label: "Graph Database. Para analisar conexões complexas.", weights: { datascience: 3, cybersecurity: 1 } },
            { label: "A que a equipa já conhecer melhor.", weights: { management: 2 } },
        ],
    },
    {
        id: 67,
        text: "Qual é a tua nuvem (Cloud) de eleição?",
        options: [
            { label: "AWS. Tem tudo e mais alguma coisa.", weights: { devops: 3, backend: 2 } },
            { label: "Google Cloud. Ótima para dados e Kubernetes.", weights: { datascience: 3, devops: 2 } },
            { label: "Azure. Integra bem com o ecosistema empresarial.", weights: { management: 2, backend: 1 } },
            { label: "Vercel/Netlify. Só quero fazer deploy do frontend rápido.", weights: { frontend: 4, ui_ux: 2 } },
        ],
    },
    {
        id: 68,
        text: "Tipagem Estática (TypeScript, Java) ou Dinâmica (Python, JS)?",
        options: [
            { label: "Estática. Apanha erros antes de executar.", weights: { qa: 4, backend: 2, devops: 1 } },
            { label: "Dinâmica. É mais rápido para prototipar e scripter.", weights: { datascience: 3, cybersecurity: 2 } },
            { label: "TypeScript no frontend é vida.", weights: { frontend: 4, ui_ux: 1 } },
            { label: "Depende do tamanho do projeto.", weights: { management: 2 } },
        ],
    },
    {
        id: 69,
        text: "Frameworks ou Vanilla code?",
        options: [
            { label: "Frameworks. Não vale a pena reinventar a roda.", weights: { frontend: 3, backend: 2, mobile: 2 } },
            { label: "Vanilla. Para entender como as coisas realmente funcionam.", weights: { cybersecurity: 2, devops: 1 } },
            { label: "Uso as bibliotecas certas para processamento de dados.", weights: { datascience: 3 } },
            { label: "O que tiver melhor suporte e comunidade.", weights: { management: 3, qa: 1 } },
        ],
    },
    {
        id: 70,
        text: "Onde te vês daqui a 5 anos?",
        options: [
            { label: "A liderar uma equipa técnica de sucesso.", weights: { management: 5 } },
            { label: "Como referência técnica (Staff/Principal Engineer).", weights: { backend: 2, devops: 2, cybersecurity: 2 } },
            { label: "A criar a minha própria empresa/produto.", weights: { ui_ux: 2, mobile: 2, frontend: 1 } },
            { label: "A investigar novas tecnologias que ainda nem existem.", weights: { datascience: 3, cybersecurity: 2 } },
        ],
    },
    // --- NOVAS QUESTÕES (Fase 2) ---
    {
        id: 71,
        text: "Como lidas com a documentação do teu código?",
        options: [
            { label: "O código é a documentação. Se for limpo, lê-se sozinho.", weights: { backend: 3, devops: 2 } },
            { label: "Escrevo READMEs detalhados com screenshots e exemplos.", weights: { frontend: 2, ui_ux: 2, mobile: 1 } },
            { label: "Documento APIs com Swagger/OpenAPI rigorosamente.", weights: { backend: 3, qa: 2 } },
            { label: "Crio diagramas de arquitetura para explicar o fluxo.", weights: { management: 2, devops: 2 } },
        ],
    },
    {
        id: 72,
        text: "Qual é a tua mascote de eleição para programar?",
        options: [
            { label: "Um pato de borracha (Rubber Duck Debugging).", weights: { backend: 2, qa: 2 } },
            { label: "O meu gato, que dorme no teclado.", weights: { frontend: 2, mobile: 2 } },
            { label: "O meu cão, que me obriga a sair de casa.", weights: { management: 3, devops: 1 } },
            { label: "Nenhuma, preciso de espaço livre.", weights: { datascience: 2, cybersecurity: 1 } },
        ],
    },
    {
        id: 73,
        text: "Preferes trabalhar com dados estruturados ou caóticos?",
        options: [
            { label: "Estruturados e normalizados (3NF).", weights: { backend: 4, datascience: 1 } },
            { label: "Caóticos e não-estruturados (Raw Data lak).", weights: { datascience: 4, cybersecurity: 2 } },
            { label: "JSONs aninhados com chaves dinâmicas.", weights: { frontend: 3, mobile: 2 } },
            { label: "Logs de servidor intermináveis.", weights: { devops: 4, cybersecurity: 2 } },
        ],
    },
    {
        id: 74,
        text: "O que achas de CSS?",
        options: [
            { label: "Adoro! É arte e lógica juntas.", weights: { frontend: 5, ui_ux: 4 } },
            { label: "Uso Tailwind para não ter de escrever CSS puro.", weights: { frontend: 3, mobile: 2 } },
            { label: "O meu pior pesadelo. Centralizar div é magia negra.", weights: { backend: 4, devops: 3, datascience: 2 } },
            { label: "Importante para a acessibilidade, mas dou a outros.", weights: { management: 2, qa: 2 } },
        ],
    },
    {
        id: 75,
        text: "Qual destas ferramentas não dispensas?",
        options: [
            { label: "Figma/Adobe XD.", weights: { ui_ux: 5, frontend: 2 } },
            { label: "Docker/Kubernetes.", weights: { devops: 5, backend: 2 } },
            { label: "Postman/Insomnia.", weights: { backend: 4, qa: 3 } },
            { label: "Jupyter Notebooks.", weights: { datascience: 5 } },
        ],
    },
    {
        id: 76,
        text: "Fim de semana ideal?",
        options: [
            { label: "Ir a uma conferência ou meetup de tech.", weights: { management: 3, frontend: 2 } },
            { label: "Jogar online com amigos até de manhã.", weights: { cybersecurity: 2, devops: 1 } },
            { label: "Desconectar totalmente na natureza.", weights: { devops: 2, backend: 2 } },
            { label: "Trabalhar no meu side-project sem interrupções.", weights: { mobile: 3, datascience: 2 } },
        ],
    },
    {
        id: 77,
        text: "Como reages a 'Spaghetti Code'?",
        options: [
            { label: "Sinto uma vontade incontrolável de o organizar.", weights: { qa: 4, backend: 3 } },
            { label: "Se funciona, não mexo. O perigo é real.", weights: { management: 3, devops: 2 } },
            { label: "Tento isolar os componentes visuais primeiro.", weights: { frontend: 3, ui_ux: 2 } },
            { label: "Reescrevo tudo do zero na nova framework da moda.", weights: { mobile: 3, frontend: 2 } },
        ],
    },
    {
        id: 78,
        text: "Qual a melhor forma de validar uma ideia?",
        options: [
            { label: "Criar um MVP rápido e pôr nas mãos dos users.", weights: { mobile: 4, frontend: 3, ui_ux: 2 } },
            { label: "Fazer uma análise de mercado e dados existentes.", weights: { datascience: 4, management: 3 } },
            { label: "Verificar a viabilidade técnica e custos.", weights: { backend: 3, devops: 3 } },
            { label: "Garantir que cumpre os requisitos de segurança legais.", weights: { cybersecurity: 4, qa: 2 } },
        ],
    },
    {
        id: 79,
        text: "Programação Funcional ou Orientada a Objetos?",
        options: [
            { label: "OOP. Classes, Herança, Polimorfismo. Clássico.", weights: { backend: 4, mobile: 2 } },
            { label: "Funcional. Imutabilidade e pureza.", weights: { frontend: 3, datascience: 3, backend: 2 } },
            { label: "Misturo os dois conforme dá jeito.", weights: { devops: 2, management: 1 } },
            { label: "Só quero scripts que corram de cima para baixo.", weights: { cybersecurity: 2, operations: 2 } },
        ],
    },
    {
        id: 80,
        text: "O que te faz sentir 'Hacker'?",
        options: [
            { label: "Escrever comandos no terminal verde sobre preto.", weights: { cybersecurity: 5, devops: 3 } },
            { label: "Inspecionar elemento e mudar o texto de um site.", weights: { frontend: 3, ui_ux: 1 } },
            { label: "Automatizar uma tarefa que demorava 2 horas.", weights: { devops: 4, backend: 2 } },
            { label: "Treinar uma IA para escrever por mim.", weights: { datascience: 4 } },
        ],
    },
    {
        id: 81,
        text: "Qual é o teu browser de eleição?",
        options: [
            { label: "Chrome. Tem as melhores dev tools e extensões.", weights: { frontend: 4, mobile: 2 } },
            { label: "Firefox. Privacidade e open source.", weights: { cybersecurity: 3, devops: 2 } },
            { label: "Safari. Porque funciona bem no ecosistema Apple.", weights: { ui_ux: 3, mobile: 3 } },
            { label: "Arc / Brave / Outros. Gosto de inovar.", weights: { ui_ux: 3, cybersecurity: 2 } },
        ],
    },
    {
        id: 82,
        text: "Estilo de teclado mecânico?",
        options: [
            { label: "Barulhento (Clicky/Blue). Todos têm de ouvir o meu código.", weights: { backend: 2, devops: 1 } },
            { label: "Linear e silencioso (Red). Para ser stealth.", weights: { cybersecurity: 3, qa: 2, management: 1 } },
            { label: "Tátil (Brown). O equilíbrio perfeito.", weights: { frontend: 2, mobile: 2 } },
            { label: "Uso o do portátil, não ligo a isso.", weights: { management: 3, datascience: 2 } },
        ],
    },
    {
        id: 83,
        text: "Metodologias Ágeis (Scrum/Kanban)...",
        options: [
            { label: "Adoro os quadros e ver os tickets a mexer.", weights: { management: 5, qa: 2 } },
            { label: "Útil, mas as Dailies são chatas.", weights: { backend: 3, mobile: 2 } },
            { label: "Só quero saber o que tenho de fazer hoje.", weights: { devops: 2, frontend: 2 } },
            { label: "Prefiro trabalhar por sprints focados em dados.", weights: { datascience: 3 } },
        ],
    },
    {
        id: 84,
        text: "Tens de explicar a um leigo o que fazes. O que dizes?",
        options: [
            { label: "Eu faço a parte da internet que tu vês.", weights: { frontend: 4, ui_ux: 3 } },
            { label: "Eu trato dos servidores onde os dados vivem.", weights: { backend: 4, devops: 3 } },
            { label: "Eu garanto que ninguém te rouba a password.", weights: { cybersecurity: 5 } },
            { label: "Eu resolvo problemas com computadores.", weights: { management: 2, qa: 1 } },
        ],
    },
    {
        id: 85,
        text: "Blockchain e cripto?",
        options: [
            { label: "A tecnologia é revolucionária (Smart Contracts).", weights: { backend: 3, cybersecurity: 3 } },
            { label: "Muita especulação, pouco uso real.", weights: { management: 3, qa: 2 } },
            { label: "Interessante para descentralizar a web (Web3).", weights: { frontend: 2, devops: 2 } },
            { label: "Boa fonte de datasets financeiros.", weights: { datascience: 4 } },
        ],
    },
    {
        id: 86,
        text: "Gostas de trabalhar remotamente?",
        options: [
            { label: "Sim, 100%. Sou mais produtivo em casa.", weights: { devops: 3, backend: 3 } },
            { label: "Híbrido. Gosto de ver pessoas de vez em quando.", weights: { management: 4, ui_ux: 2 } },
            { label: "Prefiro escritório para separar águas.", weights: { qa: 2, mobile: 1 } },
            { label: "Viajo e trabalho (Nómada Digital).", weights: { frontend: 3, mobile: 3 } },
        ],
    },
    {
        id: 87,
        text: "Qual é a tua opinião sobre 'Low-Code' / 'No-Code'?",
        options: [
            { label: "Ótimo para clientes pequenos e MVPs.", weights: { management: 4, ui_ux: 2, mobile: 2 } },
            { label: "Vai tirar-nos o emprego? Duvido.", weights: { backend: 3, devops: 2 } },
            { label: "Gera código horrível e inseguro.", weights: { cybersecurity: 4, qa: 3 } },
            { label: "Se me poupar fazer CRUDs, aceito.", weights: { frontend: 2, backend: 2 } },
        ],
    },
    {
        id: 88,
        text: "Como lidas com a pressão de prazos?",
        options: [
            { label: "Foco no essencial e corto funcionalidades (scope).", weights: { management: 4, product_owner: 2 } },
            { label: "Trabalho mais horas (Crunch), infelizmente.", weights: { mobile: 2, frontend: 2 } },
            { label: "Não cedo. A qualidade/segurança não se negocia.", weights: { qa: 4, cybersecurity: 3 } },
            { label: "Automatizo o que conseguir para ganhar tempo.", weights: { devops: 4 } },
        ],
    },
    {
        id: 89,
        text: "Vim (editor de texto)...",
        options: [
            { label: ":wq! (Sei usar e adoro a velocidade).", weights: { devops: 5, backend: 3 } },
            { label: "Fico preso e tenho de reiniciar o terminal.", weights: { frontend: 3, ui_ux: 3, mobile: 2 } },
            { label: "Uso o modo Vim no VS Code.", weights: { backend: 3, cybersecurity: 2 } },
            { label: "O que é isso?", weights: { management: 3, datascience: 1 } },
        ],
    },
    {
        id: 90,
        text: "Qual a melhor maneira de começar um projeto?",
        options: [
            { label: "Sketching e Wireframes no papel.", weights: { ui_ux: 5, frontend: 2 } },
            { label: "Definir o Schema da Base de Dados.", weights: { backend: 4, datascience: 2 } },
            { label: "Configurar o repositório e CI/CD.", weights: { devops: 5 } },
            { label: "Escrever as User Stories.", weights: { management: 4, qa: 2 } },
        ],
    },
    {
        id: 91,
        text: "GraphQL ou REST API?",
        options: [
            { label: "GraphQL. Peço só o que preciso, nada de overfetching.", weights: { frontend: 4, mobile: 4, backend: 2 } },
            { label: "REST. Simples, standard e cacheable.", weights: { backend: 3, devops: 2 } },
            { label: "gRPC. Preciso de performance brutal entre serviços.", weights: { backend: 4, devops: 3 } },
            { label: "Não sei, só consumo o que me dão.", weights: { ui_ux: 2, management: 2 } },
        ],
    },
    {
        id: 92,
        text: "O que te faz sentir produtivo?",
        options: [
            { label: "Ver a lista de tickets toda no 'Done'.", weights: { management: 4, qa: 3 } },
            { label: "Escrever código complexo que funciona à primeira.", weights: { backend: 4, datascience: 3 } },
            { label: "Terminar uma interface pixel-perfect.", weights: { frontend: 4, ui_ux: 4 } },
            { label: "Quando o pipeline fica verde após o deploy.", weights: { devops: 5, cybersecurity: 2 } },
        ],
    },
    {
        id: 93,
        text: "Nuvens privadas / On-premise...",
        options: [
            { label: "Necessário para dados sensíveis e soberania.", weights: { cybersecurity: 5, devops: 3 } },
            { label: "Dor de cabeça de manter. Cloud all the way.", weights: { frontend: 3, mobile: 2 } },
            { label: "Apenas se o cliente exigir.", weights: { management: 3 } },
            { label: "Gosto de mexer no hardware físico.", weights: { devops: 4, operations: 3 } },
        ],
    },
    {
        id: 94,
        text: "Preferes trabalhar em...",
        options: [
            { label: "B2B (Empresas). Problemas complexos, menos 'eye-candy'.", weights: { backend: 3, datascience: 3 } },
            { label: "B2C (Consumidor). Impacto visual e milhões de users.", weights: { mobile: 4, frontend: 3, ui_ux: 3 } },
            { label: "Fintech / Banca. Segurança e precisão máxima.", weights: { cybersecurity: 4, qa: 3 } },
            { label: "Healthtech. Sentir que ajudo a salvar vidas.", weights: { management: 3, datascience: 2 } },
        ],
    },
    {
        id: 95,
        text: "Como geres passwords?",
        options: [
            { label: "Gestor de Passwords (1Password, Bitwarden).", weights: { cybersecurity: 5, devops: 2 } },
            { label: "Uso a mesma com variações (não contem a ninguém).", weights: { frontend: -1, mobile: -1 } },
            { label: "O browser guarda tudo por mim.", weights: { frontend: 2, management: 2 } },
            { label: "Tenho tudo na cabeça (algoritmo mental).", weights: { datascience: 3 } },
        ],
    },
    {
        id: 96,
        text: "Realidade Virtual / Aumentada (VR/AR)?",
        options: [
            { label: "O futuro das interfaces. Quero desenvolver para Vision Pro.", weights: { mobile: 5, ui_ux: 4, frontend: 3 } },
            { label: "Gimmick engraçado, mas prefiro ecrãs 2D.", weights: { backend: 2, management: 2 } },
            { label: "Preocupado com a privacidade dos dados biométricos.", weights: { cybersecurity: 4 } },
            { label: "Precisa de muito poder de processamento e dados.", weights: { datascience: 2, devops: 2 } },
        ],
    },
    {
        id: 97,
        text: "Git: Merge ou Rebase?",
        options: [
            { label: "Rebase. Quero um histórico linear e limpo.", weights: { devops: 4, backend: 3 } },
            { label: "Merge. Prefiro ver a verdade do que aconteceu.", weights: { qa: 3, management: 2 } },
            { label: "Squash and Merge. Um commit por feature basta.", weights: { frontend: 3, mobile: 2 } },
            { label: "Uso GUI, não sei o comando.", weights: { ui_ux: 3, management: 2 } },
        ],
    },
    {
        id: 98,
        text: "Ouvem 'White Noise' / Ruído de Fundo?",
        options: [
            { label: "Sim, chuva ou café para concentrar.", weights: { ui_ux: 3, frontend: 2 } },
            { label: "Não, silêncio ou música.", weights: { backend: 2 } },
            { label: "O barulho das ventoinhas do servidor chega.", weights: { devops: 4, operations: 2 } },
            { label: "Prefiro ouvir as conversas do escritório.", weights: { management: 4 } },
        ],
    },
    {
        id: 99,
        text: "Ratos Verticais / Ergonómicos?",
        options: [
            { label: "Tenho um para evitar LER/Tendinite.", weights: { backend: 2, qa: 2, management: 2 } },
            { label: "Prefiro trackpad (Mac).", weights: { ui_ux: 4, frontend: 3, mobile: 2 } },
            { label: "Rato gaming com mil botões macro.", weights: { devops: 3, cybersecurity: 2 } },
            { label: "Não uso rato, só teclado.", weights: { devops: 4, cybersecurity: 3 } },
        ],
    },
    {
        id: 100,
        text: "Se a internet acabar amanhã...",
        options: [
            { label: "Crio uma rede local mesh com rádios.", weights: { devops: 5, cybersecurity: 4 } },
            { label: "Vou plantar batatas e viver no campo.", weights: { management: 3, backend: 2 } },
            { label: "Desenho interfaces em papel.", weights: { ui_ux: 4, frontend: 2 } },
            { label: "Analiso os dados históricos do colapso.", weights: { datascience: 4 } },
        ],
    }
];
