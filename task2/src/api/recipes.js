import axios from "axios";

const API_URL = "https://dummyjson.com/recipes";

function isArrayOfStrings(val) {
  return Array.isArray(val) && val.every((v) => typeof v === "string");
}

function toArrayOfStrings(val) {
  if (Array.isArray(val)) return val.map((v) => String(v));
  if (typeof val === "string")
    return val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

function normalizeRecipe(r) {
  const recipe = { ...(r || {}) };
  recipe.id = recipe.id ?? null;
  recipe.name = recipe.name ?? "";
  recipe.ingredients = isArrayOfStrings(recipe.ingredients)
    ? recipe.ingredients
    : toArrayOfStrings(recipe.ingredients);
  recipe.instructions = isArrayOfStrings(recipe.instructions)
    ? recipe.instructions
    : toArrayOfStrings(recipe.instructions);
  recipe.prepTimeMinutes =
    recipe.prepTimeMinutes != null ? Number(recipe.prepTimeMinutes) : null;
  recipe.cookTimeMinutes =
    recipe.cookTimeMinutes != null ? Number(recipe.cookTimeMinutes) : null;
  recipe.servings = recipe.servings != null ? Number(recipe.servings) : null;
  recipe.difficulty = recipe.difficulty ?? "";
  recipe.cuisine = recipe.cuisine ?? "";
  recipe.caloriesPerServing =
    recipe.caloriesPerServing != null
      ? Number(recipe.caloriesPerServing)
      : null;
  recipe.tags = isArrayOfStrings(recipe.tags)
    ? recipe.tags
    : toArrayOfStrings(recipe.tags);
  recipe.userId = recipe.userId != null ? Number(recipe.userId) : null;
  recipe.image = recipe.image ?? "";
  recipe.rating = recipe.rating != null ? Number(recipe.rating) : null;
  recipe.reviewCount =
    recipe.reviewCount != null ? Number(recipe.reviewCount) : null;
  recipe.mealType = isArrayOfStrings(recipe.mealType)
    ? recipe.mealType
    : toArrayOfStrings(recipe.mealType);
  return recipe;
}

const REQUIRED_FOR_CREATE = ["name", "ingredients", "instructions", "servings"];
function validateRecipe(payload, { partial = false } = {}) {
  const recipe = normalizeRecipe(payload);
  const missing = [];
  if (!partial) {
    for (const key of REQUIRED_FOR_CREATE) {
      const val = recipe[key];
      if (
        val === null ||
        val === undefined ||
        (typeof val === "string" && val.trim() === "") ||
        (Array.isArray(val) && val.length === 0)
      ) {
        missing.push(key);
      }
    }
  }

  const typeIssues = [];
  if (recipe.ingredients && !isArrayOfStrings(recipe.ingredients))
    typeIssues.push("ingredients should be an array of strings");
  if (recipe.instructions && !isArrayOfStrings(recipe.instructions))
    typeIssues.push("instructions should be an array of strings");

  if (missing.length || typeIssues.length) {
    const msgParts = [];
    if (missing.length) msgParts.push(`Missing fields: ${missing.join(", ")}`);
    if (typeIssues.length)
      msgParts.push(`Type issues: ${typeIssues.join("; ")}`);
    throw new Error(msgParts.join(" | "));
  }

  return recipe;
}

export async function fetchRecipes() {
  const res = await axios.get(API_URL);
  const list = res.data?.recipes || [];
  return list.map(normalizeRecipe);
}

export async function addRecipe(payload) {
  const normalized = validateRecipe(payload, { partial: false });
  const res = await axios.post(`${API_URL}/add`, normalized);
  return normalizeRecipe(res.data);
}

export async function updateRecipe(id, payload, { partial = true } = {}) {
  const normalized = validateRecipe(payload, { partial });
  const res = await axios.put(`${API_URL}/${id}`, normalized);
  return normalizeRecipe(res.data);
}

export async function deleteRecipe(id) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}
