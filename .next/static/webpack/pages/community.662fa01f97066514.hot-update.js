"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/community",{

/***/ "./src/components/UI/Pagination.tsx":
/*!******************************************!*\
  !*** ./src/components/UI/Pagination.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n// /components/UI/Pagination.tsx\n\n\nconst Pagination = (param)=>{\n    let { currentPage, totalCount, onPrevious, onNext } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"mt-8 flex justify-center\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: onPrevious,\n                disabled: currentPage === 1,\n                className: \"bg-blue-500 text-white px-4 py-2 rounded-md mr-2 disabled:bg-gray-300\",\n                children: \"이전\"\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/Pagination.tsx\",\n                lineNumber: 19,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: onNext,\n                disabled: currentPage * 10 >= totalCount,\n                className: \"bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300\",\n                children: \"다음\"\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/Pagination.tsx\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/Pagination.tsx\",\n        lineNumber: 18,\n        columnNumber: 5\n    }, undefined);\n};\n_c = Pagination;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Pagination);\nvar _c;\n$RefreshReg$(_c, \"Pagination\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9VSS9QYWdpbmF0aW9uLnRzeCIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdDQUFnQzs7QUFDTjtBQVMxQixNQUFNQyxhQUF3QztRQUFDLEVBQzdDQyxXQUFXLEVBQ1hDLFVBQVUsRUFDVkMsVUFBVSxFQUNWQyxNQUFNLEVBQ1A7SUFDQyxxQkFDRSw4REFBQ0M7UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNDO2dCQUNDQyxTQUFTTDtnQkFDVE0sVUFBVVIsZ0JBQWdCO2dCQUMxQkssV0FBVTswQkFDWDs7Ozs7OzBCQUdELDhEQUFDQztnQkFDQ0MsU0FBU0o7Z0JBQ1RLLFVBQVVSLGNBQWMsTUFBTUM7Z0JBQzlCSSxXQUFVOzBCQUNYOzs7Ozs7Ozs7Ozs7QUFLUDtLQXhCTU47QUEwQk4sK0RBQWVBLFVBQVVBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvVUkvUGFnaW5hdGlvbi50c3g/MjY2NCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAvY29tcG9uZW50cy9VSS9QYWdpbmF0aW9uLnRzeFxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxudHlwZSBQYWdpbmF0aW9uUHJvcHMgPSB7XG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgb25QcmV2aW91czogKCkgPT4gdm9pZDtcbiAgb25OZXh0OiAoKSA9PiB2b2lkO1xufTtcblxuY29uc3QgUGFnaW5hdGlvbjogUmVhY3QuRkM8UGFnaW5hdGlvblByb3BzPiA9ICh7XG4gIGN1cnJlbnRQYWdlLFxuICB0b3RhbENvdW50LFxuICBvblByZXZpb3VzLFxuICBvbk5leHQsXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J210LTggZmxleCBqdXN0aWZ5LWNlbnRlcic+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIG9uQ2xpY2s9e29uUHJldmlvdXN9XG4gICAgICAgIGRpc2FibGVkPXtjdXJyZW50UGFnZSA9PT0gMX1cbiAgICAgICAgY2xhc3NOYW1lPSdiZy1ibHVlLTUwMCB0ZXh0LXdoaXRlIHB4LTQgcHktMiByb3VuZGVkLW1kIG1yLTIgZGlzYWJsZWQ6YmctZ3JheS0zMDAnXG4gICAgICA+XG4gICAgICAgIOydtOyghFxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIG9uQ2xpY2s9e29uTmV4dH1cbiAgICAgICAgZGlzYWJsZWQ9e2N1cnJlbnRQYWdlICogMTAgPj0gdG90YWxDb3VudH1cbiAgICAgICAgY2xhc3NOYW1lPSdiZy1ibHVlLTUwMCB0ZXh0LXdoaXRlIHB4LTQgcHktMiByb3VuZGVkLW1kIGRpc2FibGVkOmJnLWdyYXktMzAwJ1xuICAgICAgPlxuICAgICAgICDri6TsnYxcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGFnaW5hdGlvbjtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIlBhZ2luYXRpb24iLCJjdXJyZW50UGFnZSIsInRvdGFsQ291bnQiLCJvblByZXZpb3VzIiwib25OZXh0IiwiZGl2IiwiY2xhc3NOYW1lIiwiYnV0dG9uIiwib25DbGljayIsImRpc2FibGVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/UI/Pagination.tsx\n"));

/***/ }),

