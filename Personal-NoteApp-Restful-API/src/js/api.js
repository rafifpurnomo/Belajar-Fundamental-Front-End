const API = "https://notes-api.dicoding.dev/v2";

export async function createNewNote(title, body) {
  const response = await fetch(`${API}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  const result = await response.json();
  return result;
}

export async function getNotesNotArchive() {
  try {
    const response = await fetch(`${API}/notes`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}

export async function getArchiveNote() {
  try {
    const response = await fetch(`${API}/notes/archived`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
}

export async function archiveNote(noteId) {
  try {
    const response = await fetch(`${API}/notes/${noteId}/archive`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to archive note");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error archiving note:", error);
    throw error;
  }
}

export async function deleteNote(noteId) {
  try {
    const response = await fetch(`${API}/notes/${noteId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed delete note");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error Delete note:", error);
    throw error;
  }
}

export async function UnarchiveNote(noteId) {
  try {
    const response = await fetch(`${API}/notes/${noteId}/unarchive`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to unarchive note");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error archiving note:", error);
    throw error;
  }
}
