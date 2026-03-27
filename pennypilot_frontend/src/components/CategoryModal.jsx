import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { useCreateCategoryMutation } from "../store/services/categoryApi";
import EmojiPicker from "emoji-picker-react";

const CategoryModal = ({ isOpen, onClose }) => {
  const [createCategory, { isLoading, error }] = useCreateCategoryMutation();

  const [categoryData, setCategoryData] = useState({
    name: "",
    icon: "",
    color: "#6366f1",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCategory(categoryData).unwrap();

      // reset form
      setCategoryData({
        name: "",
        icon: "",
        color: "#6366f1",
      });

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-text text-xl font-bold">
            Create Category
          </h2>

          <button
            onClick={onClose}
            className="text-muted hover:text-text cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Category Name */}
          <Input
            label="Name"
            type="text"
            id="name"
            placeholder="Enter Category Name"
            value={categoryData.name}
            onChange={(e) =>
              setCategoryData({
                ...categoryData,
                name: e.target.value,
              })
            }
          />

          {/* Emoji Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-muted text-lg">Icon</label>

            {categoryData.icon && (
              <div className="text-3xl">
                {categoryData.icon}
              </div>
            )}

            <EmojiPicker
              onEmojiClick={(emojiData) =>
                setCategoryData((prev) => ({
                  ...prev,
                  icon: emojiData.emoji,
                }))
              }
              theme="dark"
              width="100%"
              height={350}
            />
          </div>

          {/* Color Picker */}
          <div
      className="w-8 h-8 rounded-md border border-border"
      style={{ backgroundColor: categoryData.color }}
    ></div>
          <Input
            label="Color"
            type="color"
            id="color"
            value={categoryData.color}
            onChange={(e) =>
              setCategoryData({
                ...categoryData,
                color: e.target.value,
              })
            }
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">
              Failed to create category
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Add Category"}
            </Button>

            <Button
              variant="outline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CategoryModal;