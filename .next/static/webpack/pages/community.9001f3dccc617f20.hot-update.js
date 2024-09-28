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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   __N_SSP: function() { return /* binding */ __N_SSP; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_UI_community_ArticleCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/UI/community/ArticleCard */ \"./src/components/UI/community/ArticleCard.tsx\");\n/* harmony import */ var _components_UI_Pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/UI/Pagination */ \"./src/components/UI/Pagination.tsx\");\n// /pages/community/index.tsx\n\n\n\n\nconst CommunityPage = (param)=>{\n    let { articles, totalCount, page } = param;\n    const handlePrevious = ()=>{\n        window.location.href = \"/community?page=\".concat(Math.max(page - 1, 1));\n    };\n    const handleNext = ()=>{\n        window.location.href = \"/community?page=\".concat(page + 1);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"container mx-auto px-4 py-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-3xl font-bold mb-6\",\n                children: \"커뮤니티\"\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, undefined),\n            articles.length > 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6\",\n                children: articles.map((article)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_community_ArticleCard__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        article: article\n                    }, article.id, false, {\n                        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                        lineNumber: 34,\n                        columnNumber: 13\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 32,\n                columnNumber: 9\n            }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"게시글이 없습니다.\"\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 38,\n                columnNumber: 9\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_UI_Pagination__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                currentPage: page,\n                totalCount: totalCount,\n                onPrevious: handlePrevious,\n                onNext: handleNext\n            }, void 0, false, {\n                fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n                lineNumber: 40,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/kim-yeji/codeit/nextjs-traing/9-Sprint-Mission/src/pages/community/index.tsx\",\n        lineNumber: 29,\n        columnNumber: 5\n    }, undefined);\n};\n_c = CommunityPage;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (CommunityPage);\nvar _c;\n$RefreshReg$(_c, \"CommunityPage\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGFnZXMvY29tbXVuaXR5L2luZGV4LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkJBQTZCOztBQUNIO0FBSXNDO0FBQ1o7QUFRcEQsTUFBTUcsZ0JBQThDO1FBQUMsRUFDbkRDLFFBQVEsRUFDUkMsVUFBVSxFQUNWQyxJQUFJLEVBQ0w7SUFDQyxNQUFNQyxpQkFBaUI7UUFDckJDLE9BQU9DLFFBQVEsQ0FBQ0MsSUFBSSxHQUFHLG1CQUF5QyxPQUF0QkMsS0FBS0MsR0FBRyxDQUFDTixPQUFPLEdBQUc7SUFDL0Q7SUFFQSxNQUFNTyxhQUFhO1FBQ2pCTCxPQUFPQyxRQUFRLENBQUNDLElBQUksR0FBRyxtQkFBNEIsT0FBVEosT0FBTztJQUNuRDtJQUVBLHFCQUNFLDhEQUFDUTtRQUFJQyxXQUFVOzswQkFDYiw4REFBQ0M7Z0JBQUdELFdBQVU7MEJBQTBCOzs7Ozs7WUFDdkNYLFNBQVNhLE1BQU0sR0FBRyxrQkFDakIsOERBQUNIO2dCQUFJQyxXQUFVOzBCQUNaWCxTQUFTYyxHQUFHLENBQUMsQ0FBQ0Msd0JBQ2IsOERBQUNsQiw0RUFBV0E7d0JBQWtCa0IsU0FBU0E7dUJBQXJCQSxRQUFRQyxFQUFFOzs7Ozs7Ozs7MENBSWhDLDhEQUFDQzswQkFBRTs7Ozs7OzBCQUVMLDhEQUFDbkIsaUVBQVVBO2dCQUNUb0IsYUFBYWhCO2dCQUNiRCxZQUFZQTtnQkFDWmtCLFlBQVloQjtnQkFDWmlCLFFBQVFYOzs7Ozs7Ozs7Ozs7QUFJaEI7S0FqQ01WOztBQXNFTiwrREFBZUEsYUFBYUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvcGFnZXMvY29tbXVuaXR5L2luZGV4LnRzeD81NGI1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIC9wYWdlcy9jb21tdW5pdHkvaW5kZXgudHN4XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IEdldFNlcnZlclNpZGVQcm9wcyB9IGZyb20gJ25leHQnO1xuaW1wb3J0IHsgQXJ0aWNsZSwgQXJ0aWNsZUxpc3RSZXNwb25zZSB9IGZyb20gJ0AvdHlwZXMvYXJ0aWNsZSc7XG5pbXBvcnQgQXJ0aWNsZUNhcmQgZnJvbSAnQC9jb21wb25lbnRzL1VJL2NvbW11bml0eS9BcnRpY2xlQ2FyZCc7XG5pbXBvcnQgUGFnaW5hdGlvbiBmcm9tICdAL2NvbXBvbmVudHMvVUkvUGFnaW5hdGlvbic7XG5cbnR5cGUgQ29tbXVuaXR5UGFnZVByb3BzID0ge1xuICBhcnRpY2xlczogQXJ0aWNsZVtdO1xuICB0b3RhbENvdW50OiBudW1iZXI7XG4gIHBhZ2U6IG51bWJlcjtcbn07XG5cbmNvbnN0IENvbW11bml0eVBhZ2U6IFJlYWN0LkZDPENvbW11bml0eVBhZ2VQcm9wcz4gPSAoe1xuICBhcnRpY2xlcyxcbiAgdG90YWxDb3VudCxcbiAgcGFnZSxcbn0pID0+IHtcbiAgY29uc3QgaGFuZGxlUHJldmlvdXMgPSAoKSA9PiB7XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL2NvbW11bml0eT9wYWdlPSR7TWF0aC5tYXgocGFnZSAtIDEsIDEpfWA7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTmV4dCA9ICgpID0+IHtcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvY29tbXVuaXR5P3BhZ2U9JHtwYWdlICsgMX1gO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lciBteC1hdXRvIHB4LTQgcHktOCc+XG4gICAgICA8aDEgY2xhc3NOYW1lPSd0ZXh0LTN4bCBmb250LWJvbGQgbWItNic+7Luk666k64uI7YuwPC9oMT5cbiAgICAgIHthcnRpY2xlcy5sZW5ndGggPiAwID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNic+XG4gICAgICAgICAge2FydGljbGVzLm1hcCgoYXJ0aWNsZSkgPT4gKFxuICAgICAgICAgICAgPEFydGljbGVDYXJkIGtleT17YXJ0aWNsZS5pZH0gYXJ0aWNsZT17YXJ0aWNsZX0gLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICA8cD7qsozsi5zquIDsnbQg7JeG7Iq164uI64ukLjwvcD5cbiAgICAgICl9XG4gICAgICA8UGFnaW5hdGlvblxuICAgICAgICBjdXJyZW50UGFnZT17cGFnZX1cbiAgICAgICAgdG90YWxDb3VudD17dG90YWxDb3VudH1cbiAgICAgICAgb25QcmV2aW91cz17aGFuZGxlUHJldmlvdXN9XG4gICAgICAgIG9uTmV4dD17aGFuZGxlTmV4dH1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBnZXRTZXJ2ZXJTaWRlUHJvcHPrpbwg7IKs7Jqp7ZWY7JesIOyEnOuyhOyXkOyEnCDrjbDsnbTthLDrpbwg67Cb7JWE7Jik64qUIO2VqOyImFxuZXhwb3J0IGNvbnN0IGdldFNlcnZlclNpZGVQcm9wczogR2V0U2VydmVyU2lkZVByb3BzID0gYXN5bmMgKGNvbnRleHQpID0+IHtcbiAgY29uc3QgcGFnZSA9IHBhcnNlSW50KGNvbnRleHQucXVlcnkucGFnZSBhcyBzdHJpbmcpIHx8IDE7IC8vIOy/vOumrCDtjIzrnbzrr7jthLDrpbwg66y47J6Q7Je066GcIOuzgO2ZmFxuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBheGlvcy5nZXQ8QXJ0aWNsZUxpc3RSZXNwb25zZT4oXG4gICAgICBgJHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19CQVNFX1VSTH0vYXJ0aWNsZXNgLCAvLyDsiqzrnpjsi5wg7LaU6rCAXG4gICAgICB7XG4gICAgICAgIHBhcmFtczoge1xuICAgICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgICAgcGFnZVNpemU6IDEwLFxuICAgICAgICAgIG9yZGVyQnk6ICdyZWNlbnQnLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcHJvcHM6IHtcbiAgICAgICAgYXJ0aWNsZXM6IHJlc3BvbnNlLmRhdGEubGlzdCxcbiAgICAgICAgdG90YWxDb3VudDogcmVzcG9uc2UuZGF0YS50b3RhbENvdW50LFxuICAgICAgICBwYWdlLFxuICAgICAgfSxcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ+qyjOyLnOq4gOydhCDrtojrn6zsmKTripQg7KSRIOyYpOulmOqwgCDrsJzsg53tlojsirXri4jri6Q6JywgZXJyb3IpO1xuICAgIHJldHVybiB7XG4gICAgICBwcm9wczoge1xuICAgICAgICBhcnRpY2xlczogW10sXG4gICAgICAgIHRvdGFsQ291bnQ6IDAsXG4gICAgICAgIHBhZ2UsXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW11bml0eVBhZ2U7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJBcnRpY2xlQ2FyZCIsIlBhZ2luYXRpb24iLCJDb21tdW5pdHlQYWdlIiwiYXJ0aWNsZXMiLCJ0b3RhbENvdW50IiwicGFnZSIsImhhbmRsZVByZXZpb3VzIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiTWF0aCIsIm1heCIsImhhbmRsZU5leHQiLCJkaXYiLCJjbGFzc05hbWUiLCJoMSIsImxlbmd0aCIsIm1hcCIsImFydGljbGUiLCJpZCIsInAiLCJjdXJyZW50UGFnZSIsIm9uUHJldmlvdXMiLCJvbk5leHQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/community/index.tsx\n"));

/***/ })

});