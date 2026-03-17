const TIERS = ["S", "A", "B", "C", "D", "E", "F"];
const STATS_STORAGE_KEY = "zero-soda-tier-lab-stats-v1";
const ITEMS_STORAGE_KEY = "zero-soda-tier-lab-items-v1";
const ADMIN_PASSWORD = "3431";

const BASE_ITEMS = [
  {
    id: "coke-zero",
    name: "코카-콜라 제로 오리지널",
    color: "#101218",
    image: "./assets/images/coke-zero.jpg"
  },
  {
    id: "pepsi-zero",
    name: "펩시 제로 라임",
    color: "#005CB9",
    image: "./assets/images/pepsi-zero.jpg"
  },
  {
    id: "chilsung-zero",
    name: "칠성사이다 제로 오리지널",
    color: "#0FA87B",
    image: "./assets/images/chilsung-zero.jpg"
  },
  {
    id: "sprite-zero",
    name: "스프라이트 제로 레몬라임",
    color: "#17B74A",
    image: "./assets/images/sprite-zero.jpg"
  },
  {
    id: "fanta-zero",
    name: "환타 제로 포도",
    color: "#FF7A00",
    image: "./assets/images/fanta-zero.jpg"
  },
  {
    id: "drpepper-zero",
    name: "닥터페퍼 제로 오리지널",
    color: "#7B1C2E",
    image: "./assets/images/drpepper-zero.jpg"
  },
  {
    id: "milkis-zero",
    name: "밀키스 제로 오리지널",
    color: "#40B5E8",
    image: "./assets/images/milkis-zero.jpg"
  },
  {
    id: "tams-zero",
    name: "탐스 제로 오렌지",
    color: "#8A4DFF",
    image: "./assets/images/tams-zero.jpg"
  },
  {
    id: "narangd-cider",
    name: "나랑드사이다 제로 플레인",
    color: "#1DB15D",
    image: "./assets/images/narangd-cider.jpg"
  },
  {
    id: "welchs-zero",
    name: "웰치스 제로 그레이프",
    color: "#5C1E8C",
    image: "./assets/images/welchs-zero.jpg"
  },
  {
    id: "815-cola-zero",
    name: "815 콜라 제로 오리지널",
    color: "#2B2F36",
    image: "./assets/images/815-cola-zero.jpg"
  },
  {
    id: "815-cider-zero",
    name: "815 피즈 제로 오렌지",
    color: "#00A3A3",
    image: "./assets/images/815-cider-zero.jpg"
  },
  {
    id: "bridge-talk-zero",
    name: "브리지톡 플레인",
    color: "#3D73FF",
    image: "./assets/images/bridge-talk-zero.jpg"
  },
  {
    id: "mccol-zero",
    name: "맥콜 제로 보리",
    color: "#D0A228",
    image: "./assets/images/mccol-zero.jpg"
  },
  {
    id: "crushed-pear-zero",
    name: "갈배사이다 제로 배",
    color: "#A8B73A",
    image: "./assets/images/crushed-pear-zero.jpg"
  },
  {
    id: "canada-dry-zero",
    name: "캐나다드라이 토닉워터",
    color: "#C39A57",
    image: "./assets/images/canada-dry-zero.jpg"
  },
  {
    id: "seagram",
    name: "씨그램 플레인",
    color: "#00A596",
    image: "./assets/images/seagram.jpg"
  },
  {
    id: "trevi",
    name: "트레비 라임",
    color: "#20C7B2",
    image: "./assets/images/trevi.jpg"
  }
];

const BASE_ITEM_NAME_BY_ID = Object.fromEntries(
  BASE_ITEMS.map((item) => [item.id, item.name])
);

