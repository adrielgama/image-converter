'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'inline-flex h-9 w-fit items-center justify-center gap-1 rounded-lg bg-zinc-100 p-1 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "dark:outline-ring/40 outline-ring/50 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-1 text-sm font-medium whitespace-nowrap ring-zinc-950/10 transition-[color,box-shadow] hover:bg-indigo-100 focus-visible:ring-4 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 aria-invalid:focus-visible:ring-0 data-[state=active]:bg-indigo-950 data-[state=active]:text-white data-[state=active]:shadow-sm dark:dark:ring-zinc-300/20 dark:ring-zinc-950/20 dark:data-[state=active]:bg-zinc-950 dark:data-[state=active]:text-zinc-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        'dark:outline-ring/40 outline-ring/50 flex-1 ring-zinc-950/10 transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0 dark:dark:ring-zinc-300/20 dark:ring-zinc-950/20',
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
