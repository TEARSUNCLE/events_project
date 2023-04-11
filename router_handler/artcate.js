const db = require('../db/index')
const { articleCates } = require('../utils/filterData')

// 文章列表
exports.getArticleCates = (req, res) => {
  const sql = articleCates(req.body, 'ev_article_cate')
  const totalData = 'select * from ev_article_cate where is_delete = 0 order by id asc'

  db.query(Object.keys(req.body).length === 0 ? totalData : sql, (err, results) => {
    console.log(10, sql)
    if (err) return res.errHandler(err)

    res.send({
      code: 0,
      msg: '获取文章列表成功！',
      data: results
    })
  })
}

// 新增文章
exports.addArticleCates = (req, res) => {
  const selectSql = 'select * from ev_article_cate where name = ? or alias = ?'
  db.query(selectSql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.errHandler(err)
    if (results.length !== 0) return res.errHandler('分类名称或别名已被占用，请更换！')

    const insertSql = 'insert into ev_article_cate set ?'
    db.query(insertSql, req.body, (err, results) => {
      if (err) return res.errHandler(err)
      if (results.affectedRows !== 1) return res.errHandler('新增文章分类失败！')

      res.send({
        code: 0,
        msg: '新增文章分类成功！'
      })
    })
  })
}

// 删除文章
exports.delArticleCates = (req, res) => {
  const updateSql = 'update ev_article_cate set is_delete = 1 where id = ?'
  db.query(updateSql, req.body.id, (err, results) => {
    if (err) return res.errHandler(err)
    if (results.affectedRows !== 1) return res.errHandler('删除文章分类失败！')

    res.send({
      coode: 0,
      msg: '删除文章分类成功！'
    })
  })
}

// 更新文章
exports.updateArticleCates = (req, res) => {
  const selectSql = 'select * from ev_article_cate where id = ? and (name = ? or alias = ?)'
  // 查询数据是否已经存在于数据库中 id要一样
  db.query(selectSql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
    if (err) return res.errHandler(err)
    if (results.length !== 0) return res.errHandler('分类名称或别名被占用，请更换后重试！')

    const updateSql = 'update ev_article_cate set ? where id = ?'
    db.query(updateSql, [req.body, req.body.id], (err, results) => {
      if (err) return res.errHandler(err)
      if (results.affectedRows !== 1) return res.errHandler('更新文章分类失败！')

      res.send({
        code: 0,
        msg: '更新文章成功！'
      })
    })
  })
}