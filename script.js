// =========================================================
// Nexora Digital | script.js
// Etapa 5: menu mobile + ano do rodapé + formulário de contato
// =========================================================

// ---------------------------------------------------------
// 1. MENU MOBILE
// ---------------------------------------------------------

// Guardamos em variáveis os elementos que o código vai usar.
const botaoMenu = document.querySelector(".menu-toggle");
const menuPrincipal = document.querySelector("#menu-principal");

// matchMedia pergunta ao navegador se a tela tem pelo menos essa largura.
// É o mesmo valor do @media (min-width: 56em) do CSS.
const larguraDesktop = window.matchMedia("(min-width: 56em)");

// Funções pequenas, cada uma com uma tarefa só.
function menuEstaAberto() {
  return botaoMenu.getAttribute("aria-expanded") === "true";
}

function abrirMenu() {
  botaoMenu.setAttribute("aria-expanded", "true"); // avisa o leitor de tela
  menuPrincipal.classList.add("site-nav--aberto"); // o CSS mostra o painel
}

function fecharMenu() {
  botaoMenu.setAttribute("aria-expanded", "false");
  menuPrincipal.classList.remove("site-nav--aberto");
}

// Eventos: "quando acontecer X, execute esta função".

// Clique no botão: abre se estiver fechado, fecha se estiver aberto.
botaoMenu.addEventListener("click", function () {
  if (menuEstaAberto()) {
    fecharMenu();
  } else {
    abrirMenu();
  }
});

// Clique em qualquer link dentro do menu: fecha o menu.
menuPrincipal.addEventListener("click", function (evento) {
  if (evento.target.closest("a")) {
    fecharMenu();
  }
});

// Tecla Esc: fecha o menu e devolve o foco ao botão.
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape" && menuEstaAberto()) {
    fecharMenu();
    botaoMenu.focus();
  }
});

// Se a janela ficar larga (desktop), garante que o estado "aberto" seja limpo.
larguraDesktop.addEventListener("change", function (evento) {
  if (evento.matches) {
    fecharMenu();
  }
});

// ---------------------------------------------------------
// 2. ANO ATUAL NO RODAPÉ
// ---------------------------------------------------------
const anoAtual = document.querySelector("#ano-atual");

// Se o elemento existir, troca o texto pelo ano do relógio do computador.
if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}

// ---------------------------------------------------------
// 3. FORMULÁRIO DE CONTATO
// Tudo acontece no navegador: nada é enviado para lugar nenhum.
// ---------------------------------------------------------
const formulario = document.querySelector("#form-contato");
const statusFormulario = document.querySelector("#status-formulario");

// Como cada campo aparece nas mensagens ("Informe seu nome.")
const nomesDosCampos = {
  nome: "seu nome",
  email: "seu e-mail",
  assunto: "o assunto",
  mensagem: "sua mensagem",
};

// Quantidade mínima de caracteres de cada campo (o e-mail tem regra própria)
const minimos = {
  nome: 2,
  assunto: 3,
  mensagem: 10,
};

// Padrão simples de e-mail: algo + @ + algo + ponto + algo, sem espaços.
// [^\s@]+ significa "um ou mais caracteres que não sejam espaço nem @".
const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Devolve o texto do erro do campo, ou "" se o campo estiver válido.
function obterErro(campo) {
  // trim() tira os espaços do começo e do fim: "   " conta como vazio.
  const valor = campo.value.trim();

  if (valor === "") {
    return "Informe " + nomesDosCampos[campo.name] + ".";
  }

  if (campo.name === "email" && !padraoEmail.test(valor)) {
    return "Digite um e-mail válido, como nome@exemplo.com.";
  }

  const minimo = minimos[campo.name];
  if (minimo && valor.length < minimo) {
    return "Use pelo menos " + minimo + " caracteres.";
  }

  return "";
}

// Mostra a mensagem de erro logo abaixo do campo e marca o campo como inválido.
function mostrarErro(campo, texto) {
  const paragrafoErro = document.querySelector("#erro-" + campo.name);
  paragrafoErro.textContent = texto;
  campo.setAttribute("aria-invalid", "true");
}

// Tira a mensagem e a marca de erro do campo.
function limparErro(campo) {
  const paragrafoErro = document.querySelector("#erro-" + campo.name);
  paragrafoErro.textContent = "";
  campo.removeAttribute("aria-invalid");
}

// Valida um campo e mostra ou limpa o erro. Devolve true se estiver válido.
function validarCampo(campo) {
  const erro = obterErro(campo);

  if (erro !== "") {
    mostrarErro(campo, erro);
    return false;
  }

  limparErro(campo);
  return true;
}

// Aviso geral abaixo do botão. tipo: "erro" ou "sucesso".
function mostrarStatus(tipo, texto) {
  statusFormulario.textContent = texto;
  statusFormulario.className =
    "formulario__status formulario__status--" + tipo;
}

function limparStatus() {
  statusFormulario.textContent = "";
  statusFormulario.className = "formulario__status";
}

// Ao enviar: valida tudo.
formulario.addEventListener("submit", function (evento) {
  // Impede o comportamento padrão do formulário (recarregar a página).
  evento.preventDefault();

  const campos = formulario.querySelectorAll(".campo__controle");
  let primeiroInvalido = null;

  campos.forEach(function (campo) {
    const valido = validarCampo(campo);

    if (!valido && primeiroInvalido === null) {
      primeiroInvalido = campo;
    }
  });

  // Se algum campo falhou: avisa e leva o foco para o primeiro com erro.
  if (primeiroInvalido !== null) {
    mostrarStatus("erro", "Revise os campos destacados e tente novamente.");
    primeiroInvalido.focus();
    return;
  }

  // Tudo válido: limpa o formulário e avisa que os dados NÃO foram enviados.
  formulario.reset();
  mostrarStatus(
    "sucesso",
    "Dados validados com sucesso! Esta é uma demonstração: a mensagem não foi enviada nem armazenada em nenhum lugar."
  );
});

// Ao sair de um campo (focusout), valida esse campo.
// Só valida se ele já tem texto ou já estava com erro; assim, passar pelo
// campo com o Tab sem digitar nada não enche a tela de erros.
// Usamos focusout (e não blur) porque ele "borbulha" até o formulário.
formulario.addEventListener("focusout", function (evento) {
  const campo = evento.target;

  if (!campo.matches(".campo__controle")) {
    return;
  }

  if (campo.value.trim() !== "" || campo.hasAttribute("aria-invalid")) {
    validarCampo(campo);
  }
});

// Ao digitar: se o campo está com erro, valida na hora para o erro sumir
// assim que for corrigido. Também limpa o aviso geral anterior.
formulario.addEventListener("input", function (evento) {
  const campo = evento.target;

  if (!campo.matches(".campo__controle")) {
    return;
  }

  limparStatus();

  if (campo.hasAttribute("aria-invalid")) {
    validarCampo(campo);
  }
});
