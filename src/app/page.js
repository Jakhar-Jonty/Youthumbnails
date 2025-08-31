"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

// --- Icon Components ---
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" x2="12" y1="5" y2="19" />
    <line x1="5" x2="19" y1="12" y2="12" />
  </svg>
)
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)
const BotIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
)
const PaperclipIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
)
const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
)
const MessageSquareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
)
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
)
const ImageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
)
const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v8" />
    <path d="M4 8h16v12H4z" />
    <path d="M8 6h8v8H8z" />
  </svg>
)
const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16,6 12,2 8,6" />
    <line x1="12" x2="12" y1="2" y2="15" />
  </svg>
)
const ZipIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <circle cx="10" cy="20" r="2" />
    <path d="M10 7L8 5l2-2" />
    <path d="m10 7 2 2-2 2" />
  </svg>
)

export default function Home() {
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [currentMessage, setCurrentMessage] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [copySuccess, setCopySuccess] = useState({})
  const router = useRouter()
  const chatEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Fetch all chats on component mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch("/api/chat")
        if (res.ok) {
          const data = await res.json()
          setChats(data)
        }
      } catch (error) {
        console.error("Error fetching chats:", error)
      }
    }
    fetchChats()
  }, [])

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [currentChat?.messages])

  // Handle file selection
  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        alert("Image size should be less than 10MB")
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  // Download single image
  const downloadImage = async (url, filename = "thumbnail.png") => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error("Error downloading image:", error)
      alert("Failed to download image. Please try again.")
    }
  }

  // Copy image to clipboard
  const copyImageToClipboard = async (url, index) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])
        setCopySuccess((prev) => ({ ...prev, [index]: true }))
        setTimeout(() => {
          setCopySuccess((prev) => ({ ...prev, [index]: false }))
        }, 2000)
      } else {
        // Fallback for older browsers
        alert("Clipboard copy not supported. Please use download instead.")
      }
    } catch (error) {
      console.error("Error copying image:", error)
      alert("Failed to copy image to clipboard.")
    }
  }

  // Download all images as ZIP
  const downloadAllAsZip = async (imageUrls) => {
    try {
      const response = await fetch("/api/download-zip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrls }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = downloadUrl
        link.download = `thumbnails_${Date.now()}.zip`
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(downloadUrl)
      } else {
        throw new Error("Failed to create ZIP file")
      }
    } catch (error) {
      console.error("Error downloading ZIP:", error)
      alert("Failed to download ZIP file. Please try downloading images individually.")
    }
  }

  const handleNewChat = () => {
    setCurrentChat(null)
    setCurrentMessage("")
    setImageFile(null)
    setImagePreview(null)
    setSidebarOpen(false)
  }

  const handleSelectChat = (chat) => {
    setCurrentChat(chat)
    setSidebarOpen(false)
  }

