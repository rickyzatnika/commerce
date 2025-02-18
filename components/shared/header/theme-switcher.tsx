'use client'

import { ChevronDownIcon, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// import useColorStore from '@/hooks/use-color-store'
import useIsMounted from '@/hooks/use-is-mounted'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  // const { availableColors, color, setColor } = useColorStore(theme)
  const changeTheme = (value: string) => {
    setTheme(value)
  }
  const isMounted = useIsMounted()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='header-button h-[41px]'>
        {theme === 'dark' && isMounted ? (
          <div className='flex items-center gap-1'>
            <Moon className='h-4 w-4' /> Gelap <ChevronDownIcon />
          </div>
        ) : (
          <div className='flex items-center gap-1'>
            <Sun className='h-4 w-4' /> Terang
            <ChevronDownIcon />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40'>
        <DropdownMenuRadioGroup value={theme} onValueChange={changeTheme}>
          <DropdownMenuRadioItem className='cursor-pointer' value='dark'>
            <Moon className='h-4 w-4 mr-1' /> Gelap
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='cursor-pointer' value='light'>
            <Sun className='h-4 w-4 mr-1' /> Terang
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuLabel>Color</DropdownMenuLabel> */}

        {/* <DropdownMenuRadioGroup
          value={color.name}
          onValueChange={(value) => setColor(value, true)}
        >
          {availableColors.map((c) => (
            <DropdownMenuRadioItem key={c.name} value={c.name}>
              <div
                style={{ backgroundColor: c.name }}
                className='h-4 w-4 mr-1 rounded-full'
              ></div>

              {c.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}