import useWindowDimensions from './hooks/useWindowDimensions'
import './ObjectsVisualiser.scss'

const ObjectsVisualiser = (props) => {
	const {objectsData} = props;
	const tags = objectsData.analysis_results.other_tags
  	const { height, width } = useWindowDimensions();
  	const video_time = 300.0 // seconds

  	const rerange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

	const select_keys = (array, keys_to_keep) => array.map(obj => keys_to_keep.reduce((acc, curr) => {
	  acc[curr] = obj[curr];
	  return acc;
	}, {}));

	const keys_to_keep = ['id', 'tag_name', 'start_time', 'end_time'];
	var data = select_keys(tags, keys_to_keep)

	const sort_by_key_ascending = (array, key) => {
	    return array.sort((a, b) => {
	        var x = a[key]; 
	        var y = b[key];
	        if(x < y) {
	        	return -1 // sort a before b
	        } else if(x > y) {
	        	return 1 // sort b before a
	        } else {
	        	return 0 // equality
	        }
	    })
	};

	data = sort_by_key_ascending(data, 'start_time')

	const group_by_key = (array, key) => {
	    return array.reduce((acc, curr) => {
	        acc[curr[key]] = acc[curr[key]] || [];
	        acc[curr[key]].push(curr);
	        return acc;
	    }, {})};	

	data = group_by_key(data, "start_time")

	// prepare html
	var html = []

	Object.keys(data).forEach((key, index) => {
		const l = rerange(key, 0, video_time, 0, width);
		const tags = data[key]

		var tags_html = []
		tags.forEach((tag)=> {
			console.log(tag)
			tags_html.push(
				<span>{tag.tag_name}</span>
				)
		})
		html.push(
			<li style={{ left: l + 'px' }}>
				{tags_html}
			</li>)
	})

	return(
		<div>
			<ul>
			{html.map((d) => {
				return (d)
			})}
{/*			{tags.map((d) => {
				return (
					<li key={d.id}> 
					<span>{d.tag_name} </span>
					<span>{d.start_time}</span>
					</li>)
			})}*/}
			</ul>
		</div>
	)
}

export default ObjectsVisualiser