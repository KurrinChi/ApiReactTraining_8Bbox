import React, { useState, useMemo } from "react";
import RecipeView from "./RecipeView";

export default function RecipeTable({
  recipes,
  isLoading,
  isError,
  error,
  onEdit,
  onDelete,
  deleteLoading,
}) {
  const [filterName, setFilterName] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [viewRecipe, setViewRecipe] = useState(null);

  const displayRecipes = useMemo(() => {
    if (!recipes) return [];
    const q = (filterName || "").trim().toLowerCase();
    let list = recipes;

    if (q) {
      list = list.filter((r) => (r.name || "").toLowerCase().includes(q));
    }

    if (selectedTags && selectedTags.length > 0) {
      const sel = new Set(selectedTags.map((s) => s.toLowerCase()));
      list = list.filter((r) => {
        const tags = Array.isArray(r.tags) ? r.tags : r.tags ? [r.tags] : [];
        return tags.some((t) => sel.has(String(t).toLowerCase()));
      });
    }

    return list;
  }, [recipes, filterName, selectedTags]);

  const allTags = useMemo(() => {
    if (!recipes) return [];
    const s = new Set();
    recipes.forEach((r) => {
      const tags = Array.isArray(r.tags) ? r.tags : r.tags ? [r.tags] : [];
      tags.forEach((t) => {
        if (t || t === 0) s.add(String(t).trim());
      });
    });
    return Array.from(s)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [recipes]);

  function tagTintClass(tag) {
    // deterministic hash to pick a shade index
    let h = 0;
    for (let i = 0; i < tag.length; i++) {
      h = (h << 5) - h + tag.charCodeAt(i);
      h |= 0;
    }
    const idx = Math.abs(h) % 7; // 7 tint variations
    const shades = [
      "bg-red-50 text-red-800",
      "bg-red-100 text-red-800",
      "bg-red-200 text-red-800",
      "bg-red-300 text-red-800",
      "bg-red-400 text-white",
      "bg-red-500 text-white",
      "bg-red-600 text-white",
    ];
    return shades[idx];
  }

  const placeholderImage =
    "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg";

  const tagScrollStyle = `
  /* subtle bottom scrollbar for tag chips */
  .recipe-tags-scroll { -ms-overflow-style: auto; scrollbar-width: thick; }
  .recipe-tags-scroll::-webkit-scrollbar { height: 8px; }
  .recipe-tags-scroll::-webkit-scrollbar-track { background: transparent; border-radius: 9999px; }
  .recipe-tags-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.5); border-radius: 9999px; transition: background .12s, opacity .12s; }
  .recipe-tags-scroll:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.16); }
  `;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 px-2">
        {/* Tag filter chips */}
        <div className="mt-2 sm:mt-0 w-full ">
          <style>{tagScrollStyle}</style>
          <div className="overflow-hidden w-full">
            <style>{tagScrollStyle}</style>
            <div className="recipe-tags-scroll overflow-x-auto">
              <div className="flex gap-2 items-center py-1">
                {allTags.length === 0 ? (
                  <div className="text-sm text-gray-500">No tags</div>
                ) : (
                  allTags.map((tag) => {
                    const active = selectedTags.includes(tag);
                    const tint = tagTintClass(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() =>
                          setSelectedTags((s) =>
                            s.includes(tag)
                              ? s.filter((t) => t !== tag)
                              : [...s, tag]
                          )
                        }
                        className={`text-xs px-2 py-0.5 rounded-full transition-all whitespace-nowrap border ${tint} ${
                          active
                            ? "ring-2 ring-purple-400 border-purple-800 bg-purple-700 text-white shadow-sm"
                            : "border-transparent"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })
                )}

                {allTags.length > 0 && (
                  <button
                    className="ml-2 px-2 py-0.5 text-sm rounded bg-transparent text-red-300 border border-transparent hover:bg-red-800/20"
                    onClick={() => setSelectedTags([])}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error state */}
      {isError && (
        <div className="mb-3 px-4 py-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded">
          {error?.message || "Something went wrong loading recipes."}
        </div>
      )}

      {/* Card grid view */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading ? (
          <div className="col-span-full py-4 text-center text-gray-700">
            Loading...
          </div>
        ) : displayRecipes.length === 0 ? (
          <div className="col-span-full py-4 text-center text-gray-700">
            No recipes found.
          </div>
        ) : (
          displayRecipes.map((recipe) => {
            const imageSrc = recipe.image || placeholderImage;

            const tagsArray = Array.isArray(recipe.tags)
              ? recipe.tags
              : recipe.tags
              ? [recipe.tags]
              : [];

            const mealTypeArray = Array.isArray(recipe.mealType)
              ? recipe.mealType
              : recipe.mealType
              ? [recipe.mealType]
              : [];

            return (
              <div
                key={recipe.id}
                className="relative bg-white rounded-2xl shadow border flex flex-col overflow-hidden"
              >
                {/* Eye view button top-right */}
                <button
                  onClick={() => setViewRecipe(recipe)}
                  aria-label={`View ${recipe.name}`}
                  className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-gray-700 hover:bg-white shadow-sm border"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-5 h-5"
                  >
                    <path d="M2.5 12s4-7 9.5-7 9.5 7 9.5 7-4 7-9.5 7S2.5 12 2.5 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
                {/* Image */}
                <div className="w-full h-40 bg-gray-100 overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Name and cuisine */}
                  <div className="mb-2">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      {recipe.name || "Untitled recipe"}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {recipe.cuisine || "Unknown cuisine"} •{" "}
                      {recipe.difficulty || "Unknown difficulty"}
                    </p>
                  </div>

                  {/* Meta stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                    <div>
                      <p className="font-medium text-gray-800">
                        Servings: {recipe.servings ?? "-"}
                      </p>
                      <p>Prep: {recipe.prepTimeMinutes ?? "-"} min</p>
                    </div>
                    <div>
                      <p>Cook: {recipe.cookTimeMinutes ?? "-"} min</p>
                      <p>Calories: {recipe.caloriesPerServing ?? "-"}</p>
                    </div>
                    <div>
                      <p>Rating: {recipe.rating ?? "-"}</p>
                      <p>Reviews: {recipe.reviewCount ?? "-"}</p>
                    </div>
                    <div>
                      <p>
                        Meal:{" "}
                        {mealTypeArray.length > 0
                          ? mealTypeArray.join(", ")
                          : "-"}
                      </p>
                    </div>
                  </div>

                  {/* Tags as pills */}
                  {tagsArray.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {tagsArray.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[11px] px-2 py-0.5 rounded-full ${tagTintClass(
                            String(tag)
                          )}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-auto pt-2 flex gap-2">
                    <button
                      className="flex-1 px-3 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
                      onClick={() => onEdit(recipe)}
                    >
                      Edit
                    </button>

                    <button
                      className="flex-1 px-3 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                      onClick={() => onDelete(recipe.id)}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <RecipeView
        open={!!viewRecipe}
        onClose={() => setViewRecipe(null)}
        recipe={viewRecipe}
      />
    </div>
  );
}
