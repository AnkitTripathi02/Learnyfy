import CourseLessons from "./CourseLessons";

interface Props {
  modules: any[];
  lessons: Record<string, any[]>;
  isAdmin: boolean;

  onAddModule: () => void;
  onEditModule: (module: any) => void;
  onDeleteModule: (id: string) => void;

  onAddLesson: (moduleId: string) => void;
  onEditLesson: (moduleId: string, lesson: any) => void;
  onDeleteLesson: (
    moduleId: string,
    lesson: any
  ) => void;
}

const CourseModules = ({
  modules,
  lessons,
  isAdmin,
  onAddModule,
  onEditModule,
  onDeleteModule,
  onAddLesson,
  onEditLesson,
  onDeleteLesson,
}: Props) => {
  return (
    <div className="rounded-3xl bg-[#161122] p-8 shadow-xl">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Course Modules
        </h2>

        {isAdmin && (
          <button
            onClick={onAddModule}
            className="rounded-xl bg-indigo-600 px-5 py-3"
          >
            + Add Module
          </button>
        )}

      </div>

      {modules.length === 0 ? (

        <p className="text-gray-400">
          No modules available.
        </p>

      ) : (

        modules.map((module) => (

          <div
            key={module.id}
            className="mb-6 rounded-2xl bg-[#221b33] p-6"
          >

            <div className="flex justify-between">

              <div>

                <h3 className="text-xl font-bold">
                  {module.title}
                </h3>

                <p className="mt-2 text-gray-400">
                  {module.description}
                </p>

              </div>

              {isAdmin && (

                <div className="flex gap-2">

                  <button
                    onClick={() => onEditModule(module)}
                    className="rounded bg-blue-600 px-4 py-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDeleteModule(module.id)
                    }
                    className="rounded bg-red-600 px-4 py-2"
                  >
                    Delete
                  </button>

                </div>

              )}

            </div>

            {isAdmin && (

              <button
                onClick={() =>
                  onAddLesson(module.id)
                }
                className="mt-5 rounded bg-green-600 px-4 py-2"
              >
                + Add Lesson
              </button>

            )}

            <CourseLessons
              lessons={lessons[module.id] || []}
              isAdmin={isAdmin}
              onEdit={(lesson) =>
                onEditLesson(module.id, lesson)
              }
              onDelete={(lesson) =>
                onDeleteLesson(module.id, lesson)
              }
            />

          </div>

        ))

      )}

    </div>
  );
};

export default CourseModules;