//npm start - запускает режим разработки с дев-сервером.
// npm run build - запускает режим сборки в прод, создастся папка build.
// npm run deploy - запускает сборку в прод, после чего деплоит проект на GitHub Pages в репозиторий из свойства homepage в package.json.
// Автоматически создает ветку gh-pages в репозитории. Значение homepage необходимо подменить вручную на свой репозиторий.

let debounce = require('lodash.debounce');

console.log(debounce);

//-----------------------------------
refs = {
  input: document.querySelector('#inpt'),
  contryBlockWrapper: document.querySelector('#contryBlock'),
};

const getInputText = () => {
  return refs.input.value;
};

refs.input.addEventListener('focus', () =>
  refs.contryBlockWrapper.classList.add('hidden'),
);
refs.input.addEventListener('blur', () =>
  refs.contryBlockWrapper.classList.remove('hidden'),
);
