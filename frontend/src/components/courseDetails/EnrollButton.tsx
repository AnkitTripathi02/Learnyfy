interface Props {
  onEnroll: () => void;
}

const EnrollButton = ({
  onEnroll,
}: Props) => {
  return (
    <button
      onClick={onEnroll}
      className="w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold transition hover:bg-indigo-700"
    >
      Enroll Now
    </button>
  );
};

export default EnrollButton;