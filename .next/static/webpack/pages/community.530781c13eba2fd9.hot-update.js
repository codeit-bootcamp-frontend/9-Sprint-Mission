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

/***/ "./src/hooks/usePageSize.ts":
/*!**********************************!*\
  !*** ./src/hooks/usePageSize.ts ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst usePageSize = ()=>{\n    const [pageSize, setPageSize] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(3); // 기본값을 데스크탑 크기로 설정\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        const updatePageSize = ()=>{\n            if (window.innerWidth < 640) {\n                setPageSize(1); // 모바일\n            } else if (window.innerWidth < 768) {\n                setPageSize(2); // 테블릿\n            } else {\n                setPageSize(3); // 데스크탑\n            }\n        };\n        window.addEventListener(\"resize\", updatePageSize);\n        updatePageSize(); // 초기 크기 설정\n        return ()=>window.removeEventListener(\"resize\", updatePageSize);\n    }, []);\n    return pageSize;\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (usePageSize);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaG9va3MvdXNlUGFnZVNpemUudHMiLCJtYXBwaW5ncyI6Ijs7O0FBQTRDO0FBRTVDLE1BQU1FLGNBQWM7SUFDbEIsTUFBTSxDQUFDQyxVQUFVQyxZQUFZLEdBQUdKLCtDQUFRQSxDQUFDLElBQUksbUJBQW1CO0lBRWhFQyxnREFBU0EsQ0FBQztRQUNSLE1BQU1JLGlCQUFpQjtZQUNyQixJQUFJQyxPQUFPQyxVQUFVLEdBQUcsS0FBSztnQkFDM0JILFlBQVksSUFBSSxNQUFNO1lBQ3hCLE9BQU8sSUFBSUUsT0FBT0MsVUFBVSxHQUFHLEtBQUs7Z0JBQ2xDSCxZQUFZLElBQUksTUFBTTtZQUN4QixPQUFPO2dCQUNMQSxZQUFZLElBQUksT0FBTztZQUN6QjtRQUNGO1FBRUFFLE9BQU9FLGdCQUFnQixDQUFDLFVBQVVIO1FBQ2xDQSxrQkFBa0IsV0FBVztRQUU3QixPQUFPLElBQU1DLE9BQU9HLG1CQUFtQixDQUFDLFVBQVVKO0lBQ3BELEdBQUcsRUFBRTtJQUVMLE9BQU9GO0FBQ1Q7QUFFQSwrREFBZUQsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvaG9va3MvdXNlUGFnZVNpemUudHM/ZGQ2MyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5jb25zdCB1c2VQYWdlU2l6ZSA9ICgpID0+IHtcbiAgY29uc3QgW3BhZ2VTaXplLCBzZXRQYWdlU2l6ZV0gPSB1c2VTdGF0ZSgzKTsgLy8g6riw67O46rCS7J2EIOuNsOyKpO2BrO2DkSDtgazquLDroZwg7ISk7KCVXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1cGRhdGVQYWdlU2l6ZSA9ICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDY0MCkge1xuICAgICAgICBzZXRQYWdlU2l6ZSgxKTsgLy8g66qo67CU7J28XG4gICAgICB9IGVsc2UgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgIHNldFBhZ2VTaXplKDIpOyAvLyDthYzruJTrpr9cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFBhZ2VTaXplKDMpOyAvLyDrjbDsiqTtgaztg5FcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZVBhZ2VTaXplKTtcbiAgICB1cGRhdGVQYWdlU2l6ZSgpOyAvLyDstIjquLAg7YGs6riwIOyEpOyglVxuXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVQYWdlU2l6ZSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gcGFnZVNpemU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB1c2VQYWdlU2l6ZTtcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVBhZ2VTaXplIiwicGFnZVNpemUiLCJzZXRQYWdlU2l6ZSIsInVwZGF0ZVBhZ2VTaXplIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/hooks/usePageSize.ts\n"));

/***/ }),

