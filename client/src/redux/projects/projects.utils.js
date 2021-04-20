export const filterResource = (project, resId) => {
    const resources = project.resources.filter(
        (resource) => resource.user !== resId
    );

    return { ...project, resources: resources };
};
