import React, { useState, useEffect } from "react";

export default function AddModal({ open, onClose, onSubmit, loading }) {
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setName("");
      setCuisine("");
      setIngredientsText("");
      setInstructionsText("");
      setPrepTimeMinutes("");
      setCookTimeMinutes("");
      setServings("");
      setDifficulty("");
      setCaloriesPerServing("");
      setTagsText("");
      setMealTypeText("");
      setImage("");
      setErrors({});
    }
  }, [open]);

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

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    const ing = parseLines(ingredientsText);
    if (!ing || ing.length === 0)
      e.ingredients = "At least one ingredient is required";
    const instr = parseLines(instructionsText);
    if (!instr || instr.length === 0)
      e.instructions = "At least one instruction step is required";
    const sv = servings ? Number(servings) : 0;
    if (!sv || sv <= 0) e.servings = "Servings must be a positive number";
    return e;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-filter backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Add Recipe</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const eobj = validate();
            if (Object.keys(eobj).length > 0) {
              setErrors(eobj);
              return;
            }
            const payload = {
              name: name.trim(),
              cuisine: cuisine.trim(),
              ingredients: parseLines(ingredientsText),
              instructions: parseLines(instructionsText),
              prepTimeMinutes: prepTimeMinutes ? Number(prepTimeMinutes) : null,
              cookTimeMinutes: cookTimeMinutes ? Number(cookTimeMinutes) : null,
              servings: servings ? Number(servings) : null,
              difficulty: difficulty.trim() || null,
              caloriesPerServing: caloriesPerServing
                ? Number(caloriesPerServing)
                : null,
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
                className={`w-full border rounded px-3 py-2 bg-white text-gray-900 focus:outline-none focus:ring focus:border-blue-300 ${
                  errors.name ? "border-red-500" : ""
                }`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name)
                    setErrors((p) => ({ ...p, name: undefined }));
                }}
                placeholder="Recipe name"
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
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
                className={`w-full border rounded px-3 py-2 bg-white text-gray-900 ${
                  errors.servings ? "border-red-500" : ""
                }`}
                value={servings}
                onChange={(e) => {
                  setServings(e.target.value);
                  if (errors.servings)
                    setErrors((p) => ({ ...p, servings: undefined }));
                }}
                min={1}
              />
              {errors.servings && (
                <p className="text-sm text-red-600 mt-1">{errors.servings}</p>
              )}
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
                className={`w-full border rounded px-3 py-2 h-28 bg-white text-gray-900 ${
                  errors.ingredients ? "border-red-500" : ""
                }`}
                value={ingredientsText}
                onChange={(e) => {
                  setIngredientsText(e.target.value);
                  if (errors.ingredients)
                    setErrors((p) => ({ ...p, ingredients: undefined }));
                }}
                placeholder={`eg:\nPizza dough\nTomato sauce\nMozzarella`}
              />
              {errors.ingredients && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.ingredients}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Instructions (one step per line)
              </label>
              <textarea
                className={`w-full border rounded px-3 py-2 h-32 bg-white text-gray-900 ${
                  errors.instructions ? "border-red-500" : ""
                }`}
                value={instructionsText}
                onChange={(e) => {
                  setInstructionsText(e.target.value);
                  if (errors.instructions)
                    setErrors((p) => ({ ...p, instructions: undefined }));
                }}
                placeholder={`eg:\nPreheat oven to 475°F\nRoll out dough\nBake for 12-15 minutes`}
              />
              {errors.instructions && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.instructions}
                </p>
              )}
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
                placeholder="Pizza,Italian"
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
                placeholder="Dinner"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
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
