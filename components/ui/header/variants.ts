import { type VariantProps, cva } from 'class-variance-authority'

export const headerVariants = cva(
  'fixed top-0 z-50 w-3/4 bg-gray-b-0',
  {
    variants: {
      variant: {
        default: 'border-gray-o-1',
        transparent: 'border-transparent',
      },
      size: {
        default: '',
        sm: 'h-14',
        md: 'h-16',
        lg: 'h-20',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type HeaderVariants = VariantProps<typeof headerVariants>
