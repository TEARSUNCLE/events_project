// 接收两个参数，当前对象，sql表名

// 文章筛选
exports.articleCates = (row, sqlName) => {
  let sql = null
  // 组合筛选
  if (row.id && row.name && row.alias) {
    sql = `select * from ${sqlName} where id = '${row.id}' and name = '${row.name}' and alias = '${row.alias}' and is_delete = 0 order by id asc`
  }
  if (row.id && row.name) {
    sql = `select * from ${sqlName} where id = '${row.id}' and name = '${row.name}' and is_delete = 0 order by id asc`
  }
  if (row.id && row.alias) {
    sql = `select * from ${sqlName} where id = '${row.id}' and alias = '${row.alias}' and is_delete = 0 order by id asc`
  }
  if (row.alias && row.name) {
    sql = `select * from ${sqlName} where alias = '${row.alias}' and name = '${row.name}' and is_delete = 0 order by id asc`
  }

  // 单条查询
  if (row.id || row.name || row.alias) {
    for (const key in row) {
      sql = `select * from ${sqlName} where ${key} = '${row[key]}' and is_delete = 0 order by id asc`
    }
  }
  return sql
}