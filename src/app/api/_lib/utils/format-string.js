export const formatString = (template, ...values) => {
    return template.replace(/{(\d+)}/g, function (match, number) {
        return typeof values[number] != 'undefined' ? values[number] : match;
    });
}