import React from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event'
import { userEvent as setupUserEvent } from '@testing-library/user-event'

interface RenderResult extends ReturnType<typeof rtlRender> {
  user: UserEvent
}

function render(
  ui: React.ReactElement,
  options: RenderOptions = {}
): RenderResult {
  return {
    ...rtlRender(ui, options),
    user: setupUserEvent.setup(),
  }
}

// 重新导出所有
export * from '@testing-library/react'
export { render }
export { setupUserEvent as userEvent } 