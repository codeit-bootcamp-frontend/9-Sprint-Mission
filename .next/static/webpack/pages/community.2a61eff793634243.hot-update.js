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

/***/ "./src/components/UI/community/AllArticles.tsx":
/*!*****************************************************!*\
  !*** ./src/components/UI/community/AllArticles.tsx ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_UI_community_AllArticleCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/UI/community/AllArticleCard */ \"./src/components/UI/community/AllArticleCard.tsx\");\n/* harmony import */ var _api_article__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/article */ \"./src/api/article.ts\");\n/* harmony import */ var _components_UI_Pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/UI/Pagination */ \"./src/components/UI/Pagination.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\nconst PAGE_SIZES = 9;\nconst AllArticles = (param)=>{\n    let { initialArticles = [], totalCount, orderBy, searchQuery } = param;\n    _s();\n    const [articles, setArticles] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialArticles);\n    const [currentPage, setCurrentPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchArticlesData = async (page)=>{\n            const response = await (0,_api_article__WEBPACK_IMPORTED_MODULE_3__.fetchArticles)(page, PAGE_SIZES, orderBy);\n            setArticles(response.list);\n        };\n        fetchArticlesData(currentPage);\n    }, [\n        currentPage,\n        orderBy\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const filteredArticles = initialArticles.filter((article)=>article.title.toLowerCase().includes(searchQuery.toLowerCase()));\n        setArticles(filteredArticles);\n    }, [\n        searchQuery,\n        initialArticles\n    ]);\n    const handlePrevious = async ()=>{\n        if (currentPage > 1) {\n            setCurrentPage(currentPage - 1);\n        }\n    };\n    const handleNext = async ()=>{\n        if (currentPage * PAGE_SIZES < totalCount) {\n            setCurrentPage(currentPage + 1);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"container mx-auto px-4\",\n        children: [\n            articles.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: articles.map((article)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_community_AllArticleCard__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        article: article\n                    }, article.id, false, {\n                        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/AllArticles.tsx\",\n                        lineNumber: 56,\n                        columnNumber: 13\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/AllArticles.tsx\",\n                lineNumber: 54,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"게시글이 없습니다.\"\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/AllArticles.tsx\",\n                lineNumber: 60,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_Pagination__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                currentPage: currentPage,\n                totalCount: totalCount,\n                onPrevious: handlePrevious,\n                onNext: handleNext,\n                pageSize: PAGE_SIZES\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/AllArticles.tsx\",\n                lineNumber: 62,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/AllArticles.tsx\",\n        lineNumber: 52,\n        columnNumber: 5\n    }, undefined);\n};\n_s(AllArticles, \"XqxCu/F6lG8JfDXJ4DE5KkEvJb4=\");\n_c = AllArticles;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AllArticles);\nvar _c;\n$RefreshReg$(_c, \"AllArticles\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9VSS9jb21tdW5pdHkvQWxsQXJ0aWNsZXMudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBbUQ7QUFFbUI7QUFDeEI7QUFDTTtBQVFwRCxNQUFNTSxhQUFhO0FBQ25CLE1BQU1DLGNBQTBDO1FBQUMsRUFDL0NDLGtCQUFrQixFQUFFLEVBQ3BCQyxVQUFVLEVBQ1ZDLE9BQU8sRUFDUEMsV0FBVyxFQUNaOztJQUNDLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHWiwrQ0FBUUEsQ0FBWU87SUFDcEQsTUFBTSxDQUFDTSxhQUFhQyxlQUFlLEdBQUdkLCtDQUFRQSxDQUFDO0lBRS9DQyxnREFBU0EsQ0FBQztRQUNSLE1BQU1jLG9CQUFvQixPQUFPQztZQUMvQixNQUFNQyxXQUFXLE1BQU1kLDJEQUFhQSxDQUFDYSxNQUFNWCxZQUFZSTtZQUN2REcsWUFBWUssU0FBU0MsSUFBSTtRQUMzQjtRQUVBSCxrQkFBa0JGO0lBQ3BCLEdBQUc7UUFBQ0E7UUFBYUo7S0FBUTtJQUV6QlIsZ0RBQVNBLENBQUM7UUFDUixNQUFNa0IsbUJBQW1CWixnQkFBZ0JhLE1BQU0sQ0FBQyxDQUFDQyxVQUMvQ0EsUUFBUUMsS0FBSyxDQUFDQyxXQUFXLEdBQUdDLFFBQVEsQ0FBQ2QsWUFBWWEsV0FBVztRQUU5RFgsWUFBWU87SUFDZCxHQUFHO1FBQUNUO1FBQWFIO0tBQWdCO0lBRWpDLE1BQU1rQixpQkFBaUI7UUFDckIsSUFBSVosY0FBYyxHQUFHO1lBQ25CQyxlQUFlRCxjQUFjO1FBQy9CO0lBQ0Y7SUFFQSxNQUFNYSxhQUFhO1FBQ2pCLElBQUliLGNBQWNSLGFBQWFHLFlBQVk7WUFDekNNLGVBQWVELGNBQWM7UUFDL0I7SUFDRjtJQUVBLHFCQUNFLDhEQUFDYztRQUFJQyxXQUFVOztZQUNaakIsU0FBU2tCLE1BQU0sR0FBRyxrQkFDakIsOERBQUNGOzBCQUNFaEIsU0FBU21CLEdBQUcsQ0FBQyxDQUFDVCx3QkFDYiw4REFBQ25CLCtFQUFjQTt3QkFBa0JtQixTQUFTQTt1QkFBckJBLFFBQVFVLEVBQUU7Ozs7Ozs7OzswQ0FJbkMsOERBQUNDOzBCQUFFOzs7Ozs7MEJBRUwsOERBQUM1QixpRUFBVUE7Z0JBQ1RTLGFBQWFBO2dCQUNiTCxZQUFZQTtnQkFDWnlCLFlBQVlSO2dCQUNaUyxRQUFRUjtnQkFDUlMsVUFBVTlCOzs7Ozs7Ozs7Ozs7QUFJbEI7R0F6RE1DO0tBQUFBO0FBMkROLCtEQUFlQSxXQUFXQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL1VJL2NvbW11bml0eS9BbGxBcnRpY2xlcy50c3g/YzBhMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEFydGljbGUgfSBmcm9tICdAL3R5cGVzL2FydGljbGUnO1xuaW1wb3J0IEFsbEFydGljbGVDYXJkIGZyb20gJ0AvY29tcG9uZW50cy9VSS9jb21tdW5pdHkvQWxsQXJ0aWNsZUNhcmQnO1xuaW1wb3J0IHsgZmV0Y2hBcnRpY2xlcyB9IGZyb20gJ0AvYXBpL2FydGljbGUnO1xuaW1wb3J0IFBhZ2luYXRpb24gZnJvbSAnQC9jb21wb25lbnRzL1VJL1BhZ2luYXRpb24nO1xuXG50eXBlIEFsbEFydGljbGVzUHJvcHMgPSB7XG4gIGluaXRpYWxBcnRpY2xlczogQXJ0aWNsZVtdO1xuICB0b3RhbENvdW50OiBudW1iZXI7XG4gIG9yZGVyQnk6IHN0cmluZztcbiAgc2VhcmNoUXVlcnk6IHN0cmluZztcbn07XG5jb25zdCBQQUdFX1NJWkVTID0gOTtcbmNvbnN0IEFsbEFydGljbGVzOiBSZWFjdC5GQzxBbGxBcnRpY2xlc1Byb3BzPiA9ICh7XG4gIGluaXRpYWxBcnRpY2xlcyA9IFtdLFxuICB0b3RhbENvdW50LFxuICBvcmRlckJ5LFxuICBzZWFyY2hRdWVyeSxcbn0pID0+IHtcbiAgY29uc3QgW2FydGljbGVzLCBzZXRBcnRpY2xlc10gPSB1c2VTdGF0ZTxBcnRpY2xlW10+KGluaXRpYWxBcnRpY2xlcyk7XG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaEFydGljbGVzRGF0YSA9IGFzeW5jIChwYWdlOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hBcnRpY2xlcyhwYWdlLCBQQUdFX1NJWkVTLCBvcmRlckJ5KTtcbiAgICAgIHNldEFydGljbGVzKHJlc3BvbnNlLmxpc3QpO1xuICAgIH07XG5cbiAgICBmZXRjaEFydGljbGVzRGF0YShjdXJyZW50UGFnZSk7XG4gIH0sIFtjdXJyZW50UGFnZSwgb3JkZXJCeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZmlsdGVyZWRBcnRpY2xlcyA9IGluaXRpYWxBcnRpY2xlcy5maWx0ZXIoKGFydGljbGUpID0+XG4gICAgICBhcnRpY2xlLnRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkudG9Mb3dlckNhc2UoKSlcbiAgICApO1xuICAgIHNldEFydGljbGVzKGZpbHRlcmVkQXJ0aWNsZXMpO1xuICB9LCBbc2VhcmNoUXVlcnksIGluaXRpYWxBcnRpY2xlc10pO1xuXG4gIGNvbnN0IGhhbmRsZVByZXZpb3VzID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChjdXJyZW50UGFnZSA+IDEpIHtcbiAgICAgIHNldEN1cnJlbnRQYWdlKGN1cnJlbnRQYWdlIC0gMSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU5leHQgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQYWdlICogUEFHRV9TSVpFUyA8IHRvdGFsQ291bnQpIHtcbiAgICAgIHNldEN1cnJlbnRQYWdlKGN1cnJlbnRQYWdlICsgMSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lciBteC1hdXRvIHB4LTQnPlxuICAgICAge2FydGljbGVzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge2FydGljbGVzLm1hcCgoYXJ0aWNsZSkgPT4gKFxuICAgICAgICAgICAgPEFsbEFydGljbGVDYXJkIGtleT17YXJ0aWNsZS5pZH0gYXJ0aWNsZT17YXJ0aWNsZX0gLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICA8cD7qsozsi5zquIDsnbQg7JeG7Iq164uI64ukLjwvcD5cbiAgICAgICl9XG4gICAgICA8UGFnaW5hdGlvblxuICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XG4gICAgICAgIHRvdGFsQ291bnQ9e3RvdGFsQ291bnR9XG4gICAgICAgIG9uUHJldmlvdXM9e2hhbmRsZVByZXZpb3VzfVxuICAgICAgICBvbk5leHQ9e2hhbmRsZU5leHR9XG4gICAgICAgIHBhZ2VTaXplPXtQQUdFX1NJWkVTfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFsbEFydGljbGVzO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJBbGxBcnRpY2xlQ2FyZCIsImZldGNoQXJ0aWNsZXMiLCJQYWdpbmF0aW9uIiwiUEFHRV9TSVpFUyIsIkFsbEFydGljbGVzIiwiaW5pdGlhbEFydGljbGVzIiwidG90YWxDb3VudCIsIm9yZGVyQnkiLCJzZWFyY2hRdWVyeSIsImFydGljbGVzIiwic2V0QXJ0aWNsZXMiLCJjdXJyZW50UGFnZSIsInNldEN1cnJlbnRQYWdlIiwiZmV0Y2hBcnRpY2xlc0RhdGEiLCJwYWdlIiwicmVzcG9uc2UiLCJsaXN0IiwiZmlsdGVyZWRBcnRpY2xlcyIsImZpbHRlciIsImFydGljbGUiLCJ0aXRsZSIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJoYW5kbGVQcmV2aW91cyIsImhhbmRsZU5leHQiLCJkaXYiLCJjbGFzc05hbWUiLCJsZW5ndGgiLCJtYXAiLCJpZCIsInAiLCJvblByZXZpb3VzIiwib25OZXh0IiwicGFnZVNpemUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/UI/community/AllArticles.tsx\n"));

/***/ })

});