document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("#recipe-grid");
  const searchInput = document.querySelector("#recipe-search");
  const filterWrap = document.querySelector("#category-filters");
  if (!grid || typeof RECIPES === "undefined") return;

  const countEl = document.querySelector("#recipe-count");
  if (countEl) countEl.textContent = `${RECIPES.length} recipes published so far`;

  const categories = ["All", ...new Set(RECIPES.map(r => r.category))];
  let activeCategory = "All";

  function renderFilters() {
    filterWrap.innerHTML = categories.map(cat =>
      `<button class="filter-tag btn ghost${cat === activeCategory ? " active" : ""}" data-cat="${cat}">${cat}</button>`
    ).join("");
    filterWrap.querySelectorAll(".filter-tag").forEach(btn => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.cat;
        renderFilters();
        renderGrid();
      });
    });
  }

  function renderGrid() {
    const q = (searchInput.value || "").trim().toLowerCase();
    const filtered = RECIPES.filter(r => {
      const matchesQuery = !q || r.name.toLowerCase().includes(q);
      const matchesCat = activeCategory === "All" || r.category === activeCategory;
      return matchesQuery && matchesCat;
    });

    grid.innerHTML = filtered.map(r => `
      <a class="story-card" href="recipe.html?slug=${r.slug}">
        <div class="recipe-icon-tile">${r.icon}</div>
        <div class="tale-no">${r.category.toUpperCase()}</div>
        <h3>${r.name}</h3>
        <p class="excerpt">${r.excerpt}</p>
        <div class="story-meta">
          <span>${r.prepTime} + ${r.cookTime}</span>
          <span class="tag">${r.difficulty}</span>
        </div>
      </a>
    `).join("") || `<p style="color:var(--muted); font-family:var(--ui);">No recipes match your search.</p>`;
  }

  searchInput.addEventListener("input", renderGrid);
  renderFilters();
  renderGrid();
});