const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!currentMessage.trim() || isLoading) return

    setIsLoading(true)

    const formData = new FormData()
    formData.append("message", currentMessage)
    formData.append("chatId", currentChat ? currentChat._id : "new")
    if (imageFile) {
      formData.append("image", imageFile)
    }

    // Optimistically update the UI
    const tempId = Date.now()
    const userMessage = { role: "user", content: currentMessage, _id: tempId }
    setCurrentChat((prev) => ({
      ...prev,
      _id: prev?._id || "new-chat",
      messages: [...(prev?.messages || []), userMessage],
    }))
    setCurrentMessage("")
    setImageFile(null)
    setImagePreview(null)

    // FIX: Add this line back to reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    try {
      const res = await fetch("/api/chat", { method: "POST", body: formData })
      const updatedChat = await res.json()

      if (res.ok) {
        setCurrentChat(updatedChat)
        // Update the chat list
        setChats((prev) => {
          const existing = prev.find((c) => c._id === updatedChat._id)
          if (existing) {
            return prev.map((c) => (c._id === updatedChat._id ? updatedChat : c))
          } else {
            return [updatedChat, ...prev]
          }
        })
      } else {
        throw new Error(updatedChat.message || "API Error")
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      // Revert optimistic update on error
      setCurrentChat((prev) => ({ ...prev, messages: prev.messages.filter((m) => m._id !== tempId) }))
      alert("Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout")
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const removeImagePreview = () => {
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Quick suggestion buttons
  const quickSuggestions = [
    "Gaming thumbnail with neon effects",
    "Food recipe with appetizing styling",
    "Travel vlog with scenic background",
    "Tech review with modern design",
    "Educational content with clean layout",
  ]

  const handleQuickSuggestion = (suggestion) => {
    setCurrentMessage(suggestion)
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 flex-col hidden md:flex border-r border-gray-700">
        <div className="mb-3">
          <p className="text-xs uppercase tracking-wider text-gray-400">Projects</p>
        </div>
        <button
          onClick={handleNewChat}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 mb-4 text-sm bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:ring-offset-gray-800"
        >
          <PlusIcon /> New Project
        </button>
        <nav className="flex-grow overflow-y-auto space-y-2">
          {chats.map((chat) => (
            <a
              key={chat._id}
              href="#"
              onClick={(e) => {
                e.preventDefault()
                handleSelectChat(chat)
              }}
              className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-700 transition-colors ${currentChat?._id === chat._id ? "bg-gray-700" : ""}`}
            >
              <MessageSquareIcon />
              <span className="truncate flex-1">{chat.title || "New Chat"}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
          >
            <UserIcon /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
          <div className="relative h-full w-64 bg-gray-800 border-r border-gray-700 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-gray-400">Projects</p>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                aria-label="Close menu"
              >
                <XIcon />
              </button>
            </div>
            <button
              onClick={handleNewChat}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 mb-4 text-sm bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:ring-offset-gray-800"
            >
              <PlusIcon /> New Project
            </button>
            <nav className="flex-grow overflow-y-auto space-y-2">
              {chats.map((chat) => (
                <a
                  key={chat._id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handleSelectChat(chat)
                  }}
                  className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-700 transition-colors ${currentChat?._id === chat._id ? "bg-gray-700" : ""}`}
                >
                  <MessageSquareIcon />
                  <span className="truncate flex-1">{chat.title || "New Chat"}</span>
                </a>
              ))}
            </nav>
            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
              >
                <UserIcon /> Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        <header className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80 border-b border-gray-800">
          <div className="flex items-center justify-between px-4 md:px-6 h-14">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-md hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                aria-label="Open menu"
                aria-expanded={sidebarOpen}
              >
                <MenuIcon />
              </button>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-red-600"
                  aria-hidden="true"
                >
                  {/* play triangle */}
                  <svg viewBox="0 0 24 24" className="h-3 w-3 fill-white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="font-semibold tracking-tight">ThumbTube AI</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handleNewChat}
                className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                New Project
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-y-auto">
          {!currentChat || !currentChat.messages || currentChat.messages.length === 0 ? (
            <div className="text-center mt-10 md:mt-16">
              <h1 className="text-4xl md:text-5xl font-extrabold text-balance tracking-tight text-white">
                Thumbnail Agent
              </h1>
              <p className="mt-4 text-lg text-gray-400">
                Create stunning YouTube thumbnails with AI. Upload your photo and describe your vision.
              </p>

              {/* Quick Start Suggestions */}
              <div className="mt-8 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-4 text-gray-300">Quick Start Ideas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                  {quickSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickSuggestion(suggestion)}
                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-left transition-colors border border-gray-700 hover:border-red-500"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="font-semibold text-red-400 mb-2">Smart Conversations</h3>
                  <p className="text-sm text-gray-300">
                    {"I'll ask questions to understand your vision and create the perfect thumbnail."}
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="font-semibold text-red-400 mb-2">Image Integration</h3>
                  <p className="text-sm text-gray-300">
                    Upload your photo and choose exactly where it should appear in your thumbnail.
                  </p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">Multiple Formats</h3>
                  <p className="text-sm text-gray-300">
                    Get thumbnails for regular YouTube videos and Shorts, ready to download.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {currentChat.messages.map((msg, index) => (
                <div key={msg._id || index} className={`flex gap-4 items-start`}>
                  <div
                    className={`p-2 rounded-full flex-shrink-0 ${msg.role === "user" ? "bg-red-600" : "bg-gray-700"}`}
                  >
                    {msg.role === "user" ? <UserIcon /> : <BotIcon />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                    {msg.imageUrls && msg.imageUrls.length > 0 && (
                      <div className="mt-4 space-y-4">
                        {/* Thumbnails Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {msg.imageUrls.map((url, i) => (
                            <div key={i} className="group relative bg-gray-800 rounded-lg overflow-hidden">
                              <img
                                src={url || "/placeholder.svg?height=600&width=1067&query=Generated%20thumbnail"}
                                alt={`Generated thumbnail ${i + 1}`}
                                className="w-full h-auto rounded-lg hover:opacity-90 transition-opacity"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => window.open(url, "_blank")}
                                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:ring-offset-gray-900"
                                    title="View full size"
                                    aria-label="View full size image"
                                  >
                                    <span className="sr-only">View full size</span>
                                    <ImageIcon />
                                  </button>
                                  <button
                                    onClick={() => downloadImage(url, `thumbnail_${i + 1}.png`)}
                                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500 focus-visible:ring-offset-gray-900"
                                    title="Download image"
                                    aria-label="Download image"
                                  >
                                    <span className="sr-only">Download</span>
                                    <DownloadIcon />
                                  </button>
                                  <button
                                    onClick={() => copyImageToClipboard(url, i)}
                                    className={`p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:ring-offset-gray-900 ${
                                      copySuccess[i]
                                        ? "bg-green-600 text-white"
                                        : "bg-red-600 hover:bg-red-700 text-white"
                                    }`}
                                    title={copySuccess[i] ? "Copied!" : "Copy to clipboard"}
                                    aria-label={copySuccess[i] ? "Image copied" : "Copy image to clipboard"}
                                  >
                                    <span className="sr-only">{copySuccess[i] ? "Copied" : "Copy to clipboard"}</span>
                                    <CopyIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action Buttons for Multiple Images */}
                        <div className="flex flex-wrap gap-3 items-center">
                          <button
                            onClick={() => downloadAllAsZip(msg.imageUrls)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:ring-offset-gray-900"
                            aria-label="Download all images as ZIP"
                          >
                            <ZipIcon />
                            Download All as ZIP
                          </button>

                          <button
                            onClick={() => {
                              const shareText = `Check out these thumbnails I created with AI! ${window.location.href}`
                              if (navigator.share) {
                                navigator.share({
                                  title: "AI Generated Thumbnails",
                                  text: shareText,
                                  url: window.location.href,
                                })
                              } else {
                                navigator.clipboard.writeText(shareText)
                                alert("Share link copied to clipboard!")
                              }
                            }}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-600 hover:border-gray-500 bg-transparent rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:ring-offset-gray-900"
                            aria-label="Share thumbnails"
                          >
                            <ShareIcon />
                            Share
                          </button>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-4">
                          <p className="text-sm text-gray-300 mb-2">
                            <span className="text-red-400 font-medium">Pro Tips:</span>
                          </p>
                          <ul className="text-xs text-gray-400 space-y-1">
                            <li>• Click thumbnails to view full size</li>
                            <li>• Use download for high-quality images</li>
                            <li>• Copy to clipboard for quick sharing</li>
                            <li>• Download ZIP for all variations at once</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 items-start">
                  <div className="p-2 rounded-full bg-gray-700">
                    <BotIcon />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-gray-400 text-sm">Analyzing your request and generating thumbnails...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-6 bg-gray-900/80 border-t border-gray-800">
          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4 relative inline-block">
              <img
                src={imagePreview || "/placeholder.svg?height=80&width=80&query=Uploaded%20image%20preview"}
                alt="Upload preview"
                className="h-20 w-20 object-cover rounded-lg border-2 border-red-600"
              />
              <button
                onClick={removeImagePreview}
                className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 text-xs"
                aria-label="Remove image preview"
              >
                <XIcon />
              </button>
            </div>
          )}

          {/* Quick Suggestions (when no current chat) */}
          {(!currentChat || currentChat.messages.length <= 1) && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-xs transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="relative">
            <div
              className={`relative ${dragActive ? "ring-2 ring-red-500 ring-opacity-50" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder={
                  imagePreview
                    ? "Great! Now describe your thumbnail vision and where you'd like your image positioned (left, right, center, background)..."
                    : "Describe your thumbnail idea, e.g., 'Gaming thumbnail with dramatic lighting' or upload your photo first"
                }
                className="w-full p-4 pr-24 pl-12 text-gray-200 bg-gray-800 border border-gray-700 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[3rem] max-h-32"
                rows="1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    handleSendMessage(e)
                    e.preventDefault()
                  }
                }}
                disabled={isLoading}
                style={{
                  height: "auto",
                  minHeight: "3rem",
                }}
                onInput={(e) => {
                  e.target.style.height = "auto"
                  e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px"
                }}
              />

              {dragActive && (
                <div className="absolute inset-0 bg-red-500/10 border-2 border-dashed border-red-500 rounded-full flex items-center justify-center pointer-events-none">
                  <p className="text-red-400 font-medium">Drop your image here</p>
                </div>
              )}
            </div>

            <div className="absolute left-3 top-2.5 -translate-y-1/2 flex items-center">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 focus-visible:ring-offset-gray-900 ${
                  imageFile ? "text-red-500 hover:bg-gray-700" : "text-gray-400 hover:bg-gray-700"
                }`}
                title="Upload your photo"
                aria-label="Upload your photo"
              >
                <PaperclipIcon />
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading || !currentMessage.trim()}
              className="absolute p-2 rounded-full right-3 top-2 -translate-y-1/2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              title="Send message"
              aria-label="Send message"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                <SendIcon />
              )}
            </button>
          </form>

          {/* Helper text */}
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span>
              {imagePreview
                ? "Your image is ready—describe your thumbnail vision and placement."
                : "Upload a photo (optional), then describe your thumbnail idea."}
            </span>
            <span>Press Enter to send</span>
          </div>
        </div>
      </main>
    </div>
  )
}



// "use client"

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';

// // --- Icon Components ---
// const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
// const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>;
// const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
// const BotIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>;
// const PaperclipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;
// const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;
// const MessageSquareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
// const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
// const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>;
// const ImageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>;
// const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>;
// const ShareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16,6 12,2 8,6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>;
// const ZipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="20" r="2"/><path d="M10 7L8 5l2-2"/><path d="m10 7 2 2-2 2"/></svg>;

// export default function Home() {
//     const [chats, setChats] = useState([]);
//     const [currentChat, setCurrentChat] = useState(null);
//     const [currentMessage, setCurrentMessage] = useState('');
//     const [imageFile, setImageFile] = useState(null);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [dragActive, setDragActive] = useState(false);
//     const [copySuccess, setCopySuccess] = useState({});
//     const router = useRouter();
//     const chatEndRef = useRef(null);
//     const fileInputRef = useRef(null);

//     // Fetch all chats on component mount
//     useEffect(() => {
//         const fetchChats = async () => {
//             try {
//                 const res = await fetch('/api/chat');
//                 if (res.ok) {
//                     const data = await res.json();
//                     setChats(data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching chats:', error);
//             }
//         };
//         fetchChats();
//     }, []);
    
//     // Scroll to bottom of chat
//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [currentChat?.messages]);

//     // Handle file selection
//     const handleFileSelect = (file) => {
//         if (file && file.type.startsWith('image/')) {
//             if (file.size > 10 * 1024 * 1024) { // 10MB limit
//                 alert('Image size should be less than 10MB');
//                 return;
//             }
//             setImageFile(file);
//             const reader = new FileReader();
//             reader.onload = (e) => setImagePreview(e.target.result);
//             reader.readAsDataURL(file);
//         }
//     };

//     // Handle drag and drop
//     const handleDrag = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         if (e.type === "dragenter" || e.type === "dragover") {
//             setDragActive(true);
//         } else if (e.type === "dragleave") {
//             setDragActive(false);
//         }
//     };

//     const handleDrop = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         setDragActive(false);
        
//         if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//             handleFileSelect(e.dataTransfer.files[0]);
//         }
//     };

//     // Download single image
//     const downloadImage = async (url, filename = 'thumbnail.png') => {
//         try {
//             const response = await fetch(url);
//             const blob = await response.blob();
//             const downloadUrl = window.URL.createObjectURL(blob);
//             const link = document.createElement('a');
//             link.href = downloadUrl;
//             link.download = filename;
//             document.body.appendChild(link);
//             link.click();
//             link.remove();
//             window.URL.revokeObjectURL(downloadUrl);
//         } catch (error) {
//             console.error('Error downloading image:', error);
//             alert('Failed to download image. Please try again.');
//         }
//     };

//     // Copy image to clipboard
//     const copyImageToClipboard = async (url, index) => {
//         try {
//             const response = await fetch(url);
//             const blob = await response.blob();
            
//             if (navigator.clipboard && window.ClipboardItem) {
//                 await navigator.clipboard.write([
//                     new ClipboardItem({ [blob.type]: blob })
//                 ]);
//                 setCopySuccess(prev => ({ ...prev, [index]: true }));
//                 setTimeout(() => {
//                     setCopySuccess(prev => ({ ...prev, [index]: false }));
//                 }, 2000);
//             } else {
//                 // Fallback for older browsers
//                 alert('Clipboard copy not supported. Please use download instead.');
//             }
//         } catch (error) {
//             console.error('Error copying image:', error);
//             alert('Failed to copy image to clipboard.');
//         }
//     };

//     // Download all images as ZIP
//     const downloadAllAsZip = async (imageUrls) => {
//         try {
//             const response = await fetch('/api/download-zip', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ imageUrls }),
//             });

//             if (response.ok) {
//                 const blob = await response.blob();
//                 const downloadUrl = window.URL.createObjectURL(blob);
//                 const link = document.createElement('a');
//                 link.href = downloadUrl;
//                 link.download = `thumbnails_${Date.now()}.zip`;
//                 document.body.appendChild(link);
//                 link.click();
//                 link.remove();
//                 window.URL.revokeObjectURL(downloadUrl);
//             } else {
//                 throw new Error('Failed to create ZIP file');
//             }
//         } catch (error) {
//             console.error('Error downloading ZIP:', error);
//             alert('Failed to download ZIP file. Please try downloading images individually.');
//         }
//     };
    
//     const handleNewChat = () => {
//         setCurrentChat(null);
//         setCurrentMessage('');
//         setImageFile(null);
//         setImagePreview(null);
//     };
    
//     const handleSelectChat = (chat) => {
//         setCurrentChat(chat);
//     };

//     const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (!currentMessage.trim() || isLoading) return;

//         setIsLoading(true);

//         const formData = new FormData();
//         formData.append('message', currentMessage);
//         formData.append('chatId', currentChat ? currentChat._id : 'new');
//         if (imageFile) {
//             formData.append('image', imageFile);
//         }

//         // Optimistically update the UI
//         const tempId = Date.now();
//         const userMessage = { role: 'user', content: currentMessage, _id: tempId };
//         setCurrentChat(prev => ({
//             ...prev,
//             _id: prev?._id || 'new-chat',
//             messages: [...(prev?.messages || []), userMessage]
//         }));
//         setCurrentMessage('');
//         setImageFile(null);
//         setImagePreview(null);

//         try {
//             const res = await fetch('/api/chat', { method: 'POST', body: formData });
//             const updatedChat = await res.json();
            
//             if (res.ok) {
//                 setCurrentChat(updatedChat);
//                 // Update the chat list
//                 setChats(prev => {
//                     const existing = prev.find(c => c._id === updatedChat._id);
//                     if (existing) {
//                         return prev.map(c => c._id === updatedChat._id ? updatedChat : c);
//                     } else {
//                         return [updatedChat, ...prev];
//                     }
//                 });
//             } else {
//                 throw new Error(updatedChat.message || 'API Error');
//             }

//         } catch (error) {
//             console.error("Failed to send message:", error);
//             // Revert optimistic update on error
//             setCurrentChat(prev => ({...prev, messages: prev.messages.filter(m => m._id !== tempId)}));
//             alert('Failed to send message. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleLogout = async () => {
//         try {
//             await fetch('/api/auth/logout');
//             router.push('/login');
//         } catch (error) {
//             console.error('Logout error:', error);
//         }
//     };

//     const removeImagePreview = () => {
//         setImageFile(null);
//         setImagePreview(null);
//         if (fileInputRef.current) {
//             fileInputRef.current.value = '';
//         }
//     };

//     // Quick suggestion buttons
//     const quickSuggestions = [
//         "Gaming thumbnail with neon effects",
//         "Food recipe with appetizing styling", 
//         "Travel vlog with scenic background",
//         "Tech review with modern design",
//         "Educational content with clean layout"
//     ];

//     const handleQuickSuggestion = (suggestion) => {
//         setCurrentMessage(suggestion);
//     };

//     return (
//         <div className="flex h-screen bg-gray-900 text-white font-sans">
//             {/* Sidebar */}
//             <aside className="w-64 bg-gray-800 p-4 flex-col hidden md:flex">
//                 <button 
//                     onClick={handleNewChat} 
//                     className="flex items-center justify-center gap-2 w-full px-4 py-2 mb-4 text-sm bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                     <PlusIcon /> New Project
//                 </button>
//                 <nav className="flex-grow overflow-y-auto space-y-2">
//                     {chats.map(chat => (
//                          <a 
//                             key={chat._id} 
//                             href="#" 
//                             onClick={(e) => {
//                                 e.preventDefault();
//                                 handleSelectChat(chat);
//                             }} 
//                             className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-700 transition-colors ${currentChat?._id === chat._id ? 'bg-gray-700' : ''}`}
//                         >
//                            <MessageSquareIcon /> 
//                            <span className="truncate flex-1">{chat.title || 'New Chat'}</span>
//                         </a>
//                     ))}
//                 </nav>
//                 <div className="mt-auto">
//                     <button 
//                         onClick={handleLogout} 
//                         className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
//                     >
//                         <UserIcon /> Logout
//                     </button>
//                 </div>
//             </aside>

//             {/* Main Chat Area */}
//             <main className="flex-1 flex flex-col">
//                 <div className="flex-1 p-6 overflow-y-auto">
//                      {(!currentChat || !currentChat.messages || currentChat.messages.length === 0) ? (
//                         <div className="text-center mt-20">
//                             <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//                                 Thumbnail Agent
//                             </h1>
//                             <p className="mt-4 text-lg text-gray-400">
//                                 Create stunning YouTube thumbnails with AI. Upload your photo and describe your vision.
//                             </p>
                            
//                             {/* Quick Start Suggestions */}
//                             <div className="mt-8 max-w-4xl mx-auto">
//                                 <h3 className="text-lg font-semibold mb-4 text-gray-300">Quick Start Ideas</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
//                                     {quickSuggestions.map((suggestion, index) => (
//                                         <button
//                                             key={index}
//                                             onClick={() => handleQuickSuggestion(suggestion)}
//                                             className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-left transition-colors border border-gray-700 hover:border-blue-500"
//                                         >
//                                             {suggestion}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
//                                 <div className="bg-gray-800 p-6 rounded-lg">
//                                     <h3 className="font-semibold text-blue-400 mb-2">Smart Conversations</h3>
//                                     <p className="text-sm text-gray-300">{"I'll ask questions to understand your vision and create the perfect thumbnail."}</p>
//                                 </div>
//                                 <div className="bg-gray-800 p-6 rounded-lg">
//                                     <h3 className="font-semibold text-purple-400 mb-2">Image Integration</h3>
//                                     <p className="text-sm text-gray-300">Upload your photo and choose exactly where it should appear in your thumbnail.</p>
//                                 </div>
//                                 <div className="bg-gray-800 p-6 rounded-lg">
//                                     <h3 className="font-semibold text-green-400 mb-2">Multiple Formats</h3>
//                                     <p className="text-sm text-gray-300">Get thumbnails for regular YouTube videos and Shorts, ready to download.</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="space-y-6">
//                             {currentChat.messages.map((msg, index) => (
//                                 <div key={msg._id || index} className={`flex gap-4 items-start`}>
//                                     <div className={`p-2 rounded-full flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
//                                         {msg.role === 'user' ? <UserIcon /> : <BotIcon />}
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                         <p className="whitespace-pre-wrap break-words">{msg.content}</p>
//                                         {msg.imageUrls && msg.imageUrls.length > 0 && (
//                                             <div className="mt-4 space-y-4">
//                                                 {/* Thumbnails Grid */}
//                                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                                     {msg.imageUrls.map((url, i) => (
//                                                         <div key={i} className="group relative bg-gray-800 rounded-lg overflow-hidden">
//                                                             <img 
//                                                                 src={url} 
//                                                                 alt={`Generated thumbnail ${i+1}`} 
//                                                                 className="w-full h-auto rounded-lg hover:opacity-90 transition-opacity" 
//                                                                 loading="lazy"
//                                                             />
//                                                             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                                                                 <div className="flex gap-2">
//                                                                     <button
//                                                                         onClick={() => window.open(url, '_blank')}
//                                                                         className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
//                                                                         title="View full size"
//                                                                     >
//                                                                         <ImageIcon />
//                                                                     </button>
//                                                                     <button
//                                                                         onClick={() => downloadImage(url, `thumbnail_${i+1}.png`)}
//                                                                         className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors"
//                                                                         title="Download"
//                                                                     >
//                                                                         <DownloadIcon />
//                                                                     </button>
//                                                                     <button
//                                                                         onClick={() => copyImageToClipboard(url, i)}
//                                                                         className={`p-2 rounded-full transition-colors ${
//                                                                             copySuccess[i] 
//                                                                                 ? 'bg-green-600 text-white' 
//                                                                                 : 'bg-purple-600 hover:bg-purple-700 text-white'
//                                                                         }`}
//                                                                         title={copySuccess[i] ? "Copied!" : "Copy to clipboard"}
//                                                                     >
//                                                                         <CopyIcon />
//                                                                     </button>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     ))}
//                                                 </div>
                                                
//                                                 {/* Action Buttons for Multiple Images */}
//                                                 <div className="flex flex-wrap gap-3 items-center">
//                                                     <button
//                                                         onClick={() => downloadAllAsZip(msg.imageUrls)}
//                                                         className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm transition-colors"
//                                                     >
//                                                         <ZipIcon />
//                                                         Download All as ZIP
//                                                     </button>
                                                    
//                                                     <button
//                                                         onClick={() => {
//                                                             const shareText = `Check out these thumbnails I created with AI! ${window.location.href}`;
//                                                             if (navigator.share) {
//                                                                 navigator.share({
//                                                                     title: 'AI Generated Thumbnails',
//                                                                     text: shareText,
//                                                                     url: window.location.href
//                                                                 });
//                                                             } else {
//                                                                 navigator.clipboard.writeText(shareText);
//                                                                 alert('Share link copied to clipboard!');
//                                                             }
//                                                         }}
//                                                         className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm transition-colors"
//                                                     >
//                                                         <ShareIcon />
//                                                         Share
//                                                     </button>
//                                                 </div>
                                                
//                                                 <div className="bg-gray-800 rounded-lg p-4">
//                                                     <p className="text-sm text-gray-300 mb-2">
//                                                         <span className="text-blue-400 font-medium">Pro Tips:</span>
//                                                     </p>
//                                                     <ul className="text-xs text-gray-400 space-y-1">
//                                                         <li>• Click thumbnails to view full size</li>
//                                                         <li>• Use download for high-quality images</li>
//                                                         <li>• Copy to clipboard for quick sharing</li>
//                                                         <li>• Download ZIP for all variations at once</li>
//                                                     </ul>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))}
//                             {isLoading && (
//                                 <div className="flex gap-4 items-start">
//                                     <div className="p-2 rounded-full bg-gray-700">
//                                         <BotIcon />
//                                     </div>
//                                     <div className="flex-1">
//                                         <div className="flex items-center gap-2">
//                                             <div className="flex space-x-1">
//                                                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
//                                                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                                                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                                             </div>
//                                             <span className="text-gray-400 text-sm">Analyzing your request and generating thumbnails...</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                             <div ref={chatEndRef} />
//                         </div>
//                     )}
//                 </div>
                
//                 {/* Input Form */}
//                 <div className="p-6 bg-gray-800/50">
//                     {/* Image Preview */}
//                     {imagePreview && (
//                         <div className="mb-4 relative inline-block">
//                             <img 
//                                 src={imagePreview} 
//                                 alt="Upload preview" 
//                                 className="h-20 w-20 object-cover rounded-lg border-2 border-blue-500"
//                             />
//                             <button
//                                 onClick={removeImagePreview}
//                                 className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 text-xs"
//                             >
//                                 <XIcon />
//                             </button>
//                         </div>
//                     )}

//                     {/* Quick Suggestions (when no current chat) */}
//                     {(!currentChat || currentChat.messages.length <= 1) && (
//                         <div className="mb-4">
//                             <div className="flex flex-wrap gap-2">
//                                 {quickSuggestions.slice(0, 3).map((suggestion, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => handleQuickSuggestion(suggestion)}
//                                         className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-full text-xs transition-colors"
//                                     >
//                                         {suggestion}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     <form onSubmit={handleSendMessage} className="relative">
//                         <div 
//                             className={`relative ${dragActive ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
//                             onDragEnter={handleDrag}
//                             onDragLeave={handleDrag}
//                             onDragOver={handleDrag}
//                             onDrop={handleDrop}
//                         >
//                             <textarea
//                                 value={currentMessage}
//                                 onChange={(e) => setCurrentMessage(e.target.value)}
//                                 placeholder={imagePreview 
//                                     ? "Great! Now describe your thumbnail vision and where you'd like your image positioned (left, right, center, background)..."
//                                     : "Describe your thumbnail idea, e.g., 'Gaming thumbnail with dramatic lighting' or upload your photo first"
//                                 }
//                                 className="w-full p-4 pr-24 pl-12 text-gray-200 bg-gray-800 border border-gray-700 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[3rem] max-h-32"
//                                 rows="1"
//                                 onKeyDown={(e) => { 
//                                     if (e.key === 'Enter' && !e.shiftKey) { 
//                                         handleSendMessage(e); 
//                                         e.preventDefault(); 
//                                     } 
//                                 }}
//                                 disabled={isLoading}
//                                 style={{
//                                     height: 'auto',
//                                     minHeight: '3rem'
//                                 }}
//                                 onInput={(e) => {
//                                     e.target.style.height = 'auto';
//                                     e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
//                                 }}
//                             />
                            
//                             {dragActive && (
//                                 <div className="absolute inset-0 bg-blue-500 bg-opacity-10 border-2 border-dashed border-blue-500 rounded-full flex items-center justify-center pointer-events-none">
//                                     <p className="text-blue-400 font-medium">Drop your image here</p>
//                                 </div>
//                             )}
//                         </div>

//                         <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
//                             <input 
//                                 type="file" 
//                                 accept="image/*" 
//                                 ref={fileInputRef} 
//                                 onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])} 
//                                 className="hidden" 
//                             />
//                             <button 
//                                 type="button" 
//                                 onClick={() => fileInputRef.current?.click()} 
//                                 className={`p-2 rounded-full hover:bg-gray-700 transition-colors ${imageFile ? 'text-blue-500' : 'text-gray-400'}`}
//                                 title="Upload your photo"
//                             >
//                                 <PaperclipIcon/>
//                             </button>
//                         </div>
                        
//                         <button 
//                             type="submit" 
//                             disabled={isLoading || !currentMessage.trim()} 
//                             className="absolute p-2 rounded-full right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
//                             title="Send message"
//                         >
//                             {isLoading ? (
//                                 <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
//                             ) : (
//                                 <SendIcon />
//                             )}
//                         </button>
//                     </form>

//                     {/* Helper text */}
//                     <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
//                         <span>
//                             {imagePreview 
//                                 ? "Perfect! Your image is ready. Now describe your thumbnail vision." 
//                                 : "Upload your photo first, then describe your thumbnail idea"
//                             }
//                         </span>
//                         <span>Press Enter to send</span>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }

// // // // ************************************************************************************************** // // // //
// // // // ************************************************************************************************** // // // //
// // // // ************************************************************************************************** // // // //
// // // // ************************************************************************************************** // // // //
// // // // ************************************************************************************************** // // // //
// // // // ************************************************************************************************** // // // //
// // // // ************************************************************************************************** // // // //
// // // // ************************************************************************************************** // // // //

// "use client"

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';

// // --- Icon Components (keep these as they were) ---
// const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
// const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>;
// const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
// const BotIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>;
// const PaperclipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>;
// const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>;
// const MessageSquareIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;


// export default function Home() {
//     const [chats, setChats] = useState([]);
//     const [currentChat, setCurrentChat] = useState(null);
//     const [currentMessage, setCurrentMessage] = useState('');
//     const [imageFile, setImageFile] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const router = useRouter();
//     const chatEndRef = useRef(null);
//     const fileInputRef = useRef(null);

//     // Fetch all chats on component mount
//     useEffect(() => {
//         const fetchChats = async () => {
//             const res = await fetch('/api/chat');
//             if (res.ok) {
//                 const data = await res.json();
//                 setChats(data);
//             }
//         };
//         fetchChats();
//     }, []);
    
//     // Scroll to bottom of chat
//     useEffect(() => {
//         chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [currentChat?.messages]);
    
//     const handleNewChat = () => {
//         setCurrentChat(null);
//         setCurrentMessage('');
//         setImageFile(null);
//     };
    
//     const handleSelectChat = (chat) => {
//         setCurrentChat(chat);
//     };

//     const handleSendMessage = async (e) => {
//         e.preventDefault();
//         if (!currentMessage.trim() || isLoading) return;

//         setIsLoading(true);

//         const formData = new FormData();
//         formData.append('message', currentMessage);
//         formData.append('chatId', currentChat ? currentChat._id : 'new');
//         if (imageFile) {
//             formData.append('image', imageFile);
//         }

//         // Optimistically update the UI
//         const tempId = Date.now();
//         const userMessage = { role: 'user', content: currentMessage, _id: tempId };
//         setCurrentChat(prev => ({
//             ...prev,
//             _id: prev?._id || 'new-chat',
//             messages: [...(prev?.messages || []), userMessage]
//         }));
//         setCurrentMessage('');
//         setImageFile(null);

//         try {
//             const res = await fetch('/api/chat', { method: 'POST', body: formData });
//             const updatedChat = await res.json();
            
//             if (res.ok) {
//                 setCurrentChat(updatedChat);
//                 // Update the chat list
//                 setChats(prev => {
//                     const existing = prev.find(c => c._id === updatedChat._id);
//                     if (existing) {
//                         return prev.map(c => c._id === updatedChat._id ? updatedChat : c);
//                     } else {
//                         return [updatedChat, ...prev];
//                     }
//                 });
//             } else {
//                 throw new Error(updatedChat.message || 'API Error');
//             }

//         } catch (error) {
//             console.error("Failed to send message:", error);
//             // Revert optimistic update on error
//             setCurrentChat(prev => ({...prev, messages: prev.messages.filter(m => m._id !== tempId)}));
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleLogout = async () => {
//         await fetch('/api/auth/logout');
//         router.push('/login');
//     };

//     return (
//         <div className="flex h-screen bg-gray-900 text-white font-sans">
//             {/* Sidebar */}
//             <aside className="w-64 bg-gray-800 p-4 flex-col hidden md:flex">
//                 <button onClick={handleNewChat} className="flex items-center justify-center gap-2 w-full px-4 py-2 mb-4 text-sm bg-blue-600 rounded-lg hover:bg-blue-700">
//                     <PlusIcon /> New Project
//                 </button>
//                 <nav className="flex-grow overflow-y-auto space-y-2">
//                     {chats.map(chat => (
//                          <a key={chat._id} href="#" onClick={() => handleSelectChat(chat)} className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-700 ${currentChat?._id === chat._id ? 'bg-gray-700' : ''}`}>
//                            <MessageSquareIcon /> <span className="truncate flex-1">{chat.title}</span>
//                         </a>
//                     ))}
//                 </nav>
//                 <div className="mt-auto">
//                     <button onClick={handleLogout} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded-md hover:bg-gray-700">
//                         <UserIcon /> Logout
//                     </button>
//                 </div>
//             </aside>

//             {/* Main Chat Area */}
//             <main className="flex-1 flex flex-col">
//                 <div className="flex-1 p-6 overflow-y-auto">
//                      {(!currentChat || !currentChat.messages || currentChat.messages.length === 0) ? (
//                         <div className="text-center mt-20">
//                             <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Thumbnail Agent</h1>
//                             <p className="mt-4 text-lg text-gray-400">Start a new project or select a previous one.</p>
//                         </div>
//                     ) : (
//                         <div className="space-y-6">
//                             {currentChat.messages.map((msg, index) => (
//                                 <div key={msg._id || index} className={`flex gap-4 items-start`}>
//                                     <div className={`p-2 rounded-full ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>{msg.role === 'user' ? <UserIcon /> : <BotIcon />}</div>
//                                     <div className="flex-1">
//                                         <p className="whitespace-pre-wrap">{msg.content}</p>
//                                         {msg.imageUrls && (
//                                             <div className="mt-4 grid grid-cols-2 gap-4">
//                                                 {msg.imageUrls.map((url, i) => (
//                                                     <a key={i} href={url} target="_blank" rel="noopener noreferrer">
//                                                         <img src={url} alt={`Generated thumbnail ${i+1}`} className="rounded-lg hover:opacity-80 transition-opacity" />
//                                                     </a>
//                                                 ))}
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             ))}
//                             <div ref={chatEndRef} />
//                         </div>
//                     )}
//                 </div>
                
//                 {/* Input Form */}
//                 <div className="p-6 bg-gray-800/50">
//                     <form onSubmit={handleSendMessage} className="relative">
//                          <textarea
//                             value={currentMessage}
//                             onChange={(e) => setCurrentMessage(e.target.value)}
//                             placeholder="Describe your thumbnail, e.g., 'A dramatic thumbnail for a travel vlog in the mountains'"
//                             className="w-full p-4 pr-24 pl-12 text-gray-200 bg-gray-800 border border-gray-700 rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             rows="1"
//                             onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { handleSendMessage(e); e.preventDefault(); } }}
//                             disabled={isLoading}
//                         />
//                         <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
//                             <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => setImageFile(e.target.files[0])} className="hidden" />
//                             <button type="button" onClick={() => fileInputRef.current.click()} className={`p-2 rounded-full hover:bg-gray-700 ${imageFile ? 'text-blue-500' : ''}`}><PaperclipIcon/></button>
//                         </div>
//                         <button type="submit" disabled={isLoading || !currentMessage.trim()} className="absolute p-2 rounded-full right-3 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed">
//                             {isLoading ? <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : <SendIcon />}
//                         </button>
//                     </form>
//                 </div>
//             </main>
//         </div>
//     );
// }


