import React, { useState, useMemo } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} from "./api/recipes";
import RecipeTable from "./components/RecipeTable";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";

// Create QueryClient for TanStack Query
const rootQueryClient = new QueryClient();

function AppContent() {
  const [isAddOpen, setAddOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();

  // Fetch recipes
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });

  // v5 mutation syntax
  const addMutation = useMutation({
    mutationFn: addRecipe,
    // Optimistic update: add to cache immediately
    onMutate: async (newRecipe) => {
      await queryClient.cancelQueries({ queryKey: ["recipes"] });
      const previous = queryClient.getQueryData(["recipes"]) || [];
      const tempId = `temp-${Date.now()}`;
      const optimistic = { id: tempId, ...newRecipe };
      queryClient.setQueryData(["recipes"], (old) =>
        old ? [...old, optimistic] : [optimistic]
      );
      return { previous, tempId };
    },
    onError: (err, newRecipe, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["recipes"], context.previous);
      }
    },
    onSuccess: (data, variables, context) => {
      // Replace optimistic item with server-provided item
      if (context?.tempId) {
        queryClient.setQueryData(["recipes"], (old) =>
          (old || []).map((item) => (item.id === context.tempId ? data : item))
        );
      }
      setAddOpen(false);
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, payload }) => updateRecipe(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      setEditOpen(false);
      setSelectedRecipe(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRecipe,
    // Optimistic remove: remove item from cache immediately
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["recipes"] });
      const previous = queryClient.getQueryData(["recipes"]) || [];
      queryClient.setQueryData(["recipes"], (old) =>
        (old || []).filter((r) => r.id !== id)
      );
      return { previous };
    },
    onError: (err, id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["recipes"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  const filteredRecipes = useMemo(() => {
    if (!data) return [];
    return data.filter((r) =>
      (r.name || "").toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [data, search]);

  const handleAdd = () => setAddOpen(true);

  const handleEdit = (recipe) => {
    setSelectedRecipe(recipe);
    setEditOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this recipe?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-[color:#212121] p-4 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Pizza Shop CRUD</h1>

        <div className="flex items-center justify-between mb-4 gap-2">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300 mr-3"
            placeholder="Search by pizza name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={handleAdd}
          >
            Add Pizza
          </button>
        </div>

        <RecipeTable
          recipes={filteredRecipes}
          isLoading={isLoading}
          isError={isError}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deleteLoading={deleteMutation.isLoading}
        />

        <AddModal
          open={isAddOpen}
          onClose={() => setAddOpen(false)}
          onSubmit={(data) => addMutation.mutate(data)}
          loading={addMutation.isLoading}
        />

        <EditModal
          open={isEditOpen}
          initialData={selectedRecipe}
          onClose={() => {
            setEditOpen(false);
            setSelectedRecipe(null);
          }}
          onSubmit={(payload) =>
            editMutation.mutate({ id: selectedRecipe?.id, payload })
          }
          loading={editMutation.isLoading}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={rootQueryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
