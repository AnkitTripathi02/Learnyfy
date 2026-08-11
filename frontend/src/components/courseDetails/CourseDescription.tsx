interface Props {
  course: any;
}

const CourseDescription = ({ course }: Props) => {
  return (
    <div className="rounded-3xl bg-[#161122] p-8 shadow-xl">

      <h2 className="mb-6 text-3xl font-bold">
        About this Course
      </h2>

      <p className="leading-8 text-gray-300">
        {course.description}
      </p>

      <div className="mt-10">

        <h3 className="mb-5 text-2xl font-semibold">
          What You'll Learn
        </h3>

        <div className="grid gap-4 md:grid-cols-2">

          <div className="rounded-xl bg-[#221b33] p-4">
            ✅ Build Real Projects
          </div>

          <div className="rounded-xl bg-[#221b33] p-4">
            ✅ Industry Best Practices
          </div>

          <div className="rounded-xl bg-[#221b33] p-4">
            ✅ Lifetime Access
          </div>

          <div className="rounded-xl bg-[#221b33] p-4">
            ✅ Certificate of Completion
          </div>

        </div>

      </div>

    </div>
  );
};

export default CourseDescription;