let script = document.createElement('script'); //Import JQuery (Ajax)
script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
script.type = 'text/javascript';

document.head.appendChild(script);

class Scalbi { //Main class
  constructor(serverURL) {
    this.serverURL = serverURL;
    this.iframe = null;
    this.targets = {};
    // hashchange event (better perfomance)
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
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
        // Server response action
      },
      error: function (error) {
        console.error('Erro na solicitação Ajax:', error);
      },
    });
  }

  handleHashChange() {
    const hash = window.location.hash.substring(1); // Remove "#" from hash
    const targetURL = this.targets[hash];
    if (this.iframe && targetURL && this.iframe.src !== targetURL) {
      history.replaceState(null, null, '#' + hash);
      this.iframe.src = targetURL;
    }
  }
}
