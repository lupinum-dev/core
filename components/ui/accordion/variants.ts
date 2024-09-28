import { type VariantProps, cva } from 'class-variance-authority'

export const accordionVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-foreground text-background border border-input rounded-lg',
      outline: 'border border-input bg-transparent',
      ghost: 'border-none bg-transparent',
    },
    size: {
      default: 'p-5',
      compact: 'p-3',
      loose: 'p-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export type AccordionVariants = VariantProps<typeof accordionVariants>