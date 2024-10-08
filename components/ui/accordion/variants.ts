import { type VariantProps, cva } from 'class-variance-authority'

export const accordionVariants = cva('', {
  variants: {
    variant: {
      default: 'rounded-lg border border-input bg-foreground text-background',
      outline: 'border border-input bg-transparent',
      ghost: 'border-none bg-transparent',
    },
    size: {
      zero: 'p-0',
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
