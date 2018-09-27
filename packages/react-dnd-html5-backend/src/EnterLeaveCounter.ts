const union = require('lodash/union')
const without = require('lodash/without')

type IsNodeInDocument = (node: any) => boolean;

export default class EnterLeaveCounter {
	private entered: any[] = [];
	private isNodeInDocument: IsNodeInDocument;

	constructor(isNodeInDocument: IsNodeInDocument) {
		this.isNodeInDocument = isNodeInDocument;
	}

	public enter(enteringNode: any) {
		const previousLength = this.entered.length

		const isNodeEntered = (node: any) =>
			this.isNodeInDocument(node) &&
			(!node.contains || node.contains(enteringNode))

		this.entered = union(this.entered.filter(isNodeEntered), [enteringNode])

		return previousLength === 0 && this.entered.length > 0
	}

	public leave(leavingNode: any) {
		const previousLength = this.entered.length

		this.entered = without(
			this.entered.filter(node => this.isNodeInDocument(node)),
			leavingNode,
		)

		return previousLength > 0 && this.entered.length === 0
	}

	public reset() {
		this.entered = []
	}
}
