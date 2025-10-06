'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const FlagUSA = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" {...props}>
    <rect width="5" height="3" fill="#B22234" />
    <rect width="5" height="2" fill="#fff" />
    <rect width="5" height="1" fill="#B22234" />
    <rect width="2" height="1.5" fill="#3C3B6E" />
  </svg>
);

const FlagTR = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" {...props}>
        <rect width="30" height="20" fill="#E30A17"/>
        <path d="M15 10 a 5 5 0 1 0 0 0.0001Z M16 10 a 4 4 0 1 0 0 0.0001Z" fill="#fff"/>
        <path d="M17.5 10l-2.5 -1.5l1 3v-3l-1 3Z" fill="#fff"/>
    </svg>
);

const FlagSA = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" {...props}>
        <rect width="600" height="400" fill="#006c35"/>
        <text x="300" y="270" fontFamily="'Arial'" fontSize="85" fill="#fff" textAnchor="middle">لا إله إلا الله محمد رسول الله</text>
    </svg>
);



export function LanguageSwitcher() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
            <FlagUSA className="h-6 w-6 rounded-full" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
            <FlagUSA className="h-4 w-4 mr-2" />
            <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <FlagTR className="h-4 w-4 mr-2" />
            <span>Türkçe</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
            <FlagSA className="h-4 w-4 mr-2" />
            <span>العربية</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
