// 1. Seleciona todas as divs com a classe 'item'
const itens = document.querySelectorAll('.item');

itens.forEach(item => {
  const numeros = item.dataset.index
  const itemImg = item.querySelector('.item-img')

  itemImg.src = `assets/img_preview/i${numeros}.jpg`
})

itens.forEach(item => {
  // Pega o valor do atributo data-time ("tr" ou "ct")
  const time = item.getAttribute('data-time'); // ou item.dataset.time

  // Busca a div interna que precisa ter a classe alterada
  // Usamos um seletor que aceita qualquer uma das variações atuais dela
  const divInfos = item.querySelector('.item-infos');

  // Se a div existir e o elemento tiver o data-time definido...
  if (divInfos && time) {
    // Adiciona a classe correspondente (item-infos-tr ou item-infos-ct)
    divInfos.classList.add(`item-infos-${time}`);
  }

  // 2. Adiciona o evento de clique em cada uma delas
  item.addEventListener('click', (evento) => {
    
    // Captura o número do data-index (convertendo para número com Number())
    const numero = Number(evento.currentTarget.dataset.index);

    // CAPTURA AQUI: Pega o atributo data-comando do item clicado
    const comandoId = evento.currentTarget.dataset.comando;

    // Chama a sua função passando o número E o ID do comando
    mostrarItem(numero, comandoId);
  });
});

// Atualizada para receber o comandoId como segundo parâmetro
function mostrarItem(indice, comandoId) {
  abreFecha();
  const exibicaoImagens = document.querySelector('[data-exibicao-imagens]')
  const exibicao = document.querySelector('[data-exibicao]')

  const imgPixel = document.querySelector('[data-pixel]')
  const comandos = document.querySelector('[data-comandos]')
  const video = document.querySelector('[data-video]')

  const urlVideo =
  /*1-janelão*/['https://res.cloudinary.com/dmuatihuc/video/upload/v1779483755/v1_wquafm.mp4',
  /*2-ligação*/'https://res.cloudinary.com/dmuatihuc/video/upload/v1779483754/v2_pyxhjx.mp4',
  /*3-L*/'https://res.cloudinary.com/dmuatihuc/video/upload/v1779484373/v3_l2fdz8.mp4',
  /*4-CT*/'https://res.cloudinary.com/dmuatihuc/video/upload/v1779484743/ct_pfgifc.mp4',
 /*5-cabecinha*/'https://res.cloudinary.com/dmuatihuc/video/upload/v1779560995/cabecinha_c5xogd.mp4']

  imgPixel.src = `assets/img_pixel/p${indice}.png`
  video.src = urlVideo[indice - 1]
  video.autoplay = true;
  video.loop = true;
  video.muted = true;
  video.setAttribute('playsinline', '');

  imgPixel.classList.add('exibicaoPixel')
  comandos.classList.add('exibicaoComandos')
  video.classList.add('exibicaoVideo')

  exibicaoImagens.appendChild(imgPixel)
  exibicaoImagens.appendChild(comandos)
  exibicao.appendChild(video)

  // Agora o comandoId que veio lá do clique é repassado perfeitamente!
  sequenciaComandos(comandoId)
}

function sequenciaComandos(num) {
  const exibicaoComandos = document.querySelector('.exibicaoComandos')
  const m1 = '<img class="comandosMouse" src="assets/comandos/m1.png" alt="">'
  const m2 = '<img class="comandosMouse" src="assets/comandos/m2.png" alt="">'
  const m12 = '<img class="comandosMouse" src="assets/comandos/m12.png" alt="">'
  const mais = '<p style="font-size: 2.5em;">+</p>'
  const jt = '<img class="comandosMouse" src="assets/comandos/jt.png" alt="">'

  if (num == '1') {
    exibicaoComandos.innerHTML = `${m1}${mais}${jt}`
  } else if (num == '2') {
    exibicaoComandos.innerHTML = `${m1}${mais}${m2}${mais}${jt}`
  }
}

// 1. Seleciona o input de texto (ajuste o ID se o seu for diferente)
const inputPesquisa = document.getElementById('pesquisa-smoke');

