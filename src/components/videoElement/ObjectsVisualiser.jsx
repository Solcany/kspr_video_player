import './ObjectsVisualiser.scss'

const ObjectsVisualiser = (props) => {
	const {objectsData} = props;
	const tags = objectsData.analysis_results.other_tags
	
	return(
		<div>
			<ul>
			{tags.map((tag) => {
				return (<li key={tag.id}> {tag.tag_name}</li>)
			})}
			</ul>
		</div>
	)
}

export default ObjectsVisualiser