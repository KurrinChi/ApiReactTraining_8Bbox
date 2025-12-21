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

class ValidationError extends Error {
  constructor(message, questions = []) {
    super(message);
    this.name = "ValidationError";
    this.questions = questions;
  }
}

const REQUIRED_FOR_CREATE = ["name", "ingredients", "instructions", "servings"];

function generateQuestionForField(field) {
  const map = {
    name: "What's the recipe name?",
    ingredients: "Please list ingredients (array or comma-separated string).",
    instructions:
      "Please provide step-by-step instructions (array or numbered list).",
    prepTimeMinutes: "How many minutes to prepare?",
    cookTimeMinutes: "How many minutes to cook?",
    servings: "How many servings does this make?",
    difficulty: "What's the difficulty (Easy/Medium/Hard)?",
    cuisine: "Which cuisine is this (e.g., Italian)?",
    caloriesPerServing: "Approx calories per serving?",
    tags: "Any tags (array or comma-separated)?",
    userId: "Which user id created this recipe?",
    image: "Image URL for the recipe?",
    rating: "Initial rating (optional)?",
    reviewCount: "Initial review count (optional)?",
    mealType: "Meal types (Breakfast/Lunch/Dinner) (array or comma-separated)?",
  };
  return map[field] || `Please provide a value for ${field}`;
}

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
    const questions = [...missing.map(generateQuestionForField)];
    const msgParts = [];
    if (missing.length) msgParts.push(`Missing fields: ${missing.join(", ")}`);
    if (typeIssues.length)
      msgParts.push(`Type issues: ${typeIssues.join("; ")}`);
    throw new ValidationError(msgParts.join(" | "), questions);
  }

  return recipe;
}

export async function fetchRecipes() {
  const res = await axios.get(API_URL);
  const list = res.data?.recipes || [];
  return list.map(normalizeRecipe);
}

export async function addRecipe(payload, { interactive = false } = {}) {
  try {
    const normalized = validateRecipe(payload, { partial: false });
    const res = await axios.post(`${API_URL}/add`, normalized);
    return normalizeRecipe(res.data);
  } catch (err) {
    if (err instanceof ValidationError) {
      if (interactive) return { ok: false, questions: err.questions };
      throw err;
    }
    throw err;
  }
}

export async function updateRecipe(
  id,
  payload,
  { partial = true, interactive = false } = {}
) {
  try {
    const normalized = validateRecipe(payload, { partial });
    const res = await axios.put(`${API_URL}/${id}`, normalized);
    return normalizeRecipe(res.data);
  } catch (err) {
    if (err instanceof ValidationError) {
      if (interactive) return { ok: false, questions: err.questions };
      throw err;
    }
    throw err;
  }
}

export async function deleteRecipe(id) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}
