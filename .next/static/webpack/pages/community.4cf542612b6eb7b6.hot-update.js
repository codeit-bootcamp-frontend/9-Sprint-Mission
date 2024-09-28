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

/***/ "./src/pages/community/index.tsx":
/*!***************************************!*\
  !*** ./src/pages/community/index.tsx ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   __N_SSP: function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_UI_community_ArticleCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/UI/community/ArticleCard */ \"./src/components/UI/community/ArticleCard.tsx\");\n/* harmony import */ var _components_UI_Pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/UI/Pagination */ \"./src/components/UI/Pagination.tsx\");\n\n\n\n\nconst CommunityPage = (param)=>{\n    let { articles = [], totalCount, page } = param;\n    const handlePrevious = ()=>{\n        window.location.href = \"/community?page=\".concat(Math.max(page - 1, 1));\n    };\n    const handleNext = ()=>{\n        window.location.href = \"/community?page=\".concat(page + 1);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"container mx-auto px-4 py-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-3xl font-bold mb-6\",\n                children: \"커뮤니티\"\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 29,\n                columnNumber: 7\n            }, undefined),\n            articles.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\",\n                children: articles.map((article)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_community_ArticleCard__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        article: article\n                    }, article.id, false, {\n                        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                        lineNumber: 33,\n                        columnNumber: 13\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 31,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"게시글이 없습니다.\"\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 37,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_Pagination__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                currentPage: page,\n                totalCount: totalCount,\n                onPrevious: handlePrevious,\n                onNext: handleNext\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 39,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n        lineNumber: 28,\n        columnNumber: 5\n    }, undefined);\n};\n_c = CommunityPage;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (CommunityPage);\nvar _c;\n$RefreshReg$(_c, \"CommunityPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvY29tbXVuaXR5L2luZGV4LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUEwQjtBQUdzQztBQUNaO0FBU3BELE1BQU1HLGdCQUE4QztRQUFDLEVBQ25EQyxXQUFXLEVBQUUsRUFDYkMsVUFBVSxFQUNWQyxJQUFJLEVBQ0w7SUFDQyxNQUFNQyxpQkFBaUI7UUFDckJDLE9BQU9DLFFBQVEsQ0FBQ0MsSUFBSSxHQUFHLG1CQUF5QyxPQUF0QkMsS0FBS0MsR0FBRyxDQUFDTixPQUFPLEdBQUc7SUFDL0Q7SUFFQSxNQUFNTyxhQUFhO1FBQ2pCTCxPQUFPQyxRQUFRLENBQUNDLElBQUksR0FBRyxtQkFBNEIsT0FBVEosT0FBTztJQUNuRDtJQUVBLHFCQUNFLDhEQUFDUTtRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0M7Z0JBQUdELFdBQVU7MEJBQTBCOzs7Ozs7WUFDdkNYLFNBQVNhLE1BQU0sR0FBRyxrQkFDakIsOERBQUNIO2dCQUFJQyxXQUFVOzBCQUNaWCxTQUFTYyxHQUFHLENBQUMsQ0FBQ0Msd0JBQ2IsOERBQUNsQiw0RUFBV0E7d0JBQWtCa0IsU0FBU0E7dUJBQXJCQSxRQUFRQyxFQUFFOzs7Ozs7Ozs7MENBSWhDLDhEQUFDQzswQkFBRTs7Ozs7OzBCQUVMLDhEQUFDbkIsaUVBQVVBO2dCQUNUb0IsYUFBYWhCO2dCQUNiRCxZQUFZQTtnQkFDWmtCLFlBQVloQjtnQkFDWmlCLFFBQVFYOzs7Ozs7Ozs7Ozs7QUFJaEI7S0FqQ01WOztBQTZETiwrREFBZUEsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvY29tbXVuaXR5L2luZGV4LnRzeD81NGI1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBHZXRTZXJ2ZXJTaWRlUHJvcHMgfSBmcm9tICduZXh0JztcbmltcG9ydCB7IEFydGljbGUgfSBmcm9tICdAL3R5cGVzL2FydGljbGUnO1xuaW1wb3J0IEFydGljbGVDYXJkIGZyb20gJ0AvY29tcG9uZW50cy9VSS9jb21tdW5pdHkvQXJ0aWNsZUNhcmQnO1xuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnQC9jb21wb25lbnRzL1VJL1BhZ2luYXRpb24nO1xuaW1wb3J0IHsgZ2V0QXJ0aWNsZXMgfSBmcm9tICdAL2FwaSc7XG5cbnR5cGUgQ29tbXVuaXR5UGFnZVByb3BzID0ge1xuICBhcnRpY2xlczogQXJ0aWNsZVtdO1xuICB0b3RhbENvdW50OiBudW1iZXI7XG4gIHBhZ2U6IG51bWJlcjtcbn07XG5cbmNvbnN0IENvbW11bml0eVBhZ2U6IFJlYWN0LkZDPENvbW11bml0eVBhZ2VQcm9wcz4gPSAoe1xuICBhcnRpY2xlcyA9IFtdLFxuICB0b3RhbENvdW50LFxuICBwYWdlLFxufSkgPT4ge1xuICBjb25zdCBoYW5kbGVQcmV2aW91cyA9ICgpID0+IHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvY29tbXVuaXR5P3BhZ2U9JHtNYXRoLm1heChwYWdlIC0gMSwgMSl9YDtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVOZXh0ID0gKCkgPT4ge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYC9jb21tdW5pdHk/cGFnZT0ke3BhZ2UgKyAxfWA7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyIG14LWF1dG8gcHgtNCBweS04Jz5cbiAgICAgIDxoMSBjbGFzc05hbWU9J3RleHQtM3hsIGZvbnQtYm9sZCBtYi02Jz7su6TrrqTri4jti7A8L2gxPlxuICAgICAge2FydGljbGVzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC02Jz5cbiAgICAgICAgICB7YXJ0aWNsZXMubWFwKChhcnRpY2xlKSA9PiAoXG4gICAgICAgICAgICA8QXJ0aWNsZUNhcmQga2V5PXthcnRpY2xlLmlkfSBhcnRpY2xlPXthcnRpY2xlfSAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiAoXG4gICAgICAgIDxwPuqyjOyLnOq4gOydtCDsl4bsirXri4jri6QuPC9wPlxuICAgICAgKX1cbiAgICAgIDxQYWdpbmF0aW9uXG4gICAgICAgIGN1cnJlbnRQYWdlPXtwYWdlfVxuICAgICAgICB0b3RhbENvdW50PXt0b3RhbENvdW50fVxuICAgICAgICBvblByZXZpb3VzPXtoYW5kbGVQcmV2aW91c31cbiAgICAgICAgb25OZXh0PXtoYW5kbGVOZXh0fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTZXJ2ZXJTaWRlUHJvcHM6IEdldFNlcnZlclNpZGVQcm9wcyA9IGFzeW5jIChjb250ZXh0KSA9PiB7XG4gIGNvbnN0IHBhZ2UgPSBwYXJzZUludChjb250ZXh0LnF1ZXJ5LnBhZ2UgYXMgc3RyaW5nKSB8fCAxO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzID0gY29udGV4dC5yZXM7IC8vIHJlc+ulvCDqsIDsoLjsmLRcbiAgICBjb25zdCB7IGxpc3QsIHRvdGFsQ291bnQgfSA9IGF3YWl0IGdldEFydGljbGVzKHBhZ2UsIHJlcyk7IC8vIGxpc3TsmYAgdG90YWxDb3VudOulvCDqsIDsoLjsmLRcbiAgICBjb25zb2xlLmxvZygnQXJ0aWNsZXMgZmV0Y2hlZDonLCBsaXN0KTsgLy8g66Gc6re4IOy2lOqwgFxuICAgIHJldHVybiB7XG4gICAgICBwcm9wczoge1xuICAgICAgICBhcnRpY2xlczogbGlzdCxcbiAgICAgICAgdG90YWxDb3VudCxcbiAgICAgICAgcGFnZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCfqsozsi5zquIDsnYQg67aI65+s7Jik64qUIOykkSDsmKTrpZjqsIAg67Cc7IOd7ZaI7Iq164uI64ukOicsIGVycm9yKTtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvcHM6IHtcbiAgICAgICAgYXJ0aWNsZXM6IFtdLFxuICAgICAgICB0b3RhbENvdW50OiAwLFxuICAgICAgICBwYWdlLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tdW5pdHlQYWdlO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiQXJ0aWNsZUNhcmQiLCJQYWdpbmF0aW9uIiwiQ29tbXVuaXR5UGFnZSIsImFydGljbGVzIiwidG90YWxDb3VudCIsInBhZ2UiLCJoYW5kbGVQcmV2aW91cyIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsIk1hdGgiLCJtYXgiLCJoYW5kbGVOZXh0IiwiZGl2IiwiY2xhc3NOYW1lIiwiaDEiLCJsZW5ndGgiLCJtYXAiLCJhcnRpY2xlIiwiaWQiLCJwIiwiY3VycmVudFBhZ2UiLCJvblByZXZpb3VzIiwib25OZXh0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/community/index.tsx\n"));

/***/ })

});