// export default EditPlaylist;
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { editPlaylist } from "../../../Api/Playlistapi";
import UpdateFormThumbnail from "../../Video/EditVideo/UpdateFormThumbnail";
import FormInput from "../../Video/FormInput";
import FormButton from "../../Video/UserVideo/FormButton";
import { handleAxiosError } from "../../utils/erroeHandler";

const EditPlaylist = () => {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { playlist } = location.state || {};
  const {
    register: registerUpdatePlaylist,
    handleSubmit: handleUpdatePlaylistSubmit,
    formState: { errors, isSubmitting: issubmittingUpdatePlaylist },
  } = useForm({
    defaultValues: {
      name: playlist?.name || "",
      description: playlist?.description || "",
      category: playlist?.category || "",
    },
  });

  const [preview, setPreview] = useState(playlist?.thumbnail || "");
  const onSubmit = async (form) => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (form.thumbnail.length > 0) {
      formData.append("thumbnail", form.thumbnail?.[0]);
    } else {
      formData.append("thumbnail", playlist.thumbnail);
    }

    try {
      await editPlaylist(formData, playlistId);

      navigate(`/curr-user/${playlist.owner}/playlist-home`); // redirect after success
    } catch (err) {
      handleAxiosError(err, navigate);
    }
  };

  return (
    <div className="sm:min-h-screen xs:flex items-center justify-center xs:bg-slate-100 xs:p-6 h-fit">
      <form
        onSubmit={handleUpdatePlaylistSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl xs:p-8 p-4 w-full xs:max-w-2xl space-y-5"
      >
        <h2 className="sm:text-2xl text-xl font-serif font-medium sm:font-bold text-gray-800 mb-6 text-center">
          Edit Playlist
        </h2>
        <FormInput
          label="Name"
          name="name"
          placeholder="Enter name here..."
          error={errors.name}
          register={registerUpdatePlaylist}
          rules={{
            required: "name is required",
            minLength: {
              value: 2,
              message: "name must be at least 2 words ",
            },
          }}
        />
        {/* Description */}
        <FormInput
          label="Description"
          name="description"
          placeholder="Enter your description here..."
          error={errors.description}
          register={registerUpdatePlaylist}
          rules={{
            required: "description is required",
            minLength: {
              value: 2,
              message: "description must be at least 25 words ",
            },
          }}
        />

        {/* Category */}
        <FormInput
          label="Category"
          name="category"
          placeholder="Enter category here..."
          error={errors.category}
          register={registerUpdatePlaylist}
          rules={{
            required: "category is required",
            minLength: {
              value: 2,
              message: "category must be at least 2 words ",
            },
          }}
        />
        {/* Thumbnail Upload */}
        <UpdateFormThumbnail
          label=" Upload Thumbnail"
          register={registerUpdatePlaylist}
          className="w-full"
          name="thumbnail"
          error={errors.thumbnail}
          rules={{
            required: playlist.thumbnail ? false : "thumbnail is required",
          }}
          preview={preview}
          data={playlist}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setPreview(url);
            } else {
              setPreview(playlist.thumbnail);
            }
          }}
        />

        {/* Submit Button */}
        <FormButton
          navigate={navigate}
          isSubmitting={issubmittingUpdatePlaylist}
        />
      </form>
    </div>
  );
};

export default EditPlaylist;