const LEGACY_ITEM_NAMES_BY_ID = {
  "coke-zero": ["코카-콜라 제로"],
  "pepsi-zero": ["펩시 제로"],
  "chilsung-zero": ["칠성사이다 제로"],
  "sprite-zero": ["스프라이트 제로"],
  "fanta-zero": ["환타 제로"],
  "drpepper-zero": ["닥터페퍼 제로"],
  "milkis-zero": ["밀키스 제로"],
  "tams-zero": ["탐스 제로"],
  "narangd-cider": ["나랑드사이다"],
  "welchs-zero": ["웰치스 제로"],
  "815-cola-zero": ["815콜라 제로", "815 콜라 제로"],
  "815-cider-zero": ["815사이다 제로", "815 사이다 제로"],
  "bridge-talk-zero": ["브리지톡 제로"],
  "mccol-zero": ["맥콜 제로"],
  "crushed-pear-zero": ["갈배사이다 제로"],
  "canada-dry-zero": ["캐나다드라이 제로"],
  seagram: ["씨그램"],
  trevi: ["트레비"]
};

const app = {
  items: [],
  assignments: {},
  laneContainers: {},
  detailItemId: null,
  editingItemId: null,
  isAdminUnlocked: false,
  unratedEl: document.getElementById("unrated"),
  tiersEl: document.getElementById("tiers"),
  cardTemplate: document.getElementById("cardTemplate"),
  laneTemplate: document.getElementById("laneTemplate"),
  unratedCountEl: document.getElementById("unratedCount"),
  resetBtn: document.getElementById("resetBtn"),
  submitBtn: document.getElementById("submitBtn"),
  viewResultBtn: document.getElementById("viewResultBtn"),
  resultsPanel: document.getElementById("resultsPanel"),
  statusText: document.getElementById("statusText"),
  participantCount: document.getElementById("participantCount"),
  summaryParticipants: document.getElementById("summaryParticipants"),
  summarySamples: document.getElementById("summarySamples"),
  summaryDrinks: document.getElementById("summaryDrinks"),
  tierTotals: document.getElementById("tierTotals"),
  resultTableBody: document.getElementById("resultTableBody"),
  detailModal: document.getElementById("detailModal"),
  detailTitle: document.getElementById("detailTitle"),
  detailImage: document.getElementById("detailImage"),
  detailFallback: document.getElementById("detailFallback"),
  detailState: document.getElementById("detailState"),
  closeModalBtn: document.getElementById("closeModalBtn"),
  passBtn: document.getElementById("passBtn"),
  adminBtn: document.getElementById("adminBtn"),
  adminPanel: document.getElementById("adminPanel"),
  adminStateChip: document.getElementById("adminStateChip"),
  adminList: document.getElementById("adminList"),
  adminLoginModal: document.getElementById("adminLoginModal"),
  adminPasswordInput: document.getElementById("adminPasswordInput"),
  adminLoginMsg: document.getElementById("adminLoginMsg"),
  closeAdminLoginBtn: document.getElementById("closeAdminLoginBtn"),
  adminLoginConfirmBtn: document.getElementById("adminLoginConfirmBtn"),
  adminEditModal: document.getElementById("adminEditModal"),
  closeAdminEditBtn: document.getElementById("closeAdminEditBtn"),
  adminEditName: document.getElementById("adminEditName"),
  adminEditColor: document.getElementById("adminEditColor"),
  adminEditImage: document.getElementById("adminEditImage"),
  adminEditMsg: document.getElementById("adminEditMsg"),
  adminEditSaveBtn: document.getElementById("adminEditSaveBtn")
};

function cloneBaseItems() {
  return BASE_ITEMS.map((item) => ({ ...item }));
}

function upgradeLegacyItemName(id, name) {
  const current = BASE_ITEM_NAME_BY_ID[id];
  const legacy = LEGACY_ITEM_NAMES_BY_ID[id];
  if (!current || !legacy) return name;
  if (legacy.includes(name)) return current;
  return name;
}