/***/ "./src/components/UI/community/ArticleCard.tsx":
/*!*****************************************************!*\
  !*** ./src/components/UI/community/ArticleCard.tsx ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst ArticleCard = (param)=>{\n    let { article } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {\n        href: \"/community/\".concat(article.id),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                    src: article.image || \"https://via.placeholder.com/300\",\n                    alt: article.title,\n                    className: \"w-full h-48 object-cover rounded-md mb-4\"\n                }, void 0, false, {\n                    fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/ArticleCard.tsx\",\n                    lineNumber: 13,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                    className: \"text-xl font-semibold mb-2\",\n                    children: article.title\n                }, void 0, false, {\n                    fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/ArticleCard.tsx\",\n                    lineNumber: 18,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-gray-600 mb-2\",\n                    children: [\n                        article.content.substring(0, 100),\n                        \"...\"\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/ArticleCard.tsx\",\n                    lineNumber: 19,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex justify-between items-center text-sm text-gray-500\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            children: article.writer.nickname\n                        }, void 0, false, {\n                            fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/ArticleCard.tsx\",\n                            lineNumber: 23,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            children: [\n                                \"좋아요: \",\n                                article.likeCount\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/ArticleCard.tsx\",\n                            lineNumber: 24,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/ArticleCard.tsx\",\n                    lineNumber: 22,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/ArticleCard.tsx\",\n            lineNumber: 12,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/ArticleCard.tsx\",\n        lineNumber: 11,\n        columnNumber: 5\n    }, undefined);\n};\n_c = ArticleCard;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ArticleCard);\nvar _c;\n$RefreshReg$(_c, \"ArticleCard\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9VSS9jb21tdW5pdHkvQXJ0aWNsZUNhcmQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQTBCO0FBQ0c7QUFPN0IsTUFBTUUsY0FBMEM7UUFBQyxFQUFFQyxPQUFPLEVBQUU7SUFDMUQscUJBQ0UsOERBQUNGLGtEQUFJQTtRQUFDRyxNQUFNLGNBQXlCLE9BQVhELFFBQVFFLEVBQUU7a0JBQ2xDLDRFQUFDQztZQUFJQyxXQUFVOzs4QkFDYiw4REFBQ0M7b0JBQ0NDLEtBQUtOLFFBQVFPLEtBQUssSUFBSTtvQkFDdEJDLEtBQUtSLFFBQVFTLEtBQUs7b0JBQ2xCTCxXQUFVOzs7Ozs7OEJBRVosOERBQUNNO29CQUFHTixXQUFVOzhCQUE4QkosUUFBUVMsS0FBSzs7Ozs7OzhCQUN6RCw4REFBQ0U7b0JBQUVQLFdBQVU7O3dCQUNWSixRQUFRWSxPQUFPLENBQUNDLFNBQVMsQ0FBQyxHQUFHO3dCQUFLOzs7Ozs7OzhCQUVyQyw4REFBQ1Y7b0JBQUlDLFdBQVU7O3NDQUNiLDhEQUFDVTtzQ0FBTWQsUUFBUWUsTUFBTSxDQUFDQyxRQUFROzs7Ozs7c0NBQzlCLDhEQUFDRjs7Z0NBQUs7Z0NBQU1kLFFBQVFpQixTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLdkM7S0FwQk1sQjtBQXNCTiwrREFBZUEsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9VSS9jb21tdW5pdHkvQXJ0aWNsZUNhcmQudHN4P2MxZjEiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5pbXBvcnQgeyBBcnRpY2xlIH0gZnJvbSAnQC90eXBlcy9hcnRpY2xlJztcblxudHlwZSBBcnRpY2xlQ2FyZFByb3BzID0ge1xuICBhcnRpY2xlOiBBcnRpY2xlO1xufTtcblxuY29uc3QgQXJ0aWNsZUNhcmQ6IFJlYWN0LkZDPEFydGljbGVDYXJkUHJvcHM+ID0gKHsgYXJ0aWNsZSB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPExpbmsgaHJlZj17YC9jb21tdW5pdHkvJHthcnRpY2xlLmlkfWB9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9J2JnLXdoaXRlIHNoYWRvdy1tZCByb3VuZGVkLWxnIHAtNCBjdXJzb3ItcG9pbnRlciBob3ZlcjpzaGFkb3ctbGcgdHJhbnNpdGlvbi1zaGFkb3cnPlxuICAgICAgICA8aW1nXG4gICAgICAgICAgc3JjPXthcnRpY2xlLmltYWdlIHx8ICdodHRwczovL3ZpYS5wbGFjZWhvbGRlci5jb20vMzAwJ31cbiAgICAgICAgICBhbHQ9e2FydGljbGUudGl0bGV9XG4gICAgICAgICAgY2xhc3NOYW1lPSd3LWZ1bGwgaC00OCBvYmplY3QtY292ZXIgcm91bmRlZC1tZCBtYi00J1xuICAgICAgICAvPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPSd0ZXh0LXhsIGZvbnQtc2VtaWJvbGQgbWItMic+e2FydGljbGUudGl0bGV9PC9oMj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPSd0ZXh0LWdyYXktNjAwIG1iLTInPlxuICAgICAgICAgIHthcnRpY2xlLmNvbnRlbnQuc3Vic3RyaW5nKDAsIDEwMCl9Li4uXG4gICAgICAgIDwvcD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciB0ZXh0LXNtIHRleHQtZ3JheS01MDAnPlxuICAgICAgICAgIDxzcGFuPnthcnRpY2xlLndyaXRlci5uaWNrbmFtZX08L3NwYW4+XG4gICAgICAgICAgPHNwYW4+7KKL7JWE7JqUOiB7YXJ0aWNsZS5saWtlQ291bnR9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvTGluaz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFydGljbGVDYXJkO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiTGluayIsIkFydGljbGVDYXJkIiwiYXJ0aWNsZSIsImhyZWYiLCJpZCIsImRpdiIsImNsYXNzTmFtZSIsImltZyIsInNyYyIsImltYWdlIiwiYWx0IiwidGl0bGUiLCJoMiIsInAiLCJjb250ZW50Iiwic3Vic3RyaW5nIiwic3BhbiIsIndyaXRlciIsIm5pY2tuYW1lIiwibGlrZUNvdW50Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/UI/community/ArticleCard.tsx\n"));

/***/ }),

