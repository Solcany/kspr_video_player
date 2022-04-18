import { useState } from "react";

import TagsTimeline from '../TagsTimeline/TagsTimeline'
import './TagsFilter.scss'

const TagsFilter = (props) => {
	const {response, default_key} = props;
	const [optionValue, setOptionValue] = useState(default_key);

	const handleSelect = (e) => {
		setOptionValue(e.target.value);
	}

	const analysis_results_keys = Object.keys(response.analysis_results);
	return (
		<div>
			<form onChange={handleSelect}>
			<label>test</label>
			<select name="selectList" id="selectList">
				{analysis_results_keys.map((key) => {
					return (
					<option value={key}>{key}</option>
						)
				})}
			</select>
			</form>
			<TagsTimeline response={response} tagsKey={optionValue}/>
		</div>			
		);
}

export default TagsFilter;