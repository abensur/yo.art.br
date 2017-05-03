import json2csv from 'json2csv'

export default (data, fields, fieldNames, fileName) => {
  try {
    const result = json2csv({
      data: data,
      fields: fields,
      fieldNames: fieldNames
    })
    const csvContent = 'data:text/csvcharset=GBK,\uFEFF' + result
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${(fileName || 'file')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (err) {
    console.error(err)
  }
}
