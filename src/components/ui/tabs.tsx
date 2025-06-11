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
  const [activeTabPosition, setActiveTabPosition] = React.useState({ left: 0, width: 0 })
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const tabsListRef = React.useRef<HTMLDivElement>(null)

  const checkScroll = React.useCallback(() => {
    const container = scrollContainerRef.current
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0)
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      )
    }
  }, [])

  const updateActiveTabPosition = React.useCallback(() => {
    const tabsList = tabsListRef.current
    if (tabsList) {
      const activeTab = tabsList.querySelector('[data-state="active"]') as HTMLElement
      if (activeTab) {
        const listRect = tabsList.getBoundingClientRect()
        const tabRect = activeTab.getBoundingClientRect()
        setActiveTabPosition({
          left: tabRect.left - listRect.left,
          width: tabRect.width
        })
      }
    }
  }, [])

  React.useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      checkScroll()
      updateActiveTabPosition()
      container.addEventListener('scroll', checkScroll)
      window.addEventListener('resize', checkScroll)
      
      // Observer for active tab changes
      const observer = new MutationObserver(updateActiveTabPosition)
      if (tabsListRef.current) {
        observer.observe(tabsListRef.current, { 
          attributes: true, 
          subtree: true, 
          attributeFilter: ['data-state'] 
        })
      }
      
      return () => {
        container.removeEventListener('scroll', checkScroll)
        window.removeEventListener('resize', checkScroll)
        observer.disconnect()
      }
    }
  }, [checkScroll, updateActiveTabPosition])

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
        <div className="relative">
          {/* Sliding background indicator */}
          <div 
            className="absolute top-1 bottom-1 bg-background shadow-sm rounded-sm transition-all duration-300 ease-out z-0"
            style={{
              left: `${activeTabPosition.left + 4}px`,
              width: `${activeTabPosition.width - 8}px`
            }}
          />
          <TabsPrimitive.List
            ref={(node) => {
              if (typeof ref === 'function') ref(node)
              else if (ref) ref.current = node
              tabsListRef.current = node
            }}
            className={cn(
              "relative inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground min-w-full",
              className
            )}
            {...props}
          />
        </div>
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
      "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground flex-shrink-0 min-w-fit bg-transparent hover:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none",
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
