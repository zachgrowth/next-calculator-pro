import { render as rtlRender, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactElement } from 'react'

const render = (ui: ReactElement, options = {}) => {
  const user = userEvent.setup()
  return {
    user,
    ...rtlRender(ui, {
      wrapper: ({ children }) => children,
      ...options,
    }),
  }
}

export { render, screen, waitFor }
export default render 