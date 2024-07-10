customElements.define(
  "custom-judul",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          .h1 {
            font-size: 30px;
            margin-bottom: 5px;
            margin-top: 20px;
          }
        </style>
        <h1 class="h1"><slot></slot></h1>
      `;
    }
  }
);
