"use client";
"use strict";
exports.__esModule = true;
var Navbar_1 = require("@/components/Navbar");
var Footer_1 = require("@/components/Footer");
var CommunityGrid_1 = require("@/components/community/CommunityGrid");
function Page() {
    return (React.createElement(React.Fragment, null,
        React.createElement(Navbar_1["default"], null),
        React.createElement("div", { className: "min-h-screen bg-[#f9fafb]" },
            React.createElement("header", { className: "bg-white border-b border-gray-200 py-6 mb-8" },
                React.createElement("div", { className: "max-w-7xl mx-auto px-4" },
                    React.createElement("h1", { className: "text-2xl font-bold text-gray-900" }, "Comunidades"),
                    React.createElement("p", { className: "text-gray-500 text-sm mt-1" }, "Descubra grupos e comunidades de tecnologia no Brasil."))),
            React.createElement("main", null,
                React.createElement(CommunityGrid_1.CommunityGrid, null)),
            React.createElement(Footer_1["default"], null))));
}
exports["default"] = Page;