/***/ "./src/pages/community/index.tsx":
/*!***************************************!*\
  !*** ./src/pages/community/index.tsx ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   __N_SSP: function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_UI_community_BestArticles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/UI/community/BestArticles */ \"./src/components/UI/community/BestArticles.tsx\");\n/* harmony import */ var _components_UI_community_AllArticles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/UI/community/AllArticles */ \"./src/components/UI/community/AllArticles.tsx\");\n/* harmony import */ var _api_axiosConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/api/axiosConfig */ \"./src/api/axiosConfig.ts\");\n/* harmony import */ var _components_UI_Dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/UI/Dropdown */ \"./src/components/UI/Dropdown.tsx\");\n/* harmony import */ var _components_UI_SearchBar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/UI/SearchBar */ \"./src/components/UI/SearchBar.tsx\");\n/* harmony import */ var _hooks_usePageSize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/hooks/usePageSize */ \"./src/hooks/usePageSize.ts\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n // 훅 임포트\nconst CommunityPage = (param)=>{\n    let { bestArticles, allArticles, totalCount } = param;\n    _s();\n    const [selectedOrder, setSelectedOrder] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"recent\");\n    const [allArticlesData, setAllArticlesData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(allArticles);\n    const [searchQuery, setSearchQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const bestPageSize = (0,_hooks_usePageSize__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(); // 훅 사용\n    const [bestArticlesData, setBestArticlesData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(bestArticles);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchBestArticles = async ()=>{\n            const response = await _api_axiosConfig__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"/articles\", {\n                params: {\n                    page: 1,\n                    pageSize: bestPageSize,\n                    orderBy: \"like\"\n                }\n            });\n            setBestArticlesData(response.data.list);\n        };\n        fetchBestArticles(); // 페이지 크기 변경 시 베스트 게시글 다시 불러오기\n    }, [\n        bestPageSize\n    ]); // bestPageSize 변경 시마다 호출\n    const handleOrderChange = async (value)=>{\n        setSelectedOrder(value);\n        await fetchArticles(value, searchQuery);\n    };\n    const handleSearch = async (query)=>{\n        setSearchQuery(query);\n        await fetchArticles(selectedOrder, query);\n    };\n    const fetchArticles = async (orderBy, search)=>{\n        const response = await _api_axiosConfig__WEBPACK_IMPORTED_MODULE_4__[\"default\"].get(\"/articles\", {\n            params: {\n                page: 1,\n                pageSize: 9,\n                orderBy\n            }\n        });\n        setAllArticlesData(response.data.list);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"container mx-auto px-4 py-8 mt-12\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-2xl font-bold mb-4\",\n                children: \"베스트 게시글\"\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 63,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_community_BestArticles__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                articles: bestArticlesData,\n                totalCount: bestArticlesData.length\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col mt-8 mb-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                        className: \"text-2xl font-bold mb-4\",\n                        children: \"전체 게시글\"\n                    }, void 0, false, {\n                        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                        lineNumber: 69,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-between gap-4 items-center\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_SearchBar__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                                onSearch: handleSearch\n                            }, void 0, false, {\n                                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                                lineNumber: 71,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_Dropdown__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                options: [\n                                    {\n                                        label: \"최신순\",\n                                        value: \"recent\"\n                                    },\n                                    {\n                                        label: \"좋아요순\",\n                                        value: \"like\"\n                                    }\n                                ],\n                                selectedValue: selectedOrder,\n                                onChange: handleOrderChange\n                            }, void 0, false, {\n                                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                                lineNumber: 72,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                        lineNumber: 70,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 68,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_community_AllArticles__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                initialArticles: allArticlesData,\n                totalCount: totalCount,\n                orderBy: selectedOrder,\n                searchQuery: searchQuery\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 82,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n        lineNumber: 62,\n        columnNumber: 5\n    }, undefined);\n};\n_s(CommunityPage, \"mE3B8yzOtr/vn7/bEQHyr/8+euw=\", false, function() {\n    return [\n        _hooks_usePageSize__WEBPACK_IMPORTED_MODULE_7__[\"default\"]\n    ];\n});\n_c = CommunityPage;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (CommunityPage);\nvar _c;\n$RefreshReg$(_c, \"CommunityPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvY29tbXVuaXR5L2luZGV4LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQW1EO0FBR2U7QUFDRjtBQUNsQjtBQUNFO0FBQ0U7QUFDSixDQUFDLFFBQVE7QUFFdkQsTUFBTVMsZ0JBSUQ7UUFBQyxFQUFFQyxZQUFZLEVBQUVDLFdBQVcsRUFBRUMsVUFBVSxFQUFFOztJQUM3QyxNQUFNLENBQUNDLGVBQWVDLGlCQUFpQixHQUFHYiwrQ0FBUUEsQ0FBQztJQUNuRCxNQUFNLENBQUNjLGlCQUFpQkMsbUJBQW1CLEdBQUdmLCtDQUFRQSxDQUFDVTtJQUN2RCxNQUFNLENBQUNNLGFBQWFDLGVBQWUsR0FBR2pCLCtDQUFRQSxDQUFDO0lBQy9DLE1BQU1rQixlQUFlWCw4REFBV0EsSUFBSSxPQUFPO0lBQzNDLE1BQU0sQ0FBQ1ksa0JBQWtCQyxvQkFBb0IsR0FBR3BCLCtDQUFRQSxDQUFDUztJQUV6RFIsZ0RBQVNBLENBQUM7UUFDUixNQUFNb0Isb0JBQW9CO1lBQ3hCLE1BQU1DLFdBQVcsTUFBTWxCLDREQUFpQixDQUN0QyxhQUNBO2dCQUNFb0IsUUFBUTtvQkFDTkMsTUFBTTtvQkFDTkMsVUFBVVI7b0JBQ1ZTLFNBQVM7Z0JBQ1g7WUFDRjtZQUVGUCxvQkFBb0JFLFNBQVNNLElBQUksQ0FBQ0MsSUFBSTtRQUN4QztRQUVBUixxQkFBcUIsOEJBQThCO0lBQ3JELEdBQUc7UUFBQ0g7S0FBYSxHQUFHLHlCQUF5QjtJQUU3QyxNQUFNWSxvQkFBb0IsT0FBT0M7UUFDL0JsQixpQkFBaUJrQjtRQUNqQixNQUFNQyxjQUFjRCxPQUFPZjtJQUM3QjtJQUVBLE1BQU1pQixlQUFlLE9BQU9DO1FBQzFCakIsZUFBZWlCO1FBQ2YsTUFBTUYsY0FBY3BCLGVBQWVzQjtJQUNyQztJQUVBLE1BQU1GLGdCQUFnQixPQUFPTCxTQUFpQlE7UUFDNUMsTUFBTWIsV0FBVyxNQUFNbEIsNERBQWlCLENBQXNCLGFBQWE7WUFDekVvQixRQUFRO2dCQUNOQyxNQUFNO2dCQUNOQyxVQUFVO2dCQUNWQztZQUNGO1FBQ0Y7UUFDQVosbUJBQW1CTyxTQUFTTSxJQUFJLENBQUNDLElBQUk7SUFDdkM7SUFFQSxxQkFDRSw4REFBQ087UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNDO2dCQUFHRCxXQUFVOzBCQUEwQjs7Ozs7OzBCQUN4Qyw4REFBQ25DLDZFQUFZQTtnQkFDWHFDLFVBQVVwQjtnQkFDVlIsWUFBWVEsaUJBQWlCcUIsTUFBTTs7Ozs7OzBCQUVyQyw4REFBQ0o7Z0JBQUlDLFdBQVU7O2tDQUNiLDhEQUFDQzt3QkFBR0QsV0FBVTtrQ0FBMEI7Ozs7OztrQ0FDeEMsOERBQUNEO3dCQUFJQyxXQUFVOzswQ0FDYiw4REFBQy9CLGdFQUFTQTtnQ0FBQ21DLFVBQVVSOzs7Ozs7MENBQ3JCLDhEQUFDNUIsK0RBQVFBO2dDQUNQcUMsU0FBUztvQ0FDUDt3Q0FBRUMsT0FBTzt3Q0FBT1osT0FBTztvQ0FBUztvQ0FDaEM7d0NBQUVZLE9BQU87d0NBQVFaLE9BQU87b0NBQU87aUNBQ2hDO2dDQUNEYSxlQUFlaEM7Z0NBQ2ZpQyxVQUFVZjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUloQiw4REFBQzNCLDRFQUFXQTtnQkFDVjJDLGlCQUFpQmhDO2dCQUNqQkgsWUFBWUE7Z0JBQ1pnQixTQUFTZjtnQkFDVEksYUFBYUE7Ozs7Ozs7Ozs7OztBQUlyQjtHQS9FTVI7O1FBUWlCRCwwREFBV0E7OztLQVI1QkM7O0FBNklOLCtEQUFlQSxhQUFhQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9wYWdlcy9jb21tdW5pdHkvaW5kZXgudHN4PzU0YjUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBHZXRTZXJ2ZXJTaWRlUHJvcHMgfSBmcm9tICduZXh0JztcbmltcG9ydCB7IEFydGljbGUsIEFydGljbGVMaXN0UmVzcG9uc2UgfSBmcm9tICdAL3R5cGVzL2FydGljbGUnO1xuaW1wb3J0IEJlc3RBcnRpY2xlcyBmcm9tICdAL2NvbXBvbmVudHMvVUkvY29tbXVuaXR5L0Jlc3RBcnRpY2xlcyc7XG5pbXBvcnQgQWxsQXJ0aWNsZXMgZnJvbSAnQC9jb21wb25lbnRzL1VJL2NvbW11bml0eS9BbGxBcnRpY2xlcyc7XG5pbXBvcnQgYXhpb3NJbnN0YW5jZSBmcm9tICdAL2FwaS9heGlvc0NvbmZpZyc7XG5pbXBvcnQgRHJvcGRvd24gZnJvbSAnQC9jb21wb25lbnRzL1VJL0Ryb3Bkb3duJztcbmltcG9ydCBTZWFyY2hCYXIgZnJvbSAnQC9jb21wb25lbnRzL1VJL1NlYXJjaEJhcic7XG5pbXBvcnQgdXNlUGFnZVNpemUgZnJvbSAnQC9ob29rcy91c2VQYWdlU2l6ZSc7IC8vIO2bhSDsnoTtj6ztirhcblxuY29uc3QgQ29tbXVuaXR5UGFnZTogUmVhY3QuRkM8e1xuICBiZXN0QXJ0aWNsZXM6IEFydGljbGVbXTtcbiAgYWxsQXJ0aWNsZXM6IEFydGljbGVbXTtcbiAgdG90YWxDb3VudDogbnVtYmVyO1xufT4gPSAoeyBiZXN0QXJ0aWNsZXMsIGFsbEFydGljbGVzLCB0b3RhbENvdW50IH0pID0+IHtcbiAgY29uc3QgW3NlbGVjdGVkT3JkZXIsIHNldFNlbGVjdGVkT3JkZXJdID0gdXNlU3RhdGUoJ3JlY2VudCcpO1xuICBjb25zdCBbYWxsQXJ0aWNsZXNEYXRhLCBzZXRBbGxBcnRpY2xlc0RhdGFdID0gdXNlU3RhdGUoYWxsQXJ0aWNsZXMpO1xuICBjb25zdCBbc2VhcmNoUXVlcnksIHNldFNlYXJjaFF1ZXJ5XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgYmVzdFBhZ2VTaXplID0gdXNlUGFnZVNpemUoKTsgLy8g7ZuFIOyCrOyaqVxuICBjb25zdCBbYmVzdEFydGljbGVzRGF0YSwgc2V0QmVzdEFydGljbGVzRGF0YV0gPSB1c2VTdGF0ZShiZXN0QXJ0aWNsZXMpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZmV0Y2hCZXN0QXJ0aWNsZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zSW5zdGFuY2UuZ2V0PEFydGljbGVMaXN0UmVzcG9uc2U+KFxuICAgICAgICAnL2FydGljbGVzJyxcbiAgICAgICAge1xuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgICAgIHBhZ2VTaXplOiBiZXN0UGFnZVNpemUsIC8vIOuPmeyggeycvOuhnCDshKTsoJXrkJwgcGFnZVNpemUg7IKs7JqpXG4gICAgICAgICAgICBvcmRlckJ5OiAnbGlrZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHNldEJlc3RBcnRpY2xlc0RhdGEocmVzcG9uc2UuZGF0YS5saXN0KTtcbiAgICB9O1xuXG4gICAgZmV0Y2hCZXN0QXJ0aWNsZXMoKTsgLy8g7Y6Y7J207KeAIO2BrOq4sCDrs4Dqsr0g7IucIOuyoOyKpO2KuCDqsozsi5zquIAg64uk7IucIOu2iOufrOyYpOq4sFxuICB9LCBbYmVzdFBhZ2VTaXplXSk7IC8vIGJlc3RQYWdlU2l6ZSDrs4Dqsr0g7Iuc66eI64ukIO2YuOy2nFxuXG4gIGNvbnN0IGhhbmRsZU9yZGVyQ2hhbmdlID0gYXN5bmMgKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICBzZXRTZWxlY3RlZE9yZGVyKHZhbHVlKTtcbiAgICBhd2FpdCBmZXRjaEFydGljbGVzKHZhbHVlLCBzZWFyY2hRdWVyeSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2VhcmNoID0gYXN5bmMgKHF1ZXJ5OiBzdHJpbmcpID0+IHtcbiAgICBzZXRTZWFyY2hRdWVyeShxdWVyeSk7XG4gICAgYXdhaXQgZmV0Y2hBcnRpY2xlcyhzZWxlY3RlZE9yZGVyLCBxdWVyeSk7XG4gIH07XG5cbiAgY29uc3QgZmV0Y2hBcnRpY2xlcyA9IGFzeW5jIChvcmRlckJ5OiBzdHJpbmcsIHNlYXJjaDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvc0luc3RhbmNlLmdldDxBcnRpY2xlTGlzdFJlc3BvbnNlPignL2FydGljbGVzJywge1xuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIHBhZ2U6IDEsXG4gICAgICAgIHBhZ2VTaXplOiA5LCAvLyDquLDrs7jqsJJcbiAgICAgICAgb3JkZXJCeSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgc2V0QWxsQXJ0aWNsZXNEYXRhKHJlc3BvbnNlLmRhdGEubGlzdCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyIG14LWF1dG8gcHgtNCBweS04IG10LTEyJz5cbiAgICAgIDxoMSBjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00Jz7rsqDsiqTtirgg6rKM7Iuc6riAPC9oMT5cbiAgICAgIDxCZXN0QXJ0aWNsZXNcbiAgICAgICAgYXJ0aWNsZXM9e2Jlc3RBcnRpY2xlc0RhdGF9XG4gICAgICAgIHRvdGFsQ291bnQ9e2Jlc3RBcnRpY2xlc0RhdGEubGVuZ3RofVxuICAgICAgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdmbGV4IGZsZXgtY29sIG10LTggbWItNCc+XG4gICAgICAgIDxoMSBjbGFzc05hbWU9J3RleHQtMnhsIGZvbnQtYm9sZCBtYi00Jz7soITssrQg6rKM7Iuc6riAPC9oMT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2ZsZXgganVzdGlmeS1iZXR3ZWVuIGdhcC00IGl0ZW1zLWNlbnRlcic+XG4gICAgICAgICAgPFNlYXJjaEJhciBvblNlYXJjaD17aGFuZGxlU2VhcmNofSAvPlxuICAgICAgICAgIDxEcm9wZG93blxuICAgICAgICAgICAgb3B0aW9ucz17W1xuICAgICAgICAgICAgICB7IGxhYmVsOiAn7LWc7Iug7IicJywgdmFsdWU6ICdyZWNlbnQnIH0sXG4gICAgICAgICAgICAgIHsgbGFiZWw6ICfsoovslYTsmpTsiJwnLCB2YWx1ZTogJ2xpa2UnIH0sXG4gICAgICAgICAgICBdfVxuICAgICAgICAgICAgc2VsZWN0ZWRWYWx1ZT17c2VsZWN0ZWRPcmRlcn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVPcmRlckNoYW5nZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPEFsbEFydGljbGVzXG4gICAgICAgIGluaXRpYWxBcnRpY2xlcz17YWxsQXJ0aWNsZXNEYXRhfVxuICAgICAgICB0b3RhbENvdW50PXt0b3RhbENvdW50fVxuICAgICAgICBvcmRlckJ5PXtzZWxlY3RlZE9yZGVyfVxuICAgICAgICBzZWFyY2hRdWVyeT17c2VhcmNoUXVlcnl9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFNlcnZlclNpZGVQcm9wczogR2V0U2VydmVyU2lkZVByb3BzID0gYXN5bmMgKGNvbnRleHQpID0+IHtcbiAgY29uc3QgcGFnZSA9IHBhcnNlSW50KGNvbnRleHQucXVlcnkucGFnZSBhcyBzdHJpbmcpIHx8IDE7XG4gIGNvbnN0IG9yZGVyQnkgPSAoY29udGV4dC5xdWVyeS5vcmRlckJ5IGFzIHN0cmluZykgfHwgJ3JlY2VudCc7XG5cbiAgY29uc3QgdXNlckFnZW50ID0gY29udGV4dC5yZXEuaGVhZGVyc1sndXNlci1hZ2VudCddO1xuICBsZXQgYmVzdFBhZ2VTaXplID0gMzsgLy8g6riw67O46rCSXG4gIGxldCBhbGxQYWdlU2l6ZSA9IDk7IC8vIOq4sOuzuOqwklxuXG4gIGlmICh1c2VyQWdlbnQpIHtcbiAgICBpZiAoL01vYml8QW5kcm9pZC9pLnRlc3QodXNlckFnZW50KSkge1xuICAgICAgYmVzdFBhZ2VTaXplID0gMTsgLy8g66qo67CU7J28XG4gICAgICBhbGxQYWdlU2l6ZSA9IDQ7IC8vIOuqqOuwlOydvFxuICAgIH0gZWxzZSBpZiAoL1RhYmxldHxpUGFkL2kudGVzdCh1c2VyQWdlbnQpKSB7XG4gICAgICBiZXN0UGFnZVNpemUgPSAyOyAvLyDtg5zruJTrpr9cbiAgICAgIGFsbFBhZ2VTaXplID0gNjsgLy8g7YOc67iU66a/XG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBiZXN0UmVzcG9uc2UgPSBhd2FpdCBheGlvc0luc3RhbmNlLmdldDxBcnRpY2xlTGlzdFJlc3BvbnNlPihcbiAgICAgICcvYXJ0aWNsZXMnLFxuICAgICAge1xuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBwYWdlLFxuICAgICAgICAgIHBhZ2VTaXplOiBiZXN0UGFnZVNpemUsIC8vIOuPmeyggeycvOuhnCDshKTsoJXrkJwgcGFnZVNpemVcbiAgICAgICAgICBvcmRlckJ5OiAnbGlrZScsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IGFsbFJlc3BvbnNlID0gYXdhaXQgYXhpb3NJbnN0YW5jZS5nZXQ8QXJ0aWNsZUxpc3RSZXNwb25zZT4oXG4gICAgICAnL2FydGljbGVzJyxcbiAgICAgIHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgcGFnZSxcbiAgICAgICAgICBwYWdlU2l6ZTogYWxsUGFnZVNpemUsIC8vIOuPmeyggeycvOuhnCDshKTsoJXrkJwgcGFnZVNpemVcbiAgICAgICAgICBvcmRlckJ5LFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcHJvcHM6IHtcbiAgICAgICAgYmVzdEFydGljbGVzOiBiZXN0UmVzcG9uc2UuZGF0YS5saXN0LFxuICAgICAgICBhbGxBcnRpY2xlczogYWxsUmVzcG9uc2UuZGF0YS5saXN0LFxuICAgICAgICB0b3RhbENvdW50OiBhbGxSZXNwb25zZS5kYXRhLnRvdGFsQ291bnQsXG4gICAgICB9LFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcign6rKM7Iuc6riA7J2EIOu2iOufrOyYpOuKlCDspJEg7Jik66WY6rCAIOuwnOyDne2WiOyKteuLiOuLpDonLCBlcnJvcik7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIGJlc3RBcnRpY2xlczogW10sXG4gICAgICAgIGFsbEFydGljbGVzOiBbXSxcbiAgICAgICAgdG90YWxDb3VudDogMCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbXVuaXR5UGFnZTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwiQmVzdEFydGljbGVzIiwiQWxsQXJ0aWNsZXMiLCJheGlvc0luc3RhbmNlIiwiRHJvcGRvd24iLCJTZWFyY2hCYXIiLCJ1c2VQYWdlU2l6ZSIsIkNvbW11bml0eVBhZ2UiLCJiZXN0QXJ0aWNsZXMiLCJhbGxBcnRpY2xlcyIsInRvdGFsQ291bnQiLCJzZWxlY3RlZE9yZGVyIiwic2V0U2VsZWN0ZWRPcmRlciIsImFsbEFydGljbGVzRGF0YSIsInNldEFsbEFydGljbGVzRGF0YSIsInNlYXJjaFF1ZXJ5Iiwic2V0U2VhcmNoUXVlcnkiLCJiZXN0UGFnZVNpemUiLCJiZXN0QXJ0aWNsZXNEYXRhIiwic2V0QmVzdEFydGljbGVzRGF0YSIsImZldGNoQmVzdEFydGljbGVzIiwicmVzcG9uc2UiLCJnZXQiLCJwYXJhbXMiLCJwYWdlIiwicGFnZVNpemUiLCJvcmRlckJ5IiwiZGF0YSIsImxpc3QiLCJoYW5kbGVPcmRlckNoYW5nZSIsInZhbHVlIiwiZmV0Y2hBcnRpY2xlcyIsImhhbmRsZVNlYXJjaCIsInF1ZXJ5Iiwic2VhcmNoIiwiZGl2IiwiY2xhc3NOYW1lIiwiaDEiLCJhcnRpY2xlcyIsImxlbmd0aCIsIm9uU2VhcmNoIiwib3B0aW9ucyIsImxhYmVsIiwic2VsZWN0ZWRWYWx1ZSIsIm9uQ2hhbmdlIiwiaW5pdGlhbEFydGljbGVzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/pages/community/index.tsx\n"));

/***/ })

});