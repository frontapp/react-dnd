import React, { ReactElement, useState } from 'react'
import TestBackend from 'react-dnd-test-backend'
import { createDragDropManager, Backend } from 'dnd-core'
import { DndContext } from 'react-dnd'

interface ComponentActions {
	hide(): void
}

export function makeWrappedComponent(
	Component: () => ReactElement,
): [() => ReactElement, Backend, ComponentActions] {
	const manager = createDragDropManager(TestBackend, {})
	const backend = manager.getBackend()
	const componentActions = { hide: () => {} }
	function WrappedComponent(): ReactElement {
		const [isVisible, setIsVisible] = useState(true)
		componentActions.hide = () => setIsVisible(false)
		return (
			<DndContext.Provider value={{ dragDropManager: manager }}>
				{isVisible && <Component />}
			</DndContext.Provider>
		)
	}
	return [WrappedComponent, backend, componentActions]
}
