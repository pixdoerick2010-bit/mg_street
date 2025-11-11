const express = require("express");
const cors = require("cors"); // permite conexão do frontend
const path = require("path");
const app = express();
const port = 3000;

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor rodando com sucesso 🚀");
});

// rota de cadastro de usuário
app.post("/api/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "Preencha todos os campos!" });
  }
\
  // Simulação: salvar em memória (depois colocamos no banco)
  const novoUsuario = { nome, email, senha };
  console.log("Novo cadastro:", novoUsuario);

  res.json({ mensagem: "Usuário cadastrado com sucesso!", usuario: novoUsuario });
});

// servir arquivos do frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// rotas da API
app.get("/api/teste", (req, res) => {
  res.json({ mensagem: "Backend está funcionando 🚀" });
});

// fallback para SPA (opcional)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// rota de teste
app.get("/api/teste", (req, res) => {
  res.json({ mensagem: "Backend está funcionando 🚀" });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
