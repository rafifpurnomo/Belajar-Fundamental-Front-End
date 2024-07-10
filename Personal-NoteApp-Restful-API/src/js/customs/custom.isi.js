customElements.define(
  "custom-isi",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          .p {
            font-size: 16px;
            margin-bottom: 10px;
          }
        </style>
        <p class="isi-catatan"><slot></slot></p>
      `;
    }
  }
);
