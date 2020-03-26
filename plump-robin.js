"use strict";

const appContainerId = "#plump-robin";

const domContainer = document.querySelector(appContainerId);
const app = React.createElement(App);
ReactDOM.render(app, domContainer);
