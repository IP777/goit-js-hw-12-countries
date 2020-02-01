import lodash from 'lodash';
//---------------------------
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/PNotifyBrightTheme.css';
import 'pnotify/dist/es/PNotifyButtons';
//---------------------------
import divTamplate from '../template/county.hbs';
import listTamplate from '../template/countryList.hbs';

const refs = {
  input: document.querySelector('#input'),
  contryList: document.querySelector('#contryList'),
  contryBlock: document.querySelector('#contryBlock'),
};

const inputEdits = {
  getInputText() {
    return refs.input.value;
  },
  setInputText(someText) {
    refs.input.value = someText;
  },
  addListner() {
    refs.input.addEventListener(
      'input',
      _.debounce(() => {
        //Проверка на пустое поле
        if (this.getInputText()) {
          myHttpRequest.getRequest(this.getInputText());
        }
      }, 500),
    );
  },
  startScript() {
    inputEdits.setInputText('');
    this.addListner();
  },
};

inputEdits.startScript();

//---------------------------------------

const myHttpRequest = {
  baseUrl: 'https://restcountries.eu/rest/v2/name/',

  getRequest(condition) {
    fetch(this.baseUrl + condition, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => {
        //console.log(response);
        if (response.ok) {
          // если HTTP-статус в диапазоне 200-299
          return response.json();
        }
        // если HTTP-статус в диапазоне 400-499, 500-599 передаёт ошибку
      })
      .then(data => {
        //console.log(data);
        this.renderRequest(data);
      })
      .catch(error => {
        //console.log(`Oh no, erorr ${error}`);
        PNotify.error({
          title: 'Oh no, erorr',
          text: error,
        });
        this.hiddenAddRemove();
      });
  },
  renderRequest(data) {
    const dataLenght = [...data].length;
    //console.log(dataLenght);
    if (dataLenght == 1) {
      this.oneRequest(data);
    } else if (dataLenght > 1 && dataLenght <= 10) {
      this.manyRequest(data);
    } else {
      this.infineRequest(data, dataLenght);
    }
  },
  oneRequest(data) {
    this.hiddenAddRemove('one');
    const markup = divTamplate(data[0]);
    refs.contryBlock.innerHTML = markup;
  },
  manyRequest(data) {
    this.hiddenAddRemove('many');
    const markup = data.map(country => listTamplate(country)).join('');
    refs.contryList.innerHTML = markup;
  },
  infineRequest(data, dataLenght) {
    this.hiddenAddRemove('infine');
    PNotify.error({
      title: 'Too many request',
      text: `request more than ${dataLenght} inquiries.`,
    });
  },
  hiddenAddRemove(option) {
    if (option === 'one') {
      refs.contryList.classList.add('hidden');
      refs.contryBlock.classList.remove('hidden');
    } else if (option === 'many') {
      refs.contryList.classList.remove('hidden');
      refs.contryBlock.classList.add('hidden');
    } else {
      refs.contryList.classList.add('hidden');
      refs.contryBlock.classList.add('hidden');
    }
  },
};
