import React, { useEffect, useState } from "react";
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
import MultipleCitiesSelection from "../multipleCitySelection/form";

const formatCityName = (name) => {
  return name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

const modules = {
  toolbar: [
    [{ header: [1, 2, 4, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

// map premiumDay (stored) -> displayed option cost
const mapPremiumCostFromDays = (days) => {
  if (!days) return 0;
  if (days === 7) return 7;
  if (days === 15) return 10; // corresponds to option "10" (15 days)
  if (days === 30) return 15; // corresponds to option "15" (30 days)
  return 0;
};

const UpdatePostForm = ({ post }) => {
  const router = useRouter();
  const { users, setUser } = useMyContext();
  const { data: session } = useSession();

  const [state, setState] = useState({
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
    error: "",
  });

  // images: newly added files (file + url)
  const [images, setImages] = useState([]);
  // existingImages: previously uploaded images (URLs or objects returned by backend)
  const [existingImages, setExistingImages] = useState([]);
  const [citiesModal, setCitiesModal] = useState([]);
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCities, setShowCities] = useState(false);

  // cost states
  const [local, setLocal] = useState(0); // cities cost = cities.length * 0.05
  const [premiumCost, setPremiumCost] = useState(0);
  const [selectedPremium, setSelectedPremium] = useState("0");

  useEffect(() => {
    if (!post) return;

    // preload form
    setState((prev) => ({
      ...prev,
      name: post?.name || "",
      phone: post?.phone || "",
      email: post?.email || "",
      description: post?.description || "",
      category: post?.category || "",
      subCategory: post?.subCategory || "",
      age: post?.age || "",
      premiumDay: post?.premiumDay || 0,
      isPremium: post?.isPremium || false,
      isApproved: post?.isApproved ?? true,
      cities: post?.cities || [],
    }));

    setCitiesModal(post?.cities || []);
    setExistingImages(post?.images || []);

    // determine which premium option should be selected based on stored premiumDay
    const days = post?.premiumDay || 0;
    const initialSelected =
      days === 7 ? "7" : days === 15 ? "10" : days === 30 ? "15" : "0";
    setSelectedPremium(initialSelected);

    // set premiumCost from the stored days
    setPremiumCost(mapPremiumCostFromDays(days));

    // set local price based on existing cities
    setLocal(((post?.cities?.length || 0) * 0.05).toFixed(2) * 1);
  }, [post]);

  // whenever user changes cities selection, update local
  useEffect(() => {
    setLocal(Number((citiesModal.length * 0.05).toFixed(2)));
  }, [citiesModal]);

  const handleInput = (field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const subCategories = categories.find(
    (c) => c.name.toLowerCase() === state.category.toLowerCase()
  );

  // Premium days mapping (keeps cost)
  const topForDays = (value) => {
    const mapping = {
      0: { days: 0, isPremium: false, isApproved: true, cost: 0 },
      7: { days: 7, isPremium: true, isApproved: true, cost: 7 },
      10: { days: 15, isPremium: true, isApproved: true, cost: 10 },
      15: { days: 30, isPremium: true, isApproved: true, cost: 15 },
    };
    const selected = mapping[value];
    if (!selected) return;
    setState((prev) => ({
      ...prev,
      premiumDay: selected.days,
      isPremium: selected.isPremium,
      isApproved: selected.isApproved,
    }));
    setPremiumCost(selected.cost);
  };

  // File handling
  const handleFileChange = (files) => {
    if (!files) return;
    if (existingImages.length + images.length + files.length > 4) {
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

  const removeExistingImage = (index) => {
    const newImgs = [...existingImages];
    newImgs.splice(index, 1);
    setExistingImages(newImgs);
  };

  const removeCity = (index) => {
    const updatedCities = [...citiesModal];
    updatedCities.splice(index, 1);
    setCitiesModal(updatedCities);
  };

  // compute previous total from stored post
  const prevLocal = (post?.cities?.length || 0) * 0.05;
  const prevPremiumCost = mapPremiumCostFromDays(post?.premiumDay || 0);
  const prevTotal = Number((prevLocal + prevPremiumCost).toFixed(2));

  // current new total
  const newTotal = Number((local + premiumCost).toFixed(2));
  const delta = Number((newTotal - prevTotal).toFixed(2));

  const handleSubmit = async () => {
    setLoading(true);
    const data = { ...state };
    data.cities = citiesModal;

    // Upload newly added images
    if (images.length > 0) {
      const formData = new FormData();
      images.forEach((img) => formData.append("images", img.file));
      try {
        const res = await fetch("http://localhost:5000/api/files2/files", {
          method: "POST",
          body: formData,
        });
        const result = await res.json();
        // append uploaded results to existingImages
        data.images = [...existingImages, ...result];
      } catch (err) {
        console.error(err);
        toast.error("Image upload failed!");
        setLoading(false);
        return;
      }
    } else {
      data.images = existingImages;
    }

    if (!data.name || !data.category || !data.subCategory || !data.email) {
      toast.error("Please fill the required fields");
      setLoading(false);
      return;
    }

    if (delta > 0 && Number(users?.credit || 0) < delta) {
      toast.error(`Insufficient credits. You need $${delta.toFixed(2)} more.`);
      setLoading(false);
      return;
    }

    try {
      // update post

      const res = await fetch(
        `http://localhost:5000/api/posts/post/${post._id}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (users && session?.user?.id) {
        let newCredit = Number(users.credit || 0);

        if (delta > 0) {
          // charge difference
          newCredit = Number((newCredit - delta).toFixed(2));
          await axios.put(
            `http://localhost:5000/api/users/credit/${session.user.id}`,
            { credit: newCredit.toFixed(2) }
          );
          setUser({ ...users, credit: newCredit });
        } else if (delta < 0) {
          // refund difference
          const refund = Math.abs(delta);
          newCredit = Number((newCredit + refund).toFixed(2));
          await axios.put(
            `http://localhost:5000/api/users/credit/${session.user.id}`,
            { credit: newCredit.toFixed(2) }
          );
          setUser({ ...users, credit: newCredit });
        }
      }
      toast.success("Post updated successfully");

      localStorage.removeItem("cities");
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
      radius='md'
      p='xl'
      withBorder
      className='xl:max-w-2xl w-full mx-auto'
    >
      <Text size='xl' weight={700} mb='lg'>
        Update Post{" "}
        <span className='ml-2 text-base font-medium'>
          — {citiesModal?.length} Cities ( ${newTotal.toFixed(2)})
        </span>
      </Text>

      <Text size='xs' color='dimmed' mb='md'>
        Previous total: ${prevTotal.toFixed(2)} —{" "}
        {delta >= 0
          ? `You will be charged $${delta.toFixed(2)}`
          : `You will be refunded $${Math.abs(delta).toFixed(2)}`}
      </Text>

      {/* Image Upload */}
      <div>
        <Text size='sm' weight={500} mb={4}>
          Images
        </Text>
        {existingImages.length + images.length < 4 && (
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
              <RiImageAddFill size={52} color='var(--mantine-color-blue-6)' />
              <div>
                <p className='text-sm sm:text-xl font-medium'>
                  Drag images here or click to select files
                </p>
                <Text className='text-xs sm:text-sm text-gray-500'>
                  Upload Images (max 4, 100kb each)
                </Text>
              </div>
            </div>
          </Dropzone>
        )}

        <SimpleGrid cols={4} spacing='sm' mt='md'>
          {existingImages.map((img, idx) => (
            <div key={`existing-${idx}`} className='relative'>
              <Image src={img.url || img} radius='md' alt='preview' />
              <Button
                color='red'
                size='xs'
                fullWidth
                mt={4}
                onClick={() => removeExistingImage(idx)}
                leftIcon={<FaTrash />}
              >
                Remove
              </Button>
            </div>
          ))}
          {images.map((img, idx) => (
            <div key={`new-${idx}`} className='relative'>
              <Image src={img.url} radius='md' alt='preview' />
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
        <TextInput
          label='Title'
          placeholder='Enter post title'
          value={state.name}
          required
          onChange={(e) => handleInput("name", e.currentTarget.value)}
        />

        <TextInput
          label='Phone'
          value={state.phone}
          onChange={(e) => handleInput("phone", e.currentTarget.value)}
        />

        <TextInput
          label='Email'
          value={state.email}
          required
          onChange={(e) => handleInput("email", e.currentTarget.value)}
        />

        <TextInput
          label='Age'
          value={state.age}
          onChange={(e) => handleInput("age", e.currentTarget.value)}
        />

        {/* Category */}
        <Select
          label='Category'
          placeholder='Select category'
          data={categories.map((c) => ({
            value: c.name.toLowerCase(),
            label: c.name,
          }))}
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
              value: sc.name.toLowerCase().replace(/\s+/g, "-"), // e.g. "Adult Jobs" → "adult-jobs"
              label: sc.name,
            })) || []
          }
          required
          value={state.subCategory}
          onChange={(val) => handleInput("subCategory", val)}
          disabled={!state.category}
        />

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

        <p
          className='underline cursor-pointer text-sm'
          onClick={() => setOpened(true)}
        >
          View Selected Cities
        </p>

        <Modal opened={opened} onClose={() => setOpened(false)}>
          <div className='bg-white p-2 h-[380px]  overflow-y-scroll'>
            <h1>Selected Cities:</h1>
            <hr />
            {showCities ? (
              <MultipleCitiesSelection
                setCitiesModal={setCitiesModal}
                setShowCities={setShowCities}
              />
            ) : (
              <div className='grid grid-cols-2 gap-2'>
                {citiesModal.map((city, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
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
            )}

            <hr className='my-5' />
            <button
              onClick={() => setShowCities(true)}
              className='text-white w-full bg-pink-800 mb-5 text-center block'
            >
              Select Again
            </button>
          </div>
        </Modal>

        <p className='text-pink-800 text-xs'>{state.error}</p>

        <Group position='right' mt='lg'>
          {/* If user needs to pay more and doesn't have enough, show buy link */}
          {delta > 0 && Number(users?.credit || 0) < delta ? (
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
              {loading
                ? "Updating..."
                : delta > 0
                ? `Update & Charge $${delta.toFixed(2)}`
                : delta < 0
                ? `Update & Refund $${Math.abs(delta).toFixed(2)}`
                : "Update Post"}
            </Button>
          )}
        </Group>
      </Stack>
    </Paper>
  );
};

export default UpdatePostForm;
