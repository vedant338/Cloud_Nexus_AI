const state = {
  folderId: null,
  crumbs: [{ id: null, name: "My Drive" }],
  selected: new Set(),
  mode: "explain",
  view: "grid",
  query: "",
};

const els = {
  tree: document.getElementById("folder-tree"),
  grid: document.getElementById("dropzone"),
  empty: document.getElementById("empty"),
  crumbs: document.getElementById("breadcrumbs"),
  search: document.getElementById("search"),
  fileInput: document.getElementById("file-input"),
  chat: document.getElementById("chat"),
  chatForm: document.getElementById("chat-form"),
  chatInput: document.getElementById("chat-input"),
  scope: document.getElementById("ai-scope"),
  previewWrap: document.getElementById("preview-wrap"),
  previewFrame: document.getElementById("preview-frame"),
  previewName: document.getElementById("preview-name"),
};

function api(path, options = {}) {
  return fetch(path, options).then(async (res) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || res.statusText);
    }
    if (res.status === 204) return null;
    return res.json();
  });
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function iconFor(item) {
  if (item.type === "folder") return { cls: "folder", label: "DIR" };
  const n = item.name.toLowerCase();
  if (n.endsWith(".pdf") || item.mime?.includes("pdf")) return { cls: "pdf", label: "PDF" };
  if (n.endsWith(".ppt") || n.endsWith(".pptx")) return { cls: "ppt", label: "PPT" };
  if (n.endsWith(".doc") || n.endsWith(".docx")) return { cls: "doc", label: "DOC" };
  return { cls: "note", label: "NOTE" };
}

function renderTree(nodes, parent) {
  parent.innerHTML = "";
  for (const node of nodes) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = node.name;
    if (node.id === state.folderId) btn.classList.add("active");
    btn.addEventListener("click", () => openFolder(node.id, node.name, true));
    li.appendChild(btn);
    if (node.children?.length) {
      const ul = document.createElement("ul");
      renderTree(node.children, ul);
      li.appendChild(ul);
    }
    parent.appendChild(li);
  }
}

function renderCrumbs() {
  els.crumbs.innerHTML = "";
  state.crumbs.forEach((c, i) => {
    if (i) {
      const sep = document.createElement("span");
      sep.textContent = "›";
      sep.style.color = "#5f6368";
      els.crumbs.appendChild(sep);
    }
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = c.name;
    btn.addEventListener("click", () => {
      state.crumbs = state.crumbs.slice(0, i + 1);
      openFolder(c.id, c.name, false);
    });
    els.crumbs.appendChild(btn);
  });
}

function updateScope() {
  const selectedFiles = [...state.selected].filter((id) =>
    document.querySelector(`.card[data-id="${id}"][data-type="file"]`)
  );
  if (selectedFiles.length) {
    els.scope.textContent = `Scope: ${selectedFiles.length} selected file(s)`;
  } else {
    const name = state.crumbs.at(-1)?.name || "My Drive";
    els.scope.textContent = `Scope: ${name}`;
  }
}

function renderItems(folders, files) {
  const q = state.query.toLowerCase();
  const items = [...folders, ...files].filter((item) =>
    item.name.toLowerCase().includes(q)
  );
  els.grid.classList.toggle("list", state.view === "list");
  [...els.grid.querySelectorAll(".card")].forEach((n) => n.remove());
  els.empty.classList.toggle("hidden", items.length > 0);

  for (const item of items) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = item.id;
    card.dataset.type = item.type;
    if (state.selected.has(item.id)) card.classList.add("selected");
    const ic = iconFor(item);
    const date = new Date(item.created_at).toLocaleDateString();
    const meta =
      item.type === "folder" ? date : `${formatSize(item.size_bytes)} · ${date}`;
    card.innerHTML = `
      <span class="icon ${ic.cls}">${ic.label}</span>
      <span class="name"></span>
      <span class="meta">${meta}</span>
    `;
    card.querySelector(".name").textContent = item.name;
    card.addEventListener("click", (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (state.selected.has(item.id)) state.selected.delete(item.id);
        else state.selected.add(item.id);
        card.classList.toggle("selected");
        updateScope();
        return;
      }
      state.selected.clear();
      if (item.type === "folder") {
        openFolder(item.id, item.name, true);
      } else {
        state.selected.add(item.id);
        openPreview(item);
        refreshGridSelection();
        updateScope();
      }
    });
    card.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      const action = prompt("Type rename or delete", "rename");
      if (action === "delete") {
        const path =
          item.type === "folder"
            ? `/api/folders/${item.id}`
            : `/api/files/${item.id}`;
        api(path, { method: "DELETE" }).then(reloadAll);
      } else if (action === "rename") {
        const name = prompt("New name", item.name);
        if (!name) return;
        const path =
          item.type === "folder"
            ? `/api/folders/${item.id}`
            : `/api/files/${item.id}`;
        api(path, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }).then(reloadAll);
      }
    });
    els.grid.appendChild(card);
  }
}

