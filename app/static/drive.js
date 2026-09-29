const state = {
  folderId: null,
  crumbs: [{ id: null, name: "My Drive" }],
  selected: new Set(),
  mode: "explain",
  view: "grid",
  query: "",
};

const els = {
  deleteBtn: document.getElementById("deleteBtn"),
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


/* =========================================================
   API
   ========================================================= */

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


/* =========================================================
   UTILITIES
   ========================================================= */

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / 1048576).toFixed(1)} MB`;
}


function iconFor(item) {
  if (item.type === "folder") {
    return {
      cls: "folder",
      label: "DIR",
    };
  }

  const n = item.name.toLowerCase();

  if (
    n.endsWith(".pdf") ||
    item.mime?.includes("pdf")
  ) {
    return {
      cls: "pdf",
      label: "PDF",
    };
  }

  if (
    n.endsWith(".ppt") ||
    n.endsWith(".pptx")
  ) {
    return {
      cls: "ppt",
      label: "PPT",
    };
  }

  if (
    n.endsWith(".doc") ||
    n.endsWith(".docx")
  ) {
    return {
      cls: "doc",
      label: "DOC",
    };
  }

  return {
    cls: "note",
    label: "NOTE",
  };
}


function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


/* =========================================================
   DRIVE TREE
   ========================================================= */

function renderTree(nodes, parent) {
  parent.innerHTML = "";

  for (const node of nodes) {

    const li = document.createElement("li");

    const btn = document.createElement("button");

    btn.type = "button";

    btn.textContent = node.name;

    if (node.id === state.folderId) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      openFolder(
        node.id,
        node.name,
        true
      );
    });

    if (els.deleteBtn) {
    els.deleteBtn.addEventListener(
        "click",
        deleteSelectedFile
    );
}

    li.appendChild(btn);

    if (node.children?.length) {

      const ul = document.createElement("ul");

      renderTree(node.children, ul);

      li.appendChild(ul);
    }

    parent.appendChild(li);
  }
}


/* =========================================================
   BREADCRUMBS
   ========================================================= */

function renderCrumbs() {

  els.crumbs.innerHTML = "";

  state.crumbs.forEach((c, i) => {

    if (i) {

      const sep =
        document.createElement("span");

      sep.textContent = "›";

      sep.style.color = "#5f6368";

      els.crumbs.appendChild(sep);
    }

    const btn =
      document.createElement("button");

    btn.type = "button";

    btn.textContent = c.name;

    btn.addEventListener("click", () => {

      state.crumbs =
        state.crumbs.slice(0, i + 1);

      openFolder(
        c.id,
        c.name,
        false
      );
    });

    els.crumbs.appendChild(btn);
  });
}


/* =========================================================
   AI SCOPE
   ========================================================= */

function updateScope() {

  const selectedFiles =
    [...state.selected].filter((id) =>
      document.querySelector(
        `.card[data-id="${id}"][data-type="file"]`
      )
    );

  if (els.deleteBtn) {
    els.deleteBtn.disabled =
        state.selected.size !== 1;
}

  if (selectedFiles.length) {

    els.scope.textContent =
      `Scope: ${selectedFiles.length} selected file(s)`;

  } else {

    const name =
      state.crumbs.at(-1)?.name ||
      "My Drive";

    els.scope.textContent =
      `Scope: ${name}`;
  }
}


/* =========================================================
   DRIVE ITEMS
   ========================================================= */

function renderItems(folders, files) {

  const q =
    state.query.toLowerCase();

  const items =
    [...folders, ...files].filter((item) =>
      item.name.toLowerCase().includes(q)
    );

  els.grid.classList.toggle(
    "list",
    state.view === "list"
  );

  [
    ...els.grid.querySelectorAll(".card")
  ].forEach((n) => n.remove());

  els.empty.classList.toggle(
    "hidden",
    items.length > 0
  );


  for (const item of items) {

    const card =
      document.createElement("article");

    card.className = "card";

    card.dataset.id = item.id;

    card.dataset.type = item.type;


    if (state.selected.has(item.id)) {
      card.classList.add("selected");
    }


    const ic = iconFor(item);

    const date =
      new Date(item.created_at)
        .toLocaleDateString();


    const meta =
      item.type === "folder"
        ? date
        : `${formatSize(item.size_bytes)} · ${date}`;


    card.innerHTML = `
      <span class="icon ${ic.cls}">
        ${ic.label}
      </span>

      <span class="name"></span>

      <span class="meta">
        ${meta}
      </span>
    `;


    card.querySelector(".name")
      .textContent = item.name;


    /* -----------------------------------------
       CLICK
       ----------------------------------------- */

    card.addEventListener("click", (e) => {

      if (e.ctrlKey || e.metaKey) {

        if (state.selected.has(item.id)) {

          state.selected.delete(item.id);

        } else {

          state.selected.add(item.id);
        }

        card.classList.toggle(
          "selected"
        );

        updateScope();

        return;
      }


      state.selected.clear();


      if (item.type === "folder") {

        openFolder(
          item.id,
          item.name,
          true
        );

      } else {

        state.selected.add(item.id);

        openPreview(item);

        refreshGridSelection();

        updateScope();
      }
    });


    /* -----------------------------------------
       RIGHT CLICK
       ----------------------------------------- */

    card.addEventListener(
      "contextmenu",
      (e) => {

        e.preventDefault();

        const action =
          prompt(
            "Type rename or delete",
            "rename"
          );
          if (action === "delete") {

  const confirmed = confirm(
    `Delete "${item.name}"?\n\nThis will remove the file from CloudNexus and its AI/RAG index.`
  );

  if (!confirmed) return;

  const path =
    item.type === "folder"
      ? `/api/folders/${item.id}`
      : `/api/files/${item.id}`;

  api(path, {
    method: "DELETE",
  })
    .then(() => {
      state.selected.delete(item.id);
      closePreview();
      return reloadAll();
    })
    .catch((error) => {
      console.error(
        "Delete failed:",
        error
      );

      alert(
        `Could not delete "${item.name}".\n\n${error.message}`
      );
    });



        } else if (action === "rename") {

          const name =
            prompt(
              "New name",
              item.name
            );


          if (!name) return;


          const path =
            item.type === "folder"
              ? `/api/folders/${item.id}`
              : `/api/files/${item.id}`;


          api(path, {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
            }),

          }).then(reloadAll);
        }
      }
    );


    els.grid.appendChild(card);
  }
}

function openPreview(item) {

    console.log("OPEN PREVIEW:", item);

    if (!item || !item.id) {
        console.error("Invalid preview item:", item);
        return;
    }

    const fileId = item.id;
    const fileName = item.name || "";

    const extension =
        fileName
            .split(".")
            .pop()
            .toLowerCase();

    console.log("File:", fileName);
    console.log("ID:", fileId);
    console.log("Extension:", extension);

    if (extension === "pptx") {

    const viewerUrl =
        `/pptx-viewer?file_id=${encodeURIComponent(fileId)}`;

    console.log(
        "OPENING PPTX:",
        viewerUrl
    );

    els.previewWrap.classList.remove(
        "hidden"
    );

    els.previewFrame.src =
        viewerUrl;

    return;
}


    // ==========================================
    // MARKDOWN
    // ==========================================

    if (
        extension === "md" ||
        extension === "markdown"
    ) { 
      openMarkdownViewer(item);
        return;
    }

    // ==========================================
// TXT
// ==========================================
    if (extension === "txt") {

    const viewerUrl =
        `/txt-viewer?file_id=${encodeURIComponent(fileId)}`;

    console.log(
        "OPENING TXT:",
        viewerUrl
    );

    els.previewWrap.classList.remove(
        "hidden"
    );

    els.previewFrame.src =
        viewerUrl;

    return;
} 
   if (extension === "docx") {

    const viewerUrl =
        `/docx-viewer?file_id=${encodeURIComponent(fileId)}`;

    console.log("OPENING DOCX:", viewerUrl);

    els.previewWrap.classList.remove("hidden");

    els.previewFrame.src = viewerUrl;

    return;
} 


    // ==========================================
    // PDF
    // ==========================================

    if (extension === "pdf") {

        const pdfUrl =
            `/pdf-viewer?file=${encodeURIComponent(
                `/api/files/${fileId}/content`
            )}`;

        console.log(
            "OPENING PDF:",
            pdfUrl
        );

        els.previewFrame.src =
            pdfUrl;

        return;
    }


    // ==========================================
    // OTHER FILES
    // ==========================================

    if (item.preview_url) {

        console.log(
            "OPENING DEFAULT PREVIEW:",
            item.preview_url
        );

        els.previewFrame.src =
            item.preview_url;

        return;
    }


    console.warn(
        "No preview available:",
        fileName
    );
}

/* =========================================================
   SELECTION
   ========================================================= */

function refreshGridSelection() {

  document
    .querySelectorAll(".card")
    .forEach((card) => {

      card.classList.toggle(
        "selected",
        state.selected.has(
          card.dataset.id
        )
      );
    });
}

/* =========================================================
   PDF PREVIEW
   ========================================================= */
function closePreview() {

  els.previewWrap.classList.add(
    "hidden"
  );

  els.previewFrame.src = "";

}


document
  .getElementById("preview-close")
  ?.addEventListener(
    "click",
    closePreview
  );


/* =========================================================
   FOLDERS
   ========================================================= */

async function openFolder(
  id,
  name,
  pushCrumb
) {

  state.folderId = id;

  state.selected.clear();


  if (pushCrumb) {

    if (
      !state.crumbs.some(
        (c) =>
          c.id === id &&
          id
      )
    ) {

      state.crumbs.push({
        id,
        name,
      });
    }
  }


  document
    .querySelector("[data-root]")
    .classList.toggle(
      "active",
      id == null
    );


  closePreview();

  await reloadAll();
}


/* =========================================================
   RELOAD
   ========================================================= */

async function reloadAll() {

  const parent =
    state.folderId
      ? `?parent_id=${state.folderId}`
      : "";


  const [
    folders,
    files,
    tree,
  ] = await Promise.all([

    api(`/api/folders${parent}`),

    api(`/api/files${parent}`),

    api("/api/folders/tree"),
  ]);


  renderTree(
    tree,
    els.tree
  );

  renderCrumbs();

  renderItems(
    folders,
    files
  );

  updateScope();
}


/* =========================================================
   UPLOAD
   ========================================================= */

async function uploadFiles(
  fileList
) {

  for (const file of fileList) {

    const body =
      new FormData();

    body.append(
      "upload",
      file
    );


    if (state.folderId) {

      body.append(
        "folder_id",
        state.folderId
      );
    }


    await api(
      "/api/files",
      {
        method: "POST",
        body,
      }
    );
  }


  await reloadAll();
}


/* =========================================================
   CHAT
   ========================================================= */

function addBubble(
  role,
  text
) {

  const div =
    document.createElement("div");

  div.className =
    `bubble ${role}`;

  div.textContent = text;

  els.chat.appendChild(div);

  els.chat.scrollTop =
    els.chat.scrollHeight;
}


function addThinkingBubble() {

  const chat =
    document.querySelector("#chat");

  const bubble =
    document.createElement("div");

  bubble.id =
    "ai-thinking";

  bubble.className =
    "bubble assistant thinking-bubble";


  bubble.innerHTML = `
    <div class="thinking-content">

      <span>
        CloudNexus AI is thinking
      </span>

      <div class="thinking-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>
  `;


  chat.appendChild(bubble);

  chat.scrollTop =
    chat.scrollHeight;
}


function removeThinkingBubble() {

  const bubble =
    document.querySelector(
      "#ai-thinking"
    );

  if (bubble) {
    bubble.remove();
  }
}


/* =========================================================
   ROOT
   ========================================================= */

document
  .querySelector("[data-root]")
  .addEventListener(
    "click",
    () => {

      state.crumbs = [
        {
          id: null,
          name: "My Drive",
        },
      ];

      openFolder(
        null,
        "My Drive",
        false
      );
    }
  );


/* =========================================================
   NEW FOLDER
   ========================================================= */

document
  .getElementById("new-folder")
  .addEventListener(
    "click",
    async () => {

      const name =
        prompt("Folder name");

      if (!name) return;


      await api(
        "/api/folders",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            parent_id:
              state.folderId,
          }),
        }
      );


      await reloadAll();
    }
  );


/* =========================================================
   FILE INPUT
   ========================================================= */

els.fileInput.addEventListener(
  "change",
  (e) => {

    uploadFiles(
      e.target.files
    );

    e.target.value = "";
  }
);


/* =========================================================
   SEARCH
   ========================================================= */

els.search.addEventListener(
  "input",
  () => {

    state.query =
      els.search.value;

    reloadAll();
  }
);


/* =========================================================
   VIEW TOGGLE
   ========================================================= */

document
  .getElementById("view-toggle")
  .addEventListener(
    "click",
    (e) => {

      state.view =
        state.view === "grid"
          ? "list"
          : "grid";


      e.target.textContent =
        state.view === "grid"
          ? "List"
          : "Grid";


      reloadAll();
    }
  );


/* =========================================================
   DRAG / DROP
   ========================================================= */

els.grid.addEventListener(
  "dragover",
  (e) => {

    e.preventDefault();

    els.grid.classList.add(
      "drag"
    );
  }
);


els.grid.addEventListener(
  "dragleave",
  () => {

    els.grid.classList.remove(
      "drag"
    );
  }
);


els.grid.addEventListener(
  "drop",
  (e) => {

    e.preventDefault();

    els.grid.classList.remove(
      "drag"
    );


    if (
      e.dataTransfer.files.length
    ) {

      uploadFiles(
        e.dataTransfer.files
      );
    }
  }
);


/* =========================================================
   CHAT MODE
   ========================================================= */

document
  .querySelectorAll("[data-mode]")
  .forEach((btn) => {

    btn.addEventListener(
      "click",
      () => {

        state.mode =
          btn.dataset.mode;


        document
          .querySelectorAll(
            "[data-mode]"
          )
          .forEach((b) =>
            b.classList.remove(
              "active"
            )
          );


        btn.classList.add(
          "active"
        );
      }
    );
  });


/* =========================================================
   CHAT SUBMIT
   ========================================================= */

els.chatForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();


    const message =
      els.chatInput.value.trim();


    if (!message) return;


    addBubble(
      "user",
      message
    );

    addThinkingBubble();

    els.chatInput.value = "";


    const fileIds =
      [...state.selected].filter(
        (id) =>
          document.querySelector(
            `.card[data-id="${id}"][data-type="file"]`
          )
      );


    try {

      const res =
        await api(
          "/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              message,
              mode:
                state.mode,
              folder_id:
                state.folderId,
              file_ids:
                fileIds,
            }),
          }
        );


      removeThinkingBubble();

      addBubble(
        "assistant",
        res.answer
      );


    } catch (err) {

      removeThinkingBubble();

      console.error(
        "chat error:",
        err
      );

      addBubble(
        "assistant",
        err.message
      );
    }
  }
);


/* =========================================================
   CHAT HISTORY
   ========================================================= */

api("/api/chat/history")
  .then((rows) => {

    rows.forEach((r) =>
      addBubble(
        r.role,
        r.content
      )
    );
  });


/* =========================================================
   GLOBAL AI ACTION SYSTEM
   ========================================================= */

const ACTION_STORAGE_KEY =
  "cloudnexus_ai_actions";


const DEFAULT_AI_ACTIONS = [

  {
    id: "highlight",

    name: "Highlight",

    icon: "🟡",

    type: "local",

    prompt: "",

    enabled: true,

    position: 0,

    builtin: true,
  },


  {
    id: "short_notes",

    name: "Add to Short Notes",

    icon: "📝",

    type: "llm",

    prompt:
      "Convert the selected text into a concise study note. Keep important facts, definitions, formulas and technical terms.",

    enabled: true,

    position: 1,

    builtin: true,
  },


  {
    id: "explain",

    name: "Explain",

    icon: "🤖",

    type: "llm",

    prompt:
      "Explain the selected text in simple language. Include an example if useful.",

    enabled: true,

    position: 2,

    builtin: true,
  },


  {
    id: "important",

    name: "Important for Nexus",

    icon: "⭐",

    type: "important",

    prompt:
      "Mark this information as important context for future Nexus AI answers.",

    enabled: true,

    position: 3,

    builtin: true,
  },


  {
    id: "ask",

    name: "Ask Nexus",

    icon: "❓",

    type: "llm",

    prompt:
      "Answer the user's question using the selected text as the primary context.",

    enabled: true,

    position: 4,

    builtin: true,
  },

];


function loadAIActions() {

  try {

    const saved =
      localStorage.getItem(
        ACTION_STORAGE_KEY
      );


    if (!saved) {

      return structuredClone(
        DEFAULT_AI_ACTIONS
      );
    }


    const parsed =
      JSON.parse(saved);


    if (!Array.isArray(parsed)) {

      return structuredClone(
        DEFAULT_AI_ACTIONS
      );
    }


    return parsed.sort(
      (a, b) =>
        (a.position ?? 0) -
        (b.position ?? 0)
    );


  } catch (error) {

    console.error(
      "Could not load AI actions:",
      error
    );


    return structuredClone(
      DEFAULT_AI_ACTIONS
    );
  }
}


function saveAIActions(
  actions
) {

  actions.forEach(
    (action, index) => {

      action.position =
        index;
    }
  );


  localStorage.setItem(
    ACTION_STORAGE_KEY,
    JSON.stringify(actions)
  );
}


let aiActions =
  loadAIActions();


/* =========================================================
   ACTION MENU
   ========================================================= */

let selectedActionText = "";
let selectedPDFPage = null;
let actionSelectionRange = null;
let selectedPDFField = null;

function renderAIActionMenu() {

  const list =
    document.getElementById(
      "aiActionList"
    );


  if (!list) return;


  list.innerHTML = "";


  const enabledActions =
    aiActions
      .filter(
        (action) =>
          action.enabled
      )
      .sort(
        (a, b) =>
          a.position -
          b.position
      );


  for (
    const action
    of enabledActions
  ) {

    const button =
      document.createElement(
        "button"
      );


    button.type =
      "button";


    button.className =
      "ai-action-item";


    button.dataset.actionId =
      action.id;


    button.innerHTML = `
      <span class="ai-action-icon">
        ${action.icon}
      </span>

      <span>
        ${escapeHTML(action.name)}
      </span>
    `;


    button.addEventListener(
      "click",
      () => {

        executeAIAction(
          action
        );
      }
    );


    list.appendChild(
      button
    );
  }
}


/* =========================================================
   TEXT SELECTION
   ========================================================= */

document.addEventListener(
  "mouseup",
  (event) => {

    const selection =
      window.getSelection();


    if (
      !selection ||
      selection.isCollapsed
    ) {
      return;
    }


    const text =
      selection
        .toString()
        .trim();


    if (!text) return;


    selectedActionText =
      text;


    try {

      actionSelectionRange =
        selection
          .getRangeAt(0)
          .cloneRange();

    } catch {

      actionSelectionRange =
        null;
    }


    showAIActionMenu(
      event.clientX,
      event.clientY
    );
  }
);
window.addEventListener(
    "message",
    (event) => {
        if (event.origin !== window.location.origin) return;

        const data = event.data;

        if (data?.type !== "CLOUDNEXUS_TXT_SELECTION") {
            return;
        }

        const text = data.text?.trim();

        if (!text) {
            return;
        }

        console.log("TXT SELECTION:", text);

        selectedActionText = text;
        selectedPDFPage = null;
        selectedPDFFileId = data.fileId || null;

        const iframe = els.previewFrame;

        if (!iframe) {
            return;
        }

        const rect = iframe.getBoundingClientRect();

        showAIActionMenu(
            rect.left + 40,
            rect.top + 80
        );
    }
);
window.addEventListener(
    "message",
    (event) => {

        if (
            event.origin !==
            window.location.origin
        ) {
            return;
        }

        const data = event.data;

        if (
            data?.type !==
            "CLOUDNEXUS_DOCX_SELECTION"
        ) {
            return;
        }

        const text =
            data.text?.trim();

        if (!text) {
            return;
        }

        console.log(
            "DOCX SELECTION:",
            text
        );

        selectedActionText = text;

        selectedPDFPage = null;

        selectedPDFFileId =
            data.fileId || null;

        const iframe =
            els.previewFrame;

        if (!iframe) {
            return;
        }

        const rect =
            iframe.getBoundingClientRect();

        showAIActionMenu(
            rect.left + 40,
            rect.top + 80
        );
    }
);
/* =========================================================
   PDF.JS SELECTION LISTENER
   ========================================================= */
window.addEventListener(
  "message",
  (event) => {

    if (
      event.origin !==
      window.location.origin
    ) {
      return;
    }

    const data = event.data;

    if (
      data?.type !==
      "CLOUDNEXUS_MARKDOWN_SELECTION"
    ) {
      return;
    }

    const text = data.text?.trim();

    if (!text) {
      return;
    }

    selectedActionText = text;

    selectedPDFPage = null;
    /* Get currently selected/opened file */
    selectedPDFFileId =
            data.fileId || null;


        const iframe =
            els.previewFrame;

        const rect =
            iframe.getBoundingClientRect();


        showAIActionMenu(
            rect.left + 40,
            rect.top + 80
        );


        console.log(
            "Markdown selection received:",
            {
                text,
                fileId:
                    data.fileId
            }
        );

    }
);
window.addEventListener(
    "message",
    (event) => {

        if (
            event.origin !==
            window.location.origin
        ) {
            return;
        }


        const data =
            event.data;


        if (
            data?.type !==
            "CLOUDNEXUS_TXT_SELECTION"
        ) {
            return;
        }


        const text =
            data.text?.trim();


        if (!text) {
            return;
        }


        selectedActionText =
            text;


        selectedPDFPage =
            null;


        selectedPDFFileId =
            data.fileId || null;


        const iframe =
            els.previewFrame;


        const rect =
            iframe.getBoundingClientRect();


        showAIActionMenu(
            rect.left + 40,
            rect.top + 80
        );


        console.log(
            "TXT selection received:",
            {
                text,
                fileId:
                    data.fileId
            }
        );

    }
);

/* =========================================================
   SHOW ACTION MENU
   ========================================================= */

function showAIActionMenu(
  x,
  y
) {

  const menu =
    document.getElementById(
      "aiActionMenu"
    );


  if (!menu) return;


  renderAIActionMenu();


  menu.classList.remove(
    "hidden"
  );


  const width = 240;

  const height = 300;


  const left =
    Math.min(
      x,
      window.innerWidth -
        width -
        10
    );


  const top =
    Math.min(
      y + 8,
      window.innerHeight -
        height -
        10
    );


  menu.style.left =
    `${Math.max(10, left)}px`;


  menu.style.top =
    `${Math.max(10, top)}px`;
}


/* =========================================================
   CLOSE ACTION MENU
   ========================================================= */

document.addEventListener(
  "mousedown",
  (event) => {

    const menu =
      document.getElementById(
        "aiActionMenu"
      );


    if (!menu) return;


    if (
      !menu.contains(
        event.target
      ) &&
      !event.target.closest(
        ".action-settings-modal"
      )
    ) {

      menu.classList.add(
        "hidden"
      );
    }
  }
);


/* =========================================================
   ACTION SETTINGS
   ========================================================= */

function openActionSettings() {

  const overlay =
    document.getElementById(
      "actionSettingsOverlay"
    );


  if (!overlay) return;


  renderEditableActions();


  overlay.classList.remove(
    "hidden"
  );
}


function closeActionSettings() {

  const overlay =
    document.getElementById(
      "actionSettingsOverlay"
    );


  if (!overlay) return;


  overlay.classList.add(
    "hidden"
  );
}


document
  .getElementById(
    "customizeActionsBtn"
  )
  ?.addEventListener(
    "click",
    () => {

      document
        .getElementById(
          "aiActionMenu"
        )
        .classList.add(
          "hidden"
        );


      openActionSettings();
    }
  );


document
  .getElementById(
    "closeActionSettings"
  )
  ?.addEventListener(
    "click",
    closeActionSettings
  );


/* =========================================================
   EDIT ACTIONS
   ========================================================= */

function renderEditableActions() {

  const container =
    document.getElementById(
      "editableActionList"
    );


  if (!container) return;


  container.innerHTML = "";


  aiActions
    .sort(
      (a, b) =>
        a.position -
        b.position
    )
    .forEach(
      (action) => {

        const row =
          document.createElement(
            "div"
          );


        row.className =
          "editable-action";


        row.dataset.id =
          action.id;


        row.innerHTML = `

          <div class="action-drag">
            ☰
          </div>

          <div class="action-info">

            <input
              class="action-name-input"
              value="${escapeHTML(action.name)}"
              placeholder="Action name"
            />

            <textarea
              class="action-prompt-input"
              placeholder="AI instruction..."
            >${escapeHTML(action.prompt || "")}</textarea>

          </div>

          <div>

            <button
              type="button"
              class="action-toggle ${
                action.enabled
                  ? "active"
                  : ""
              }"
              title="Enable / disable"
            ></button>

            ${
              action.builtin
                ? ""
                : `
                  <button
                    type="button"
                    class="delete-action"
                    title="Delete"
                  >
                    ×
                  </button>
                `
            }

          </div>
        `;


        const nameInput =
          row.querySelector(
            ".action-name-input"
          );


        const promptInput =
          row.querySelector(
            ".action-prompt-input"
          );


        const toggle =
          row.querySelector(
            ".action-toggle"
          );


        nameInput.addEventListener(
          "input",
          () => {

            action.name =
              nameInput.value;
          }
        );


        promptInput.addEventListener(
          "input",
          () => {

            action.prompt =
              promptInput.value;
          }
        );


        toggle.addEventListener(
          "click",
          () => {

            action.enabled =
              !action.enabled;


            toggle.classList.toggle(
              "active",
              action.enabled
            );
          }
        );


        const deleteButton =
          row.querySelector(
            ".delete-action"
          );


        if (deleteButton) {

          deleteButton.addEventListener(
            "click",
            () => {

              aiActions =
                aiActions.filter(
                  (a) =>
                    a.id !==
                    action.id
                );


              renderEditableActions();
            }
          );
        }


        container.appendChild(
          row
        );
      }
    );
}


/* =========================================================
   ADD CUSTOM ACTION
   ========================================================= */

document
  .getElementById(
    "addCustomAction"
  )
  ?.addEventListener(
    "click",
    () => {

      const newAction = {

        id:
          "custom_" +
          Date.now(),

        name:
          "New AI Action",

        icon:
          "✨",

        type:
          "llm",

        prompt:
          "Process the selected text according to the user's instruction.",

        enabled:
          true,

        position:
          aiActions.length,

        builtin:
          false,
      };


      aiActions.push(
        newAction
      );


      renderEditableActions();
    }
  );


/* =========================================================
   SAVE ACTIONS
   ========================================================= */

document
  .getElementById(
    "saveActions"
  )
  ?.addEventListener(
    "click",
    () => {

      saveAIActions(
        aiActions
      );


      renderAIActionMenu();


      closeActionSettings();
    }
  );


/* =========================================================
   RESET ACTIONS
   ========================================================= */

document
  .getElementById(
    "resetActions"
  )
  ?.addEventListener(
    "click",
    () => {

      aiActions =
        structuredClone(
          DEFAULT_AI_ACTIONS
        );


      renderEditableActions();
    }
  );


renderAIActionMenu();


/* =========================================================
   EXECUTE AI ACTION
   ========================================================= */
async function executeAIAction(action) {
  const text = selectedActionText?.trim();

  if (!text) {
    console.warn("No selected text");
    return;
  }

  document
    .getElementById("aiActionMenu")
    ?.classList.add("hidden");

  console.log("AI Action:", action.name);
  console.log("Selected text:", text);

  try {
    /* ==========================================
       HIGHLIGHT
       ========================================== */

    if (action.id === "highlight") {
      await highlightSelectedPDFText(text);
      return;
    }


    /* ==========================================
       SHORT NOTES
       ========================================== */
       if (action.id === "short_notes") {
        await createShortNote(text);
          return;
       }
    /* ==========================================
       EXPLAIN
       ========================================== */

    if (action.id === "explain") {

      await runPDFActionAI(
        "Explain the selected PDF text clearly in simple language. " +
        "Give an example when useful.",
        text
      );

      return;
    }


    /* ==========================================
       IMPORTANT FOR NEXUS
       ========================================== */

    if (action.id === "important") {

      await saveImportantContext(text);

      return;
    }


    /* ==========================================
       ASK NEXUS
       ========================================== */
if (action.id === "ask") {

  const chatInput =
    document.getElementById("chat-input");

  if (!chatInput) {
    console.warn("Chat input not found");
    return;
  }

  chatInput.value =
    `About this selected text:\n\n` +
    `"${text}"\n\n` +
    `My question: `;

  chatInput.focus();

  /* Put cursor at the end */

  chatInput.setSelectionRange(
    chatInput.value.length,
    chatInput.value.length
  );

  /* Close AI Actions menu */

  document
    .getElementById("aiActionMenu")
    ?.classList.add("hidden");

  return;
} 

    /* ==========================================
       CUSTOM ACTION
       ========================================== */

    if (action.type === "llm") {

      await runPDFActionAI(
        action.prompt,
        text
      );

      return;
    }

  } catch (error) {

    console.error(
      "AI action failed:",
      error
    );

    addBubble(
      "assistant",
      `Action failed: ${error.message}`
    );
  }
}
/* =========================================================
   HIGHLIGHT
   ========================================================= */

function highlightSelectedText() {

  if (!actionSelectionRange) {
    return;
  }


  try {

    const mark =
      document.createElement(
        "mark"
      );


    mark.style.background =
      "#fff59d";


    mark.style.padding =
      "1px 2px";


    actionSelectionRange
      .surroundContents(mark);


  } catch (error) {

    console.warn(
      "Could not highlight selection:",
      error
    );
  }
}


/* =========================================================
   LLM ACTION
   ========================================================= */

async function runSelectedTextAI(
  action,
  text
) {

  const input =
    document.getElementById(
      "chat-input"
    );


  if (!input) return;


  const instruction =
    `${action.prompt}