function isHexColor(value) {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

function normalizeHexColor(value) {
  const trimmed = value.trim();
  if (!isHexColor(trimmed)) return null;
  if (trimmed.length === 7) return trimmed.toUpperCase();
  const expanded = trimmed
    .slice(1)
    .split("")
    .map((char) => char + char)
    .join("");
  return `#${expanded.toUpperCase()}`;
}

function isValidImageUrl(value) {
  if (!value) return true;
  const trimmed = value.trim();
  if (/^(\.\/|\/|assets\/)/.test(trimmed)) {
    return true;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function loadItems() {
  try {
    const raw = localStorage.getItem(ITEMS_STORAGE_KEY);
    if (!raw) return cloneBaseItems();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return cloneBaseItems();
    if (parsed.length === 0) return [];

    const seen = new Set();
    const normalized = [];

    parsed.forEach((candidate) => {
      if (!candidate || typeof candidate !== "object") return;
      const id =
        typeof candidate.id === "string" ? candidate.id.trim() : "";
      const name =
        typeof candidate.name === "string" ? candidate.name.trim() : "";
      const upgradedName = upgradeLegacyItemName(id, name);
      const colorValue =
        typeof candidate.color === "string" ? candidate.color.trim() : "";
      const color = normalizeHexColor(colorValue);
      const imageRaw =
        typeof candidate.image === "string" ? candidate.image.trim() : "";
      const image = isValidImageUrl(imageRaw) ? imageRaw : "";
      if (!id || !upgradedName || !color || seen.has(id)) return;
      seen.add(id);
      normalized.push({ id, name: upgradedName, color, image });
    });

    if (normalized.length === 0) return cloneBaseItems();
    return normalized;
  } catch {
    return cloneBaseItems();
  }
}

function saveItems() {
  localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(app.items));
}

function initAssignments() {
  app.assignments = Object.fromEntries(
    app.items.map((item) => [item.id, "UNRATED"])
  );
}

function reconcileAssignments() {
  const next = {};
  app.items.forEach((item) => {
    const current = app.assignments[item.id];
    if (current === "UNRATED" || TIERS.includes(current)) {
      next[item.id] = current;
      return;
    }
    next[item.id] = "UNRATED";
  });
  app.assignments = next;
}

function createZeroRecord() {
  return {
    total: 0,
    tiers: Object.fromEntries(TIERS.map((tier) => [tier, 0]))
  };
}

function createEmptyStats() {
  return {
    participants: 0,
    drinks: Object.fromEntries(app.items.map((item) => [item.id, createZeroRecord()]))
  };
}

function normalizeStats(source) {
  const base = createEmptyStats();
  if (!source || typeof source !== "object") return base;

  const participants = Number(source.participants);
  base.participants =
    Number.isFinite(participants) && participants > 0
      ? Math.floor(participants)
      : 0;

  app.items.forEach((item) => {
    const record = source.drinks?.[item.id];
    if (!record || typeof record !== "object") return;

    const total = Number(record.total);
    base.drinks[item.id].total =
      Number.isFinite(total) && total > 0 ? Math.floor(total) : 0;

    TIERS.forEach((tier) => {
      const count = Number(record.tiers?.[tier]);
      base.drinks[item.id].tiers[tier] =
        Number.isFinite(count) && count > 0 ? Math.floor(count) : 0;
    });
  });

  return base;
}

function loadStats() {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (!raw) return createEmptyStats();
    const parsed = JSON.parse(raw);
    return normalizeStats(parsed);
  } catch {
    return createEmptyStats();
  }
}

function saveStats(stats) {
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
}

function createTierLanes() {
  app.tiersEl.innerHTML = "";
  app.laneContainers = {};

  TIERS.forEach((tier) => {
    const fragment = app.laneTemplate.content.cloneNode(true);
    const lane = fragment.querySelector(".lane");
    const label = fragment.querySelector(".lane-label");
    const cards = fragment.querySelector(".lane-cards");

    lane.dataset.tier = tier;
    label.textContent = tier;
    cards.dataset.tier = tier;

    registerDropzone(cards);
    app.tiersEl.appendChild(fragment);
  });

  app.tiersEl.querySelectorAll(".lane").forEach((lane) => {
    app.laneContainers[lane.dataset.tier] = lane.querySelector(".lane-cards");
  });
}

function shortLabel(name) {
  const compact = name.replace(/\s*제로$/, "").replace(/\s/g, "");
  return compact.slice(0, 2);
}

function darkenHex(hex, amount) {
  const clean = hex.replace("#", "");
  const int = Number.parseInt(clean, 16);
  const r = Math.max((int >> 16) - amount, 0);
  const g = Math.max(((int >> 8) & 0xff) - amount, 0);
  const b = Math.max((int & 0xff) - amount, 0);
  return `#${[r, g, b]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;
}

function findItem(itemId) {
  return app.items.find((item) => item.id === itemId);
}

function createCard(item) {
  const fragment = app.cardTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".card");
  const name = fragment.querySelector(".name");
  const swatch = fragment.querySelector(".swatch");
  const thumbImage = fragment.querySelector(".thumb-image");
  const thumbFallback = fragment.querySelector(".thumb-fallback");
  const detailBtn = fragment.querySelector(".detail-btn");

  card.dataset.id = item.id;
  name.textContent = item.name;
  swatch.style.background = item.color;
  thumbFallback.textContent = shortLabel(item.name);
  thumbFallback.style.background = `linear-gradient(145deg, ${item.color}, ${darkenHex(
    item.color,
    28
  )})`;

  if (item.image) {
    thumbImage.onload = () => {
      thumbImage.style.display = "block";
      thumbFallback.style.display = "none";
    };
    thumbImage.onerror = () => {
      thumbImage.style.display = "none";
      thumbFallback.style.display = "grid";
    };
    thumbImage.src = item.image;
  }

  detailBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openDetail(item.id);
  });

  card.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", item.id);
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });

  return fragment;
}

function getRatedCount() {
  return app.items.filter((item) => app.assignments[item.id] !== "UNRATED")
    .length;
}

function getCurrentTierLabel(itemId) {
  const tier = app.assignments[itemId];
  return tier === "UNRATED" ? "미평가(건너뛰기)" : `${tier} 등급`;
}

function updateCounts() {
  const unratedCount = app.items.filter(
    (item) => app.assignments[item.id] === "UNRATED"
  ).length;
  app.unratedCountEl.textContent = String(unratedCount);

  TIERS.forEach((tier) => {
    const lane = app.tiersEl.querySelector(`.lane[data-tier="${tier}"]`);
    if (!lane) return;
    const countEl = lane.querySelector(".lane-count");
    const count = app.items.filter(
      (item) => app.assignments[item.id] === tier
    ).length;
    countEl.textContent = String(count);
  });
}

function updateStatusText() {
  const rated = getRatedCount();
  const unrated = app.items.length - rated;
  app.statusText.textContent = `현재 ${rated}개 평가됨 / ${unrated}개 미평가(건너뛰기)`;
}

function syncSubmitButton() {
  app.submitBtn.disabled = getRatedCount() === 0;
}

function syncDetailState() {
  if (!app.detailItemId || app.detailModal.hidden) return;
  app.detailState.textContent = `현재 상태: ${getCurrentTierLabel(app.detailItemId)}`;
}

function render() {
  app.unratedEl.innerHTML = "";
  Object.values(app.laneContainers).forEach((container) => {
    container.innerHTML = "";
  });

  app.items.forEach((item) => {
    const tier = app.assignments[item.id] || "UNRATED";
    const cardNode = createCard(item);
    if (tier === "UNRATED") {
      app.unratedEl.appendChild(cardNode);
      return;
    }
    app.laneContainers[tier].appendChild(cardNode);
  });

  updateCounts();
  updateStatusText();
  syncSubmitButton();
  syncDetailState();
}

function registerDropzone(zone) {
  zone.addEventListener("dragover", (event) => {
    event.preventDefault();
    zone.classList.add("drag-over");
  });

  zone.addEventListener("dragleave", () => {
    zone.classList.remove("drag-over");
  });

  zone.addEventListener("drop", (event) => {
    event.preventDefault();
    zone.classList.remove("drag-over");
    const itemId = event.dataTransfer.getData("text/plain");
    const tier = zone.dataset.tier || "UNRATED";
    if (!itemId || !(itemId in app.assignments)) return;
    app.assignments[itemId] = tier;
    render();
  });
}

function openDetail(itemId) {
  const item = findItem(itemId);
  if (!item) return;

  app.detailItemId = itemId;
  app.detailTitle.textContent = item.name;
  app.detailState.textContent = `현재 상태: ${getCurrentTierLabel(itemId)}`;
  app.detailFallback.textContent = shortLabel(item.name);
  app.detailFallback.style.background = `linear-gradient(145deg, ${item.color}, ${darkenHex(
    item.color,
    28
  )})`;

  app.detailImage.style.display = "none";
  app.detailFallback.style.display = "grid";

  app.detailImage.onload = () => {
    app.detailImage.style.display = "block";
    app.detailFallback.style.display = "none";
  };
  app.detailImage.onerror = () => {
    app.detailImage.style.display = "none";
    app.detailFallback.style.display = "grid";
  };

  if (item.image) {
    app.detailImage.src = item.image;
  } else {
    app.detailImage.removeAttribute("src");
  }

  app.detailModal.hidden = false;
}

function closeDetail() {
  app.detailModal.hidden = true;
  app.detailItemId = null;
}

function markAsPass() {
  if (!app.detailItemId) return;
  app.assignments[app.detailItemId] = "UNRATED";
  render();
  closeDetail();
}

function collectRatedAssignments() {
  const rated = {};
  app.items.forEach((item) => {
    const tier = app.assignments[item.id];
    if (tier && tier !== "UNRATED") {
      rated[item.id] = tier;
    }
  });
  return rated;
}

function submitAndShowResults() {
  const rated = collectRatedAssignments();
  const ratedIds = Object.keys(rated);
  if (ratedIds.length === 0) {
    window.alert("최소 1개 이상 평가해야 결과를 집계할 수 있어요.");
    return;
  }

  const stats = loadStats();
  stats.participants += 1;

  ratedIds.forEach((itemId) => {
    if (!stats.drinks[itemId]) {
      stats.drinks[itemId] = createZeroRecord();
    }
    const tier = rated[itemId];
    stats.drinks[itemId].total += 1;
    stats.drinks[itemId].tiers[tier] += 1;
  });

  saveStats(stats);
  renderResults(stats);
  app.resultsPanel.hidden = false;
  app.resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function viewResultsOnly() {
  renderResults(loadStats());
  app.resultsPanel.hidden = false;
  app.resultsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderResults(stats) {
  const normalized = normalizeStats(stats);
  const tierTotals = Object.fromEntries(TIERS.map((tier) => [tier, 0]));
  let totalSamples = 0;
  let drinksWithSamples = 0;

  app.items.forEach((item) => {
    const record = normalized.drinks[item.id] || createZeroRecord();
    totalSamples += record.total;
    if (record.total > 0) drinksWithSamples += 1;
    TIERS.forEach((tier) => {
      tierTotals[tier] += record.tiers[tier];
    });
  });

  app.participantCount.textContent = `참가자 ${normalized.participants}명`;
  app.summaryParticipants.textContent = String(normalized.participants);
  app.summarySamples.textContent = String(totalSamples);
  app.summaryDrinks.textContent = String(drinksWithSamples);

  app.tierTotals.innerHTML = "";
  TIERS.forEach((tier) => {
    const block = document.createElement("div");
    block.className = "tier-pill";
    block.dataset.tier = tier;
    block.innerHTML = `<strong>${tier}</strong><span>${tierTotals[tier]}</span>`;
    app.tierTotals.appendChild(block);
  });

  app.resultTableBody.innerHTML = "";
  if (normalized.participants === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML =
      '<td colspan="9">아직 집계된 참가자가 없습니다. 평가 후 결과를 저장해 주세요.</td>';
    app.resultTableBody.appendChild(tr);
    return;
  }

  if (app.items.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = '<td colspan="9">표시할 항목이 없습니다.</td>';
    app.resultTableBody.appendChild(tr);
    return;
  }

  const rows = app.items
    .map((item) => ({
      item,
      record: normalized.drinks[item.id] || createZeroRecord()
    }))
    .sort((a, b) => b.record.total - a.record.total);

  rows.forEach(({ item, record }) => {
    const tr = document.createElement("tr");
    const tierCells = TIERS.map((tier) => `<td>${record.tiers[tier]}</td>`).join(
      ""
    );
    tr.innerHTML = `<td>${item.name}</td><td>${record.total}</td>${tierCells}`;
    app.resultTableBody.appendChild(tr);
  });
}

function openAdminLogin() {
  app.adminPasswordInput.value = "";
  app.adminLoginMsg.textContent = "";
  app.adminLoginModal.hidden = false;
  app.adminPasswordInput.focus();
}

function closeAdminLogin() {
  app.adminLoginModal.hidden = true;
}

function tryUnlockAdmin() {
  const password = app.adminPasswordInput.value.trim();
  if (password !== ADMIN_PASSWORD) {
    app.adminLoginMsg.textContent = "비밀번호가 올바르지 않습니다.";
    return;
  }

  app.isAdminUnlocked = true;
  app.adminPanel.hidden = false;
  app.adminStateChip.textContent = "잠금 해제됨";
  closeAdminLogin();
  renderAdminList();
}

function openAdminEdit(itemId) {
  if (!app.isAdminUnlocked) return;
  const item = findItem(itemId);
  if (!item) return;

  app.editingItemId = item.id;
  app.adminEditName.value = item.name;
  app.adminEditColor.value = item.color;
  app.adminEditImage.value = item.image || "";
  app.adminEditMsg.textContent = "";
  app.adminEditModal.hidden = false;
  app.adminEditName.focus();
}

function closeAdminEdit() {
  app.adminEditModal.hidden = true;
  app.editingItemId = null;
}

function saveAdminEdit() {
  if (!app.editingItemId) return;
  const item = findItem(app.editingItemId);
  if (!item) return;

  const nextName = app.adminEditName.value.trim();
  const nextColor = normalizeHexColor(app.adminEditColor.value);
  const nextImage = app.adminEditImage.value.trim();

  if (!nextName) {
    app.adminEditMsg.textContent = "이름은 비워둘 수 없습니다.";
    return;
  }
  if (!nextColor) {
    app.adminEditMsg.textContent = "색상은 #RRGGBB 또는 #RGB 형식이어야 합니다.";
    return;
  }
  if (!isValidImageUrl(nextImage)) {
    app.adminEditMsg.textContent =
      "이미지 주소는 http:// 또는 https:// 형식이어야 합니다.";
    return;
  }

  item.name = nextName;
  item.color = nextColor;
  item.image = nextImage;

  saveItems();
  closeAdminEdit();
  render();
  renderResults(loadStats());
  renderAdminList();
}

function deleteAdminItem(itemId) {
  if (!app.isAdminUnlocked) return;
  const item = findItem(itemId);
  if (!item) return;

  const confirmed = window.confirm(
    `${item.name} 항목을 삭제할까요? 삭제하면 목록/통계에서 제외됩니다.`
  );
  if (!confirmed) return;

  app.items = app.items.filter((candidate) => candidate.id !== itemId);
  delete app.assignments[itemId];
  reconcileAssignments();
  saveItems();

  const stats = loadStats();
  saveStats(stats);

  if (app.detailItemId === itemId) {
    closeDetail();
  }
  if (app.editingItemId === itemId) {
    closeAdminEdit();
  }

  render();
  renderResults(loadStats());
  renderAdminList();
}

function createAdminMeta(text) {
  const p = document.createElement("p");
  p.className = "admin-meta";
  p.textContent = text;
  return p;
}

function renderAdminList() {
  if (!app.isAdminUnlocked) return;
  app.adminList.innerHTML = "";

  if (app.items.length === 0) {
    const empty = document.createElement("p");
    empty.className = "admin-empty";
    empty.textContent = "현재 항목이 없습니다.";
    app.adminList.appendChild(empty);
    return;
  }

  app.items.forEach((item) => {
    const row = document.createElement("article");
    row.className = "admin-row";

    const left = document.createElement("div");
    const name = document.createElement("p");
    name.className = "admin-name";
    name.textContent = item.name;
    left.appendChild(name);
    left.appendChild(createAdminMeta(`식별값: ${item.id}`));

    const colorBox = document.createElement("div");
    colorBox.appendChild(createAdminMeta(`색상: ${item.color}`));

    const imageBox = document.createElement("div");
    imageBox.appendChild(
      createAdminMeta(
        item.image ? `이미지: ${item.image}` : "이미지: (비어 있음)"
      )
    );

    const actions = document.createElement("div");
    actions.className = "admin-actions";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "admin-action-btn";
    editBtn.textContent = "수정";
    editBtn.addEventListener("click", () => openAdminEdit(item.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "admin-action-btn danger";
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => deleteAdminItem(item.id));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    row.appendChild(left);
    row.appendChild(colorBox);
    row.appendChild(imageBox);
    row.appendChild(actions);
    app.adminList.appendChild(row);
  });
}

function bindEvents() {
  registerDropzone(app.unratedEl);

  app.resetBtn.addEventListener("click", () => {
    initAssignments();
    render();
  });

  app.submitBtn.addEventListener("click", submitAndShowResults);
  app.viewResultBtn.addEventListener("click", viewResultsOnly);

  app.passBtn.addEventListener("click", markAsPass);
  app.closeModalBtn.addEventListener("click", closeDetail);

  app.detailModal.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.dataset.closeModal === "true") {
      closeDetail();
    }
  });

  app.adminBtn.addEventListener("click", () => {
    if (!app.isAdminUnlocked) {
      openAdminLogin();
      return;
    }
    app.adminPanel.hidden = !app.adminPanel.hidden;
    if (!app.adminPanel.hidden) {
      renderAdminList();
    }
  });

  app.closeAdminLoginBtn.addEventListener("click", closeAdminLogin);
  app.adminLoginConfirmBtn.addEventListener("click", tryUnlockAdmin);
  app.adminPasswordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      tryUnlockAdmin();
    }
  });
  app.adminLoginModal.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.dataset.closeAdminLogin === "true") {
      closeAdminLogin();
    }
  });

  app.closeAdminEditBtn.addEventListener("click", closeAdminEdit);
  app.adminEditSaveBtn.addEventListener("click", saveAdminEdit);
  app.adminEditModal.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.dataset.closeAdminEdit === "true") {
      closeAdminEdit();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!app.adminEditModal.hidden) {
      closeAdminEdit();
      return;
    }
    if (!app.adminLoginModal.hidden) {
      closeAdminLogin();
      return;
    }
    if (!app.detailModal.hidden) {
      closeDetail();
    }
  });
}

function boot() {
  app.items = loadItems();
  initAssignments();
  createTierLanes();
  bindEvents();
  render();
  const stats = loadStats();
  saveStats(stats);
  renderResults(stats);
}

boot();
