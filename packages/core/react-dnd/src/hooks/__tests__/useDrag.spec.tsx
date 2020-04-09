import { useDrag } from '../useDrag'
import { renderIntoDocument, act } from 'react-dom/test-utils'
import React, { useRef } from 'react'
import { makeWrappedComponent } from './hookHelpers'

describe('useDrag', () => {
	it('disconnects drag source on unmount', async () => {
		// Prepare: Create a component that connects a drag source.
		function Component() {
			const targetRef = useRef<HTMLDivElement>(null)

			const dragSpec = { item: { type: 'test' } }
			const [, connectDragSource] = useDrag(dragSpec)

			connectDragSource(targetRef)
			return <div ref={targetRef} />
		}
		const [WrappedComponent, backend, componentActions] = makeWrappedComponent(
			Component,
		)

		// Prepare: Mock backend methods for the drag source.
		const disconnect = jest.fn()
		const connect = jest
			.spyOn(backend, 'connectDragSource')
			.mockReturnValue(disconnect)

		// Act: Mount the component.
		act(() => {
			renderIntoDocument(<WrappedComponent />)
		})

		// Act: Unmount the component.
		act(() => {
			componentActions.hide()
		})

		// Assert: Verify connect and disconnect have been called an equal number of times.
		expect(disconnect).toHaveBeenCalled()
		expect(connect.mock.calls.length).toEqual(disconnect.mock.calls.length)
	})

	it('disconnects drag preview on unmount', async () => {
		// Prepare: Create a component that connects a drag preview.
		function Component() {
			const targetRef = useRef<HTMLDivElement>(null)

			const dragSpec = { item: { type: 'test' } }
			const [, connectDragSource, connectDragPreview] = useDrag(dragSpec)

			connectDragSource(targetRef)

			connectDragPreview(new Image())
			return <div ref={targetRef} />
		}
		const [WrappedComponent, backend, componentActions] = makeWrappedComponent(
			Component,
		)

		// Prepare: Mock backend methods for the drag source.
		const disconnect = jest.fn()
		const connect = jest
			.spyOn(backend, 'connectDragPreview')
			.mockReturnValue(disconnect)

		// Act: Mount the component.
		act(() => {
			renderIntoDocument(<WrappedComponent />)
		})

		// Act: Unmount the component.
		act(() => {
			componentActions.hide()
		})

		// Assert: Verify connect and disconnect have been called an equal number of times.
		expect(disconnect).toHaveBeenCalled()
		expect(connect.mock.calls.length).toEqual(disconnect.mock.calls.length)
	})
})
