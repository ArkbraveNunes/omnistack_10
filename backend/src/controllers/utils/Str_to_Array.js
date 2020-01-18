const str_to_array = (technologies) => technologies.split(',').map((tech) => tech.trim())

module.exports = str_to_array;