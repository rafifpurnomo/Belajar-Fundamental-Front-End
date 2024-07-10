import data from './data.js';

document.addEventListener("DOMContentLoaded", () => {
  
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
      this.shadowRoot.querySelector("custom-dateTime").textContent = new Date(
        this.getAttribute("created-at")
      ).toLocaleDateString();
    }
  }
  customElements.define("daftar-catatan", CatatanItem);

  customElements.define('custom-judul', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
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
  });
  
  customElements.define('custom-isi', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
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
  });
  
  customElements.define('custom-datetime', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          .date-time {
            font-size: 14px; 
          }
        </style>
        <p class="date-time"><slot></slot></p>
      `;
    }
  });

  const daftarCatatanContainer = document.getElementById(
    "daftarCatatan-container"
  );

  const displayNotes = () => {
    daftarCatatanContainer.innerHTML = "";
    data.forEach((note) => {
      const noteElement = document.createElement("daftar-catatan");
      noteElement.setAttribute("judul", note.title);
      noteElement.setAttribute("konten", note.body);
      noteElement.setAttribute("created-at", note.createdAt);
      daftarCatatanContainer.appendChild(noteElement);
    });
  };

  displayNotes();

  const formTambahCatatan = document.getElementById("formTambahCatatan");

  formTambahCatatan.addEventListener("submit", function (event) {
    event.preventDefault();

    const judul = document.getElementById("input-judul").value;
    const catatan = document.getElementById("catatan-input").value;

    if (!judul || !catatan) {
      Swal.fire({
        title: "Gagal menambahkan catatan!",
        text: "Judul atau Isi Catatan Tidak Boleh Kosong",
        icon: "error",
        confirmButtonText: "Lanjutkan",
      });
    } else {
      const newNote = {
        id: `notes-${Date.now()}`,
        title: judul,
        body: catatan,
        createdAt: new Date().toISOString(),
        archived: false,
      };
      data.push(newNote);
      displayNotes();
      Swal.fire({
        title: "Berhasil!",
        text: "Catatan Baru ditambahkan",
        icon: "success",
        confirmButtonText: "Lanjutkan",
      });
    }

    formTambahCatatan.reset();
  });
});
