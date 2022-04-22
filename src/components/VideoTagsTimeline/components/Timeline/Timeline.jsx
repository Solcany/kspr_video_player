import { useRef } from 'react';
import useContainerDimensions from './hooks/useContainerDimensions'
import './Timeline.scss'

const Timeline = (props) => {
	const keysToKeep = ['id', 'tag_name', 'start_time', 'end_time'];
	const timelinePosOffset = 35;
	const tagsMinDist = 20;
	const {videoDuration, analysisResults, currentTagsKey} = props;
	const tags = analysisResults[currentTagsKey];
  	const timelineRef = useRef(null);
  	const { width, height } = useContainerDimensions(timelineRef);

  	const rerange = (value, x1, y1, x2, y2) => {
  		return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
  	}
	const dropKeys = (arr, keysToKeep) => {
		return arr.map(obj => {
			return keysToKeep.reduce((acc, curr) => {
	  					acc[curr] = obj[curr];
	  					return acc;
		}, {})
		})
	}
	const groupObjectsByKey = (array, key) => {
	    return array.reduce((acc, curr) => {
	        acc[curr[key]] = acc[curr[key]] || [];
	        acc[curr[key]].push(curr);
	        return acc;
	    }, {})};
	const sortNumericalStrings = (array) => {
		return array.sort((a, b) => {
			return parseFloat(a) - parseFloat(b);
		})
	}
	// process tags data
	let data = dropKeys(tags, keysToKeep);
	// group all the tags by start_time	
	data = groupObjectsByKey(data, "start_time");
	// sort start times in ascending order
	const data_keys = sortNumericalStrings(Object.keys(data).sort()) 
	// create an array of tags ordered by start_time 
	data = data_keys.map((key) => {
		return {start_time: key, tags: data[key]};
	})
	// create absolute pixel positions of the tags on the timeline
	const positions = data.map((obj) => {
		return rerange(parseFloat(obj.start_time),0,videoDuration,0, width) + timelinePosOffset;
	})
	// adjust the positions so that the tags don't overlap too much on the timeline
	let adjustedPositions = []
		// the first tag doesn't need to be adjusted, add it to the new arr
		adjustedPositions.push(positions[0])
	for(let i = 1; i < positions.length; i++) {
		const currPos = positions[i];
		const prevPos = adjustedPositions[i-1];
		if(tagsMinDist > currPos - prevPos) {
			const newDist = tagsMinDist - (currPos - prevPos); 
			const newPos = currPos + newDist;
			adjustedPositions.push(newPos)
		} else {
			adjustedPositions.push(currPos)
		}
	}
	// create final data array with tags and position data
	data = data.map((obj, index) => {
		let newObj = obj
		const pos = adjustedPositions[index]		
		newObj["pos"] = pos
		return newObj
	})

	return(
			<ul className="timeline" ref={timelineRef}>
				{data.map((obj, index) => {
					const pos = obj["pos"]
					const tags = obj["tags"]
					const tagsHtml = tags.map((tag)=> {
								return <span key={tag.id}>{tag.tag_name}</span>
							})
					return (
							<li key={index} style={{ left: pos + 'px' }}>
								{tagsHtml}
			   				</li>
			   				)
				})}
			</ul>
	)
}

export default Timeline