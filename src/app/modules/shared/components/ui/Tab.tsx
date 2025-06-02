import React, { createContext, useContext, useState, useCallback } from "react"
import { cn } from "../../../vin/utils/utils"

// Context for managing tab state
interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within a Tabs provider")
  }
  return context
}

// Main Tabs component (Root)
interface TabsProps {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  children: React.ReactNode
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value, onValueChange, className, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || "")
    
    const currentValue = value !== undefined ? value : internalValue
    const handleValueChange = useCallback((newValue: string) => {
      if (onValueChange) {
        onValueChange(newValue)
      } else {
        setInternalValue(newValue)
      }
    }, [onValueChange])

    return (
      <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = "Tabs"

// TabsList component
interface TabsListProps {
  className?: string
  children: React.ReactNode
}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="tablist"
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
TabsList.displayName = "TabsList"

// TabsTrigger component
interface TabsTriggerProps {
  value: string
  className?: string
  children: React.ReactNode
  disabled?: boolean
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, className, children, disabled, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useTabsContext()
    const isActive = selectedValue === value

    const handleClick = () => {
      if (!disabled) {
        onValueChange(value)
      }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        handleClick()
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`tabpanel-${value}`}
        id={`tab-${value}`}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isActive 
            ? "bg-white text-slate-950 shadow-sm" 
            : "hover:bg-slate-200",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

// TabsContent component
interface TabsContentProps {
  value: string
  className?: string
  children: React.ReactNode
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, className, children, ...props }, ref) => {
    const { value: selectedValue } = useTabsContext()
    const isActive = selectedValue === value

    if (!isActive) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`tabpanel-${value}`}
        aria-labelledby={`tab-${value}`}
        className={cn(
          "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2",
          className
        )}
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }