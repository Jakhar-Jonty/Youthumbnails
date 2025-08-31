// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function Login() {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (!form.username || !form.password) {
//         setError("Please fill in all fields.");
//         setIsLoading(false);
//         return;
//     }

//     try {
//         const res = await fetch("/api/auth/login", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(form),
//         });

//         if (res.ok) {
//             router.push("/"); // Redirect to homepage on successful login
//         } else {
//             const data = await res.json();
//             setError(data.message || "Something went wrong.");
//         }
//     } catch (err) {
//         setError("An error occurred. Please try again.");
//     } finally {
//         setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <div className="text-center">
//             <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
//             <p className="mt-2 text-gray-600">Sign in to continue to your dashboard.</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="username" className="text-sm font-medium text-gray-700 sr-only">Username</label>
//             <input
//               id="username"
//               className="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Username"
//               value={form.username}
//               onChange={(e) => setForm({ ...form, username: e.target.value })}
//             />
//           </div>
//           <div>
//             <label htmlFor="password"className="text-sm font-medium text-gray-700 sr-only">Password</label>
//             <input
//               id="password"
//               type="password"
//               className="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//             />
//           </div>
//           {error && <p className="text-sm text-red-600">{error}</p>}
//           <div>
//             <button 
//               type="submit"
//               disabled={isLoading}
//               className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
//             >
//               {isLoading ? "Signing In..." : "Sign In"}
//             </button>
//           </div>
//         </form>
//         <p className="text-sm text-center text-gray-600">
//             Don't have an account?{" "}
//             <Link href="/register" className="font-medium text-blue-600 hover:underline">
//                 Sign up
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

export default function LoginPage() {
  const [form, setForm] = useState({ username: "chaiaurcode", password: "Chai007" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (!form.username || !form.password) {
      setError("Please fill in all fields.")
      return
    }
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        router.push("/")
      } else {
        const data = await res.json().catch(() => ({}))
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

        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-sm text-gray-400 mt-1">Welcome back. Sign in to continue.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:ring-offset-gray-900"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link className="text-red-400 hover:text-red-300 underline underline-offset-4" href="/register">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
