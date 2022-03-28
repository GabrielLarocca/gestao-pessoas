export default function Loading({ loading, children }) {
	return (
		loading ?
			<div id='loading' className="d-flex justify-content-center align-items-center">
				<i className="fa fa-spinner fa-spin" />
			</div>
			:
			children
	);
}