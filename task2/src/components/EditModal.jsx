import React, { useState, useEffect } from "react";

export default function EditModal({
  open,
  onClose,
  onSubmit,
  initialData,
  loading,
}) {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");
  const [prepTimeMinutes, setPrepTimeMinutes] = useState("");
  const [cookTimeMinutes, setCookTimeMinutes] = useState("");
  const [servings, setServings] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [caloriesPerServing, setCaloriesPerServing] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [mealTypeText, setMealTypeText] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (open) {
      setName(initialData?.name || "");
      setCuisine(initialData?.cuisine || "");
      setIngredientsText(
        Array.isArray(initialData?.ingredients)
          ? initialData.ingredients.join("\n")
          : initialData?.ingredients || ""
      );
      setInstructionsText(
        Array.isArray(initialData?.instructions)
          ? initialData.instructions.join("\n")
          : initialData?.instructions || ""
      );
      setPrepTimeMinutes(initialData?.prepTimeMinutes ?? "");
      setCookTimeMinutes(initialData?.cookTimeMinutes ?? "");
      setServings(initialData?.servings ?? "");
      setDifficulty(initialData?.difficulty ?? "");
      setCaloriesPerServing(initialData?.caloriesPerServing ?? "");
      setTagsText(
        Array.isArray(initialData?.tags)
          ? initialData.tags.join(", ")
          : initialData?.tags || ""
      );
      setMealTypeText(
        Array.isArray(initialData?.mealType)
          ? initialData.mealType.join(", ")
          : initialData?.mealType || ""
      );
      setImage(initialData?.image ?? "");
    }
  }, [open, initialData]);

  if (!open) return null;

  function parseLines(text) {
    return text
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function parseComma(text) {
    return text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-filter backdrop-blur-sm anim-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-gray-900 anim-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Edit Recipe</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const payload = {
              name: name.trim(),
              cuisine: cuisine.trim(),
              ingredients: parseLines(ingredientsText),
              instructions: parseLines(instructionsText),
              prepTimeMinutes:
                prepTimeMinutes !== "" ? Number(prepTimeMinutes) : null,
              cookTimeMinutes:
                cookTimeMinutes !== "" ? Number(cookTimeMinutes) : null,
              servings: servings !== "" ? Number(servings) : null,
              difficulty: difficulty.trim() || null,
              caloriesPerServing:
                caloriesPerServing !== "" ? Number(caloriesPerServing) : null,
              tags: parseComma(tagsText),
              mealType: parseComma(mealTypeText),
              image: image.trim() || null,
            };
            onSubmit(payload);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring focus:border-blue-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Recipe name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cuisine</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring focus:border-blue-300"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="Cuisine type"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Servings</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 bg-white text-gray-900"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                min={1}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Difficulty
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 bg-white text-gray-900"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                placeholder="Easy / Medium / Hard"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Prep Time (min)
              </label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 bg-white text-gray-900"
                value={prepTimeMinutes}
                onChange={(e) => setPrepTimeMinutes(e.target.value)}
                min={0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Cook Time (min)
              </label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 bg-white text-gray-900"
                value={cookTimeMinutes}
                onChange={(e) => setCookTimeMinutes(e.target.value)}
                min={0}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Ingredients (one per line)
              </label>
              <textarea
                className="w-full border rounded px-3 py-2 h-28 bg-white text-gray-900"
                value={ingredientsText}
                onChange={(e) => setIngredientsText(e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Instructions (one step per line)
              </label>
              <textarea
                className="w-full border rounded px-3 py-2 h-32 bg-white text-gray-900"
                value={instructionsText}
                onChange={(e) => setInstructionsText(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Calories per serving
              </label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 bg-white text-gray-900"
                value={caloriesPerServing}
                onChange={(e) => setCaloriesPerServing(e.target.value)}
                min={0}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Image URL
              </label>
              <input
                type="url"
                className="w-full border rounded px-3 py-2 bg-white text-gray-900"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 bg-white text-gray-900"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Meal Type (comma separated)
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 bg-white text-gray-900"
                value={mealTypeText}
                onChange={(e) => setMealTypeText(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 anim-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 anim-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
