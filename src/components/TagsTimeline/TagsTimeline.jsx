import useWindowDimensions from './hooks/useWindowDimensions'
import './TagsTimeline.scss'

const TagsTimeline = (props) => {
	const {response, tagsKey} = props;

	const tags = response.analysis_results[tagsKey];
  	const video_duration = response.video_info.length_sec;
  	const { height, width } = useWindowDimensions();

  	const rerange = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

	const select_keys = (array, keys_to_keep) => array.map(obj => keys_to_keep.reduce((acc, curr) => {
	  acc[curr] = obj[curr];
	  return acc;
	}, {}));

	const group_by_key = (array, key) => {
	    return array.reduce((acc, curr) => {
	        acc[curr[key]] = acc[curr[key]] || [];
	        acc[curr[key]].push(curr);
	        return acc;
	    }, {})};

	var sort_numerical_strings = (array) => {
		return array.sort((a, b) => {
			return parseFloat(a) - parseFloat(b);
		})
	}

	const keys_to_keep = ['id', 'tag_name', 'start_time', 'end_time'];
	var data = select_keys(tags, keys_to_keep)

	// group all the tags by start_time
	data = group_by_key(data, "start_time")

	// sort them in ascending order
	const keys = sort_numerical_strings(Object.keys(data).sort())

	// convert object to array
	var data_as_arr = keys.map((key) => {
		return {start_time: key, tags: data[key]}
	})

	// create absolute positions of the tags timeline
	const offset = 20;
	var positions = data_as_arr.map((obj) => {
		return rerange(parseFloat(obj.start_time),0,video_duration,0,width) + offset;
	})

	// adjust the positions so that the rendered tags don't overlap
	const min_dist = 15;
	var adjusted_positions = []
		// the first tag doesn't need to be adjusted, add it to the new arr
		adjusted_positions.push(positions[0])
	// start looping at the 2nd element
	for(let i = 1; i < positions.length; i++) {
		const curr_pos = positions[i];
		const prev_pos = adjusted_positions[i-1];

		if(min_dist > curr_pos - prev_pos) {
			const new_dist = min_dist - (curr_pos - prev_pos); 
			const new_pos = curr_pos + new_dist;
			adjusted_positions.push(new_pos)
		} else {
			adjusted_positions.push(curr_pos)
		}
	}

	// add the positions to the data array
	const data_final = data_as_arr.map((obj, index) => {
		let new_obj = obj
		const pos = adjusted_positions[index]		
		new_obj["pos"] = pos
		return new_obj
	})

	return(
		<div>
			<ul>
				{data_final.map((obj) => {
					const pos = obj["pos"]
					const tags = obj["tags"]
					const tags_html = tags.map((tag)=> {
								return <span>{tag.tag_name}</span>
							})
					return (
							<li style={{ left: pos + 'px' }}>
								{tags_html}
			   				</li>
			   				)
				})}
			</ul>
		</div>
	)
}

export default TagsTimeline