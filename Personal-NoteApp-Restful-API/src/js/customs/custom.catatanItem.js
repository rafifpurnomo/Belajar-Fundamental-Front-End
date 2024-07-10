class CatatanItem extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      const template = document.getElementById("catatan-item-template");
      const content = template.content.cloneNode(true);
      shadowRoot.appendChild(content);
    }

    connectedCallback() {
      this.shadowRoot.querySelector("custom-judul").textContent =
        this.getAttribute("judul");
      this.shadowRoot.querySelector("custom-isi").textContent =
        this.getAttribute("konten");
      this.shadowRoot.querySelector("custom-datetime").textContent = new Date(
        this.getAttribute("created-at")
      ).toLocaleDateString();
    }
  }
  customElements.define("daftar-catatan", CatatanItem);