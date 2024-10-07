export interface PricingFeature {
  text: string
  icon: string
}

export interface PricingTier {
  name: string
  description: string
  price: string
  period?: string
  features: PricingFeature[]
  ctaText: string
  highlight?: boolean
}

export interface Bundle {
  name: string
  description: string
  price: string
  period: string
  includes: PricingFeature[]
  savings: string
  ctaText: string
}
