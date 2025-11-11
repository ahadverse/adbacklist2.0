import React, { useEffect, useRef, useState } from "react";
import categories from "../../../public/category.json";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useMyContext } from "../user";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  TextInput,
  Select,
  Group,
  Image,
  SimpleGrid,
  Paper,
  Text,
  Stack,
  Modal,
  Radio,
  Checkbox,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { RiImageAddFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { ImSpinner10 } from "react-icons/im";
import dynamic from "next/dynamic";
import Link from "next/link";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

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

const formatCityName = (name) => {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const initialState = {
  name: "",
  phone: "",
  email: "",
  description: "",
  category: "",
  subCategory: "",
  age: "",
  premiumDay: 0,
  isPremium: false,
  isApproved: true,
  cities: [],
  images: [],
  posterId: "",
  error: "",
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

const PostForm = () => {
  const router = useRouter();
  const { users, setUser } = useMyContext();
  const { data: session } = useSession();
  const [state, setState] = useState(initialState);
  const [images, setImages] = useState([]);
  const [citiesModal, setCitiesModal] = useState([]);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState(0);
  const [premiumCost, setPremiumCost] = useState(0);
  const [selectedPremium, setSelectedPremium] = useState("0");

  const handleInput = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const subCategories = categories.find((c) => c.name === state.category);

  // Premium days mapping
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

  // File upload
  const handleFileChange = (files) => {
    if (!files) return;
    if (images.length + files.length > 4) {
      toast.error("Max 4 images allowed");
      return;
    }

    const newImages = [...images];
    [...files].forEach((file) => {
      if (file.size > 500000) {
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

  useEffect(() => {
    const cities = JSON.parse(localStorage?.getItem("cities")) || [];
    setCitiesModal(cities);
    setLocal(cities?.length * 0.05);
  }, [router.query.name]);

  const removeCity = (index) => {
    const updatedCities = [...citiesModal];
    updatedCities.splice(index, 1);
    setCitiesModal(updatedCities);
    localStorage.setItem("cities", JSON.stringify(updatedCities));
    setLocal(updatedCities.length * 0.05);
  };

  // Submit handler
  const handleSubmit = async () => {
    setLoading(true);
    const data = { ...state };

    // Upload images first
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((img) => formData.append("images", img.file));

      try {
        const res = await fetch("http://localhost:5000/api/files2/files", {
          method: "POST",
          body: formData,
        });
        const result = await res.json();
        data.images = result;
      } catch (err) {
        console.error(err);
        toast.error("Image upload failed!");
        setLoading(false);
        return;
      }
    }

    if (!data.name || !data.category || !data.subCategory || !data.email) {
      toast.error("Please fill the required fields");
      setLoading(false);
      return;
    }

    data.posterId = session?.user?.id;
    data.cities = citiesModal;
    data.category = slugify(state.category);
    data.subCategory = slugify(state.subCategory);

    try {
      await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const newCredit = users?.credit - (local + premiumCost);

      await axios.put(
        `http://localhost:5000/api/users/credit/${session?.user?.id}`,
        {
          credit: newCredit?.toFixed(2),
        }
      );

      setUser({ ...users, credit: newCredit });
      localStorage.removeItem("cities");

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your post has been published",
        showConfirmButton: false,
        timer: 2500,
      }).then(() => {
        router.push("/dashboard/posts");
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      radius='md'
      p='xl'
      withBorder
      className='xl:max-w-2xl w-full mx-auto'
    >
      <Text size='xl' weight={700} mb='lg'>
        Post Ad in{" "}
        <span className='capitalize text-pink-800 font-bold'>
          {citiesModal?.length}
        </span>{" "}
        Cities{" "}
        <span className=' text-pink-800 font-bold'>
          (${(local + premiumCost)?.toFixed(2)})
        </span>
      </Text>

      <div>
        {images?.length < 4 && (
          <Dropzone
            onDrop={handleFileChange}
            onReject={() => toast.error("Max image size is 100kb.")}
            maxSize={100000}
            accept={IMAGE_MIME_TYPE}
            multiple
            style={{ minHeight: 100 }}
            className='border border-dashed flex items-center justify-center'
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
              <Image src={img.url} radius='md' alt='preview' withPlaceholder />
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

      <Stack spacing='md' mt='lg'>
        {/* Title */}
        <TextInput
          label='Title'
          placeholder='Enter post title'
          value={state.name}
          required
          onChange={(e) => handleInput("name", e.currentTarget.value)}
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

        <TextInput
          label='Age'
          placeholder='Enter your age'
          value={state.age}
          onChange={(e) => handleInput("age", e.currentTarget.value)}
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

        {/* Premium Days */}
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

        {/* Cities Modal */}
        <p
          className='underline cursor-pointer text-sm'
          onClick={() => setOpened(true)}
        >
          View Selected Cities
        </p>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          // title='Selected Cities'
        >
          <div className='bg-white p-2 h-[280px] w-[400px] overflow-y-scroll'>
            <h1>Selected Cities:</h1>
            <hr />
            <div className='grid grid-cols-2 gap-2'>
              {citiesModal.map((city, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <span>
                    {index + 1}. {formatCityName(city)}
                  </span>
                  <button
                    className='bg-red-500 h-6 w-6 text-white rounded-full'
                    onClick={() => removeCity(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <hr className='my-5' />
            <Link
              className='text-white bg-pink-800 mb-5 text-center block'
              href={"/add-post/multiple-cities"}
            >
              Select Again
            </Link>
          </div>
        </Modal>

        {/* Error */}
        <p className='text-pink-800 text-xs'>{state.error}</p>

        {/* Submit */}
        <Group position='right' mt='lg'>
          {users?.credit < local + premiumCost || local == "null" ? (
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

export default PostForm;
