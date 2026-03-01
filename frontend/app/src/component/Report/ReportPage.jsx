import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Report } from "../../Api/UserApi";
import Heading from "../utils/form/Heading";
import FormButton from "../utils/form/FormButton";
import Button from "../Tweet/UserTweet/Button";

export const ReportPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
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
      navigate("/");
    } catch (err) {
      alert(
        "❌ Error submitting report: " +
          (err.response?.data?.message || err.message),
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 space-y-6 mx-4 "
      >
        <Heading label=" Report Content" />

        {/* Textarea registered with useForm */}
        <textarea
          {...register("content", { required: "Content is required" })}
          placeholder="Describe the issue..."
          className="w-full h-40 border border-gray-300 rounded-lg p-3 text-gray-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none sm:text-base text-xs"
        />

        {/* Submit button shows loading state */}
        <div className="flex justify-center">
          <Button
            label={isSubmitting ? "Submitting..." : "Submit"}
            bg="bg-blue-100 text-blue-600  hover:bg-blue-600"
            disable={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default ReportPage;
