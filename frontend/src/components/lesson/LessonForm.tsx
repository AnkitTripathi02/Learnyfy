import { useEffect, useState } from "react";

interface LessonFormProps {
  initialData?: any;
  onSuccess: (lesson: any) => void;
}

const LessonForm = ({
  initialData,
  onSuccess,
}: LessonFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
    duration: "",
    order: 0,
    is_preview: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        video_url: initialData.video_url || "",
        duration: initialData.duration || "",
        order: initialData.order || 0,
        is_preview: initialData.is_preview || false,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSuccess(formData);

    if (!initialData) {
      setFormData({
        title: "",
        description: "",
        video_url: "",
        duration: "",
        order: 0,
        is_preview: false,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="text-sm text-gray-400">
          Lesson Title
        </label>

        <input
          className="mt-2 w-full rounded-lg bg-[#0b0914] p-3 text-white outline-none"
          placeholder="Introduction to React"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          required
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">
          Description
        </label>

        <textarea
          rows={4}
          className="mt-2 w-full rounded-lg bg-[#0b0914] p-3 text-white outline-none"
          placeholder="Lesson Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">
          Video URL
        </label>

        <input
          className="mt-2 w-full rounded-lg bg-[#0b0914] p-3 text-white outline-none"
          placeholder="https://youtube.com/..."
          value={formData.video_url}
          onChange={(e) =>
            setFormData({
              ...formData,
              video_url: e.target.value,
            })
          }
          required
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">
          Duration
        </label>

        <input
          className="mt-2 w-full rounded-lg bg-[#0b0914] p-3 text-white outline-none"
          placeholder="15 min"
          value={formData.duration}
          onChange={(e) =>
            setFormData({
              ...formData,
              duration: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">
          Order
        </label>

        <input
          type="number"
          className="mt-2 w-full rounded-lg bg-[#0b0914] p-3 text-white outline-none"
          value={formData.order}
          onChange={(e) =>
            setFormData({
              ...formData,
              order: Number(e.target.value),
            })
          }
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={formData.is_preview}
          onChange={(e) =>
            setFormData({
              ...formData,
              is_preview: e.target.checked,
            })
          }
        />

        <label className="text-gray-300">
          Free Preview
        </label>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700"
      >
        {initialData ? "Update Lesson" : "Save Lesson"}
      </button>
    </form>
  );
};

export default LessonForm;