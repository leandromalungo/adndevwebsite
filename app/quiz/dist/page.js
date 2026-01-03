"use client";
"use strict";
exports.__esModule = true;
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var Navbar_1 = require("@/components/Navbar");
var Footer_1 = require("@/components/Footer");
/* =======================
   DADOS DOS CARDS (IMAGENS)
======================= */
var careerTipsData = [
    {
        id: "1",
        date: "Mar 12, 2025",
        title: "How to start a career in Frontend Development",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
        imageAlt: "Frontend development"
    },
    {
        id: "2",
        date: "Mar 15, 2025",
        title: "Backend vs Frontend: which path should you choose?",
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
        imageAlt: "Backend vs Frontend"
    },
    {
        id: "3",
        date: "Mar 20, 2025",
        title: "Data Science career: skills you really need",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
        imageAlt: "Data Science"
    },
    {
        id: "4",
        date: "Mar 25, 2025",
        title: "DevOps skills that will boost your career",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
        imageAlt: "DevOps"
    },
    {
        id: "5",
        date: "Mar 28, 2025",
        title: "AI & Machine Learning: how to get started",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
        imageAlt: "AI & ML"
    },
];
/* =======================
   COMPONENTE ÚNICO
======================= */
function CareerQuiz() {
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var handleClick = function () {
        setLoading(true);
        setTimeout(function () {
            setLoading(false);
        }, 2000);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Navbar_1["default"], null),
        React.createElement("section", { className: "relative w-full overflow-hidden bg-zinc-900" },
            React.createElement("div", { className: "absolute inset-0 bg-cover bg-center bg-no-repeat", style: {
                    backgroundImage: "url('../../fundo.jpg')"
                } },
                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent" })),
            React.createElement("div", { className: "relative flex items-center px-8 py-20 md:px-12 md:py-24" },
                React.createElement("div", { className: "max-w-md" },
                    React.createElement("h2", { className: "text-4xl md:text-5xl font-bold text-white leading-tight mb-8" }, "N\u00E3o sabes qual \u00E1rea ou fun\u00E7\u00E3o combina com suas habilidades?"),
                    React.createElement("p", { className: "mt-4 max-w-2xl text-gray-100 mb-3" }, "Fa\u00E7a nosso quiz r\u00E1pido para descobrir a carreira ideal para voc\u00EA, baseado em suas habilidades, interesses e d\u00EA o primeiro passo rumo ao sucesso profissional!"),
                    React.createElement("button", { onClick: handleClick, disabled: loading, className: "\n                inline-flex items-center gap-2 px-6 py-3 font-semibold\n                transition-all duration-200\n                active:scale-95\n                " + (loading
                            ? "bg-orange-300 cursor-not-allowed text-zinc-800"
                            : "bg-orange-400 hover:bg-orange-500 text-gray-100") + "\n              " }, loading ? (React.createElement(React.Fragment, null,
                        React.createElement(lucide_react_1.Loader2, { size: 20, className: "animate-spin" }),
                        "Processando...")) : (React.createElement(React.Fragment, null,
                        "Fa\u00E7a o teste e descubra!",
                        React.createElement(lucide_react_1.ArrowRight, { size: 20 }))))))),
        React.createElement("section", { className: "w-full bg-background py-12 md:py-16 lg:py-20" },
            React.createElement("div", { className: "mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "mb-12 text-center md:text-left" },
                    React.createElement("h2", { className: "text-balance text-4xl font-semibold tracking-tight md:text-5xl" },
                        "Leia nossas dicas profissionais para constru\u00E7\u00E3o.",
                        React.createElement("span", { className: "font-bold" }, "sua carreira")),
                    React.createElement("p", { className: "mt-4 text-gray-600" }, "Dicas valiosas e insights para impulsionar sua jornada profissional no mundo da tecnologia, desenvolvimento e muito mais diretamente da nossa plataforma. ADN Developer, onde compartilhamos conhecimento para ajudar voc\u00EA a alcan\u00E7ar o sucesso na sua carreira. Seja voc\u00EA um iniciante ou um profissional experiente.")),
                React.createElement("div", { className: "mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5" }, careerTipsData.map(function (tip) { return (React.createElement("div", { key: tip.id, className: "group relative overflow-hidden rounded-2xl transition-transform hover:scale-105", style: {
                        backgroundImage: "url(" + tip.image + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        aspectRatio: "3 / 4"
                    } },
                    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70" }),
                    React.createElement("div", { className: "absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-6" },
                        React.createElement("time", { className: "text-xs font-medium text-gray-300 uppercase tracking-wide" }, tip.date),
                        React.createElement("h3", { className: "line-clamp-3 text-lg font-semibold leading-tight text-white" }, tip.title)))); })),
                React.createElement("div", { className: "flex justify-center" },
                    React.createElement("button", { onClick: handleClick, disabled: loading, className: "inline-flex items-center gap-2 px-6 p-3 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors disabled:cursor-not-allowed disabled:bg-gray-400" }, loading ? (React.createElement(React.Fragment, null,
                        React.createElement(lucide_react_1.Loader2, { className: "animate-spin", size: 20 }),
                        "Processando...")) : (React.createElement(React.Fragment, null,
                        "Explore nosso blog completo",
                        React.createElement(lucide_react_1.ArrowRight, { size: 20 }))))))),
        React.createElement(Footer_1["default"], null)));
}
exports["default"] = CareerQuiz;
