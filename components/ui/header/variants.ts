import { type VariantProps, cva } from 'class-variance-authority'



export const headerVariants = cva(
  'fixed top-0 z-50 w-3/4 bg-gray-b-0 ',
  {
    variants: {
      variant: {
        default: 'border-gray-o-1',
        transparent: 'border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type HeaderVariants = VariantProps<typeof headerVariants>
