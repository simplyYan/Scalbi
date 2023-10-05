class Scalbi {
  constructor(serverURL) {
    this.serverURL = serverURL;
    this.iframe = null;
    this.targets = {};
    this.pollHash();
  }

  create(id) {
    if (!this.iframe) {
      this.iframe = document.createElement('iframe');
      this.iframe.id = id;
      this.iframe.style.width = '100%';
      this.iframe.style.height = '100%';
      this.iframe.style.border = 'none';
      document.body.appendChild(this.iframe);
    }
  }

  set(targets) {
    this.targets = targets;
  }

  send(method, data) {
    if (!this.serverURL) {
      console.error('URL do servidor não definido. Não é possível enviar solicitações Ajax.');
      return;
    }

    $.ajax({
      type: method,
      url: this.serverURL,
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (response) {
        console.log('Resposta do servidor:', response);
        // Faça o que quiser com a resposta do servidor aqui.
      },
      error: function (error) {
        console.error('Erro na solicitação Ajax:', error);
      },
    });
  }

  pollHash() {
    const self = this;
    setInterval(function () {
      const hash = window.location.hash.substring(1); // Remove o "#" do hash
      const targetURL = self.targets[hash];
      if (self.iframe && targetURL) {
        self.iframe.src = targetURL;
      }
    }, 1400); // Verifica a cada 1,4 segundos
  }
}
