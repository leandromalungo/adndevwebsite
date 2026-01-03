"use client"; // <- adicione isto no topo do arquivo
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var constants_1 = require("@/components/roadmaps/constants");
var RoadmapCard_1 = require("@/components/roadmaps/RoadmapCard");
var RoadmapDetailView_1 = require("@/components/roadmaps/RoadmapDetailView");
var Navbar_1 = require("@/components/Navbar");
// ... resto do código
var Page = function () {
    var _a = react_1.useState(null), selectedRoadmap = _a[0], setSelectedRoadmap = _a[1];
    if (selectedRoadmap) {
        return (react_1["default"].createElement(RoadmapDetailView_1.RoadmapDetailView, { title: selectedRoadmap.title, onBack: function () { return setSelectedRoadmap(null); } }));
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Navbar_1["default"], null),
        react_1["default"].createElement("div", { className: "min-h-screen bg-slate-50 text-slate-600 py-12 px-4 sm:px-6 lg:px-8" },
            react_1["default"].createElement("div", { className: "max-w-7xl mx-auto space-y-20" },
                react_1["default"].createElement("section", null,
                    react_1["default"].createElement("div", { className: "flex flex-col items-center mb-12" },
                        react_1["default"].createElement("div", { className: "inline-flex items-center px-4 py-1 rounded-full border border-slate-200 bg-white shadow-sm mb-6" },
                            react_1["default"].createElement("span", { className: "text-sm font-semibold text-slate-500" }, "Role-based Roadmaps")),
                        react_1["default"].createElement("div", { className: "text-center space-y-3 max-w-2xl" },
                            react_1["default"].createElement("h1", { className: "text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" }, "Career Paths"),
                            react_1["default"].createElement("p", { className: "text-slate-500 text-lg" }, "Step-by-step guides for different engineering roles in the industry."))),
                    react_1["default"].createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }, constants_1.ROLE_ROADMAPS.map(function (item) { return (react_1["default"].createElement("div", { key: item.id, onClick: function () { return setSelectedRoadmap(item); } },
                        react_1["default"].createElement(RoadmapCard_1.RoadmapCard, { item: item }))); }))),
                react_1["default"].createElement("section", null,
                    react_1["default"].createElement("div", { className: "flex flex-col items-center mb-12" },
                        react_1["default"].createElement("div", { className: "inline-flex items-center px-4 py-1 rounded-full border border-slate-200 bg-white shadow-sm mb-6" },
                            react_1["default"].createElement("span", { className: "text-sm font-semibold text-slate-500" }, "Skill-based Roadmaps")),
                        react_1["default"].createElement("div", { className: "text-center space-y-3 max-w-2xl" },
                            react_1["default"].createElement("h2", { className: "text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" }, "Technology Skills"),
                            react_1["default"].createElement("p", { className: "text-slate-500 text-lg" }, "Deep-dive guides for specific tools, languages, and technologies."))),
                    react_1["default"].createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" },
                        constants_1.SKILL_ROADMAPS.map(function (item) { return (react_1["default"].createElement("div", { key: item.id, onClick: function () { return setSelectedRoadmap(item); } },
                            react_1["default"].createElement(RoadmapCard_1.RoadmapCard, { item: item }))); }),
                        react_1["default"].createElement("div", { className: "lg:col-span-1" }))),
                react_1["default"].createElement("section", null,
                    react_1["default"].createElement("div", { className: "flex flex-col items-center mb-12" },
                        react_1["default"].createElement("div", { className: "inline-flex items-center px-4 py-1 rounded-full border border-slate-200 bg-white shadow-sm mb-6" },
                            react_1["default"].createElement("span", { className: "text-sm font-semibold text-slate-500" }, "Project Ideas")),
                        react_1["default"].createElement("div", { className: "text-center space-y-3 max-w-2xl" },
                            react_1["default"].createElement("h2", { className: "text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" }, "Project Paths"),
                            react_1["default"].createElement("p", { className: "text-slate-500 text-lg" }, "Comprehensive project ideas to help you build and showcase your portfolio."))),
                    react_1["default"].createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }, constants_1.PROJECT_IDEAS.map(function (item) { return (react_1["default"].createElement("div", { key: item.id, onClick: function () { return setSelectedRoadmap(item); } },
                        react_1["default"].createElement(RoadmapCard_1.RoadmapCard, { item: item }))); }))),
                react_1["default"].createElement("section", null,
                    react_1["default"].createElement("div", { className: "flex flex-col items-center mb-12" },
                        react_1["default"].createElement("div", { className: "inline-flex items-center px-4 py-1 rounded-full border border-slate-200 bg-white shadow-sm mb-6" },
                            react_1["default"].createElement("span", { className: "text-sm font-semibold text-slate-500" }, "Best Practices")),
                        react_1["default"].createElement("div", { className: "text-center space-y-3 max-w-2xl" },
                            react_1["default"].createElement("h2", { className: "text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight" }, "Engineering Standards"),
                            react_1["default"].createElement("p", { className: "text-slate-500 text-lg" }, "Industry-standard practices for high-performance and secure software."))),
                    react_1["default"].createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }, constants_1.BEST_PRACTICES.map(function (item) { return (react_1["default"].createElement("div", { key: item.id, onClick: function () { return setSelectedRoadmap(item); } },
                        react_1["default"].createElement(RoadmapCard_1.RoadmapCard, { item: item }))); }))),
                react_1["default"].createElement("footer", { className: "pt-8 border-t border-slate-200 text-center pb-12" },
                    react_1["default"].createElement("p", { className: "text-slate-400 text-sm" }, "Roadmaps updated weekly based on industry trends and community feedback."))))));
};
exports["default"] = Page;
