/* Certifica-se que a página esteja carregada antes de carregar os scripts. */
document.addEventListener("DOMContentLoaded", function () {
  const senhaInput = document.getElementById("senhalogin");
  const formCadastro = document.getElementById("formCadastro");

  function validarSenha(senha) {
    if (senha.length <= 8) {
      alert("Você precisa de pelo menos 8 caracteres para a senha.");
      return false;
    }

    const contemNumero = /[0-9]/.test(senha);
    if (!contemNumero) {
      alert("Você precisa de pelo menos 1 número.");
      return false;
    }

    const contemLetra = /[a-zA-Z]/.test(senha);
    if (!contemLetra) {
      alert("Você precisa de pelo menos 1 letra.");
      return false;
    }

    const contemSimbolo = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
    if (!contemSimbolo) {
      alert("Você precisa de pelo menos 1 caractere especial.");
      return false;
    }

    return true;
  }

  function validarCamposVazios() {
    const inputs = formCadastro.querySelectorAll(
      "input[required], select[required]"
    );
    for (const input of inputs) {
      if (!input.value.trim()) {
        alert(
          `O campo "${input.previousElementSibling.textContent}" não pode estar vazio.`
        );
        return false;
      }
    }
    return true;
  }

  function aplicarMascaraCPF(cpf) {
    cpf.value = cpf.value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }

  function aplicarMascaraTelefone(telefone) {
    telefone.value = telefone.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  }

  function aplicarMascaraCEP(cep) {
    cep.value = cep.value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
  }

  formCadastro.addEventListener("submit", function (event) {
    const senhaUsuario = senhaInput.value;

    if (!validarCamposVazios() || !validarSenha(senhaUsuario)) {
      event.preventDefault();
    }
  });

  document.getElementById("cpf").addEventListener("input", function () {
    aplicarMascaraCPF(this);
  });

  document.getElementById("telefone").addEventListener("input", function () {
    aplicarMascaraTelefone(this);
  });

  document.getElementById("cep").addEventListener("input", function () {
    aplicarMascaraCEP(this);
  });
});
