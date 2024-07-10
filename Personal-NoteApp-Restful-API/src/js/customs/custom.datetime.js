
customElements.define(
  "custom-datetime",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          .date-time {
            font-size: 14px; 
          }
        </style>
        <p class="date-time"><slot></slot></p>
      `;
    }
  }
);
