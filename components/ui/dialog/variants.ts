import { cva } from 'class-variance-authority'

export const dialogContentVariants = cva(
  'fixed left-1/2 z-50 -translate-x-1/2 gap-4 border border-gray-o-1 bg-gray-b-0 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2 sm:rounded-lg',
  {
    variants: {
      variant: {
        default: 'top-1/2 grid w-full max-w-lg -translate-y-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%]',
        large: 'top-[5vh] grid h-[70vh] w-[90vw] max-w-[900px] data-[state=closed]:slide-out-to-top-[5%] data-[state=open]:slide-in-from-top-[5%]',
        full: 'top-1/2 size-full -translate-y-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-top-[48%]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)