Selected text:

${text}`;


  input.value =
    instruction;


  input.focus();
}


/* =========================================================
   IMPORTANT CONTEXT
   ========================================================= */

async function saveImportantContext(
  text
) {
console.log(
    "IMPORTANT FOR NEXUS:",
    text
  );

  addBubble(
    "assistant",
    `⭐ Marked as important for Nexus:\n\n${text}`
  );
}


/* =========================================================
   INITIAL LOAD
   ========================================================= */

reloadAll().catch(
  (err) => {

    els.empty.classList.remove(
      "hidden"
    );


    els.empty.textContent =
      `Could not load Drive: ${err.message}`;
  }
);

async function createShortNote(text) {

  if (!text?.trim()) {
    return;
  }

  addBubble(
    "user",
    `📝 Creating Short Notes from selected PDF text:\n\n${text}`
  );

  addThinkingBubble();

  try {

    /* =========================================
       1. Ask Llama to create the note
    ========================================= */

    const aiResponse =
      await api(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            message:
              "Create concise study notes from the " +
              "following selected PDF text.\n\n" +

              "Requirements:\n" +
              "- Keep important facts.\n" +
              "- Keep definitions.\n" +
              "- Keep formulas.\n" +
              "- Keep technical terms.\n" +
              "- Use headings and bullet points where useful.\n" +
              "- Do not add information that is not present " +
              "in the selected text.\n\n" +

              "Selected PDF text:\n\n" +
              text,

            mode: "short_notes",

            folder_id:
              state.folderId,

            file_ids:
              selectedPDFFileId
                ? [selectedPDFFileId]
                : []

          })
        }
      );


    /* =========================================
       2. Create actual .md file
    ========================================= */

    const note =
      await api(
        "/api/files/short-note",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            content:
              aiResponse.answer,

            folder_id:
              state.folderId,

            source_file_id:
              selectedPDFFileId

          })
        }
      );


    removeThinkingBubble();


    /* =========================================
       3. Show result
    ========================================= */

    addBubble(
      "assistant",

      ` Short Notes created successfully.\n\n` +

      ` ${note.name}\n` +

      ` ${note.indexed
        ? "Indexed into Nexus"
        : "Created but indexing failed"}`
    );


    /* Refresh Drive */

    await reloadAll();


  } catch (error) {

    removeThinkingBubble();

    console.error(
      "Short Notes error:",
      error
    );

    addBubble(
      "assistant",
      ` Could not create Short Notes: ${error.message}`
    );
  }
}

async function runPDFActionAI(instruction, text) {

  addBubble(
    "user",
    `${instruction}\n\nSelected PDF text:\n${text}`
  );

  addThinkingBubble();

  try {

    const fileIds = [
      ...state.selected
    ].filter((id) =>
      document.querySelector(
        `.card[data-id="${id}"][data-type="file"]`
      )
    );

    const response = await api(
      "/api/chat",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          message:
            `${instruction}\n\n` +
            `Use the following selected PDF text as context:\n\n` +
            text,

          mode: "explain",

          folder_id:
            state.folderId,

          file_ids:
            fileIds
        })
      }
    );

    removeThinkingBubble();

    addBubble(
      "assistant",
      response.answer
    );

  } catch (error) {

    removeThinkingBubble();

    console.error(
      "PDF AI action error:",
      error
    );

    addBubble(
      "assistant",
      `AI action failed: ${error.message}`
    );
  }
}

async function highlightSelectedPDFText(text) {

  const iframe =
    els.previewFrame;

  if (!iframe?.contentWindow) {
    console.warn("PDF viewer not available");
    return;
  }

  iframe.contentWindow.postMessage(
    {
      type: "CLOUDNEXUS_PDF_ACTION",

      action: "highlight",

      text: text,

      page: selectedPDFPage,

      fileId: selectedPDFFileId
    },

    window.location.origin
  );
}

function openMarkdownViewer(item) {

    if (!item || !item.id) {
        console.error("Invalid Markdown file:", item);
        return;
    }

    const url =
        `/markdown-viewer?file_id=${encodeURIComponent(item.id)}`;

    console.log("OPENING MARKDOWN:", url);

    if (els.previewWrap) {
        els.previewWrap.classList.remove("hidden");
    }

    if (els.previewFrame) {
        els.previewFrame.src = url;
        return;
    }

    window.location.href = url;
}
async function deleteSelectedFile() {

    const selectedIds = [...state.selected];

    if (selectedIds.length !== 1) {
        alert("Select one file to delete.");
        return;
    }

    const fileId = selectedIds[0];

    const card = document.querySelector(
        `.card[data-id="${fileId}"][data-type="file"]`
    );

    if (!card) {
        alert("File not found.");
        return;
    }

    const fileName =
        card.querySelector(".card-name")?.textContent?.trim()
        || "this file";

    const confirmed = confirm(
        `Delete "${fileName}"?\n\n` +
        `This will also remove it from the AI/RAG index.`
    );

    if (!confirmed) return;

    try {

        await api(
            `/api/files/${encodeURIComponent(fileId)}`,
            {
                method: "DELETE",
            }
        );

        state.selected.delete(fileId);

        closePreview();

        await reloadAll();

    } catch (error) {

        console.error(
            "Delete failed:",
            error
        );

        alert(
            `Could not delete "${fileName}".\n\n${error.message}`
        );
    }
}
