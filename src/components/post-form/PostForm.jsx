import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../store/postSlice";

export default function PostForm({ post }) {
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
            category: post?.category || "technology",
            customCategory: post?.category && !["technology", "science", "lifestyle", "experience", "other"].includes(post.category) ? post.category : "",
        },
    });

    function fetchPosts() {
        appwriteService.listPosts().then((res) => {
            dispatch(setPosts(res.rows));
            res.rows && console.log("Posts in store updated");
        }).catch((error) => {
            console.error("Error fetching posts:", error);
        });   
    }
    

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.user);
    // console.log("PostForm userData:", userData);

    const submit = async (data) => {
        // console.log("Post form data:", data);
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost({
                ...data,
                slug: post.$id,
                featuredImage: file ? file.$id : post.featuredImage,
                authorID: post.authorID,
            });

            if (dbPost) {
                fetchPosts();
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            if (!userData) {
                alert("You must be logged in to create a post.");
                return;
            }
            // console.log("userData:", userData);
            if (!userData.userData.$id) {
                alert("User ID is missing. Cannot create post. Please re-login.");
                return;
            }
            const file = await appwriteService.uploadFile(data.image[0]);
            

            const publishedDate = new Date();

            if (file) {
                data.featuredImage = file.$id;
                const dbPost = await appwriteService.createPost({ ...data,publishedDate , authorID: userData.userData.$id });
                if (dbPost) {
                    fetchPosts();
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const selectedCategory = watch("category");
    return (
        <form
            onSubmit={handleSubmit((data) => {
                // If 'other' is selected, use customCategory as category
                if (data.category === "other" && data.customCategory) {
                    data.category = data.customCategory;
                }
                submit(data);
            })}
            className="w-full flex flex-wrap lg:flex-row flex-col"
        >
            <div className="w-full flex flex-wrap mb-6 lg:flex-row flex-col">
                {/* Inputs and Button */}
                <div className="lg:w-1/3 w-full px-2 order-1">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    {/* Category Dropdown */}
                    <Select
                        options={["technology", "science", "lifestyle", "experience", "other"]}
                        label="Category"
                        className="mb-4"
                        name="category"
                        {...register("category", { required: true })}
                    />
                    {selectedCategory === "other" && (
                        <Input
                            label="Custom Category :"
                            placeholder="Enter category"
                            className="mb-4"
                            {...register("customCategory", { required: true })}
                        />
                    )}
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        name="status"
                        {...register("status", { required: true })}
                    />
                </div>
                {/* RTE - Text Editor */}
                <div className="lg:w-2/3 w-full px-2 order-2 mt-4 lg:mt-0">
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                {/* Submit Button at the bottom on small screens */}
                <div className="w-full px-2 order-3 mt-4 lg:hidden">
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
                {/* Submit Button for large screens (keep original position) */}
                <div className="w-full px-2 order-3 mt-4 hidden lg:block">
                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </div>
        </form>
    );
}