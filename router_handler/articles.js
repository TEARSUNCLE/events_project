const path = require('path')
const db = require('../db/index')
const { articleList } = require('../utils/filterData')

// 发布文章
module.exports.addArticle = (req, res) => {
  if (!req.file || req.file.fieldname !== 'cover_img') return res.errHandler('文章封面为必选参数！')
  const articleInfo = {
    ...req.body,
    cover_img: path.join('/uploads', req.file.filename + '.' + req.file.mimetype.split("/")[1]),
    pub_date: parseInt(new Date() / 1000),
    author_id: req.user.id
  }

  const insertSql = 'insert into ev_articles set ?'
  db.query(insertSql, articleInfo, (err, results) => {
    if (err) return res.errHandler(err)
    if (results.affectedRows !== 1) return res.errHandler('发布文章失败！')

    res.send({
      code: 0,
      msg: '发布文章成功！'
    })
  })
}

// 文章列表
module.exports.articleList = (req, res) => {
  const sql = articleList(req.body, 'ev_articles')

  db.query(sql, (err, rows) => {
    if (err) return res.errHandler(err)

    const sql = 'select count(*) as total from ev_articles where is_delete = 0'
    db.query(sql, (err, data) => {
      if (err) return res.errHandler(err)

      res.send({
        code: 0,
        msg: '获取文章列表成功！',
        data: {
          total: data[0]['total'],
          entries: rows
        }
      })
    })
  })
}