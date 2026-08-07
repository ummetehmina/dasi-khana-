document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#recipe-content");
  if (!container || typeof RECIPES === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const recipe = RECIPES.find(r => r.slug === slug) || RECIPES[0];

  document.title = `${recipe.name} — Dastarkhwan`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", recipe.excerpt);

  container.innerHTML = `
    <div class="wrap post-header">
      <div class="tale-no">${recipe.category.toUpperCase()}</div>
      <h1>${recipe.name}</h1>
      <p class="lede" style="margin-top:10px; max-width:60ch; color:var(--muted);">${recipe.excerpt}</p>
      <div class="meta-badges" style="margin-top:22px;">
        <span class="badge">⏱ Prep <strong>${recipe.prepTime}</strong></span>
        <span class="badge">🔥 Cook <strong>${recipe.cookTime}</strong></span>
        <span class="badge">🍽 Serves <strong>${recipe.servings}</strong></span>
        <span class="badge">📊 <strong>${recipe.difficulty}</strong></span>
      </div>
    </div>

    <div class="wrap">
      <div class="recipe-icon-tile large">${recipe.icon}</div>
    </div>

    <div class="wrap recipe-columns" style="margin-top:44px;">
      <ul class="ingredient-list">
        <h3>Ingredients</h3>
        ${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
      </ul>
      <div>
        <ol class="steps-list">
          ${recipe.steps.map(s => `<li>${s}</li>`).join("")}
        </ol>
        ${recipe.tip ? `<div class="recipe-tip"><strong>Tip:</strong> ${recipe.tip}</div>` : ""}
      </div>
    </div>

    <div class="wrap">
      <div class="ad-slot">Advertisement space</div>
      <div class="cta-strip">
        <div>
          <h3>Looking for something else?</h3>
          <p>Browse the full collection of desi recipes on Dastarkhwan.</p>
        </div>
        <a class="btn" href="index.html">Browse all recipes</a>
      </div>
    </div>
  `;
});
