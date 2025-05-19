"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"
import Input from "../../../../../shared/components/ui/Input"
import Button from "../../../../../shared/components/ui/Button"


interface SearchBarProps {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const clearSearch = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search guides..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 py-2 w-full border-[#d9d9d9] focus:border-[#2a9f47] focus:ring-[#2a9f47]"
        />
        {query && (
          <Button
            type="button"
            
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  )
}
