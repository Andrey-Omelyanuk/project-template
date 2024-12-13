import { OverlayToaster, Position } from '@blueprintjs/core'
import { createRoot } from 'react-dom/client'

export const toaster = OverlayToaster.createAsync({
    // className: "recipe-toaster",
    position: Position.TOP,
}, {
    // Use createRoot() instead of ReactDOM.render(). This can be deleted after
    // a future Blueprint version uses createRoot() for Toasters by default.
    domRenderer: (toaster, containerElement) => createRoot(containerElement).render(toaster),
})