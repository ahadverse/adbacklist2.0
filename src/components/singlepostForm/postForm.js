import React, { useState } from "react";
import categories from "../../../public/category.json";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  TextInput,
  Select,
  Group,
  Image,
  SimpleGrid,
  Paper,
  Text,
  Radio,
  Stack,
  Checkbox,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { FaTrash } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useMyContext } from "../user";
import { ImSpinner10 } from "react-icons/im";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const slugify = (str) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/&/g, "-and-") // replace "&" with "-and-"
    .replace(/\s+/g, "-") // spaces → "-"
    .replace(/[^a-z0-9-]/g, "") // remove other invalid chars
    .replace(/-+/g, "-") // collapse multiple "-"
    .replace(/^-|-$/g, ""); // trim leading/trailing "-"
};

const initialState = {
  name: "",
  category: "",
  email: "",
  subCategory: "",
  description: "",
  age: "",
  phone: "",
  premiumDay: 0,
  isPremium: false,
  isApproved: false,
  images: [],
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const SinglePostForm = () => {
  const router = useRouter();
  const { users, setUser } = useMyContext();
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [images, setImages] = useState([]); // {file, url}
  const [selectedPremium, setSelectedPremium] = useState("0");
  const [premiumCost, setPremiumCost] = useState(0);

  const handleInput = (type, value) => {
    setState({ ...state, [type]: value });
  };

  const subCategories = categories.find((c) => c.name === state.category);

  const topForDays = (value) => {
    const mapping = {
      0: { days: 0, isPremium: false, isApproved: true, cost: 0 },
      7: { days: 7, isPremium: true, isApproved: true, cost: 7 },
      10: { days: 15, isPremium: true, isApproved: true, cost: 10 },
      15: { days: 30, isPremium: true, isApproved: true, cost: 15 },
    };
    const selected = mapping[value];
    setState({
      ...state,
      premiumDay: selected.days,
      isPremium: selected.isPremium,
      isApproved: selected.isApproved,
    });
    setPremiumCost(selected.cost);
  };

  const handleFileChange = (files) => {
    if (!files) return;
    if (images.length + files.length > 4) {
      toast.error("Max 4 images allowed");
      return;
    }

    const newImages = [...images];
    [...files].forEach((file) => {
      if (file.size > 100000) {
        toast.error("Max image size is 100kb");
        return;
      }
      newImages.push({ file, url: URL.createObjectURL(file) });
    });

    setImages(newImages);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async () => {
    if (!state.name || !state.category || !state.email || !state.subCategory) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    const data = { ...state };
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((img) => formData.append("images", img.file));

      try {
        const res = await fetch(
          "https://adbacklist-backend2-0-vb3d.vercel.app/api/files2/files",
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await res.json();
        data.images = result ?? "empty";
      } catch (err) {
        console.error(err);
        toast.error("Image upload failed!");
        setLoading(false);
        return;
      }
    }

    data.cities = [
      `${router.query.name?.charAt(0) + router.query.name?.slice(1)}`,
    ];

    data.posterId = session?.user?.id;
    data.category = slugify(state.category);
    data.subCategory = slugify(state.subCategory);

    try {
      const res = await fetch(
        "https://adbacklist-backend2-0-vb3d.vercel.app/api/posts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await res.json();
      const newCredit = users?.credit - premiumCost;

      await axios.put(
        `https://adbacklist-backend2-0-vb3d.vercel.app/api/users/credit/${session?.user?.id}`,
        {
          credit: newCredit?.toFixed(2),
        }
      );

      setUser({ ...users, credit: newCredit });
      toast.success("Post submitted successfully!");
      router.push("/dashboard/posts");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      // shadow='md'
      radius='md'
      p='xl'
      withBorder
      className='xl:max-w-2xl w-full mx-auto'
    >
      <Text size='xl' weight={700} mb='lg'>
        Create New Post{" "}
        <span className=' text-pink-800 font-bold'>
          (${premiumCost?.toFixed(2)})
        </span>
      </Text>

      <Stack spacing='md'>
        {/* Image Upload / Dropzone */}
        <div>
          {images?.length < 4 && (
            <Dropzone
              onDrop={handleFileChange}
              onReject={(files) =>
                toast.error("Some files are rejected. Max size 100kb.")
              }
              maxSize={100000}
              accept={IMAGE_MIME_TYPE}
              multiple
              style={{ minHeight: 100 }}
              className='border border-dashed cursor-pointer flex items-center justify-center'
            >
              <div className='flex gap-2 items-center justify-center'>
                <RiImageAddFill
                  size={52}
                  color='var(--mantine-color-blue-6)'
                  stroke={1.5}
                />
                <div>
                  <p className='text-sm sm:text-xl font-medium' inline>
                    Drag images here or click to select files
                  </p>
                  <Text className='text-xs sm:text-sm text-gray-500' inline>
                    Upload Images (max 4, 100kb each)
                  </Text>
                </div>
              </div>
            </Dropzone>
          )}

          <SimpleGrid cols={4} spacing='sm' mt='md'>
            {images.map((img, idx) => (
              <div key={idx} className='relative'>
                <Image
                  src={img.url}
                  radius='md'
                  alt='preview'
                  withPlaceholder
                />
                <Button
                  color='red'
                  size='xs'
                  fullWidth
                  mt={4}
                  onClick={() => removeImage(idx)}
                  leftIcon={<FaTrash />}
                >
                  Remove
                </Button>
              </div>
            ))}
          </SimpleGrid>
        </div>
        {/* Title */}
        <TextInput
          label='Title'
          placeholder='Enter post title'
          value={state.name}
          required
          onChange={(e) => handleInput("name", e.currentTarget.value)}
        />

        <TextInput
          label='Age'
          placeholder='Enter your age'
          value={state.age}
          onChange={(e) => handleInput("age", e.currentTarget.value)}
        />

        <TextInput
          label='Phone'
          placeholder='Enter your phone'
          value={state.phone}
          onChange={(e) => handleInput("phone", e.currentTarget.value)}
        />

        <TextInput
          label='Email'
          placeholder='Enter your email'
          value={state.email}
          required
          onChange={(e) => handleInput("email", e.currentTarget.value)}
        />

        {/* Category */}
        <Select
          label='Category'
          placeholder='Select category'
          data={categories.map((c) => ({ value: c.name, label: c.name }))}
          value={state.category}
          required
          onChange={(val) => handleInput("category", val)}
        />

        {/* Sub Category */}
        <Select
          label='Sub Category'
          placeholder={
            state.category ? "Select sub category" : "Select category first"
          }
          data={
            subCategories?.subcategories?.map((sc) => ({
              value: sc.name,
              label: sc.name,
            })) || []
          }
          required
          value={state.subCategory}
          onChange={(val) => handleInput("subCategory", val)}
          disabled={!state.category}
        />

        {/* Description */}
        <div>
          <Text weight={500} mb='xs'>
            Description
          </Text>
          <ReactQuill
            theme='snow'
            modules={modules}
            value={state.description}
            className='h-[200px] sm:mb-10 mb-16'
            onChange={(value) => handleInput("description", value)}
          />
        </div>

        <div>
          <Text weight={500} mb='xs'>
            Promote your ad (extra charged)
          </Text>

          <Group spacing='xl' align='center' position='left'>
            {[
              { value: "0", label: "Default (Free)" },
              { value: "7", label: "7 Days ($7)" },
              { value: "10", label: "15 Days ($10)" },
              { value: "15", label: "30 Days ($15)" },
            ].map((opt) => (
              <Checkbox
                key={opt.value}
                checked={selectedPremium === opt.value}
                onChange={() => {
                  setSelectedPremium(opt.value);
                  topForDays(Number(opt.value));
                }}
                label={opt.label}
              />
            ))}
          </Group>
        </div>

        {/* Submit */}
        <Group position='right' mt='lg'>
          {users?.credit < premiumCost ? (
            <Link
              href={`/recharge-credits`}
              className='rounded bg-green-400 font-bold text-white p-2 hover:bg-red-400'
            >
              Buy Credits
            </Link>
          ) : (
            <Button
              onClick={handleSubmit}
              loading={loading}
              color='pink'
              leftIcon={
                loading ? <ImSpinner10 className='animate-spin' /> : null
              }
            >
              {loading ? "Submitting..." : "Submit Post"}
            </Button>
          )}
        </Group>
      </Stack>
    </Paper>
  );
};

export default SinglePostForm;
