// 接收两个参数，当前对象，sql表名

// 文章分类 列表筛选
exports.articleCates = (row, sqlName) => {
  let sql = `select * from ${sqlName} where `

  // 查询
  if (row) {
    console.log(9, row)
    for (const key in row) {
      sql += `${key} = '${row[key]}' and `
    }
  }
  return sql + 'is_delete = 0 order by id asc'
}

// 文章管理 列表筛选
exports.articleList = (row, sqlName) => {
  let sql = `select id, title, pub_date, status, cate_id from ${sqlName} where `

  const obj = { ...row }
  delete obj.page
  delete obj.pageSize

  if (obj) {
    for (const key in obj) {
      sql += `${key} = '${obj[key]}' and `
    }
  }
  return sql + `is_delete = 0 order by id asc limit ${(row.page - 1) * row.pageSize},${row.pageSize}`
}