import React, { useEffect } from "react";

export default function RecipeView({ open, onClose, recipe }) {
  if (!open || !recipe) return null;

  const image = recipe.image || "https://via.placeholder.com/400x300";
  const tags = Array.isArray(recipe.tags)
    ? recipe.tags
    : recipe.tags
    ? [recipe.tags]
    : [];
  const mealType = Array.isArray(recipe.mealType)
    ? recipe.mealType
    : recipe.mealType
    ? [recipe.mealType]
    : [];

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 anim-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 anim-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Profile / summary */}
        <div className="p-6 bg-gray-50 flex flex-col justify-between">
          <div>
            <div className="w-full h-48 bg-gray-200 overflow-hidden rounded-lg mb-4">
              <img
                src={image}
                alt={recipe.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mb-3">
              <h2 className="text-2xl font-semibold leading-tight text-gray-900">
                {recipe.name}
              </h2>
              <p className="text-sm text-gray-700 mt-1 font-medium">
                {recipe.cuisine || "-"} • {recipe.difficulty || "-"}
              </p>
            </div>

            <div className="rounded-lg bg-white border border-gray-200 shadow-sm">
              <div className="grid grid-cols-2 gap-0">
                <div className="p-3 text-xs text-gray-600 border-b border-gray-200">
                  Servings
                </div>
                <div className="p-3 text-sm font-semibold text-gray-900 border-b border-gray-200">
                  {recipe.servings ?? "-"}
                </div>

                <div className="p-3 text-xs text-gray-600 border-t border-gray-200">
                  Prep / Cook
                </div>
                <div className="p-3 text-sm font-semibold text-gray-900 border-t border-gray-200">
                  {recipe.prepTimeMinutes ?? "-"} /{" "}
                  {recipe.cookTimeMinutes ?? "-"} min
                </div>

                <div className="p-3 text-xs text-gray-600 border-t border-gray-200">
                  Calories
                </div>
                <div className="p-3 text-sm font-semibold text-gray-900 border-t border-gray-200">
                  {recipe.caloriesPerServing ?? "-"}
                </div>

                <div className="p-3 text-xs text-gray-600 border-t border-gray-200">
                  Rating
                </div>
                <div className="p-3 text-sm font-semibold text-gray-900 border-t border-gray-200">
                  {recipe.rating ?? "-"} ({recipe.reviewCount ?? 0})
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 mb-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-900 font-medium anim-chip"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="text-xs text-gray-700 mt-2">
              <div className="font-semibold mb-1">Meal Type</div>
              <div className="text-sm text-gray-900">
                {mealType.length ? mealType.join(", ") : "-"}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              className="w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 anim-btn"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>

        {/* Right: Details */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          <section className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              Ingredients
            </h3>
            <div className="rounded border border-gray-100 bg-white p-3 text-sm text-gray-900">
              <ul className="list-disc pl-5 space-y-2">
                {(Array.isArray(recipe.ingredients)
                  ? recipe.ingredients
                  : []
                ).map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              Instructions
            </h3>
            <div className="rounded border border-gray-100 bg-white p-3 text-sm text-gray-900">
              <ol className="list-decimal pl-5 space-y-3">
                {(Array.isArray(recipe.instructions)
                  ? recipe.instructions
                  : []
                ).map((ins, i) => (
                  <li key={i} className="mb-1">
                    {ins}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <div className="mt-4 text-sm text-gray-800">
            <div className="py-2 border-t border-gray-100">
              <span className="font-semibold text-gray-700">User:</span>{" "}
              <span className="text-gray-900 font-medium">
                {recipe.userId ?? "-"}
              </span>
            </div>
            <div className="py-2 border-t border-gray-100">
              <span className="font-semibold text-gray-700">Difficulty:</span>{" "}
              <span className="text-gray-900 font-medium">
                {recipe.difficulty ?? "-"}
              </span>
            </div>
            <div className="py-2 border-t border-gray-100">
              <span className="font-semibold text-gray-700">Cuisine:</span>{" "}
              <span className="text-gray-900 font-medium">
                {recipe.cuisine ?? "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
