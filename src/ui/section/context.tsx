import * as React from 'react'

interface SectionContextData {
  readonly showArrow?: boolean
  readonly isModal?: boolean
  readonly selectable?: boolean
  readonly radius?: boolean
}

export const SectionContext = React.createContext<SectionContextData>({
  isModal: false,
  showArrow: true,
  radius: false,
  selectable: false
})
