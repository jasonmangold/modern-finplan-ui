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
      setShowLeftArrow(container.scrollLeft > 0)
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      )
    }
  }, [])

  React.useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      checkScroll()
      container.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      
      return () => {
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
      }
    }
  }, [checkScroll])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative w-full">
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-0 z-20 h-10 w-12 bg-gradient-to-r from-background via-background/90 to-transparent flex items-center justify-center shadow-lg border-r border-border/50"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
      )}
      
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <TabsPrimitive.List
          ref={ref}
          className={cn(
            "inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground min-w-full",
            className
          )}
          {...props}
        />
      </div>

      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-0 z-20 h-10 w-12 bg-gradient-to-l from-background via-background/90 to-transparent flex items-center justify-center shadow-lg border-l border-border/50"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
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
