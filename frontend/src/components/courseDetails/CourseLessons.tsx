interface Props {
  lessons: any[];
  isAdmin: boolean;
  onEdit: (lesson: any) => void;
  onDelete: (lesson: any) => void;
}

const CourseLessons = ({
  lessons,
  isAdmin,
  onEdit,
  onDelete,
}: Props) => {

  if (!lessons.length)
    return (
      <p className="mt-4 text-gray-400">
        No lessons available.
      </p>
    );

  return (
    <div className="mt-5 space-y-3">

      {lessons.map((lesson) => (

        <div
          key={lesson.id}
          className="flex items-center justify-between rounded-xl bg-[#221b33] p-4"
        >

          <div>

            <h4 className="font-semibold">
              {lesson.title}
            </h4>

            <p className="text-sm text-gray-400">
              {lesson.duration}
            </p>

          </div>

          {isAdmin && (

            <div className="flex gap-2">

              <button
                onClick={() => onEdit(lesson)}
                className="rounded-lg bg-blue-600 px-4 py-2"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(lesson)}
                className="rounded-lg bg-red-600 px-4 py-2"
              >
                Delete
              </button>

            </div>

          )}

        </div>

      ))}

    </div>
  );
};

export default CourseLessons;