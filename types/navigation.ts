export interface NavItem {
  title: string
  _path: string
  children?: NavItem[]
  icon?: string
  group?: string
  firstLink?: string
}

export type Navigation = NavItem[]
