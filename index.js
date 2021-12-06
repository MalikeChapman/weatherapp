/* eslint-disable*/
import { apiSearch } from "./modules/search.js";
const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', apiSearch.valid, false);