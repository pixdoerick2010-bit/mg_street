// helper: rolagem suave com offset para header sticky
function smoothScrollToElement(el) {
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;
  const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
  const offset = 20; // espaço extra acima da seção
  const targetPosition = elementPosition - headerHeight - offset;
  window.scrollTo({ top: targetPosition < 0 ? 0 : targetPosition, behavior: 'smooth' });
}

// ===== Rolagem suave para todos os links de navegação =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");

    // caso href seja "#" ou vazio -> ir pro topo
    if (!href || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = href.substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      smoothScrollToElement(target);
    } else {
      // fallback: se id não existe, rola pro topo
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
});

// ===== Botões "Comprar" =====
document.querySelectorAll('.btn-buy').forEach(btn => {
  btn.addEventListener('click', () => {
    const nomeEl = btn.closest('.produto').querySelector('h3');
    const precoEl = btn.closest('.produto').querySelector('.preco');
    const nome = nomeEl ? nomeEl.innerText : 'Produto';
    const preco = precoEl ? precoEl.innerText : 'Preço não disponível';
    alert(`${nome} adicionado ao carrinho\nPreço: ${preco}\n(Checkout não integrado ainda)`);
  });
});

// ===== Botão "Ver Coleção" (caso exista) =====
const btnColecao = document.getElementById("btn-colecao");
if (btnColecao) {
  btnColecao.addEventListener("click", () => {
    const destino = document.getElementById("destaques");
    if (destino) smoothScrollToElement(destino);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== Modais Login & Cadastro =====
// selecionar elementos com segurança (testa se existem)
const loginIcon = document.querySelector(".fa-user");
const loginModal = document.getElementById("login-modal");
const signupModal = document.getElementById("signup-modal");

const closeLogin = document.querySelector(".close");
const closeSignup = document.querySelector(".close-signup");

const openSignupLink = document.getElementById("open-signup");
const openLoginLink = document.getElementById("open-login");

// Abre modal de login
if (loginIcon && loginModal) {
  loginIcon.addEventListener("click", () => {
    loginModal.style.display = "flex";
  });
}

// Fecha modal de login
if (closeLogin && loginModal) {
  closeLogin.addEventListener("click", () => {
    loginModal.style.display = "none";
  });
}

// Abre modal de cadastro (a partir do link dentro do modal de login)
if (openSignupLink && loginModal && signupModal) {
  openSignupLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.style.display = "none";
    signupModal.style.display = "flex";
  });
}

// Fecha modal de cadastro
if (closeSignup && signupModal) {
  closeSignup.addEventListener("click", () => {
    signupModal.style.display = "none";
  });
}

// Voltar para login a partir do modal de signup
if (openLoginLink && signupModal && loginModal) {
  openLoginLink.addEventListener("click", (e) => {
    e.preventDefault();
    signupModal.style.display = "none";
    loginModal.style.display = "flex";
  });
}

// Fecha modais ao clicar fora
window.addEventListener("click", (e) => {
  if (loginModal && e.target === loginModal) loginModal.style.display = "none";
  if (signupModal && e.target === signupModal) signupModal.style.display = "none";
});

// exemplo: chamar a rota de teste
fetch("http://localhost:3000/api/teste")
  .then(res => res.json())
  .then(data => {
    console.log("Resposta do backend:", data);
    document.getElementById("status-backend").innerText = data.mensagem;
  })
  .catch(err => console.error("Erro ao conectar:", err));
