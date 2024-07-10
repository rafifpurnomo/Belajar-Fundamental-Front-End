class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          .loading-container {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            background-color: rgba(255, 255, 255, 0.3);
            justify-content: center;
            align-items: center;
            gap: 10px;
          }
              
          
          .loader {
            width: 45px;
            aspect-ratio: 1;
            --c: no-repeat linear-gradient(#FFD369 0 0);
            background: 
              var(--c) 0%   50%,
              var(--c) 50%  50%,
              var(--c) 100% 50%;
            background-size: 20% 100%;
            animation: l1 1s infinite linear;
          }
          @keyframes l1 {
            0%  {background-size: 20% 100%,20% 100%,20% 100%}
            33% {background-size: 20% 10% ,20% 100%,20% 100%}
            50% {background-size: 20% 100%,20% 10% ,20% 100%}
            66% {background-size: 20% 100%,20% 100%,20% 10% }
            100%{background-size: 20% 100%,20% 100%,20% 100%}
          }
        </style>
        <div class="loading-container">
          <div class="loader"></div>
          <h1>Loading...</h1>
        </div>
      `;
  }

  show() {
    const loadingContainer =
      this.shadowRoot.querySelector(".loading-container");
    loadingContainer.style.display = "flex";
  }

  hide() {
    const loadingContainer =
      this.shadowRoot.querySelector(".loading-container");
    loadingContainer.style.display = "none";
  }
}

customElements.define("loading-indicator", LoadingIndicator);