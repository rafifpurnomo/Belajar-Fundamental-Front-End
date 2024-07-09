import "../styles/style.css";
import {
  createNewNote,
  getNotesNotArchive,
  archiveNote,
  getArchiveNote,
} from "./api.js";
import "./customs/custom-datetime.js";
import "./customs/custom-isi.js";
import "./customs/custom-judul.js";

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
      this.shadowRoot.querySelector("custom-datetime").textContent = new Date(
        this.getAttribute("created-at")
      ).toLocaleDateString();
    }
  }
  customElements.define("daftar-catatan", CatatanItem);

  class CatatanArsip extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      const template = document.getElementById("catatan-arsip-template");
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
  customElements.define("daftar-arsip", CatatanArsip);

  // TAMPILKAN CATATAN (BUKAN YANG DI ARSIP)
  const daftarCatatanContainer = document.getElementById(
    "daftarCatatan-container"
  );

  async function displayNotes() {
    try {
      const notes = await getNotesNotArchive();
  
      daftarCatatanContainer.innerHTML = "";
  
      notes.forEach((note) => {
        const noteElement = document.createElement("daftar-catatan");
        noteElement.setAttribute("judul", note.title);
        noteElement.setAttribute("konten", note.body);
        noteElement.setAttribute("created-at", note.createdAt);
  
        const arsipButton = noteElement.shadowRoot.querySelector(".arsip-button");
        arsipButton.addEventListener("click", async () => {
          try {
            const response = await archiveNote(note.id);
            if (response) {
              Swal.fire({
                title: "Berhasil!",
                text: "Catatan diarsipkan",
                icon: "success",
                confirmButtonText: "Lanjutkan",
              });
              noteElement.remove(); 
            } else {
              Swal.fire({
                title: "Gagal!",
                text: "Terjadi kesalahan",
                icon: "success",
                confirmButtonText: "Lanjutkan",
              });
            }
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: "Terdapat Kesalahan",
              icon: "success",
              confirmButtonText: "Lanjutkan",
            });
            console.error("Failed to archive note:", error);
          }
        });
  
        daftarCatatanContainer.appendChild(noteElement);
      });
    } catch (error) {
      console.error("Failed to display notes:", error);
    }
  }
  displayNotes();
  

  // MENAMPILKAN ARSIP CATATAN
  const daftarArsipContainer = document.getElementById(
    "ArsipCatatan-container"
  );

  async function displayArsipNotes() {
    try {
      const notes = await getArchiveNote();
      daftarArsipContainer.innerHTML = "";

      notes.forEach((note) => {
        const noteElement = document.createElement("daftar-arsip");
        noteElement.setAttribute("judul", note.title);
        noteElement.setAttribute("konten", note.body);
        noteElement.setAttribute("created-at", note.createdAt);
        daftarArsipContainer.appendChild(noteElement);
      });
    } catch (error) {
      console.error("Failed to display notes:", error);
    }
  }
  displayArsipNotes();

  // TAMBAH CATATAN
  const formTambahCatatan = document.getElementById("formTambahCatatan");
  const notesData = [];
  formTambahCatatan.addEventListener("submit", async function (event) {
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
      try {
        const newNote = await createNewNote(judul, catatan);
        notesData.push(newNote.data);
        displayNotes();
        Swal.fire({
          title: "Berhasil!",
          text: "Catatan Baru ditambahkan",
          icon: "success",
          confirmButtonText: "Lanjutkan",
        });
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          title: "Gagal menambahkan catatan!",
          text: "Terjadi kesalahan saat menambahkan catatan.",
          icon: "error",
          confirmButtonText: "Lanjutkan",
        });
      }
    }

    formTambahCatatan.reset();
  });
});
