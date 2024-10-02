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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_UI_community_AllArticleCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/UI/community/AllArticleCard */ \"./src/components/UI/community/AllArticleCard.tsx\");\n/* harmony import */ var _api_article__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/api/article */ \"./src/api/article.ts\");\n/* harmony import */ var _components_UI_Pagination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/UI/Pagination */ \"./src/components/UI/Pagination.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n// PAGE_SIZES 상수\nconst PAGE_SIZES = 9;\nconst AllArticles = (param)=>{\n    let { initialArticles = [], totalCount, orderBy, searchQuery } = param;\n    _s();\n    const [articles, setArticles] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialArticles);\n    const [currentPage, setCurrentPage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(1);\n    // 게시글 데이터 fetch\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchArticlesData = async (page)=>{\n            const response = await (0,_api_article__WEBPACK_IMPORTED_MODULE_3__.fetchArticles)(page, PAGE_SIZES, orderBy);\n            setArticles(response.list);\n        };\n        fetchArticlesData(currentPage);\n    }, [\n        currentPage,\n        orderBy\n    ]);\n    // 검색어에 따른 필터링\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (searchQuery) {\n            // 검색어가 있는 경우: 제목에 검색어가 포함된 게시글 필터링\n            const filteredArticles = initialArticles.filter((article)=>article.title.toLowerCase().includes(searchQuery.toLowerCase()));\n            setArticles(filteredArticles);\n        } else {\n            // 검색어가 없을 경우: 전체 게시글 표시\n            setArticles(initialArticles);\n        }\n    }, [\n        searchQuery,\n        initialArticles\n    ]);\n    const handlePrevious = async ()=>{\n        if (currentPage > 1) {\n            setCurrentPage(currentPage - 1);\n        }\n    };\n    const handleNext = async ()=>{\n        if (currentPage * PAGE_SIZES < totalCount) {\n            setCurrentPage(currentPage + 1);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"container mx-auto px-4\",\n        children: [\n            articles.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: articles.map((article)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_community_AllArticleCard__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        article: article\n                    }, article.id, false, {\n                        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/AllArticles.tsx\",\n                        lineNumber: 67,\n                        columnNumber: 13\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/AllArticles.tsx\",\n                lineNumber: 65,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"게시글이 없습니다.\"\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/AllArticles.tsx\",\n                lineNumber: 71,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_Pagination__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                currentPage: currentPage,\n                totalCount: totalCount,\n                onPrevious: handlePrevious,\n                onNext: handleNext,\n                pageSize: PAGE_SIZES\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/AllArticles.tsx\",\n                lineNumber: 73,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/components/UI/community/AllArticles.tsx\",\n        lineNumber: 63,\n        columnNumber: 5\n    }, undefined);\n};\n_s(AllArticles, \"XqxCu/F6lG8JfDXJ4DE5KkEvJb4=\");\n_c = AllArticles;\n/* harmony default export */ __webpack_exports__[\"default\"] = (AllArticles);\nvar _c;\n$RefreshReg$(_c, \"AllArticles\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9VSS9jb21tdW5pdHkvQWxsQXJ0aWNsZXMudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBbUQ7QUFFbUI7QUFDeEI7QUFDTTtBQVNwRCxnQkFBZ0I7QUFDaEIsTUFBTU0sYUFBYTtBQUVuQixNQUFNQyxjQUEwQztRQUFDLEVBQy9DQyxrQkFBa0IsRUFBRSxFQUNwQkMsVUFBVSxFQUNWQyxPQUFPLEVBQ1BDLFdBQVcsRUFDWjs7SUFDQyxNQUFNLENBQUNDLFVBQVVDLFlBQVksR0FBR1osK0NBQVFBLENBQVlPO0lBQ3BELE1BQU0sQ0FBQ00sYUFBYUMsZUFBZSxHQUFHZCwrQ0FBUUEsQ0FBQztJQUUvQyxnQkFBZ0I7SUFDaEJDLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTWMsb0JBQW9CLE9BQU9DO1lBQy9CLE1BQU1DLFdBQVcsTUFBTWQsMkRBQWFBLENBQUNhLE1BQU1YLFlBQVlJO1lBQ3ZERyxZQUFZSyxTQUFTQyxJQUFJO1FBQzNCO1FBRUFILGtCQUFrQkY7SUFDcEIsR0FBRztRQUFDQTtRQUFhSjtLQUFRO0lBRXpCLGNBQWM7SUFDZFIsZ0RBQVNBLENBQUM7UUFDUixJQUFJUyxhQUFhO1lBQ2YsbUNBQW1DO1lBQ25DLE1BQU1TLG1CQUFtQlosZ0JBQWdCYSxNQUFNLENBQUMsQ0FBQ0MsVUFDL0NBLFFBQVFDLEtBQUssQ0FBQ0MsV0FBVyxHQUFHQyxRQUFRLENBQUNkLFlBQVlhLFdBQVc7WUFFOURYLFlBQVlPO1FBQ2QsT0FBTztZQUNMLHdCQUF3QjtZQUN4QlAsWUFBWUw7UUFDZDtJQUNGLEdBQUc7UUFBQ0c7UUFBYUg7S0FBZ0I7SUFFakMsTUFBTWtCLGlCQUFpQjtRQUNyQixJQUFJWixjQUFjLEdBQUc7WUFDbkJDLGVBQWVELGNBQWM7UUFDL0I7SUFDRjtJQUVBLE1BQU1hLGFBQWE7UUFDakIsSUFBSWIsY0FBY1IsYUFBYUcsWUFBWTtZQUN6Q00sZUFBZUQsY0FBYztRQUMvQjtJQUNGO0lBRUEscUJBQ0UsOERBQUNjO1FBQUlDLFdBQVU7O1lBQ1pqQixTQUFTa0IsTUFBTSxHQUFHLGtCQUNqQiw4REFBQ0Y7MEJBQ0VoQixTQUFTbUIsR0FBRyxDQUFDLENBQUNULHdCQUNiLDhEQUFDbkIsK0VBQWNBO3dCQUFrQm1CLFNBQVNBO3VCQUFyQkEsUUFBUVUsRUFBRTs7Ozs7Ozs7OzBDQUluQyw4REFBQ0M7MEJBQUU7Ozs7OzswQkFFTCw4REFBQzVCLGlFQUFVQTtnQkFDVFMsYUFBYUE7Z0JBQ2JMLFlBQVlBO2dCQUNaeUIsWUFBWVI7Z0JBQ1pTLFFBQVFSO2dCQUNSUyxVQUFVOUI7Ozs7Ozs7Ozs7OztBQUlsQjtHQWpFTUM7S0FBQUE7QUFtRU4sK0RBQWVBLFdBQVdBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvVUkvY29tbXVuaXR5L0FsbEFydGljbGVzLnRzeD9jMGExIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXJ0aWNsZSB9IGZyb20gJ0AvdHlwZXMvYXJ0aWNsZSc7XG5pbXBvcnQgQWxsQXJ0aWNsZUNhcmQgZnJvbSAnQC9jb21wb25lbnRzL1VJL2NvbW11bml0eS9BbGxBcnRpY2xlQ2FyZCc7XG5pbXBvcnQgeyBmZXRjaEFydGljbGVzIH0gZnJvbSAnQC9hcGkvYXJ0aWNsZSc7XG5pbXBvcnQgUGFnaW5hdGlvbiBmcm9tICdAL2NvbXBvbmVudHMvVUkvUGFnaW5hdGlvbic7XG5cbnR5cGUgQWxsQXJ0aWNsZXNQcm9wcyA9IHtcbiAgaW5pdGlhbEFydGljbGVzOiBBcnRpY2xlW107XG4gIHRvdGFsQ291bnQ6IG51bWJlcjtcbiAgb3JkZXJCeTogc3RyaW5nO1xuICBzZWFyY2hRdWVyeTogc3RyaW5nO1xufTtcblxuLy8gUEFHRV9TSVpFUyDsg4HsiJhcbmNvbnN0IFBBR0VfU0laRVMgPSA5O1xuXG5jb25zdCBBbGxBcnRpY2xlczogUmVhY3QuRkM8QWxsQXJ0aWNsZXNQcm9wcz4gPSAoe1xuICBpbml0aWFsQXJ0aWNsZXMgPSBbXSxcbiAgdG90YWxDb3VudCxcbiAgb3JkZXJCeSxcbiAgc2VhcmNoUXVlcnksXG59KSA9PiB7XG4gIGNvbnN0IFthcnRpY2xlcywgc2V0QXJ0aWNsZXNdID0gdXNlU3RhdGU8QXJ0aWNsZVtdPihpbml0aWFsQXJ0aWNsZXMpO1xuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKDEpO1xuXG4gIC8vIOqyjOyLnOq4gCDrjbDsnbTthLAgZmV0Y2hcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaEFydGljbGVzRGF0YSA9IGFzeW5jIChwYWdlOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hBcnRpY2xlcyhwYWdlLCBQQUdFX1NJWkVTLCBvcmRlckJ5KTtcbiAgICAgIHNldEFydGljbGVzKHJlc3BvbnNlLmxpc3QpO1xuICAgIH07XG5cbiAgICBmZXRjaEFydGljbGVzRGF0YShjdXJyZW50UGFnZSk7XG4gIH0sIFtjdXJyZW50UGFnZSwgb3JkZXJCeV0pO1xuXG4gIC8vIOqygOyDieyWtOyXkCDrlLDrpbgg7ZWE7YSw66eBXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHNlYXJjaFF1ZXJ5KSB7XG4gICAgICAvLyDqsoDsg4nslrTqsIAg7J6I64qUIOqyveyasDog7KCc66qp7JeQIOqygOyDieyWtOqwgCDtj6ztlajrkJwg6rKM7Iuc6riAIO2VhO2EsOungVxuICAgICAgY29uc3QgZmlsdGVyZWRBcnRpY2xlcyA9IGluaXRpYWxBcnRpY2xlcy5maWx0ZXIoKGFydGljbGUpID0+XG4gICAgICAgIGFydGljbGUudGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hRdWVyeS50b0xvd2VyQ2FzZSgpKVxuICAgICAgKTtcbiAgICAgIHNldEFydGljbGVzKGZpbHRlcmVkQXJ0aWNsZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyDqsoDsg4nslrTqsIAg7JeG7J2EIOqyveyasDog7KCE7LK0IOqyjOyLnOq4gCDtkZzsi5xcbiAgICAgIHNldEFydGljbGVzKGluaXRpYWxBcnRpY2xlcyk7XG4gICAgfVxuICB9LCBbc2VhcmNoUXVlcnksIGluaXRpYWxBcnRpY2xlc10pO1xuXG4gIGNvbnN0IGhhbmRsZVByZXZpb3VzID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChjdXJyZW50UGFnZSA+IDEpIHtcbiAgICAgIHNldEN1cnJlbnRQYWdlKGN1cnJlbnRQYWdlIC0gMSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU5leHQgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRQYWdlICogUEFHRV9TSVpFUyA8IHRvdGFsQ291bnQpIHtcbiAgICAgIHNldEN1cnJlbnRQYWdlKGN1cnJlbnRQYWdlICsgMSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lciBteC1hdXRvIHB4LTQnPlxuICAgICAge2FydGljbGVzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge2FydGljbGVzLm1hcCgoYXJ0aWNsZSkgPT4gKFxuICAgICAgICAgICAgPEFsbEFydGljbGVDYXJkIGtleT17YXJ0aWNsZS5pZH0gYXJ0aWNsZT17YXJ0aWNsZX0gLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICA8cD7qsozsi5zquIDsnbQg7JeG7Iq164uI64ukLjwvcD5cbiAgICAgICl9XG4gICAgICA8UGFnaW5hdGlvblxuICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XG4gICAgICAgIHRvdGFsQ291bnQ9e3RvdGFsQ291bnR9XG4gICAgICAgIG9uUHJldmlvdXM9e2hhbmRsZVByZXZpb3VzfVxuICAgICAgICBvbk5leHQ9e2hhbmRsZU5leHR9XG4gICAgICAgIHBhZ2VTaXplPXtQQUdFX1NJWkVTfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEFsbEFydGljbGVzO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJBbGxBcnRpY2xlQ2FyZCIsImZldGNoQXJ0aWNsZXMiLCJQYWdpbmF0aW9uIiwiUEFHRV9TSVpFUyIsIkFsbEFydGljbGVzIiwiaW5pdGlhbEFydGljbGVzIiwidG90YWxDb3VudCIsIm9yZGVyQnkiLCJzZWFyY2hRdWVyeSIsImFydGljbGVzIiwic2V0QXJ0aWNsZXMiLCJjdXJyZW50UGFnZSIsInNldEN1cnJlbnRQYWdlIiwiZmV0Y2hBcnRpY2xlc0RhdGEiLCJwYWdlIiwicmVzcG9uc2UiLCJsaXN0IiwiZmlsdGVyZWRBcnRpY2xlcyIsImZpbHRlciIsImFydGljbGUiLCJ0aXRsZSIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJoYW5kbGVQcmV2aW91cyIsImhhbmRsZU5leHQiLCJkaXYiLCJjbGFzc05hbWUiLCJsZW5ndGgiLCJtYXAiLCJpZCIsInAiLCJvblByZXZpb3VzIiwib25OZXh0IiwicGFnZVNpemUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/UI/community/AllArticles.tsx\n"));

/***/ })

});