function refreshGridSelection() {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.toggle("selected", state.selected.has(card.dataset.id));
  });
}

function openPreview(item) {
  els.previewWrap.classList.remove("hidden");
  els.previewName.textContent = item.name;
  els.previewFrame.src = item.preview_url;
}

async function openFolder(id, name, pushCrumb) {
  state.folderId = id;
  state.selected.clear();
  if (pushCrumb) {
    if (!state.crumbs.some((c) => c.id === id && id)) {
      state.crumbs.push({ id, name });
    }
  }
  document.querySelector("[data-root]").classList.toggle("active", id == null);
  await reloadAll();
}

async function reloadAll() {
  const parent = state.folderId ? `?parent_id=${state.folderId}` : "";
  const [folders, files, tree] = await Promise.all([
    api(`/api/folders${parent}`),
    api(`/api/files${parent}`),
    api("/api/folders/tree"),
  ]);
  renderTree(tree, els.tree);
  renderCrumbs();
  renderItems(folders, files);
  updateScope();
}

async function uploadFiles(fileList) {
  for (const file of fileList) {
    const body = new FormData();
    body.append("upload", file);
    if (state.folderId) body.append("folder_id", state.folderId);
    await api("/api/files", { method: "POST", body });
  }
  await reloadAll();
}

function addBubble(role, text) {
  const div = document.createElement("div");
  div.className = `bubble ${role}`;
  div.textContent = text;
  els.chat.appendChild(div);
  els.chat.scrollTop = els.chat.scrollHeight;
}

document.querySelector("[data-root]").addEventListener("click", () => {
  state.crumbs = [{ id: null, name: "My Drive" }];
  openFolder(null, "My Drive", false);
});

document.getElementById("new-folder").addEventListener("click", async () => {
  const name = prompt("Folder name");
  if (!name) return;
  await api("/api/folders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, parent_id: state.folderId }),
  });
  await reloadAll();
});

els.fileInput.addEventListener("change", (e) => {
  uploadFiles(e.target.files);
  e.target.value = "";
});

els.search.addEventListener("input", () => {
  state.query = els.search.value;
  reloadAll();
});

document.getElementById("view-toggle").addEventListener("click", (e) => {
  state.view = state.view === "grid" ? "list" : "grid";
  e.target.textContent = state.view === "grid" ? "List" : "Grid";
  reloadAll();
});

document.getElementById("preview-close").addEventListener("click", () => {
  els.previewWrap.classList.add("hidden");
  els.previewFrame.src = "";
});

els.grid.addEventListener("dragover", (e) => {
  e.preventDefault();
  els.grid.classList.add("drag");
});
els.grid.addEventListener("dragleave", () => els.grid.classList.remove("drag"));
els.grid.addEventListener("drop", (e) => {
  e.preventDefault();
  els.grid.classList.remove("drag");
  if (e.dataTransfer.files.length) uploadFiles(e.dataTransfer.files);
});

document.querySelectorAll("[data-mode]").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.mode = btn.dataset.mode;
    document.querySelectorAll("[data-mode]").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

els.chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = els.chatInput.value.trim();
  if (!message) return;
  addBubble("user", message);
  addThinkingBubble();

  els.chatInput.value = "";
  const fileIds = [...state.selected].filter((id) =>
    document.querySelector(`.card[data-id="${id}"][data-type="file"]`)
  );
  try {
    const res = await api("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        mode: state.mode,
        folder_id: state.folderId,
        file_ids: fileIds,
      }),
    });
    removeThinkingBubble();
    addBubble("assistant", res.answer);
  } catch (err) {
    removeThinkingBubble();
    console.error("chat error:",err);
    addBubble("assistant", err.message);
  }
});

api("/api/chat/history").then((rows) => {
  rows.forEach((r) => addBubble(r.role, r.content));
});

reloadAll().catch((err) => {
  els.empty.classList.remove("hidden");
  els.empty.textContent = `Could not load Drive: ${err.message}`;
});

function addThinkingBubble() {

  const chat = document.querySelector("#chat");

  const bubble = document.createElement("div");

  bubble.id = "ai-thinking";
  bubble.className = "bubble assistant thinking-bubble";

  bubble.innerHTML = `
    <div class="thinking-content">
      <span>CloudNexus AI is thinking</span>
      <div class="thinking-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;

  chat.appendChild(bubble);

  chat.scrollTop = chat.scrollHeight;
}


function removeThinkingBubble() {

  const bubble = document.querySelector("#ai-thinking");

  if (bubble) {
    bubble.remove();
  }
}