// 接收两个参数，当前对象，sql表名
const db = require('../db/index')

// 文章分类 列表筛选
exports.articleCates = (row, sqlName) => {
  return new Promise((resolve, reject) => {
    let sql = `select id, name, alias from ${sqlName} where `

    // 查询
    if (Object.keys(row).length) {
      const selectSql = `select * from ${sqlName} where (name = ? or alias = ?)`
      db.query(selectSql, [row.name, row.alias], (err, results) => {

        if (results.length === 0) {
          // 模糊匹配和精确匹配都包括
          sql += `(name like '%${row.name}%' or alias like '%${row.alias}%') `
          for (const key in row) {
            if (key !== 'name' && key !== 'alias') {
              sql += `or ${key} = '${row[key]}' `
            }
          }
          sql += 'and is_delete = 0 order by id asc'
        } else {
          // 精确匹配
          for (const key in row) {
            sql += `${key} = '${row[key]}' and `
          }
          sql += 'is_delete = 0 order by id asc'
        }
        resolve(sql)
      })
    } else {
      resolve(sql = `select id, name, alias from ${sqlName} where is_delete = 0 order by id desc`)
      reject(new Error('Row parameter is missing'))
    }
  })
}


// 文章管理 列表筛选
exports.articleList = (row, sqlName) => {
  let sql = `select * from ${sqlName} where `

  const { page, pageSize, start, end, ...obj } = row

  // 未传递start和end
  if (row && !row.start && !row.end) {
    for (const key in obj) {
      if (obj[key] == '-1') {
        sql + ``
      } else {
        sql += `${key} = '${obj[key]}' and `
      }
    }
    // 传递了start或者end的其中一个
  } else if (row && (!row.start || !row.end)) {
  } else {
    for (const key in obj) {
      if (obj[key] == '-1') {
        sql + ``
      } else {
        sql += `${key} = '${obj[key]}' and `
      }
    }
    sql += `pub_date between '${row.start}' and '${row.end}' and `
  }
  return sql + `is_delete = 0 order by id desc limit ${(row.page - 1) * row.pageSize},${row.pageSize}`
}