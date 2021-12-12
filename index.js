/* eslint-disable*/
import { apiSearch } from "./modules/search.js";
import { utilizeData } from "./modules/htmlupdate.js";
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', utilizeData.startUpdate, false);