// 2. Escuta o evento de digitação ('input')
inputPesquisa.addEventListener('input', () => {
  // Pega o termo digitado e transforma em letras minúsculas (para ignorar maiúsculas/minúsculas)
  const termoPesquisa = inputPesquisa.value.toLowerCase().trim();

  // 3. Varre todos os itens da lista
  itensSmoke.forEach(smoke => {
    // Busca o texto dentro das tags <p> do item (ex: "Janelão", "Ligação")
    const textoDoItem = smoke.textContent.toLowerCase();

    // Se o texto do item contiver o que foi digitado, ele aparece. Se não, some.
    if (textoDoItem.includes(termoPesquisa)) {
      smoke.classList.remove('oculto-pesquisa');
    } else {
      smoke.classList.add('oculto-pesquisa');
    }
  });
});
/*------------------------------------------------------------------ */

const tags = document.querySelectorAll('.item');

tags.forEach(tag => {
  tag.addEventListener('click', (e) => {
    // 1. Remove a classe de qualquer elemento que já a tenha
    document.querySelectorAll('.active').forEach(item => {
      item.classList.remove('active');
    });

    // 2. Adiciona a classe apenas ao item que foi clicado agora
    e.currentTarget.classList.add('active');
  });
});

/*<video autoplay loop muted playsinline src="0516.mp4" width="480"></video> */

// Selecionando os elementos
const checkTodos = document.getElementById('filtro-todos');
const checksLocal = document.querySelectorAll('.filtro-local');
const checksTime = document.querySelectorAll('.filtro-time');
const itensSmoke = document.querySelectorAll('.item');

function aplicarFiltros() {
  const locaisMarcados = Array.from(checksLocal).filter(c => c.checked).map(c => c.value);
  const timesMarcados = Array.from(checksTime).filter(c => c.checked).map(c => c.value);

  if (locaisMarcados.length === 0 && timesMarcados.length === 0 && checkTodos) {
    checkTodos.checked = true;
  }

  itensSmoke.forEach(smoke => {
    const localDaSmoke = smoke.dataset.local;
    const timeDaSmoke = smoke.dataset.time;

    const passaLocal = locaisMarcados.length === 0 || locaisMarcados.includes(localDaSmoke);
    const passaTime = timesMarcados.length === 0 || timesMarcados.includes(timeDaSmoke);

    if (checkTodos && checkTodos.checked) {
      smoke.classList.remove('oculto');
    } else if (passaLocal && passaTime) {
      smoke.classList.remove('oculto');
    } else {
      smoke.classList.add('oculto');
    }
  });
}

// O "if" impede o erro de 'properties of null' se o elemento não for achado
if (checkTodos) {
  checkTodos.addEventListener('change', () => {
    if (checkTodos.checked) {
      checksLocal.forEach(c => c.checked = false);
      checksTime.forEach(c => c.checked = false);
      aplicarFiltros();
    }
  });
}

const todosFiltros = [...checksLocal, ...checksTime];
todosFiltros.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    if (checkbox.checked && checkTodos) {
      checkTodos.checked = false;
    }
    aplicarFiltros();
  });
});


const btnAbrir = document.getElementById('btn-abrir-menu');
const btnFechar = document.getElementById('btn-fechar-menu');
const menu = document.getElementById('menu-lateral');
const overlay = document.getElementById('overlay-menu');

// Função para abrir o menu
function abrirMenu() {
  menu.classList.add('ativo');
  overlay.classList.add('ativo');
}

// Função para fechar o menu
function fecharMenu() {
  menu.classList.remove('ativo');
  overlay.classList.remove('ativo');
}

// Ouvintes de clique
btnAbrir.addEventListener('click', abrirMenu);
btnFechar.addEventListener('click', fecharMenu);
overlay.addEventListener('click', fecharMenu);




// 1. Seleciona os elementos da página
const botao = document.querySelector('#meu-botao');
const minhaDiv = document.querySelector('#lista-smokes');

// 2. Defina aqui os dois valores que você quer alternar (com a unidade!)

const tamanhoA = '50vh';
const tamanhoB = '0vh';



// 3. Garante que a div comece explicitamente com o tamanho A
minhaDiv.style.height = tamanhoA;

// 4. Escuta o clique do botão
function abreFecha() {
  // Se a altura atual for igual ao tamanho A, muda para o B
  if (minhaDiv.style.height === tamanhoA) {
    minhaDiv.style.height="0vh"
  } else {
    // Se não for (ou seja, se for o B), volta para o A
    minhaDiv.style.height="50vh"
  }
}

// 2. Passe APENAS O NOME da função para o escutador (sem os parênteses)
botao.addEventListener('click', abreFecha);
