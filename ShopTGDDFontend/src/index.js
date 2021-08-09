import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import Main from './layout/main.js'

ReactDOM.render(
<BrowserRouter><Main /></BrowserRouter>
	, document.getElementById('root'));