/***/ "./src/pages/community/index.tsx":
/*!***************************************!*\
  !*** ./src/pages/community/index.tsx ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   __N_SSP: function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_UI_community_ArticleCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/UI/community/ArticleCard */ \"./src/components/UI/community/ArticleCard.tsx\");\n/* harmony import */ var _components_UI_Pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/UI/Pagination */ \"./src/components/UI/Pagination.tsx\");\n\n\n\n\nconst CommunityPage = (param)=>{\n    let { articles = [], totalCount, page } = param;\n    const handlePrevious = ()=>{\n        window.location.href = \"/community?page=\".concat(Math.max(page - 1, 1));\n    };\n    const handleNext = ()=>{\n        window.location.href = \"/community?page=\".concat(page + 1);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"container mx-auto px-4 py-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-3xl font-bold mb-6\",\n                children: \"커뮤니티\"\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, undefined),\n            articles.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\",\n                children: articles.map((article)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_community_ArticleCard__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        article: article\n                    }, article.id, false, {\n                        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                        lineNumber: 33,\n                        columnNumber: 13\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 31,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"게시글이 없습니다.\"\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 37,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_Pagination__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                currentPage: page,\n                totalCount: totalCount,\n                onPrevious: handlePrevious,\n                onNext: handleNext\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 39,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n        lineNumber: 28,\n        columnNumber: 5\n    }, undefined);\n};\n_c = CommunityPage;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (CommunityPage);\nvar _c;\n$RefreshReg$(_c, \"CommunityPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvY29tbXVuaXR5L2luZGV4LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUEwQjtBQUdzQztBQUNaO0FBU3BELE1BQU1HLGdCQUE4QztRQUFDLEVBQ25EQyxXQUFXLEVBQUUsRUFDYkMsVUFBVSxFQUNWQyxJQUFJLEVBQ0w7SUFDQyxNQUFNQyxpQkFBaUI7UUFDckJDLE9BQU9DLFFBQVEsQ0FBQ0MsSUFBSSxHQUFHLG1CQUF5QyxPQUF0QkMsS0FBS0MsR0FBRyxDQUFDTixPQUFPLEdBQUc7SUFDL0Q7SUFFQSxNQUFNTyxhQUFhO1FBQ2pCTCxPQUFPQyxRQUFRLENBQUNDLElBQUksR0FBRyxtQkFBNEIsT0FBVEosT0FBTztJQUNuRDtJQUVBLHFCQUNFLDhEQUFDUTtRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0M7Z0JBQUdELFdBQVU7MEJBQTBCOzs7Ozs7WUFDdkNYLFNBQVNhLE1BQU0sR0FBRyxrQkFDakIsOERBQUNIO2dCQUFJQyxXQUFVOzBCQUNaWCxTQUFTYyxHQUFHLENBQUMsQ0FBQ0Msd0JBQ2IsOERBQUNsQiw0RUFBV0E7d0JBQWtCa0IsU0FBU0E7dUJBQXJCQSxRQUFRQyxFQUFFOzs7Ozs7Ozs7MENBSWhDLDhEQUFDQzswQkFBRTs7Ozs7OzBCQUVMLDhEQUFDbkIsaUVBQVVBO2dCQUNUb0IsYUFBYWhCO2dCQUNiRCxZQUFZQTtnQkFDWmtCLFlBQVloQjtnQkFDWmlCLFFBQVFYOzs7Ozs7Ozs7Ozs7QUFJaEI7S0FqQ01WOztBQTBETiwrREFBZUEsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvY29tbXVuaXR5L2luZGV4LnRzeD81NGI1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBHZXRTZXJ2ZXJTaWRlUHJvcHMgfSBmcm9tICduZXh0JztcbmltcG9ydCB7IEFydGljbGUgfSBmcm9tICdAL3R5cGVzL2FydGljbGUnO1xuaW1wb3J0IEFydGljbGVDYXJkIGZyb20gJ0AvY29tcG9uZW50cy9VSS9jb21tdW5pdHkvQXJ0aWNsZUNhcmQnO1xuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnQC9jb21wb25lbnRzL1VJL1BhZ2luYXRpb24nO1xuaW1wb3J0IHsgZ2V0QXJ0aWNsZXMgfSBmcm9tICdAL2FwaSc7XG5cbnR5cGUgQ29tbXVuaXR5UGFnZVByb3BzID0ge1xuICBhcnRpY2xlczogQXJ0aWNsZVtdO1xuICB0b3RhbENvdW50OiBudW1iZXI7XG4gIHBhZ2U6IG51bWJlcjtcbn07XG5cbmNvbnN0IENvbW11bml0eVBhZ2U6IFJlYWN0LkZDPENvbW11bml0eVBhZ2VQcm9wcz4gPSAoe1xuICBhcnRpY2xlcyA9IFtdLFxuICB0b3RhbENvdW50LFxuICBwYWdlLFxufSkgPT4ge1xuICBjb25zdCBoYW5kbGVQcmV2aW91cyA9ICgpID0+IHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvY29tbXVuaXR5P3BhZ2U9JHtNYXRoLm1heChwYWdlIC0gMSwgMSl9YDtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVOZXh0ID0gKCkgPT4ge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9jb21tdW5pdHk/cGFnZT0ke3BhZ2UgKyAxfWA7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyIG14LWF1dG8gcHgtNCBweS04Jz5cbiAgICAgIDxoMSBjbGFzc05hbWU9J3RleHQtM3hsIGZvbnQtYm9sZCBtYi02Jz7su6TrrqTri4jti7A8L2gxPlxuICAgICAge2FydGljbGVzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC02Jz5cbiAgICAgICAgICB7YXJ0aWNsZXMubWFwKChhcnRpY2xlKSA9PiAoXG4gICAgICAgICAgICA8QXJ0aWNsZUNhcmQga2V5PXthcnRpY2xlLmlkfSBhcnRpY2xlPXthcnRpY2xlfSAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiAoXG4gICAgICAgIDxwPuqyjOyLnOq4gOydtCDsl4bsirXri4jri6QuPC9wPlxuICAgICAgKX1cbiAgICAgIDxQYWdpbmF0aW9uXG4gICAgICAgIGN1cnJlbnRQYWdlPXtwYWdlfVxuICAgICAgICB0b3RhbENvdW50PXt0b3RhbENvdW50fVxuICAgICAgICBvblByZXZpb3VzPXtoYW5kbGVQcmV2aW91c31cbiAgICAgICAgb25OZXh0PXtoYW5kbGVOZXh0fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTZXJ2ZXJTaWRlUHJvcHM6IEdldFNlcnZlclNpZGVQcm9wcyA9IGFzeW5jIChjb250ZXh0KSA9PiB7XG4gIGNvbnN0IHBhZ2UgPSBwYXJzZUludChjb250ZXh0LnF1ZXJ5LnBhZ2UgYXMgc3RyaW5nKSB8fCAxO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgeyBsaXN0LCB0b3RhbENvdW50IH0gPSBhd2FpdCBnZXRBcnRpY2xlcyhwYWdlKTsgLy8gbGlzdOyZgCB0b3RhbENvdW5066W8IOqwgOyguOyYtFxuICAgIHJldHVybiB7XG4gICAgICBwcm9wczoge1xuICAgICAgICBhcnRpY2xlczogbGlzdCxcbiAgICAgICAgdG90YWxDb3VudCxcbiAgICAgICAgcGFnZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCfqsozsi5zquIDsnYQg67aI65+s7Jik64qUIOykkSDsmKTrpZjqsIAg67Cc7IOd7ZaI7Iq164uI64ukOicsIGVycm9yKTtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvcHM6IHtcbiAgICAgICAgYXJ0aWNsZXM6IFtdLFxuICAgICAgICB0b3RhbENvdW50OiAwLFxuICAgICAgICBwYWdlLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgQ29tbXVuaXR5UGFnZTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIkFydGljbGVDYXJkIiwiUGFnaW5hdGlvbiIsIkNvbW11bml0eVBhZ2UiLCJhcnRpY2xlcyIsInRvdGFsQ291bnQiLCJwYWdlIiwiaGFuZGxlUHJldmlvdXMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJNYXRoIiwibWF4IiwiaGFuZGxlTmV4dCIsImRpdiIsImNsYXNzTmFtZSIsImgxIiwibGVuZ3RoIiwibWFwIiwiYXJ0aWNsZSIsImlkIiwicCIsImN1cnJlbnRQYWdlIiwib25QcmV2aW91cyIsIm9uTmV4dCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/community/index.tsx\n"));

/***/ })

});