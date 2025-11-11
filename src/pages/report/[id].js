import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useMyContext } from "@/components/user";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ReportUserPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    subject: "",
    reportDesc: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!form.reportDesc.trim()) {
      toast.error("⚠️ Please enter a report description.");
      setLoading(false);
      return;
    }

    const data = {
      subject: form.subject,
      reportDesc: form.reportDesc,
      posterId: id,
      reporterId: session?.user?.id,
    };
    try {
      const res = await fetch("http://localhost:5000/api/reports", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 201) {
        toast.success("Report submitted successfully!");
        setForm({ subject: "", reportDesc: "" });
      }
    } catch (err) {
      toast.error("❌ Failed to submit report. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-16'>
      <div className='w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-lg p-8 transition-all'>
        <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          🚨 Report User
        </h1>
        <p className='text-center text-gray-500 mb-6'>
          Please help us keep the community safe by reporting inappropriate
          behavior.
        </p>

        {message && (
          <div
            className={`mb-5 text-center font-medium py-2 px-3 rounded-md ${
              message.includes("✅")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Subject */}
          <div>
            <label className='block mb-2 font-semibold text-gray-700'>
              Reason for report <span className='text-red-500'>*</span>
            </label>
            <select
              name='subject'
              value={form.subject}
              onChange={handleChange}
              className='w-full border-gray-300 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
            >
              <option value=''>Select a reason</option>
              <option value='Spam or Scam'>Spam or Scam</option>
              <option value='Abusive Behavior'>Abusive Behavior</option>
              <option value='Fake Profile'>Fake Profile</option>
              <option value='Inappropriate Content'>
                Inappropriate Content
              </option>
              <option value='Fraud or Payment Issue'>
                Fraud or Payment Issue
              </option>
              <option value='Harassment or Threats'>
                Harassment or Threats
              </option>
              <option value='Underage User'>Underage User</option>
              <option value='Impersonation'>Impersonation</option>
              <option value='Copyright Violation'>Copyright Violation</option>
              <option value='Hate Speech or Discrimination'>
                Hate Speech or Discrimination
              </option>
              <option value='Sexual or Adult Content'>
                Sexual or Adult Content
              </option>
              <option value='Illegal Activity'>Illegal Activity</option>
              <option value='Privacy Violation'>Privacy Violation</option>
              <option value='Other'>Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className='block mb-2 font-semibold text-gray-700'>
              Description <span className='text-red-500'>*</span>
            </label>
            <textarea
              name='reportDesc'
              value={form.reportDesc}
              onChange={handleChange}
              rows='5'
              placeholder='Describe what happened (be as specific as possible)...'
              className='w-full border-gray-300 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
            />
            <p className='text-xs text-gray-400 mt-1'>
              Reports are reviewed by our moderation team within 24–48 hours.
            </p>
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-pink-800 hover:bg-pink-900 text-white font-semibold py-3 rounded-lg shadow-sm transition-all disabled:opacity-70'
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>

        <p className='text-center text-sm text-pink-800 mt-6'>
          <Link href={"/"}>Back to home</Link>
        </p>
      </div>
    </div>
  );
}
