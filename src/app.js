// this will be the index - we're calling it app to match the config
import { setDom } from './modules/dom';
import "./style.css";

const header = document.createElement('header');
header.setAttribute('id', 'header');

const main = document.createElement('main');
main.setAttribute('id', 'main');

const footer = document.createElement('footer');
footer.setAttribute('id', 'footer');

let mainDom = setDom();
main.appendChild(mainDom.tempDisplay.weatherGroup);

document.body.append(header, main, footer);