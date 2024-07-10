import "../styles/style.css";
import {
  createNewNote,
  getNotesNotArchive,
  archiveNote,
  getArchiveNote,
  deleteNote,
  UnarchiveNote,
} from "./api.js";
import "./customs/custom.datetime.js";
import "./customs/custom.isi.js";
import "./customs/custom.judul.js";
import "./customs/custom.typewriterEffect.js";
import "./customs/custom.loading.js";
import "./customs/custom.ArsipCatatan.js";
import "./customs/custom.catatanItem.js";

document.addEventListener("DOMContentLoaded", () => {
  const daftarArsipContainer = document.getElementById("ArsipCatatan-container");
  const loadingIndicator = document.createElement("loading-indicator");
  document.body.appendChild(loadingIndicator);
  const daftarCatatanContainer = document.getElementById("daftarCatatan-container");

  // TAMPILKAN CATATAN (BUKAN YANG DI ARSIP)
  async function displayNotes() {
    try {
      const notes = await getNotesNotArchive();
      daftarCatatanContainer.innerHTML = "";

      notes.forEach((note) => {
        const noteElement = document.createElement("daftar-catatan");
        noteElement.setAttribute("judul", note.title);
        noteElement.setAttribute("konten", note.body);
        noteElement.setAttribute("created-at", note.createdAt);

        // BUTTON MENGARSIPKAN NOTE
        const arsipButton =
          noteElement.shadowRoot.getElementById("arsip-button");
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
                text: "catatan gagal diarsipkan",
                icon: "error",
                confirmButtonText: "Lanjutkan",
              });
            }
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: "Terdapat Kesalahan",
              icon: "error",
              confirmButtonText: "Lanjutkan",
            });
            console.error("Failed to archive note:", error);
          }
          displayArsipNotes();
        });

        // BUTTON MENGHAPUS NOTE YANG TIDAK DI ARSIP
        const deleteButton =
          noteElement.shadowRoot.getElementById("hapus-catatan");
        deleteButton.addEventListener("click", async () => {
          try {
            const response = await deleteNote(note.id);
            if (response) {
              Swal.fire({
                title: "Berhasil!",
                text: "Catatan dihapus",
                icon: "success",
                confirmButtonText: "Lanjutkan",
              });
              noteElement.remove();
            } else {
              Swal.fire({
                title: "Gagal!",
                text: "catatan gagal dihapus",
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
          displayNotes();
        });

        daftarCatatanContainer.appendChild(noteElement);
      });
    } catch (error) {
      console.error("Failed to display notes:", error);
    }
  }
  displayNotes();

  // MENAMPILKAN ARSIP CATATAN
  async function displayArsipNotes() {
    try {
      const notes = await getArchiveNote();
      daftarArsipContainer.innerHTML = "";

      notes.forEach((note) => {
        const noteElement = document.createElement("daftar-arsip");
        noteElement.setAttribute("judul", note.title);
        noteElement.setAttribute("konten", note.body);
        noteElement.setAttribute("created-at", note.createdAt);

        // UNARSIP NOTE
        const unarsipButton =
          noteElement.shadowRoot.getElementById("tampilkan-button");
        unarsipButton.addEventListener("click", async () => {
          try {
            const response = await UnarchiveNote(note.id);
            if (response) {
              Swal.fire({
                title: "Berhasil!",
                text: "Catatan ditampilkan",
                icon: "success",
                confirmButtonText: "Lanjutkan",
              });
              noteElement.remove();
            } else {
              Swal.fire({
                title: "Gagal!",
                text: "Catatan tidak bisa ditampilkan",
                icon: "error",
                confirmButtonText: "Lanjutkan",
              });
              noteElement.remove();
            }
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: "Terdapat Kesalahan",
              icon: "error",
              confirmButtonText: "Lanjutkan",
            });
          }

          displayNotes();
        });

        // BUTTON MENGHAPUS NOTE YANG DI ARSIP
        const deleteButton =
          noteElement.shadowRoot.getElementById("delete-button");
        deleteButton.addEventListener("click", async () => {
          try {
            const response = await deleteNote(note.id);
            if (response) {
              Swal.fire({
                title: "Berhasil!",
                text: "Catatan dihapus",
                icon: "success",
                confirmButtonText: "Lanjutkan",
              });
              noteElement.remove();
            } else {
              Swal.fire({
                title: "Gagal!",
                text: "catatan gagal dihapus",
                icon: "error",
                confirmButtonText: "Lanjutkan",
              });
            }
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: "Terdapat Kesalahan",
              icon: "error",
              confirmButtonText: "Lanjutkan",
            });
            console.error("Failed to archive note:", error);
          }
          displayArsipNotes();
        });

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
        // LOADING INDICATOR
        loadingIndicator.show();
        setTimeout(async () => {
          const newNote = await createNewNote(judul, catatan);
          notesData.push(newNote.data);
          displayNotes();
          Swal.fire({
            title: "Berhasil!",
            text: "Catatan Baru ditambahkan",
            icon: "success",
            confirmButtonText: "Lanjutkan",
          });
        }, 2000);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          title: "Gagal menambahkan catatan!",
          text: "Terjadi kesalahan saat menambahkan catatan.",
          icon: "error",
          confirmButtonText: "Lanjutkan",
        });
      } finally {
        setTimeout(() => {
          loadingIndicator.hide();
        }, 2000);
      }
    }

    formTambahCatatan.reset();
  });
});
