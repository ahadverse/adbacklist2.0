import Link from "next/link";
import React from "react";
import categories from "../../../../public/category.json";
import Swal from "sweetalert2";
import axios from "axios";

const PostsList = ({
  posts,
  setSearchText,
  setSort,
  setCategory,
  status,
  sort,
  setStatus,
  category,
  searchText,
  setReload,
  reload,
}) => {
  const handle = (e) => {
    setCategory(e);
  };
  const handleStatus = (e) => {
    setStatus(e);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const title = e.target.text.value;
    setSearchText(title);
  };

  const deletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://adbacklist-backend2-0-vb3d.vercel.app/api/posts/${id}`,
            {}
          )
          .then((response) => {
            if (response.data.status == "success") {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              setReload(!reload);
            }
          });
      }
    });
  };

  return (
    <div>
      <div className='my-3 ml-auto  flex flex-col sm:flex-row justify-end items-end sm:items-center'>
        <form onSubmit={handleSearch}>
          <input
            defaultValue={searchText}
            name='text'
            placeholder='search by title'
            className='border border-pink-800 rounded-lg text-sm px-2 m-1 input-xs'
          />
        </form>
        <select
          className='select select-bordered select-xs w-[200px] bg-white border border-pink-800'
          onChange={(e) => handle(e.target.value)}
        >
          {category ? (
            <option>{category}</option>
          ) : (
            <option>-- Select Category --</option>
          )}
          <option value=''>All</option>
          {categories?.map((e) => (
            <option key={e?.name} value={e?.slug}>
              {e?.name}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => handleStatus(e.target.value)}
          className='select select-bordered select-xs w-[200px] bg-white border border-pink-800'
        >
          {status ? (
            <option>{status == "true" ? "Premium" : "Paid"}</option>
          ) : (
            <option>-- Select Status --</option>
          )}
          <option value=''>All</option>
          <option value='true'>Premium</option>
          <option value='false'>Free</option>
        </select>
        <select
          onChange={(e) => setSort(e.target.value)}
          className='select select-bordered select-xs w-[80px] bg-white border border-pink-800'
        >
          {sort ? (
            <option>{sort == "desc" ? "Latest" : "Oldest"}</option>
          ) : (
            <option value='desc'>-- Sort --</option>
          )}
          <option value='desc'>Latest</option>
          <option value='asc'>Oldest</option>
        </select>
      </div>
      <div className='overflow-x-auto text-black'>
        <table className='table table-compact w-full'>
          <thead>
            <tr>
              <th className='bg-black text-white'></th>
              <th className='bg-black text-white'>Date</th>
              <th className='bg-black text-white'>Title</th>

              <th className='bg-black text-white'>Status</th>
              <th className='bg-black text-white'>Category</th>
              <th className='w-2/12 bg-black text-white'>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((a, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{a?.createdAt?.split("T")[0]}</td>
                <td>{a.name.slice(0, 50)}</td>
                <td className='text-center'>
                  {a.isPremium ? (
                    <p className='bg-green-600  rounded text-white'>Premium</p>
                  ) : (
                    <p className='bg-red-600  rounded text-white'>Free</p>
                  )}
                </td>
                <td>
                  {a.category} &#62; {a.subCategory}
                </td>

                <td className='flex justify-between'>
                  {" "}
                  <Link href={`/dashboard/my-post/update/${a?._id}`}>
                    <button className='btn btn-xs btn-info'>Edit</button>
                  </Link>{" "}
                  <Link href={`/dashboard/my-post/view/${a?._id}`}>
                    <button className='btn btn-xs btn-warning'>View</button>
                  </Link>
                  <button
                    className='btn btn-xs btn-error'
                    onClick={() => deletePost(a._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostsList;
