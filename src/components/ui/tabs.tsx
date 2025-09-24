import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const [showLeftArrow, setShowLeftArrow] = React.useState(false)
  const [showRightArrow, setShowRightArrow] = React.useState(false)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const checkScroll = React.useCallback(() => {
    const container = scrollContainerRef.current
    if (container) {
      const isScrollable = container.scrollWidth > container.clientWidth
      const hasLeftScroll = container.scrollLeft > 5 // Add small threshold
      const hasRightScroll = container.scrollLeft < container.scrollWidth - container.clientWidth - 5 // Add small threshold
      
      setShowLeftArrow(isScrollable && hasLeftScroll)
      setShowRightArrow(isScrollable && hasRightScroll)
    }
  }, [])

  React.useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      // Initial check
      const timeout = setTimeout(checkScroll, 100) // Delay to ensure content is rendered
      
      container.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      
      // Use ResizeObserver for better detection of content changes
      const resizeObserver = new ResizeObserver(checkScroll)
      resizeObserver.observe(container)
      
      return () => {
        clearTimeout(timeout)
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
        resizeObserver.disconnect()
      }
    }
  }, [checkScroll])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -120, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 120, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full">
      {showLeftArrow && (
        <div className="absolute left-0 top-1 z-30 h-8 w-10 bg-background flex items-center justify-center">
          <button
            onClick={scrollLeft}
            className="h-7 w-7 bg-muted hover:bg-muted/80 flex items-center justify-center transition-all duration-200 rounded-md shadow-sm border border-border/50"
            aria-label="Scroll tabs left"
          >
            <ChevronLeft className="h-3.5 w-3.5 text-foreground" />
          </button>
        </div>
      )}
      
      <div
        ref={scrollContainerRef}
        className={cn(
          "overflow-x-auto scrollbar-none",
          showLeftArrow && "pl-10",
          showRightArrow && "pr-10"
        )}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none'
        }}
      >
        <TabsPrimitive.List
          ref={ref}
          className={cn(
            "inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground",
            "min-w-fit", // Changed from min-w-full to prevent unnecessary stretch
            className
          )}
          {...props}
        />
      </div>

      {showRightArrow && (
        <div className="absolute right-0 top-1 z-30 h-8 w-10 bg-background flex items-center justify-center">
          <button
            onClick={scrollRight}
            className="h-7 w-7 bg-muted hover:bg-muted/80 flex items-center justify-center transition-all duration-200 rounded-md shadow-sm border border-border/50"
            aria-label="Scroll tabs right"
          >
            <ChevronRight className="h-3.5 w-3.5 text-foreground" />
          </button>
        </div>
      )}
    </div>
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm flex-shrink-0 min-w-fit",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
