import { useState } from "react";

import Timeline from './components/Timeline/Timeline'
import './VideoTagsTimeline.scss'

const VideoTagsTimeline = (props) => {
	const {response, defaultTagsKey} = props;
    const analysisResults = response.analysis_results
	const analysisResultsKeys = Object.keys(analysisResults);
	const [currentsTagsKey, setCurrentsTagsKey] = useState(defaultTagsKey);

	const handleSelect = (e) => {
		setCurrentsTagsKey(e.target.value);
	}

	return (
		<div className="video-tags-timeline">
			<form onChange={handleSelect}>
				<select className="analysis-results-select">
					{analysisResultsKeys.map((key) => {
						return (
						<option key={key} value={key}>{key}</option>
							)
					})}
				</select>
			</form>
			<Timeline videoDuration={response.video_info.length_sec}
					  analysisResults={response.analysis_results}
					  currentTagsKey={currentsTagsKey}/>
		</div>			
		);
}

export default VideoTagsTimeline;