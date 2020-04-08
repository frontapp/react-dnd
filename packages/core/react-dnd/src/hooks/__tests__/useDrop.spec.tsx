import { renderIntoDocument, act } from 'react-dom/test-utils'
import React from 'react'
import { makeWrappedComponent } from './hookHelpers'
import { useDrop } from '..'

describe('useDrop', () => {
	it('disconnects drop target on unmount', async () => {
		// Prepare: Create a component that connects a drop target.
		function Component() {
			const [, connectDropTarget] = useDrop({
				accept: 'file',
			})

			return <div ref={connectDropTarget as any}>hi</div>
		}
		const [WrappedComponent, backend, componentActions] = makeWrappedComponent(
			Component,
		)

		// Prepare: Mock backend methods for the drag source.
		const disconnect = jest.fn()
		const connect = jest
			.spyOn(backend, 'connectDropTarget')
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
