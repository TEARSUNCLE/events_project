const db = require('../db/index')

// 文章列表
exports.getArticleCates = (req, res) => {
  const selectSql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
  db.query(selectSql, (err, results) => {
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