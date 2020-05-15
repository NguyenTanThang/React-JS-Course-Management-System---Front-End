export const paginateLogic = (list, pageObject) => {
    return list.slice(pageObject.startIndex, pageObject.endIndex + 1);
}

export const trainerSearchLogic = (list, searchLogic) => {
    const {searchedName, searchedTopicID} = searchLogic;
    let currentList = list;

    if (searchedName) {
        currentList = currentList.filter(studentItem => {
            return studentItem.name.toLowerCase().includes(searchedName.toLowerCase());
        })
    }

    if (searchedTopicID) {
        currentList = currentList.filter(studentItem => {
            return studentItem.topicsIDs.includes(searchedTopicID)
        })
    }

    return currentList;
}

export const studentSearchLogic = (list, searchLogic) => {
    const {searchedName, searchedCourseID} = searchLogic;
    let currentList = list;

    if (searchedName) {
        currentList = currentList.filter(studentItem => {
            return studentItem.name.toLowerCase().includes(searchedName.toLowerCase());
        })
    }

    if (searchedCourseID) {
        currentList = currentList.filter(studentItem => {
            return studentItem.coursesIDs.includes(searchedCourseID)
        })
    }

    return currentList;
}

export const courseSearchLogic = (list, searchLogic) => {
    const {searchedName} = searchLogic;
    let currentList = list;

    if (searchedName) {
        currentList = currentList.filter(courseItem => {
            return courseItem.name.toLowerCase().includes(searchedName.toLowerCase());
        })
    }

    return currentList;
}

export const topicSearchLogic = (list, searchLogic) => {
    const {searchedTitle, searchedCourseID} = searchLogic;
    let currentList = list;

    if (searchedTitle) {
        currentList = currentList.filter(topicItem => {
            return topicItem.title.toLowerCase().includes(searchedTitle.toLowerCase());
        })
    }

    if (searchedCourseID) {
        currentList = currentList.filter(topicItem => {
            return topicItem.courseID === searchedCourseID;
        })
    }

    return currentList;
}