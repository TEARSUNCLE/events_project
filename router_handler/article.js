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