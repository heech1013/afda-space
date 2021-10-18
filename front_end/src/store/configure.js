import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import penderMiddleware from "redux-pender";
import * as modules from "./modules";

const reducers = combineReducers(modules); // 서브 리듀서 통합
const middlewares = [penderMiddleware()];

const isDev = process.env.NODE_ENV === "development";
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // 리덕스 개발툴과 compose를 통한 미들웨어를 함께 사용
const composeEnhancers = devtools || compose; // 리덕스 개발자 도구가 설치되어 있지 않을 경우: 일반 compose 사용

const configure = (preloadedState) =>
  configureStore(
    reducers,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

export default configure;
