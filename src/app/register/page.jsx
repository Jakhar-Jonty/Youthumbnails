// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from 'next/link';

// export default function Register() {
//   const [form, setForm] = useState({ name: "", username: "", password: "" });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setIsLoading(true);

//     if (!form.name || !form.username || !form.password) {
//         setError("Please fill in all fields.");
//         setIsLoading(false);
//         return;
//     }

//     try {
//         const res = await fetch("/api/auth/register", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(form),
//         });

//         const data = await res.json();
//         if (res.ok) {
//             setSuccess(data.message + " Redirecting to login...");
//             setTimeout(() => {
//                 router.push("/login");
//             }, 2000);
//         } else {
//             setError(data.message || "Something went wrong.");
//         }
//     } catch(err) {
//         setError("An error occurred. Please try again.");
//     } finally {
//         setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
//             <p className="mt-2 text-gray-600">Start your journey with us today.</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//              <input
//               className="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//           </div>
//           <div>
//             <input
//               className="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Username"
//               value={form.username}
//               onChange={(e) => setForm({ ...form, username: e.target.value })}
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               className="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//             />
//           </div>
//           {error && <p className="text-sm text-red-600">{error}</p>}
//           {success && <p className="text-sm text-green-600">{success}</p>}
//           <div>
//             <button 
//               type="submit"
//               disabled={isLoading}
//               className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
//             >
//               {isLoading ? "Creating Account..." : "Sign Up"}
//             </button>
//           </div>
//         </form>
//          <p className="text-sm text-center text-gray-600">
//             Already have an account?{" "}
//             <Link href="/login" className="font-medium text-blue-600 hover:underline">
//                 Sign in
//             </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client"


import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", username: "", password: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    if (!form.name || !form.username || !form.password) {
      setError("Please fill in all fields.")
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setSuccess((data.message || "Account created.") + " Redirecting to login...")
        setTimeout(() => router.push("/login"), 1500)
      } else {
        setError(data.message || "Something went wrong.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm bg-red-600">
            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <p className="font-semibold tracking-tight">ThumbTube AI</p>
        </div>

        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-sm text-gray-400 mt-1">Start your journey with us today.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">
              Full name
            </label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              id="username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Username"
              className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {success && <p className="text-sm text-green-400">{success}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:ring-offset-gray-900"
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?{" "}
          <Link className="text-red-400 hover:text-red-300 underline underline-offset-4" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
