import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Report } from "../../Api/UserApi";

export const ReportPage = () => {
  const { userId} = useParams();

  // initialize useForm
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm();

  // submit handler
  const onSubmit = async (data) => {
    try {
      const res = await Report({ content: data.content }, userId);
      console.log(res.data);
      alert("✅ Report submitted successfully!");
      reset(); // clears the form
    } catch (err) {
      alert(
        "❌ Error submitting report: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-blue-700 text-center">
          Report Content
        </h2>

        {/* Textarea registered with useForm */}
        <textarea
          {...register("content", { required: "Content is required" })}
          placeholder="Describe the issue..."
          className="w-full h-40 border border-gray-300 rounded-lg p-3 text-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        {/* Submit button shows loading state */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg 
                     hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ReportPage;
