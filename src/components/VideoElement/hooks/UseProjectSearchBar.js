import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../AppContext";

export const useProjectSearchBar = () => {
  const {
    setLoader,
    setProjectNamesLoader,
    updateProjectData,
    updateTagData,
    removeProjectData,
    updateProjectSearchSelection,
    projectSearch,
  } = useContext(AppContext);

  const [projectNames, setProjectNames] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tagNames, setTagNames] = useState([]);
  const [filteredTagData, setFilteredTagData] = useState([]);

  const getProjectNames = () => {
    setProjectNamesLoader(true);
    axios
      .get("http://dev.kasparai.com" + "/project/")
      .then((api_response) => {
        setProjectNamesLoader(false);
        const names = api_response.data;
        setProjectNames(names);
      })
      .catch((error) => {
        setProjectNamesLoader(false);
        console.log(error);
      });
  };

  const getProjectData = (projectId) => {
    setLoader(true);
    axios
      .post("http://dev.kasparai.com" + "/get_videos_as_results/", {
        project_id: projectId,
      })
      .then((api_response) => {
        updateProjectData(api_response.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  const getProjectTagNames = (projectName) => {
    setProjectNamesLoader(true);
    axios
      .post("http://dev.kasparai.com" + "/get_tags/", {
        project_name: projectName,
      })
      .then((api_response) => {
        setProjectNamesLoader(false);
        setTagNames(api_response.data);
      })
      .catch((error) => {
        setProjectNamesLoader(false);
        console.log(error);
      });
  };

  const getProjectWithTags = (projectName, tagSearchWord) => {
    setLoader(true);
    axios
      .post("http://dev.kasparai.com" + "/query/", {
        project_name: projectName,
        tags: tagSearchWord,
        videos: "",
      })
      .then((api_response) => {
        updateProjectData(api_response.data);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  };

  useEffect(() => getProjectNames(), []);
  useEffect(() => getProjectTagNames(), []);

  const handleFilter = async (searchWord) => {
    const newFilter = projectNames.filter((value) => {
      // display name if it is included in searched word
      return value?.name?.toLowerCase()?.includes(searchWord?.toLowerCase());
    });
    // if searchWord is empty: don't show any results, if not empty show the filtered array
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleTagsFilter = async (searchWord) => {
    const newFilter = tagNames.filter((value) => {
      // display name if it is included in searched word
      return value?.name?.toLowerCase()?.includes(searchWord?.toLowerCase());
    });
    // if searchWord is empty: don't show any results, if not empty show the filtered array
    if (searchWord === "") {
      setFilteredTagData([]);
    } else {
      setFilteredTagData(newFilter);
    }
  };

  return {
    filteredData,
    filteredTagData,
    projectNames,
    tagNames,
    handleFilter,
    handleTagsFilter,
    getProjectData,
    getProjectWithTags,
    getProjectTagNames,
    removeProjectData,
    projectSearch,
    updateProjectSearchSelection,
  };
};
